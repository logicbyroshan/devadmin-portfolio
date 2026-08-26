"""
System & Database Health Check Endpoint
"""

import time
from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status


class HealthCheckView(APIView):
    """
    Health check endpoint for production uptime monitoring and readiness probes.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        start_time = time.time()
        db_status = "healthy"
        db_error = None

        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                cursor.fetchone()
        except Exception as ex:
            db_status = "unhealthy"
            db_error = str(ex)

        latency_ms = round((time.time() - start_time) * 1000, 2)
        is_healthy = db_status == "healthy"

        data = {
            "status": "healthy" if is_healthy else "degraded",
            "service": "DevAdmin REST API",
            "database": {
                "status": db_status,
                "latency_ms": latency_ms,
                "engine": connection.settings_dict.get('ENGINE', 'unknown').split('.')[-1]
            }
        }

        if db_error:
            data["database"]["error"] = db_error

        http_status = status.HTTP_200_OK if is_healthy else status.HTTP_503_SERVICE_UNAVAILABLE
        return Response(data, status=http_status)
