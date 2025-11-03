---
layout: page
title: Remote Debugging
---
# Remote Debugging

When connected to the [robot's WiFi hotspot]({{ site.baseurl }}/kit/brain_board/web_interface), it is possible to attach VS Code's
debugger to the robot by performing the following steps:

1. Ensure the [Python extension]({{ site.baseurl }}/tutorials/editors/vscode#python-extension) is installed.
2. Open the Run and Debug panel.
3. Click the cog icon at the top of the panel.
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

6. In order to debug, you can now either click the green play button at the top of the Run and Debug panel or press <kbd>F5</kbd>.

For more information on debugging with Visual Studio Code, please visit the [VS Code documentation][vs-code-debug-docs]

[vs-code-debug-docs]: https://code.visualstudio.com/Docs/editor/debugging
