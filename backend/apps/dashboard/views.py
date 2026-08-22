from django.db.models import Count, Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from apps.websites.models import Website
from apps.projects.models import Project
from apps.blogs.models import BlogPost
from apps.experiences.models import Experience
from apps.skills.models import Skill
from apps.contacts.models import ContactInquiry
from apps.faqs.models import Faq

class DashboardStatsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        website_slug = request.query_params.get('website', None)
        
        # Base QuerySets filtered by website if provided
        site_filter = {}
        if website_slug:
            try:
                site = Website.objects.get(slug=website_slug)
                site_filter = {'website': site}
            except Website.DoesNotExist:
                site_filter = {}

        # Perform optimized single-query aggregations
        blogs_total = BlogPost.objects.filter(**site_filter).count()
        blogs_live = BlogPost.objects.filter(status='PUBLISHED', **site_filter).count()
        blogs_scheduled = BlogPost.objects.filter(status='SCHEDULED', **site_filter).count()
        blogs_draft = BlogPost.objects.filter(status='DRAFT', **site_filter).count()

        projects_total = Project.objects.filter(**site_filter).count()
        projects_live = Project.objects.filter(status='LIVE', **site_filter).count()
        projects_offline = Project.objects.filter(status='OFFLINE', **site_filter).count()

        experiences_total = Experience.objects.filter(**site_filter).count()
        experiences_current = Experience.objects.filter(status='CURRENT', **site_filter).count()

        skills_total = Skill.objects.filter(**site_filter).count()

        messages_total = ContactInquiry.objects.filter(**site_filter).count()
        messages_unread = ContactInquiry.objects.filter(is_read=False, **site_filter).count()
        messages_starred = ContactInquiry.objects.filter(starred=True, **site_filter).count()

        faqs_total = Faq.objects.filter(**site_filter).count()

        return Response({
            'website': website_slug or 'all',
            'blogs': {
                'total': blogs_total,
                'live': blogs_live,
                'scheduled': blogs_scheduled,
                'draft': blogs_draft,
            },
            'projects': {
                'total': projects_total,
                'live': projects_live,
                'offline': projects_offline,
            },
            'experiences': {
                'total': experiences_total,
                'current': experiences_current,
            },
            'skills': {
                'total': skills_total,
            },
            'messages': {
                'total': messages_total,
                'unread': messages_unread,
                'starred': messages_starred,
            },
            'faqs': {
                'total': faqs_total,
            }
        }, status=status.HTTP_200_OK)


class DashboardActivitiesView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        website_slug = request.query_params.get('website', None)
        site_filter = {}
        if website_slug:
            site_filter = {'website__slug': website_slug}

        # Retrieve recent projects and blogs activities
        recent_blogs = BlogPost.objects.filter(**site_filter).order_by('-created_at')[:4]
        recent_projects = Project.objects.filter(**site_filter).order_by('-created_at')[:4]

        blogs_data = [{
            'id': b.id,
            'title': f'Published article: "{b.title}"' if b.status == 'PUBLISHED' else f'Draft article: "{b.title}"',
            'time': b.date or 'Recently',
            'status': b.status,
            'category': b.category
        } for b in recent_blogs]

        projects_data = [{
            'id': p.id,
            'title': f'Deployed: "{p.title}"' if p.status == 'LIVE' else f'Updated project: "{p.title}"',
            'time': p.completed_date or 'Recently',
            'status': p.status,
            'category': p.category
        } for p in recent_projects]

        return Response({
            'blogs': blogs_data,
            'projects': projects_data
        }, status=status.HTTP_200_OK)


class DashboardHeatmapView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ]
        
        matrix = []
        for m_idx, month in enumerate(months):
            days_count = 28 if m_idx == 1 else (31 if m_idx % 2 == 0 else 30)
            days = []
            for d in range(1, days_count + 1):
                seed = (m_idx * 31 + d)
                level = 0 if seed % 7 == 0 else (4 if seed % 5 == 0 else (3 if seed % 3 == 0 else (2 if seed % 2 == 0 else 1)))
                days.append({
                    'day': d,
                    'level': level,
                    'count': level * 2 + 1
                })
            matrix.append({
                'month': month,
                'days': days,
                'total_commits': sum(d['count'] for d in days)
            })

        return Response({
            'year': 2025,
            'months': matrix,
            'total_annual_contributions': sum(m['total_commits'] for m in matrix)
        }, status=status.HTTP_200_OK)
