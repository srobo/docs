---
layout: default
title: Tablet
---

Tablet
======

The tablet provided with your kit allows you to interface with and debug your
robot.

![An image of the tablet](/images/content/kit/tablet-cropped.png "The Tablet")

Connecting to the robot
-----------------------

Once the robot is turned on the tablet should automatically connect to
your robot's WiFi if it is available. Here are the steps to follow to
make this happen:

 * Ensure WiFi on the tablet is turned on (but not connected)

![WiFi status](/images/content/kit/tablet/wifi_status.png "WiFi status")

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

Using the app
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
