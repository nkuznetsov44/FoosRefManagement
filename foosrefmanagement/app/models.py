from django.db import models
from django_better_admin_arrayfield.models.fields import ArrayField
from django.db.models import Q


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


class RefereeCity(models.TextChoices):
    MOSCOW = 'MOSCOW', 'Москва'
    SAINT_PETERSBURG = 'SAINT_PETERSBURG', 'Санкт-Петербург'
    KALININGRAD = 'KALININGRAD', 'Калининград'
    TOMSK = 'TOMSK', 'Томск'
    KAZAN = 'KAZAN', 'Казань'
    YAROSLAVL = 'YAROSLAVL', 'Ярославль'
    OTHER = 'OTHER', 'Другой'


def referee_profile_photo_path(instance, filename):
    ext = filename.split('.')[-1]
    return f'profile_photos/{instance.id}.{ext}'


class Referee(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    first_name_en = models.CharField(max_length=255)
    last_name_en = models.CharField(max_length=255)
    email = models.CharField(max_length=255, null=True, blank=True)
    languages = ArrayField(models.CharField(max_length=2, choices=RefereeLanguage.choices))
    city = models.CharField(max_length=63, choices=RefereeCity.choices, default=RefereeCity.OTHER)
    rank = models.CharField(max_length=63, choices=RefereeRank.choices, default=RefereeRank.ASSISTANT)
    rank_update = models.DateField()
    photo = models.ImageField(upload_to=referee_profile_photo_path, null=True, blank=True)

    def get_games(self):
        return RefereedGame.objects.filter(Q(referee__id=self.id) | Q(assistant__id=self.id))

    def __str__(self):
        return f'Referee<first_name="{self.first_name}", last_name="{self.last_name}", rank="{self.rank}">'


class RefereedEventType(models.TextChoices):
    MASTERS = 'MASTERS', 'Masters'
    PRO_TOUR = 'PRO_TOUR', 'Pro Tour'
    RUSSIAN_CUP_STAGE = 'RUSSIAN_CUP_STAGE', 'Этап чемпионата России'
    RUSSIAN_CUP_FINAL = 'RUSSIAN_CUP_FINAL', 'Финал чемпионата России'
    LOCAL_TOURNAMENT = 'LOCAL_TOURNAMENT', 'Локальный турнир'
    TEAMS = 'TEAMS', 'Лига'


class RefereedEvent(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=63, choices=RefereedEventType.choices)

    def __str__(self):
        return f'RefereedEvent<type="{self.type}", name="{self.name}">'


class GameCategory(models.TextChoices):
    OS = 'OS', 'OS'
    OD = 'OD', 'OD'
    WS = 'WS', 'WS'
    WD = 'WD', 'WD'
    MD = 'MD', 'MD'
    AS = 'AS', 'AS'
    AD = 'AD', 'AD'
    PRO_AM = 'PRO_AM', 'Pro-Am'
    COD = 'COD', 'COD'
    TEAM = 'TEAM', 'Team'
    OTHER = 'OTHER', 'Other'


class GameStage(models.TextChoices):
    FINAL = 'FINAL', 'Final'
    SEMI_FINAL = 'SEMI_FINAL', '1/2'
    QUARTER_FINAL = 'QUARTER_FINAL', '1/4'
    WB_FINAL = 'WB_FINAL', 'WB Final'
    WB_SEMIFINAL = 'WB_SEMIFINAL', 'WB Semi-Final'
    LB_FINAL = 'LB_FINAL', 'LB Final'
    LB_4 = 'LB_4', 'LB [4]'
    LB_5_6 = 'LB_5_6', 'LB [5-6]'
    OTHER = 'OTHER', 'Other'


class RefereedGame(models.Model):
    referee = models.ForeignKey(Referee, on_delete=models.PROTECT, related_name='referees')
    assistant = models.ForeignKey(
        Referee, null=True, blank=True, on_delete=models.PROTECT, related_name='assistants'
    )
    event = models.ForeignKey(RefereedEvent, on_delete=models.PROTECT)
    first_player = models.CharField(max_length=255)
    second_player = models.CharField(max_length=255)
    date = models.DateField()
    category = models.CharField(max_length=31, choices=GameCategory.choices, default=GameCategory.OTHER)
    stage = models.CharField(max_length=31, choices=GameStage.choices, default=GameStage.OTHER)

    def __str__(self):
        return f'RefereedGame<date="{self.date}", first_player="{self.first_player}", second_player="{self.second_player}">'
