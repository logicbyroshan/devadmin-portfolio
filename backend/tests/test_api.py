"""
DevAdmin Comprehensive Test Suite
Tests authentication, permissions, multi-tenancy, serializers, analytics, contact replies, and health checks.
"""

from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

from apps.websites.models import Website
from apps.projects.models import Project
from apps.blogs.models import BlogPost
from apps.experiences.models import Experience
from apps.skills.models import Skill
from apps.contacts.models import ContactInquiry
from apps.faqs.models import Faq
from apps.profiles.models import PortfolioProfile
from apps.common.services.stats_service import AnalyticsService
from apps.common.services.mail_service import NotificationService


class DevAdminApiTestSuite(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create websites
        self.site_meet = Website.objects.create(
            slug='dev-meet',
            name='DevMeet',
            badge='MEET',
            tag='Video Suite',
            primary_color='blue'
        )
        self.site_mitra = Website.objects.create(
            slug='dev-mitra',
            name='DevMitra',
            badge='MITRA',
            tag='Mentorship',
            primary_color='sky'
        )

        # Create admin user
        self.admin_user = User.objects.create_user(
            username='adminuser',
            email='admin@devadmin.io',
            password='ComplexPassword123!',
            first_name='Admin',
            last_name='User',
            is_staff=True
        )

        # Obtain JWT Token
        res = self.client.post('/api/auth/token/', {
            'username': 'adminuser',
            'password': 'ComplexPassword123!'
        })
        self.access_token = res.data['access']
        self.refresh_token = res.data['refresh']

        # Authenticated client
        self.auth_client = APIClient()
        self.auth_client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')

    def test_health_check(self):
        """Test /api/health/ endpoint returns 200 and healthy DB status."""
        response = self.client.get('/api/health/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'healthy')
        self.assertEqual(response.data['database']['status'], 'healthy')

    def test_user_registration_and_validation(self):
        """Test public registration creates user and validates password length."""
        # Short password should fail validation
        res_weak = self.client.post('/api/auth/register/', {
            'username': 'newuser1',
            'email': 'new1@example.com',
            'password': '123'
        })
        self.assertEqual(res_weak.status_code, status.HTTP_400_BAD_REQUEST)

        # Strong password should succeed
        res_success = self.client.post('/api/auth/register/', {
            'username': 'newuser1',
            'email': 'new1@example.com',
            'password': 'ValidSecretPassword123!',
            'first_name': 'New',
            'last_name': 'User'
        })
        self.assertEqual(res_success.status_code, status.HTTP_201_CREATED)
        self.assertIn('access', res_success.data)
        self.assertTrue(User.objects.filter(username='newuser1').exists())

    def test_password_change_flow(self):
        """Test authenticated password change endpoint."""
        res_wrong = self.auth_client.post('/api/auth/change-password/', {
            'current_password': 'WrongPassword!',
            'new_password': 'BrandNewPassword123!'
        })
        self.assertEqual(res_wrong.status_code, status.HTTP_400_BAD_REQUEST)

        res_correct = self.auth_client.post('/api/auth/change-password/', {
            'current_password': 'ComplexPassword123!',
            'new_password': 'BrandNewPassword123!'
        })
        self.assertEqual(res_correct.status_code, status.HTTP_200_OK)

        # Verify new credentials work
        res_login = self.client.post('/api/auth/token/', {
            'username': 'adminuser',
            'password': 'BrandNewPassword123!'
        })
        self.assertEqual(res_login.status_code, status.HTTP_200_OK)

    def test_current_user_me(self):
        """Test /api/auth/me/ endpoint returns user identity."""
        res = self.auth_client.get('/api/auth/me/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['username'], 'adminuser')
        self.assertEqual(res.data['email'], 'admin@devadmin.io')

    def test_project_crud_with_slug_relation(self):
        """Test creating project using website slug string and retrieving it."""
        payload = {
            'website': 'dev-meet',
            'title': 'Realtime Video Conferencing',
            'slug': 'realtime-video-conferencing',
            'description': 'WebRTC streaming room',
            'category': 'Web Application',
            'status': 'LIVE',
            'completed_date': '2025-06-01',
            'visible': True
        }
        # Unauthenticated create should fail (401)
        res_unauth = self.client.post('/api/projects/', payload)
        self.assertEqual(res_unauth.status_code, status.HTTP_401_UNAUTHORIZED)

        # Authenticated create should succeed (201)
        res_create = self.auth_client.post('/api/projects/', payload)
        self.assertEqual(res_create.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res_create.data['website_slug'], 'dev-meet')
        proj_id = res_create.data['id']

        # Toggle visibility
        res_toggle = self.auth_client.post(f'/api/projects/{proj_id}/toggle_visibility/')
        self.assertEqual(res_toggle.status_code, status.HTTP_200_OK)
        self.assertFalse(res_toggle.data['visible'])

        # Read unauthenticated (GET is allowed for public)
        res_get = self.client.get(f'/api/projects/{proj_id}/')
        self.assertEqual(res_get.status_code, status.HTTP_200_OK)
        self.assertEqual(res_get.data['title'], 'Realtime Video Conferencing')

    def test_blog_crud_and_scoping(self):
        """Test blog creation and website multi-tenant scoping."""
        b1 = BlogPost.objects.create(
            website=self.site_meet,
            title='WebRTC Guide',
            slug='webrtc-guide',
            content='Markdown content',
            status='PUBLISHED'
        )
        b2 = BlogPost.objects.create(
            website=self.site_mitra,
            title='AI Mentorship',
            slug='ai-mentorship',
            content='AI content',
            status='PUBLISHED'
        )

        res_meet = self.client.get('/api/blogs/?website=dev-meet')
        self.assertEqual(res_meet.status_code, status.HTTP_200_OK)
        titles = [b['title'] for b in res_meet.data['results']]
        self.assertIn('WebRTC Guide', titles)
        self.assertNotIn('AI Mentorship', titles)

    def test_contact_inquiry_public_submit_and_admin_reply(self):
        """Test public contact inquiry creation and authenticated email reply."""
        # 1. Public user submits contact inquiry
        contact_payload = {
            'website': 'dev-meet',
            'name': 'Client User',
            'email': 'client@example.com',
            'subject': 'Project Discussion',
            'message': 'Can we build an app together?',
            'tag': 'Inquiry'
        }
        res_submit = self.client.post('/api/contacts/', contact_payload)
        self.assertEqual(res_submit.status_code, status.HTTP_201_CREATED)
        inquiry_id = res_submit.data['id']

        # 2. Public user cannot list or reply to inquiries
        res_list_unauth = self.client.get('/api/contacts/')
        self.assertEqual(res_list_unauth.status_code, status.HTTP_401_UNAUTHORIZED)

        # 3. Authenticated admin can view inquiries and reply
        res_list = self.auth_client.get('/api/contacts/')
        self.assertEqual(res_list.status_code, status.HTTP_200_OK)

        res_reply = self.auth_client.post(f'/api/contacts/{inquiry_id}/reply/', {
            'reply_subject': 'Re: Project Discussion',
            'reply_text': 'I would love to collaborate!'
        })
        self.assertEqual(res_reply.status_code, status.HTTP_200_OK)
        self.assertEqual(res_reply.data['status'], 'sent')

        # Verify inquiry state updated
        inquiry = ContactInquiry.objects.get(id=inquiry_id)
        self.assertTrue(inquiry.replied)
        self.assertTrue(inquiry.is_read)

    def test_dashboard_analytics_service(self):
        """Test analytics metrics and dynamic contribution heatmap."""
        metrics = AnalyticsService.get_dashboard_metrics(website_slug='dev-meet')
        self.assertIn('blogs', metrics)
        self.assertIn('projects', metrics)
        self.assertIn('messages', metrics)

        heatmap = AnalyticsService.generate_contribution_heatmap()
        self.assertIn('months', heatmap)
        self.assertEqual(len(heatmap['months']), 12)
        self.assertGreater(heatmap['total_annual_contributions'], 0)
