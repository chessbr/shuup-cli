# -*- coding: utf-8 -*-
from shuup_workbench.settings.utils import get_disabled_migrations
from shuup_workbench.test_settings import *  # noqa

INSTALLED_APPS = list(locals().get('INSTALLED_APPS', [])) + [
    '{{ moduleName }}',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'test_db.sqlite3'
    }
}

MIGRATION_MODULES = get_disabled_migrations()
MIGRATION_MODULES.update({
    app: None
    for app in INSTALLED_APPS
})
