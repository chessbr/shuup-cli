const CommonReceipts = [
    {
        file: "setup.cfg",
        template: "generic/setup.cfg"
    },
    {
        file: "setup.py",
        template: "generic/setup.py"
    },
    {
        file: "README.md",
        template: "generic/README.md"
    },
    {
        file: "MANIFEST.in",
        template: "generic/MANIFEST.in"
    },
    {
        file: "{{ moduleName }}/apps.py",
        template: "generic/app/apps.py"
    },
    {
        file: "{{ moduleName }}/__init__.py",
        template: "generic/app/__init__.py"
    },
    {
        file: "{{ moduleName }}_tests/__init__.py",
        template: "blank.py"
    },
    {
        file: "{{ moduleName }}_tests/settings.py",
        template: "generic/tests/settings.py"
    },
    {
        file: "{{ moduleName }}_tests/test_app.py",
        template: "generic/tests/test_app.py"
    },
];

module.exports = {
    "generic": {
        name: "Generic Addon",
        content: CommonReceipts
    },
    "shippingMethod": {
        name: "Shipping Method",
        content: [
            ...CommonReceipts,
            {
                file: "{{ moduleName }}/apps.py",
                template: "shipping-method/apps.py"
            },
            {
                file: "{{ moduleName }}/models.py",
                template: "shipping-method/models.py"
            },
            {
                file: "{{ moduleName }}/admin_module/__init__.py",
                template: "blank.py"
            },
            {
                file: "{{ moduleName }}/admin_module/forms.py",
                template: "shipping-method/admin_forms.py"
            }
        ]
    },
    "project": {
        name: "Blank Shuup Project",
        content: [
            {
                file: "manage.py",
                template: "project/manage.py"
            },
            {
                file: "requirements.txt",
                template: "project/requirements.txt"
            },
            {
                file: "README.md",
                template: "project/README.md"
            },
            {
                file: "project/__init__.py",
                template: "blank.py"
            },
            {
                file: "project/settings.py",
                template: "project/project/settings.py"
            },
            {
                file: "project/urls.py",
                template: "project/aprojectpp/urls.py"
            },
            {
                file: "project/wsgi.py",
                template: "project/project/wsgi.py"
            }
        ]
    },
    "xtheme-theme": {
        name: "Xtheme Theme",
        content: [
            ...CommonReceipts,
            {
                file: "{{ moduleName }}/apps.py",
                template: "xtheme-theme/app/apps.py"
            },
            {
                file: "{{ moduleName }}/theme.py",
                template: "xtheme-theme/app/theme.py"
            },
            {
                file: "{{ moduleName }}/templates/shuup/front/base.jinja",
                template: "xtheme-theme/templates/base.jinja"
            },
            {
                file: "{{ moduleName }}/templates/shuup/front/index.jinja",
                template: "xtheme-theme/templates/index.jinja"
            }
        ]
    },
    "celery-project": {
        name: "Install Celery on Shuup Project",
        content: [
            {
                file: "project/celery.py",
                template: "celery/celery.py"
            },
            {
                file: "project/__init__.py",
                template: "celery/__init__.py"
            },
            {
                file: "requirements.txt",
                template: "celery/requirements.txt"
            },
        ]
    },
};
