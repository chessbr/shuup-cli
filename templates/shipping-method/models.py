# -*- coding: utf-8 -*-
from decimal import Decimal

from django.core.exceptions import ValidationError
from django.db import models
from django.utils.timezone import now
from django.utils.translation import ugettext_lazy as _
from shuup.core.models import (
    Carrier, ServiceBehaviorComponent, ServiceChoice, ServiceCost
)
from shuup.utils.dates import DurationRange


class MyCarrierBehaviorComponent(ServiceBehaviorComponent):
    """
    This behavior component shows how to return costos and delivery time
    for the given attached service.
    """
    name = _("My Carrier Behavior Component")
    help_text = _("A sample of custom behavior component")

    # IMPORTANT:
    # Change or add here all the options and settings to configure this behavior component
    # So it can behave the way it is condigured
    my_setting = models.IntegerField(default=0, verbose_name=_("My sample setting"))

    def get_unavailability_reasons(self, service, source):
        """
        :type service: Service
        :type source: shuup.core.order_creator.OrderSource
        :rtype: Iterable[ValidationError]
        """

        # we just check when this behavior component is attached to our MyCarrier
        if isinstance(service.carrier, MyCarrier):

            # This won't be available on Sunday
            if now().weekday() == 6:
                yield ValidationError(_("This is not available on Sunday"))
            elif self.my_setting == 999:
                yield ValidationError(_("Setting is 999, we can't continue."))

        return ()

    def get_costs(self, service, source):
        """
        Return costs for for this object. This should be implemented
        in subclass. This method is used to calculate price for
        ``ShippingMethod`` and ``PaymentMethod`` objects.

        :type service: Service
        :type source: shuup.core.order_creator.OrderSource
        :rtype: Iterable[ServiceCost]
        """

        # we just calculate when this behavior component is attached to our MyCarrier
        if isinstance(service.carrier, MyCarrier):

            # You'll likely get these from some API
            if service.choice_identifier == "slow":
                yield ServiceCost(source.create_price(Decimal("10")))
            elif service.choice_identifier == "fast":
                yield ServiceCost(source.create_price(Decimal("30")))

    def get_delivery_time(self, service, source):
        """
        :type service: Service
        :type source: shuup.core.order_creator.OrderSource
        :rtype: shuup.utils.dates.DurationRange|None
        """
        # we just check when this behavior component is attached to our MyCarrier
        if isinstance(service.carrier, MyCarrier):

            # You'll likely get these from some API
            if service.choice_identifier == "slow":
                return DurationRange.from_days(8, 12)
            elif service.choice_identifier == "fast":
                return DurationRange.from_days(1, 3)


class MyCarrier(Carrier):
    """
    A custom and simple Carrier service for Shuup
    """

    # IMPORTANT!
    # Change and add here all the custom configuration fields for this Carrier module
    # You will likely ask for API keys and other settings from the merchant
    # to use when calculating the delivery time and costs
    # If your custom service do any integration with 3rd party APIs
    # then you will just ask for your service settings or even anything at all.
    the_api_key = models.CharField(max_length=100)
    my_other_config = models.BooleanField(default=False)

    class Meta:
        verbose_name = _("my carrier")
        verbose_name_plural = _("my carriers")

    def create_service(self, choice_identifier, **kwargs):
        """
        Create a service for given choice identifier.

        Subclass implementation may attach some `behavior components
        <ServiceBehaviorComponent>` to the created service.

        Subclasses should provide implementation for `_create_service`
        or override this.  Base class implementation calls the
        `_create_service` method with resolved `choice_identifier`.

        :type choice_identifier: str|None
        :param choice_identifier:
          Identifier of the service choice to use.  If None, use the
          default service choice.
        :rtype: shuup.core.models.Service
        """
        service = super(MyCarrier, self).create_service(choice_identifier, **kwargs)

        # IMPORTANT!
        # You can choose to add ot not a behavior component here for the selected `choice_identifier`.
        # You can also add more than one or even add different behavior components based on the `choice_identifier
        service.behavior_components.add(MyCarrierBehaviorComponent.objects.create())

        return service

    def get_effective_name(self, service, source):
        """
        Get effective name of the service for given order source.

        Base class implementation will just return name of the given
        service, but that may be changed in a subclass.

        :type service: shuup.core.models.Service
        :type source: shuup.core.order_creator.OrderSource
        :rtype: str
        """
        return service.name

    def get_service_choices(self):
        """
        Get all service choices of this provider.

        :rtype: list[ServiceChoice]
        """
        return [
            ServiceChoice('fast', _('Fast')),
            ServiceChoice('slow', _('Slow'))
        ]
