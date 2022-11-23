---
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

## Remote Debugging

<div class="info">
This documentation refers to a feature which is only available from software version `2023.1.0` and later.
</div>

When connected to the [robot's WiFi hotspot](/docs/kit/wifi), it is possible to attach VS Code's
debugger to the robot by performing the following steps:

1. Ensure the [Python extension](#python-extension) is installed
2. Open the Run and Debug panel
3. Click the cog icon at the top of the panel
4. Paste the following configuration:
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Attach to Robot",
            "type": "python",
            "request": "attach",
            "connect": {
                "host": "robot.lan",
                "port": 5678
            },
            "pathMappings": [
                {
                    "localRoot": "${workspaceFolder}",
                    "remoteRoot": "."
                }
            ],
            "justMyCode": true
        }
    ]
}
```
5. Add the following snippet to the top of your code:
```python
import debugpy
debugpy.listen(("0.0.0.0", 5678))
```

If you would like for your code to not run until the debugger is attached, you can also add the following:
```python
print("Waiting for debugger...")
debugpy.wait_for_client()
```

6. In order to debug, you can now either click the green play button at the top of the Run and Debug panel or press <kbd>F5</kbd>

For more information on debugging with Visual Studio Code, please visit the [VS Code documentation][vs-code-debug-docs]

[vs-code-debug-docs]: https://code.visualstudio.com/Docs/editor/debugging
