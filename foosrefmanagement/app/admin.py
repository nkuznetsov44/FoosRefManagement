from django.contrib import admin
from .models import Referee, RefereedEvent, RefereedGame


admin.site.register(Referee)
admin.site.register(RefereedEvent)
admin.site.register(RefereedGame)
