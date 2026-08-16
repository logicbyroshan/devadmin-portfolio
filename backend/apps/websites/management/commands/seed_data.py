from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.websites.models import Website
from apps.blogs.models import BlogPost
from apps.projects.models import Project
from apps.experiences.models import Experience
from apps.skills.models import Skill
from apps.contacts.models import ContactInquiry
import datetime

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds initial database for DevAdmin multi-website platform (Dev-Meet, Dev-Mitra, Dev-Mate)'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("Starting database seeding process..."))

        # 1. Superuser setup
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@devadmin.com', 'admin123')
            self.stdout.write(self.style.SUCCESS("[OK] Created Superuser: admin / admin123"))
        else:
            self.stdout.write(self.style.SUCCESS("[OK] Superuser admin already exists."))

        # 2. Websites setup
        websites_data = [
            {
                'slug': 'dev-meet',
                'name': 'Dev-Meet',
                'badge': 'MEET',
                'tag': 'Developer Meetings & Calls Portal',
                'primary_color': 'blue'
            },
            {
                'slug': 'dev-mitra',
                'name': 'Dev-Mitra',
                'badge': 'MITRA',
                'tag': 'Peer Support & Community Hub',
                'primary_color': 'sky'
            },
            {
                'slug': 'dev-mate',
                'name': 'Dev-Mate',
                'badge': 'MATE',
                'tag': 'Pair Programming & Matcher',
                'primary_color': 'violet'
            },
        ]

        website_instances = {}
        for data in websites_data:
            site, created = Website.objects.get_or_create(slug=data['slug'], defaults=data)
            website_instances[site.slug] = site
            status_str = "Created" if created else "Exists"
            self.stdout.write(self.style.SUCCESS(f"[OK] Website {site.name} [{status_str}]"))

        # 3. Blogs setup
        blogs_sample = [
            {
                'website': website_instances['dev-meet'],
                'title': 'Optimizing Real-time Video Calls in WebRTC',
                'slug': 'optimizing-webrtc-video-calls',
                'summary': 'A deep dive into WebRTC peer connection configuration and bandwidth management.',
                'content': 'WebRTC enables real-time peer-to-peer audio and video communication...',
                'status': 'PUBLISHED',
                'views_count': 1420
            },
            {
                'website': website_instances['dev-mitra'],
                'title': 'Building Peer Mentorship Communities in Tech',
                'slug': 'building-peer-mentorship-communities',
                'summary': 'Strategies for fostering collaborative peer support groups for junior engineers.',
                'content': 'Community building requires empathetic communication and structured feedback loops...',
                'status': 'PUBLISHED',
                'views_count': 980
            },
            {
                'website': website_instances['dev-mate'],
                'title': 'Pair Programming Patterns: Driver & Navigator Dynamics',
                'slug': 'pair-programming-patterns-guide',
                'summary': 'How effective pair programming accelerates code quality and knowledge sharing.',
                'content': 'Effective pair programming relies on clear role switching between Driver and Navigator...',
                'status': 'DRAFT',
                'views_count': 320
            },
        ]

        for blog in blogs_sample:
            BlogPost.objects.get_or_create(slug=blog['slug'], defaults=blog)

        # 4. Projects setup
        projects_sample = [
            {
                'website': website_instances['dev-meet'],
                'title': 'Dev-Meet WebRTC Conference Engine',
                'slug': 'devmeet-webrtc-conference-engine',
                'description': 'Low-latency video conferencing platform supporting up to 50 concurrent video feeds.',
                'status': 'DONE',
                'live_url': 'https://dev-meet.io',
                'github_url': 'https://github.com/logicbyroshan/dev-meet',
                'technologies': 'React, WebRTC, Node.js, Socket.io',
                'featured': True
            },
            {
                'website': website_instances['dev-mitra'],
                'title': 'Dev-Mitra Community Peer Hub',
                'slug': 'devmitra-community-peer-hub',
                'description': 'Real-time Q&A, mentor matching, and code review queue for developers.',
                'status': 'IN_PROGRESS',
                'live_url': 'https://dev-mitra.org',
                'github_url': 'https://github.com/logicbyroshan/dev-mitra',
                'technologies': 'Next.js, Django REST Framework, PostgreSQL',
                'featured': True
            },
            {
                'website': website_instances['dev-mate'],
                'title': 'Dev-Mate Collaborative Code Editor',
                'slug': 'devmate-collaborative-code-editor',
                'description': 'Real-time collaborative code workspace with operational transformation.',
                'status': 'PLANNED',
                'github_url': 'https://github.com/logicbyroshan/dev-mate',
                'technologies': 'Monaco Editor, WebSockets, Python, Redis',
                'featured': False
            },
        ]

        for proj in projects_sample:
            Project.objects.get_or_create(slug=proj['slug'], defaults=proj)

        # 5. Experiences setup
        experiences_sample = [
            {
                'website': website_instances['dev-meet'],
                'role': 'Senior Full Stack Engineer',
                'company': 'TechCorp Solutions',
                'location': 'Remote',
                'start_date': datetime.date(2023, 1, 15),
                'is_current': True,
                'description': 'Architected high-density admin dashboards and backend microservices.'
            },
            {
                'website': website_instances['dev-mitra'],
                'role': 'Lead Backend Developer',
                'company': 'Mitra Labs',
                'location': 'San Francisco, CA',
                'start_date': datetime.date(2021, 6, 1),
                'end_date': datetime.date(2022, 12, 31),
                'is_current': False,
                'description': 'Scaled Django REST API infrastructure to serve 250k daily active users.'
            },
        ]

        for exp in experiences_sample:
            Experience.objects.get_or_create(role=exp['role'], company=exp['company'], defaults=exp)

        # 6. Skills setup
        skills_sample = [
            {'website': website_instances['dev-meet'], 'name': 'React & Vite', 'category': 'FRONTEND', 'proficiency_percentage': 95},
            {'website': website_instances['dev-meet'], 'name': 'Python & Django REST Framework', 'category': 'BACKEND', 'proficiency_percentage': 92},
            {'website': website_instances['dev-mitra'], 'name': 'MySQL & PostgreSQL', 'category': 'DATABASE', 'proficiency_percentage': 88},
            {'website': website_instances['dev-mate'], 'name': 'Docker & CI/CD Pipelines', 'category': 'DEVOPS', 'proficiency_percentage': 85},
        ]

        for skill in skills_sample:
            Skill.objects.get_or_create(website=skill['website'], name=skill['name'], defaults=skill)

        # 7. Contacts setup
        contacts_sample = [
            {
                'website': website_instances['dev-meet'],
                'name': 'John Doe',
                'email': 'john@example.com',
                'message': 'Inquiry regarding Dev-Meet platform integration for enterprise calls.',
                'tag': 'Inquiry',
                'is_read': False
            },
            {
                'website': website_instances['dev-mitra'],
                'name': 'Renuka Dashbanda',
                'email': 'renuka@design.co',
                'message': 'Loved the new UI update and peer mentor workflow!',
                'tag': 'Feedback',
                'is_read': True
            },
        ]

        for msg in contacts_sample:
            ContactInquiry.objects.get_or_create(email=msg['email'], message=msg['message'], defaults=msg)

        self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))
