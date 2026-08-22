from django.core.management.base import BaseCommand
from apps.websites.models import Website
from apps.projects.models import Project
from apps.blogs.models import BlogPost
from apps.experiences.models import Experience
from apps.skills.models import Skill
from apps.contacts.models import ContactInquiry
from apps.faqs.models import Faq
from apps.profiles.models import PortfolioProfile

class Command(BaseCommand):
    help = 'Seeds multi-tenant portfolio data for DevMeet, DevMitra, and DevMate'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding database with multi-tenant data...')

        # 1. Websites
        sites_data = [
            {
                'slug': 'dev-meet',
                'name': 'DevMeet',
                'badge': 'MEET',
                'tag': 'Multi-Peer Video Collaboration & WebRTC Engine',
                'primary_color': 'blue'
            },
            {
                'slug': 'dev-mitra',
                'name': 'DevMitra',
                'badge': 'MITRA',
                'tag': 'AI Peer Pairing & Mentorship Engine',
                'primary_color': 'sky'
            },
            {
                'slug': 'dev-mate',
                'name': 'DevMate',
                'badge': 'MATE',
                'tag': 'In-Browser Cloud Sandbox & Code IDE',
                'primary_color': 'violet'
            }
        ]

        websites = {}
        for site in sites_data:
            w, _ = Website.objects.get_or_create(slug=site['slug'], defaults=site)
            websites[site['slug']] = w

        # 2. Portfolio Profiles
        for slug, site in websites.items():
            PortfolioProfile.objects.update_or_create(
                website=site,
                defaults={
                    'name': 'Roshan Kumar',
                    'title': f'Senior Full Stack Developer & UI Architect ({site.name})',
                    'bio': f'Passionate software engineer building high-performance React web applications, scalable Node.js microservices, and elegant OLED dark glassmorphic user interfaces for {site.name}.\n\n```architecture\nFrontend:React 18 -> API Gateway:Kong -> Backend:Django REST -> DB:MySQL\n```\n\nExperienced in real-time WebRTC, distributed caching, and micro-frontend architecture.',
                    'location': 'New Delhi, India',
                    'email': f'roshan@{slug}.dev',
                    'phone': '+91 98765 43210',
                    'experience_years': '5+ Years',
                    'github': 'https://github.com/roshan-dev',
                    'linkedin': 'https://linkedin.com/in/roshan-dev',
                    'twitter': '@roshan_dev',
                    'website_url': f'https://{slug}.dev',
                    'resume_url': f'https://{slug}.dev/resume.pdf',
                    'avatar': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
                }
            )

        # 3. Projects
        projects_data = [
            {
                'website': websites['dev-meet'],
                'title': 'Dev-Meet Video Conference Suite',
                'slug': 'dev-meet-video-conference-suite',
                'category': 'Web Application',
                'status': 'LIVE',
                'completed_date': '2025-05-15',
                'image': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
                'demo_url': 'https://devmeet.live',
                'github_url': 'https://github.com/roshan-dev/dev-meet',
                'description': 'High-Performance WebRTC Video Conferencing Suite supporting up to 50 concurrent peer mesh channels with sub-80ms audio/video latency.\n\n```architecture\nBrowser:React -> SFU:Mediasoup -> Signaling:WebSockets -> Redis:State\n```\n\n```chart:barchart\ntitle:Media Processing Throughput\nWebRTC Mesh:1200fps\nSFU Relay:4800fps\nMCU Transcoding:850fps\n```',
                'visible': True
            },
            {
                'website': websites['dev-mitra'],
                'title': 'Mitra Peer Pairing Matcher',
                'slug': 'mitra-peer-pairing-matcher',
                'category': 'Community Platform',
                'status': 'LIVE',
                'completed_date': '2025-06-01',
                'image': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
                'demo_url': 'https://devmitra.org',
                'github_url': 'https://github.com/roshan-dev/dev-mitra',
                'description': 'Intelligent Developer Mentorship & Pairing Platform using vector embeddings and cosine similarity to match junior devs with senior mentors.',
                'visible': True
            },
            {
                'website': websites['dev-mate'],
                'title': 'Dev-Mate Collaborative IDE Sandbox',
                'slug': 'dev-mate-collaborative-ide-sandbox',
                'category': 'Developer Tools',
                'status': 'OFFLINE',
                'completed_date': '2025-06-20',
                'image': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
                'demo_url': 'https://devmate.io',
                'github_url': 'https://github.com/roshan-dev/dev-mate',
                'description': 'In-Browser Cloud Compilation & Code Sandbox supporting Node.js, Python, and Rust in WebAssembly micro-containers.',
                'visible': False
            }
        ]

        for p in projects_data:
            Project.objects.update_or_create(slug=p['slug'], defaults=p)

        # 4. Blogs
        blogs_data = [
            {
                'website': websites['dev-meet'],
                'title': 'Optimizing Node.js APIs for High Scale Throughput',
                'slug': 'optimizing-nodejs-apis-for-high-scale',
                'category': 'Backend Architecture',
                'status': 'PUBLISHED',
                'date': '2025-06-18',
                'read_time': '6 min read',
                'views_count': 1420,
                'summary': 'Deep dive into event loop lag, cluster worker pooling, and Redis pipeline caching for 100k req/sec microservices.',
                'content': '## Architecture Overview\n\nScaling Node.js requires understanding the event loop.\n\n```architecture\nLoad Balancer:Nginx -> Node Cluster:4 Cores -> Redis:Cache -> Postgres:DB\n```',
                'visible': True
            },
            {
                'website': websites['dev-mitra'],
                'title': 'Vector Search & Embedding Similarity for Mentorship',
                'slug': 'vector-search-embedding-similarity',
                'category': 'Machine Learning',
                'status': 'PUBLISHED',
                'date': '2025-06-12',
                'read_time': '8 min read',
                'views_count': 980,
                'summary': 'How we built real-time developer mentor matching using pgvector and OpenAI text-embedding-3-small.',
                'content': '## Vector Matching Pipeline\n\nComparing developer skill vectors in multidimensional space.',
                'visible': True
            },
            {
                'website': websites['dev-mate'],
                'title': 'Running Python & Rust in the Browser via WebAssembly',
                'slug': 'running-python-rust-in-browser-wasm',
                'category': 'WebAssembly',
                'status': 'DRAFT',
                'date': '2025-06-25',
                'read_time': '5 min read',
                'views_count': 0,
                'summary': 'Compiling language runtimes to WASM for client-side zero-latency code execution.',
                'content': 'Draft article for next week.',
                'visible': False
            }
        ]

        for b in blogs_data:
            BlogPost.objects.update_or_create(slug=b['slug'], defaults=b)

        # 5. Experiences
        experiences_data = [
            {
                'website': websites['dev-meet'],
                'role': 'Senior Full Stack & Cloud Architect',
                'company': 'HyperScale Tech Corp',
                'category': 'Engineering',
                'period': '2023 - Present',
                'location': 'Remote / New Delhi',
                'status': 'CURRENT',
                'is_current': True,
                'description': 'Leading frontend architecture across 4 engineering pods. Designed real-time collaboration canvas reducing render latencies by 42%.',
                'visible': True
            },
            {
                'website': websites['dev-meet'],
                'role': 'Lead React UI Developer',
                'company': 'Nova Digital Labs',
                'category': 'Frontend',
                'period': '2021 - 2023',
                'location': 'Bengaluru, India',
                'status': 'PAST',
                'is_current': False,
                'description': 'Built modern dark-mode component libraries and real-time dashboard analytics tooling used by 200k+ monthly active users.',
                'visible': True
            }
        ]

        for e in experiences_data:
            Experience.objects.get_or_create(role=e['role'], company=e['company'], website=e['website'], defaults=e)

        # 6. Skills
        skills_data = [
            {'website': websites['dev-meet'], 'name': 'React 18 & Next.js', 'category': 'Frontend', 'level': 95, 'icon_name': 'Code2', 'visible': True},
            {'website': websites['dev-meet'], 'name': 'TypeScript & ESNext', 'category': 'Frontend', 'level': 92, 'icon_name': 'Terminal', 'visible': True},
            {'website': websites['dev-meet'], 'name': 'Node.js & Express', 'category': 'Backend', 'level': 90, 'icon_name': 'Server', 'visible': True},
            {'website': websites['dev-meet'], 'name': 'Python & Django REST', 'category': 'Backend', 'level': 88, 'icon_name': 'Server', 'visible': True},
            {'website': websites['dev-meet'], 'name': 'PostgreSQL & MySQL', 'category': 'Database', 'level': 86, 'icon_name': 'Database', 'visible': True},
            {'website': websites['dev-meet'], 'name': 'Docker & Kubernetes', 'category': 'DevOps', 'level': 82, 'icon_name': 'Layers', 'visible': True},
        ]

        for s in skills_data:
            Skill.objects.get_or_create(name=s['name'], website=s['website'], defaults=s)

        # 7. FAQs
        faqs_data = [
            {
                'website': websites['dev-meet'],
                'question': 'What technology stack is used in DevAdmin?',
                'answer': 'DevAdmin is built with React 18, Vite, Tailwind CSS, Lucide icons on the frontend, and Django REST Framework with MySQL/SQLite and JWT authentication on the backend.',
                'category': 'Architecture',
                'order': 1,
                'visible': True
            },
            {
                'website': websites['dev-meet'],
                'question': 'How does multi-site portfolio management work?',
                'answer': 'All modules (Projects, Blogs, Skills, Experiences, Messages, FAQs) are partitioned by the active website slug (e.g. dev-meet, dev-mitra, dev-mate) with composite database indexes for blazing query performance.',
                'category': 'Multi-Site',
                'order': 2,
                'visible': True
            },
            {
                'website': websites['dev-meet'],
                'question': 'Are architecture diagrams and charts supported in blogs?',
                'answer': 'Yes! The custom RichContentBuilder component allows rendering live visual node topologies, latency graphs, and benchmark bars directly in your articles.',
                'category': 'Features',
                'order': 3,
                'visible': True
            }
        ]

        for f in faqs_data:
            Faq.objects.get_or_create(question=f['question'], website=f['website'], defaults=f)

        # 8. Contact Inquiries
        contacts_data = [
            {
                'website': websites['dev-meet'],
                'name': 'John Doe',
                'email': 'john@example.com',
                'subject': 'Inquiry regarding DevMeet platform features',
                'message': 'Hello Roshan, I saw your portfolio and would like to ask about scheduling a custom WebRTC integration demo for our enterprise platform.',
                'tag': 'Inquiry',
                'is_read': False,
                'starred': True,
                'replied': False
            },
            {
                'website': websites['dev-meet'],
                'name': 'Renuka Dashbanda',
                'email': 'renuka@design.co',
                'subject': 'Loved the dark OLED glassmorphism design',
                'message': 'Great work on the UI update! Loved the dark glassmorphic design and the crisp typography.',
                'tag': 'Feedback',
                'is_read': True,
                'starred': False,
                'replied': True,
                'reply_subject': 'Re: Loved the dark OLED glassmorphism design',
                'reply_text': 'Thank you so much Renuka! Glad you loved the design aesthetic.'
            }
        ]

        for c in contacts_data:
            ContactInquiry.objects.get_or_create(email=c['email'], subject=c['subject'], website=c['website'], defaults=c)

        self.stdout.write(self.style.SUCCESS('Successfully seeded database for all 3 portfolio sites!'))
