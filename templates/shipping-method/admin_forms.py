# -*- coding: utf-8 -*-
from shuup.admin.forms import ShuupAdminForm, ShuupAdminFormNoTranslation

from {{ moduleName }}.models import MyCarrier, MyCarrierBehaviorComponent


class MyCarrierForm(ShuupAdminForm):
    class Meta:
        model = MyCarrier
        exclude = ["identifier"]


class MyCarrierBehaviorComponentForm(ShuupAdminFormNoTranslation):
    class Meta:
        model = MyCarrierBehaviorComponent
        exclude = ["identifier"]
