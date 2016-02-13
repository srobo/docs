---
layout: page
title: Tablet
---

Tablet
======

The tablet provided with your kit allows you to interface with and debug your
robot.

![An image of the tablet]({{ site.baseurl }}/images/content/kit/tablet-cropped.png "The Tablet")

Connecting to the robot
-----------------------

Once the robot is turned on the tablet should automatically connect to
your robot's WiFi if it is available. Here are the steps to follow to
make this happen:

 * Ensure WiFi on the tablet is turned on (but not connected)

![WiFi status]({{ site.baseurl }}/images/content/kit/tablet/wifi_status.png "WiFi status")

 * Connect one of the USB WiFi dongles to the kit
 * Connect a USB stick containing your `robot.zip` to the kit
 * Turn on the kit

The robot's WiFi will appear at some point while the robot is booting,
and before the start LED begins to flash.

If there is a problem you can manually connect to the robot by
finding your WiFi key from the `wifi.yaml` file inside the `robot.zip` from the
IDE which should be on your memory stick.
Note that because the information for the WiFi is stored in the `robot.zip`,
the WiFi will turn off when you un-plug the USB stick.

If you are still experiencing problems, you should ask a question on the [forum](/forum).

<div class="warning">
If the tablet is already connected to a WiFi access point before turning on the
robot, it will not automatically switch to the robot access point. You will
need to do that yourselves by either disconnecting from the original access
point or by selecting the robot one in the WiFi settings screen on the tablet.
</div>

Starting the app
-------------

Once you have a WiFi connection, you can open the "Student Robotics" app which
will open the browser and display the tablet interface for your robot. If you
are experiencing problems with the app, you can try connecting to the robot
manually by opening the "Chrome Shell" app from the apps list and navigating to
`http://robot.sr/`.

<div class="info" markdown="1">
You can also access the same interface using any other WiFi device connected
to the robot's access point. Simply connect to your robot's WiFi and then
visit `http://robot.sr/` in a web browser.
</div>

Using the app
-------------

The tablet app allows you to run the code on your robot, as well as view the
logs.

In all screens, you can use the "hamburger menu" (the three horizontal lines)
to select a different screen, and the play button to start your robot's code.
This will turn into a stop button when code is running.

<div class="info" markdown="1">
The stop button is currently not functional.
</div>

### Set up screen

![The tablet app's set up screen](/images/content/kit/tablet/set-up-screen.png)

This screen allows you to select the starting zone of your robot, as well as
whether it is running in development mode or competition mode. Changing the
starting zone allows you to test how your robot handles being started in a
different zone.

Changing to competition mode causes the development markers to be unreadable,
and instead reads the competition markers, which are different. Therefore, you
should keep your robot in development mode.

You cannot use this screen when code is running.

### Logs screen

![The tablet app's logs screen](/images/content/kit/tablet/logs-screen.png)

This screen allows you to see all messages from your code sent by `print`
statements (and anything else that outputs to standard output or standard
error). It will also show messages from the initialisation of the robot's
hardware, as well as any errors that occurred when running your code.

You can press the "Jump to bottom" button to scroll right to the bottom of the
logs, to see the most recent entries in a long file.

You can also see your robot's logs on the USB stick, in a file called
`log.txt`.
