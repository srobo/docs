---
layout: page
title: WiFi
---

WiFi
====

The WiFi dongles provided with your kit allow you to interface with and debug your robot.
You can connect to your robot using any WiFi capable device (laptop, tablet, phone, etc.)

Connecting to Your Robot
------------------------

First, ensure that the WiFi dongles supplied with your kit are plugged into your robot.
Once you have the WiFi dongles connected, plug in a USB memory stick and turn your robot on.

During the boot process you should notice a green LED begin to flash on one of the WiFi dongles.
Your robot has now set up its very own WiFi network! It'll be called `robot-XXX`, where `XXX` is
your team's TLA.

You can now connect to your robot in the same way you normally connect to a WiFi network.
You will need a WiFi key to be able to connect and you can find this inside any robot.zip
that you have exported from the IDE. Just unzip the robot.zip and have a look inside `wifi.yaml`.

Note that, because the information for your robot's WiFi network is stored inside the robot.zip,
the WiFi network will disappear when you unplug the USB memory stick. It will reappear a few moments
after you plug the USB memory stick into your robot.

If you are having any problems connecting to your robot, just head on over to the [forum](/forum)
and ask for help.

Interacting With Your Robot
---------------------------

Once you have a WiFi connection, visit `http://robot.sr` in a web browser to see the robot interface.

The robot interface gives you the ability to remotely start the code on your robot,
as well as view the logs.

<div class="info" markdown="1">
The stop button that appears after starting your code is currently not functional.
</div>

### Setting up the Robot's Environment

![The robot interface's set up screen]({{ site.baseurl }}/images/content/kit/remote-interfaceg/set-up-screen.png)

When you first navigate to the robot interface you are presented with the Set up page.
This page allows you to select the starting zone of your robot, as well as
whether it is running in development mode or competition mode. Changing the
starting zone allows you to test how your robot handles being started in a
different zone.

Changing to competition mode causes the development markers to be unreadable,
and instead reads the competition markers, which are different. Therefore, you
should keep your robot in development mode.

You cannot use this screen when code is running.

### Logs Screen

![The robot interface's logs screen]({{ site.baseurl }}/images/content/kit/remote-interfaceg/logs-screen.png)

This screen allows you to see all messages from your code sent by `print`
statements (and anything else that outputs to standard output or standard
error). It will also show messages from the initialisation of the robot's
hardware, as well as any errors that occurred when running your code.

You can press the "Jump to bottom" button to scroll right to the bottom of the
logs, to see the most recent entries in a long file.

You can also see your robot's logs on the USB stick, in a file called
`log.txt`.
