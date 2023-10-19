---
redirect_from:
  - /kit/assembly
layout: page
title: Kit Assembly
---

# Kit Assembly

The Student Robotics kit contains a number of separate modules which must be connected together control your robot.
Below is a diagram of what your assembled kit should look like.

![Diagram of the kit assembly]({{ site.baseurl }}/images/content/kit/kit_assembly.svg)


## Preparation

The power board contains a connector for an external On|Off switch.
If you do not intend to connect a switch then you must still make this connection.
You can do this by connecting a short loop of wire between the two terminals of a suitable CamCon and placing it in the external On|Off port.
Any of the wire we provide would be suitable for this.


## Connections

Each of the modules in the kit needs to be provided with both a control signal and power in order to operate.
All the boards use USB to connect to the [Brain Board](/docs/kit/brain_board) so it can tell them what to do.
If you run out of USB ports on the Brain Board itself, then you can use the provided USB hubs to provide more ports.

Most of the boards (with the exception of the [Arduino](/docs/kit/arduino)) also need an additional power connection.
This should be provided from the [Power Board](/docs/kit/power_board).

The following table summarises the connections which need to be made for each board.

Board                                   | Power
----------------------------------------|------------------------------
[Brain Board](/docs/kit/brain_board)    | 12V, must be connected to L2
[Power Board](/docs/kit/power_board)    | 12V, via the yellow XT60 to the [battery](/docs/kit/batteries)
[Motor Board](/docs/kit/motor_board)    | 12V from the power board
[Arduino](/docs/kit/arduino)            | via the USB
[Servo Board](/docs/kit/servo_board)    | 12V from the power board

In order to connect the Brain, Motor and Servo Boards to the Power Board, you will need to create some power cables.
This should be done using the provided red and black _power wire_ (this is the thicker wire provided in the kit) and a pair of green CamCon connectors.
The blue power wire should only be used to connect motors to the motor board.
_Remember you **must** use black wire for any ground connections as defined in the [Rules](/docs/rules)._

When creating your power cables be sure to refer to the pages for each board so that you connect the wires the right way around.
In our diagrams, the <span class="positive-connector">+</span> outputs from the the Power Board should be connected to the <span class="positive-connector">+</span> inputs on the board being powered.

<div class="info" markdown="1">
  The Brain Board *must* be plugged in to the L2 port on the Power Board in order for the kit to start up.
  <br>
  The L2 port is the only port on the Power Board which is powered before the Brain Board has started,
  so is the only one which can be used to power the Brain Board.
</div>


## Video

The following video contains an overview of connecting the boards which covers the [brain board](/docs/kit/brain_board), [power board](/docs/kit/power_board) and a [motor board](/docs/kit/motor_board).

<div class="centered-content">
  <iframe class="video center"
          height="480"
          width="640"
          src="https://www.youtube-nocookie.com/embed/HQmL_3giLvc?rel=0"
          frameborder="0"
          allowfullscreen>
  </iframe>
</div>
