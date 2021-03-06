# -*- coding: utf-8 -*-
# Based on https://docs.celeryproject.org/en/latest/django/first-steps-with-django.html
from __future__ import absolute_import, unicode_literals

# This will make sure the app is always imported when
# Django starts so that shared_task will use this app.
from .celery import app as celeryApp
__all__ = [
    'celeryApp'
]
