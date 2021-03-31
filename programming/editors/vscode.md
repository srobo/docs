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

In order for VSCode to pick up the `sr.robot` library and offer [completions][code-completion]
you'll need to tell it where to find the library files:

1. Open the workspace containing your code.
2. Open your [workspace settings][workspace-settings] file:
    * On Windows/Linux - **File** > **Preferences** > **Settings**.
    * On macOS - **Code** > **Preferences** > **Settings**.

3. Select **Workspace** (rather then **User**).
4. Search for `python.autoComplete.extraPaths`.
5. Click "Edit in settings.json".
6. Add the path to the directory which contains the `sr` directory, within
   double quotes. The path can be either relative to your project or absolute.

   For example if developing code for the simulator and you have extracted the
   simulator directory next to your code:

   ```
   .
   ├── competition-simulator-<version>
   │   ├── ...
   │   ├─ modules
   │   │   └── sr
   │   │       └── robot
   │   │           └── ...
   │   └─ worlds
   │       └── Arena.wbt
   └── robot.py
   ```

   then the path you should add is `"competition-simulator-<version>/modules/"`.

[code-completion]: https://en.wikipedia.org/wiki/Autocomplete#In_source_code_editors
[workspace-settings]: https://code.visualstudio.com/docs/getstarted/settings#_creating-user-and-workspace-settings

## Interactive Debugging

<div class="info">
This section refers to a feature which is only available within the simulator.
<!--
Pedantic note: yes, you can actually make this work on the kits too (very easily
it turns out), however the steps to set this up on the kits are a bit different
so for now we just document the simulator version.
-->
</div>

Interactive debugging is a great way to inspect what your code is doing whilst
the simulator is actually running. It will allow you to inspect the values of
variables throughout the code and even re-run sections to understand how they
interact.

There are two initial setup steps (installing `debugpy` and configuring VSCode)
and then two steps each time you want to debug your code.

### Install `debugpy`

In order for VSCode to be able to debug your code as it runs in the simulator
you will need to install the [`debugpy`][debugpy] Python package. You will use
this package in your Python code to signal that it is ready for VSCode to attach
to it, so it needs to be installed into the same Python environment that Webots
is configured to use.

``` shell
python -m pip install debugpy
```

You may need to use the full path to your `python`, or on some platforms it may
be called `python3`.

On Windows, if specifying a full path to `python.exe`, you should use the basic
Command Prompt (and not the terminal within VSCode or PowerShell).

### Configure VSCode

Next, we are going to create a [debug configuration][debug-config] so that
VSCode knows what you want it to debug.

<!--
If the user hasn't activated their Python extension in the current editor
session then it won't yet have registered itself. Additionally if the currently
focused file is not a Python file then they will be asked for the environment
they want to debug. Avoid both of these by instructing the user to open their
`robot.py` before attempting to configure debugging.
-->

1. Open the workspace containing your code.
2. Open your `robot.py` file.
3. Select the Run view in the sidebar (or press
   <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd> /
   <kbd>⌘</kbd> + <kbd>⇧</kbd> + <kbd>D</kbd> on macOS)
4. Click "create a launch.json file".
5. In the menu which appears, if you are asked to select an environment select **Python**.
6. When asked for a Debug Configuration, select **Remote Attach**.
7. Leave the subsequent values at their defaults (press <kbd>Enter</kbd> twice).

This will create a new file in your project which contains the configuration.

Depending on the location of your robot code is within your project, you may
need to adjust the configuration further.

If your code is in the root of your workspace:

```
.
└── robot.py
```

then no further changes are needed.

If your code is within a folder, perhaps because your workspace includes the
simulator folder and your code is in `zone-0` or `zone-1`:

```
.
├── competition-simulator-<version>
│   ├── ...
│   └─ worlds
│       └── Arena.wbt
└── zone-1
    └── robot.py
```

then you will need to modify the `pathMappings` key within the configuration.
The change you'll need to make is to alter the `localRoot` key such that it
accounts for the sub-directory containing the robot code.

In the above example, the change would be to update the line:

``` json
    "localRoot": "${workspaceFolder}",
```

to instead be:

``` json
    "localRoot": "${workspaceFolder}/zone-1",
```

[debugpy]: https://pypi.org/project/debugpy/
[debug-config]: https://code.visualstudio.com/docs/python/debugging

### Configure your code

To debug a given part of your code, you will need to insert into your code a
statement which will launch the debugger.

At the place in your code that you would like the debugger to start, insert the
following snippet:

``` python
import debugpy
debugpy.listen(5678)
debugpy.wait_for_client()
breakpoint()
```

This code (specifically the `wait_for_client` call) will block until the
debugger is attached.

### Run and debug

You can now launch your code in the simulator exactly as you would normally.
When your code stops running (the simulation will also stop processing) change
to VSCode and select **Run** > **Start Debugging** or press <kbd>F5</kbd>.

VSCode will attach to your code, paused at the `breakpoint()`  line.

A full tutorial of [debugging in VSCode][vscode-debugging] is beyond the scope
of this article, though the most common commands (all available from the **Run**
menu) are:

* Step Over (<kbd>F10</kbd>)
* Step Into (<kbd>F11</kbd>)
* Step Out (<kbd>Shift</kbd> + <kbd>F11</kbd>)
* Continue (<kbd>F5</kbd>)

You can also inspect the values of variables in your code by hovering over them.

[vscode-debugging]: https://code.visualstudio.com/docs/editor/debugging
