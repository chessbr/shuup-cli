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

const Receipts = {
    "generic": [
        ...CommonReceipts
    ],
    "xtheme-theme": [
        ...CommonReceipts,
        {
            file: "{{ moduleName }}/apps.py",
            template: "xtheme-theme/app/apps.py"
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
};

module.exports = {
    CommonReceipts,
    Receipts
};
