from django.urls import path
from .views import DashboardStatsView, DashboardActivitiesView, DashboardHeatmapView

urlpatterns = [
    path('stats/', DashboardStatsView.as_view(), name='dashboard_stats'),
    path('activities/', DashboardActivitiesView.as_view(), name='dashboard_activities'),
    path('heatmap/', DashboardHeatmapView.as_view(), name='dashboard_heatmap'),
]
