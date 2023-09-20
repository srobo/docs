---
redirect_from:
  - /programming/editors/pycharm
layout: page
title: PyCharm
---

# PyCharm Setup

<div class="info">
These instructions should also apply to IntelliJ IDEA with the Python plugin installed although the location of Python SDK settings will be different.
</div>

In order to take full advantage of PyCharm's smart assistance features, such as code completion, PyCharm needs to have access to the libraries used in your code.
The following instructions will guide you through setting up your local environment to have access our `sr.robot3` API.

1. Open your robot code project in PyCharm.
2. Head to **File** &rarr; **Settings** or **PyCharm** &rarr; **Preferences** on a Mac.
![Location of Settings menu option in PyCharm for Windows and Linux]({{ site.baseurl }}/images/content/programming/pycharm_app_menu.png)
3. Select `Project` &rarr; `Python Interpreter` from the list on the left.
4. Click the `+` symbol at the top of the packages list to install a new library.
![PyCharm Interpreter Settings dialog]({{ site.baseurl }}/images/content/programming/pycharm_interpreter_settings.png)
5. Search for `sr.robot3` then click `Install Package`
![Installing sr.robot3 package from within PyCharm]({{ site.baseurl }}/images/content/programming/pycharm_packages.png)
If this results in an error, try selecting the `Install to user's site packages directory` checkbox at the bottom of the dialog and try again.
6. All done. You can now close the Settings window.

You should now be able to use code completion and have quick access documentation by pressing <kbd>Ctrl</kbd><kbd>Q</kbd> (or <kbd>⌃</kbd><kbd>J</kbd> on a Mac)
