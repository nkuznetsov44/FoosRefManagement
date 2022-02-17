from django.contrib import admin
from django_better_admin_arrayfield.admin.mixins import DynamicArrayMixin
from .models import Referee, RefereedEvent, RefereedGame


admin.site.register(RefereedEvent)
admin.site.register(RefereedGame)


@admin.register(Referee)
class RefereeAdmin(admin.ModelAdmin, DynamicArrayMixin):
    pass
