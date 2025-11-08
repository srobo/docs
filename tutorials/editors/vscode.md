---
redirect_from:
  - /programming/editors/vscode
layout: page
title: VSCode
---

# Visual Studio Code

[Visual Studio Code][vscode] (known commonly as VSCode) is a free code editor
developed by Microsoft. As such it has [extensive documentation][vscode-docs]
about its general use, which we will not repeat here. Instead this page will
focus on the ways to get the most out of VSCode when developing code for Student
Robotics.

<!-- We link to the homepage as that has a big install button --->
[vscode]: https://code.visualstudio.com
<!-- but we also want to link directly to their docs so people have a starting point --->
[vscode-docs]: https://code.visualstudio.com/docs

## Python Extension

While VSCode has some built-in support for developing Python, we recommend that
you additionally install the official [Python extension][ms-python.python]. This
brings more comprehensive support and enables everything else we will document
here.

[ms-python.python]: https://marketplace.visualstudio.com/items?itemName=ms-python.python

## Code Completions

In order for VSCode to pick up the `sr.robot3` library and offer [completions][code-completion]
you'll need to make the library available within the Python environment that you're using.

1. Open the workspace containing your code.
2. Open a terminal via **Terminal** &rarr; **New Terminal**.
3. Run `pip install sr.robot3`.

[code-completion]: https://en.wikipedia.org/wiki/Autocomplete#In_source_code_editors
