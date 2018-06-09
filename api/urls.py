from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreateView, DetailsView, UserView, UserDetailsView, UserRegistrationAPIView, UserProfileAPIView
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = {
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^expenses/$', CreateView.as_view(), name="create"),
    url(r'^expenses/(?P<pk>[0-9]+)/$', DetailsView.as_view(), name="details"),
    url(r'^users/$', UserView.as_view(), name="users"),
    url(r'^users/(?P<pk>[0-9]+)/$', UserDetailsView.as_view(), name="user_details"),
    url(r'^users/login/', obtain_jwt_token),
    url(r'^users/register/$', UserRegistrationAPIView.as_view(), name='register'),
    url(r'^users/user-profile/$', UserProfileAPIView.as_view(), name='user_profile'),
}

urlpatterns = format_suffix_patterns(urlpatterns)