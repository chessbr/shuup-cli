# -*- coding: utf-8 -*-
import shuup.apps


class AppConfig(shuup.apps.AppConfig):
    name = "{{ moduleName }}"
    label = "{{ moduleName }}"
    provides = {
        "service_provider_admin_form": [
            "{{ moduleName }}.admin_module.forms:MyCarrierForm"
        ],
        "service_behavior_component_form": [
            "{{ moduleName }}.admin_module.forms:MyCarrierBehaviorComponentForm"
        ]
    }
