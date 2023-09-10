---
layout: page
title: Arduino API
---

# Arduino API

The Arduino that came as part of your kit was shipped with a firmware that provides the functionality outlined in the [Arduino API](/docs/programming/arduino/sr_firmware) page.
You may wish to use the Arduino as is, extend the functionality of this firmware, or completely replace it.

The `sr.robot3` library provides support for using the Arduino in three possible configurations:

 1. [Default SR firmware](./sr_firmware):
    The firmware that is shipped on the Arduino by default.
    This firmware provides basic functionality to read the digital and analog values of pins and output digital on/off signals.
 2. [Extended SR firmware](./extended_sr_firmware):
    Firmware that adds extra commands to the default SR firmware.
    These extra commands can perform actions such as reading a sensor or measuring pulses on a pin.
 3. [Completely custom](./custom_firmware):
    Either any firmware that is not derived from the SR firmware or any other serial device can be connected to via this method.

By default, the [`sr.robot3`](/docs/programming/robot_api/) library assumes that all connected Arduinos are running the SR firmware or firmware which is compatible with the SR Arduino firmware.
If you're using completely custom firmware, you'll need to tell the kit to ignore the device so that you're able to define your own setup logic.
