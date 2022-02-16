from django.db import models
from django_better_admin_arrayfield.models.fields import ArrayField


class RefereeRank(models.TextChoices):
    ASSISTANT = 'ASSISTANT', 'Assistant'
    REGIONAL = 'REGIONAL', 'Regional'
    NATIONAL = 'NATIONAL', 'National'
    INTERNATIONAL = 'INTERNATIONAL', 'International'


class RefereeLanguage(models.TextChoices):
    RUSSIAN = 'RU', 'Russian'
    ENGLISH = 'EN', 'English'
    FRENCH = 'FR', 'French'
    GERMAN = 'GE', 'German'


class Referee(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, null=True, blank=True)
    languages = ArrayField(models.CharField(max_length=2, choices=RefereeLanguage.choices))
    rank = models.CharField(max_length=63, choices=RefereeRank.choices, default=RefereeRank.ASSISTANT)

    def __str__(self):
        return f'Referee<first_name="{self.first_name}", last_name="{self.last_name}", rank="{self.rank}">'


class RefereedEventType(models.TextChoices):
    MASTERS = 'MASTERS', 'Masters'
    PRO_TOUR = 'PRO_TOUR', 'Pro Tour'
    RUSSIAN_CUP_STAGE = 'RUSSIAN_CUP_STAGE', 'Russian Cup Stage'
    RUSSIAN_CUP_FINAL = 'RUSSIAN_CUP_FINAL', 'Russian Cup Final'
    TEAMS = 'TEAMS', 'Teams'


class RefereedEvent(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=63, choices=RefereedEventType.choices)

    def __str__(self):
        return f'RefereedEvent<type="{self.type}", name="{self.name}">'


class RefereedGame(models.Model):
    referee = models.ForeignKey(Referee, on_delete=models.PROTECT, related_name='referees')
    assistant = models.ForeignKey(
        Referee, null=True, blank=True, on_delete=models.PROTECT, related_name='assistants'
    )
    event = models.ForeignKey(RefereedEvent, on_delete=models.PROTECT)
    first_player = models.CharField(max_length=255)
    second_player = models.CharField(max_length=255)
    date = models.DateField()

    def __str__(self):
        return f'RefereedGame<first_player="{self.first_player}", second_player="{self.second_player}">'
