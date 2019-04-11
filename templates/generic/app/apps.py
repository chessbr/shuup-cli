# -*- coding: utf-8 -*-
import shuup.apps


class AppConfig(shuup.apps.AppConfig):
    name = "{{ moduleName }}"
    verbose_name = "{{ moduleName }} App for Shuup"
    label = "{{ moduleName }}"
    provides = {
        # enter provides here
    }
