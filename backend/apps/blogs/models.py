from django.db import models
from django.utils.text import slugify
from apps.websites.models import Website

class BlogPost(models.Model):
    STATUS_CHOICES = (
        ('DRAFT', 'Draft'),
        ('SCHEDULED', 'Scheduled'),
        ('PUBLISHED', 'Published'),
    )

    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='blogs', db_index=True)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=350, blank=True, default="", help_text="Executive subtitle / thesis statement")
    slug = models.SlugField(max_length=255, unique=True, db_index=True, blank=True)
    category = models.CharField(max_length=100, default="Software Engineering", db_index=True)
    summary = models.TextField(blank=True, default="", help_text="Short abstract / summary")
    tldr = models.TextField(blank=True, default="", help_text="TL;DR key takeaway bullet points")
    content = models.TextField(blank=True, default="", help_text="Full markdown article, code blocks, diagrams")
    image = models.TextField(blank=True, null=True, help_text="Cover header image URL")
    tags = models.JSONField(default=list, blank=True, help_text="List of topic tags e.g. ['Microservices', 'System Design']")
    author_name = models.CharField(max_length=150, default="Roshan Damor")
    author_role = models.CharField(max_length=150, default="Software Engineer · Full Stack AI")
    author_avatar = models.TextField(default="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80")
    author_bio = models.TextField(default="Software Engineer specializing in scalable full-stack web applications and AI workflows.")
    toc = models.JSONField(default=list, blank=True, help_text="Table of Contents: [{'id': 'sec-1', 'title': 'Overview'}]")
    sections = models.JSONField(default=list, blank=True, help_text="Sections with code snippets: [{'id': '...', 'heading': '...', 'content': '...', 'codeSnippet': {...}}]")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='DRAFT', db_index=True)
    date = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. November 15, 2024")
    scheduled_date = models.DateField(blank=True, null=True)
    read_time = models.CharField(max_length=50, default="5 min read")
    views_count = models.PositiveIntegerField(default=0)
    visible = models.BooleanField(default=True, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['website', 'status'], name='idx_blog_site_status'),
            models.Index(fields=['website', 'category'], name='idx_blog_site_cat'),
            models.Index(fields=['website', 'visible'], name='idx_blog_site_vis'),
            models.Index(fields=['website', 'created_at'], name='idx_blog_site_created'),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title) or "article"
            candidate = base_slug
            idx = 1
            while BlogPost.objects.filter(slug=candidate).exclude(pk=self.pk).exists():
                candidate = f"{base_slug}-{idx}"
                idx += 1
            self.slug = candidate
        if not self.tldr and self.summary:
            self.tldr = self.summary
        if not self.summary and self.tldr:
            self.summary = self.tldr
        self.is_active = self.visible

        # Normalize tags to list if string
        if isinstance(self.tags, str):
            self.tags = [t.strip() for t in self.tags.split(',') if t.strip()]

        # Auto-generate TOC from ## headings if empty
        if self.content and not self.toc:
            lines = self.content.split('\n')
            toc_items = []
            sec_idx = 1
            for line in lines:
                if line.startswith('## '):
                    heading = line.replace('## ', '').strip()
                    toc_items.append({'id': f'sec-{sec_idx}', 'title': heading})
                    sec_idx += 1
            self.toc = toc_items

        # Auto-generate structured sections if empty
        if self.content and not self.sections:
            lines = self.content.split('\n')
            sections_list = []
            current_sec = None
            sec_idx = 1
            for line in lines:
                if line.startswith('## '):
                    if current_sec:
                        current_sec['content'] = current_sec['content'].strip()
                        sections_list.append(current_sec)
                    heading = line.replace('## ', '').strip()
                    current_sec = {
                        'id': f'sec-{sec_idx}',
                        'heading': heading,
                        'content': '',
                        'codeSnippet': None
                    }
                    sec_idx += 1
                elif current_sec is not None:
                    current_sec['content'] += line + '\n'
            if current_sec:
                current_sec['content'] = current_sec['content'].strip()
                sections_list.append(current_sec)
            self.sections = sections_list
        super().save(*args, **kwargs)

    @property
    def author_dict(self):
        return {
            'name': self.author_name,
            'role': self.author_role,
            'avatar': self.author_avatar,
            'bio': self.author_bio,
        }

    def __str__(self):
        return f"{self.title} ({self.website.name})"
