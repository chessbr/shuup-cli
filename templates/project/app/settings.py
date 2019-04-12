# -*- coding: utf-8 -*-
from shuup_workbench.settings.utils import get_disabled_migrations
from shuup_workbench.settings import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'myapp.sqlite3'
    }
}
