# Copyright 2014 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Django URL routes"""

from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from tastypie.api import Api
from django.conf.urls.static import static

from timesketch.apps.api import v1_resources


v1_api = Api(api_name='v1')
v1_api.register(v1_resources.SearchResource())
v1_api.register(v1_resources.EventResource())
v1_api.register(v1_resources.CommentResource())
v1_api.register(v1_resources.LabelResource())
v1_api.register(v1_resources.ViewResource())
v1_api.register(v1_resources.SketchTimelineResource())
v1_api.register(v1_resources.SketchAclResource())
v1_api.register(v1_resources.SketchResource())
v1_api.register(v1_resources.UserResource())
v1_api.register(v1_resources.UserProfileResource())

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns(
    '',
    url(r'^admin/', include(admin.site.urls)),

    # Views
    url(r'^$', 'timesketch.apps.ui.views.home'),
    url(r'^search/$', 'timesketch.apps.ui.views.search_sketches'),
    url(r'^sketch/new/$', 'timesketch.apps.ui.views.new_sketch'),
    url(r'^sketch/(\w+)/$', 'timesketch.apps.ui.views.sketch'),
    url(r'^sketch/(\w+)/views/$',
        'timesketch.apps.ui.views.views'),
    url(r'^sketch/(\w+)/timelines/$', 'timesketch.apps.ui.views.timelines'),
    url(r'^sketch/(\w+)/settings/$', 'timesketch.apps.ui.views.settings'),
    url(r'^sketch/(\w+)/settings/sharing/$', 'timesketch.apps.ui.views.settings_sharing'),
    url(r'^sketch/(\w+)/timelines/add/$',
        'timesketch.apps.ui.views.add_timeline'),
    url(r'^sketch/(\w+)/timelines/(\w+)/edit/$',
        'timesketch.apps.ui.views.edit_timeline'),
    url(r'^sketch/(\w+)/explore/$', 'timesketch.apps.ui.views.explore'),
    url(r'^sketch/(\w+)/explore/event/([a-zA-Z0-9_-]{22})/$',
        'timesketch.apps.ui.views.event'),
    url(r'^user/profile/$', 'timesketch.apps.ui.views.user_profile'),

    # API
    (r'^api/', include(v1_api.urls)),

    # Login/Logout
    url('^accounts/', include('django.contrib.auth.urls')),

)

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
