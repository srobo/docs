---
layout: page
title: Web Interface
---


# Web Interface

The Raspberry Pi that makes up your kit's brain board has WiFi which allows you to connect to and debug your robot, using any WiFi capable device (laptop, tablet, phone, etc.).
The WiFi is only available during development and will be disabled during competition matches.

## Connecting to Your Robot

During the boot process you should notice the green LED on the KCH (the board on top of the Pi) labelled "WiFi" turn on.
Your robot has now set up its very own WiFi network!
It will initially have a name starting with `robot-ZZZ` followed by some random numbers.

You can now connect to your robot in the same way you normally connect to a WiFi network.
You will need a WiFi key to be able to connect and you can find this inside `robot-settings.toml` on the USB drive containing your code.

<div class="info" markdown="1">
If there is no `robot-settings.toml` on your USB drive, you can generate one by first running any code on your robot.
For more information see our docs on [Robot Settings]({{ site.baseurl }}/kit/brain_board#robot-settings).
</div>

If you are having any problems connecting to your robot, just head on over to the Discord and ask for help.


## Using the robot interface

Once you have a WiFi connection, visit `http://robot.lan` in a web browser to see the robot interface.

The robot interface gives you the ability to remotely start the code on your robot, as well as view the logs.

![The robot interface on desktop]({{ site.baseurl }}/images/content/kit/wifi_interface.png)


### Viewing logs

The robot interface allows you to see all messages from your code sent by `print(...)` statements (and anything else that outputs to standard output or standard error).
It will also show messages from the initialisation of the robot's hardware, as well as any errors that occurred when running your code.

You can also see your robot's logs on the USB stick, in a file called
`log.txt`.


### Setting the robot zone

The toolbar present at the top of the page, or bottom of the page on mobile, allows you to change the robot's starting zone and mode.
Changing the starting zone allows you to test how your robot handles being started in a different zone.
Changing mode only applies from the next time your code runs.

See the [competition mode]({{ site.baseurl }}/programming/robot_api/comp_mode) page for details of what competition mode is.
