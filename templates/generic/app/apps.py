# -*- coding: utf-8 -*-
import shuup.apps


class AppConfig(shuup.apps.AppConfig):
    name = "{{ moduleName }}"
    label = "{{ moduleName }}"
    provides = {
        # enter provides here
    }
