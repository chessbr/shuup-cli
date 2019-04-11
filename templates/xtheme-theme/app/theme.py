# -*- coding: utf-8 -*-
from django.utils.translation import ugettext_lazy as _

from shuup.front.themes import BaseThemeFieldsMixin
from shuup.xtheme import Theme


class Theme(BaseThemeFieldsMixin, Theme):
    identifier = "{{ moduleName }}"
    name = _("{{ projectName }} Theme")
    author = "My Team"
    template_dir = "{{ moduleName }}/"
