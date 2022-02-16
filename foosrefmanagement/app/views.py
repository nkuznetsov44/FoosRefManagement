from django.http import HttpResponse
from .models import Referee
import json


def index(request):
    return HttpResponse('foosrefmanagement/app index')


def referees(request):
    referees = Referee.objects.all()

    def serialize_referee(referee):
        return {
            'first_name': referee.first_name,
            'last_name': referee.last_name,
            'email': referee.email,
            'languages': referee.languages,
            'rank': referee.rank
        }
    
    referees_json = json.dumps(list(map(serialize_referee, referees)))
    return HttpResponse(referees_json)
