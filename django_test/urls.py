from django.contrib import admin
from django.urls import path, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/', include('api.urls')),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
