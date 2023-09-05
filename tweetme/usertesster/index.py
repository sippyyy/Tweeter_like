from algoliasearch_django import AlgoliaIndex
from algoliasearch_django.decorators import register

from .models import User

@register(User)
class YourModelIndex(AlgoliaIndex):
    fields = ('username', 'name','email')
    settings = {'searchableAttributes': ['username','email','name']}
    index_name = 'user_index'

