# -*- coding: utf-8 -*-
import setuptools

try:
    import shuup_setup_utils
except ImportError:
    shuup_setup_utils = None


if __name__ == '__main__':
    setuptools.setup(
        cmdclass=(shuup_setup_utils.COMMANDS if shuup_setup_utils else {}),
        setup_requires=['setuptools>=34.0', 'setuptools-gitver'],
        gitver=True
    )
