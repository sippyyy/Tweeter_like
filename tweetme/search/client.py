from algoliasearch_django import raw_search
from usertesster.models import User

def perform_search(query,*args,**kwargs):
    response = raw_search(User,query)
    return response