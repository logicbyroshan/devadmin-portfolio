from django.db import models
from apps.websites.models import Website

class PortfolioProfile(models.Model):
    website = models.OneToOneField(Website, on_delete=models.CASCADE, related_name='profile', db_index=True)
    name = models.CharField(max_length=150, default="Roshan Kumar")
    title = models.CharField(max_length=200, default="Senior Full Stack Developer & UI Architect")
    bio = models.TextField(default="Passionate software engineer building high-performance React web applications, scalable Node.js microservices, and elegant OLED dark glassmorphic user interfaces with seamless UX.")
    location = models.CharField(max_length=150, default="New Delhi, India")
    email = models.EmailField(default="roshan.dev@example.com")
    phone = models.CharField(max_length=50, default="+91 98765 43210")
    experience_years = models.CharField(max_length=50, default="5+ Years")
    github = models.URLField(max_length=300, default="https://github.com/roshan-dev", blank=True)
    linkedin = models.URLField(max_length=300, default="https://linkedin.com/in/roshan-dev", blank=True)
    twitter = models.CharField(max_length=100, default="@roshan_dev", blank=True)
    website_url = models.URLField(max_length=300, default="https://roshankumar.dev", blank=True)
    resume_url = models.URLField(max_length=500, default="https://roshankumar.dev/resume.pdf", blank=True)
    avatar = models.TextField(default="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80")
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - Profile ({self.website.name})"
