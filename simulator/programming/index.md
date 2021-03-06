---
redirect_from:
  - /competition-simulator/programming
layout: page
title: Simulator Programming
---

# Simulator Programming

## Developing your code

On first run, the robot will execute an example program for convenience. On first run, this will be copied to the directory `competition-simulator-<version>` is stored in:

```
.
├── competition-simulator-<version>
│   ├── ...
│   └─ worlds
│       └── Arena.wbt
└── robot.py
```

Your code should be developed in `robot.py`.


<div class="warning">
  Only your controller code will be present in the competition environment.
</div>

## Programming Interface

Unless otherwise stated, the simulator’s API is the same as the real SR API described in the [programming docs]({{ site.baseurl }}/programming/).

### Motors

Your robot has one motor board attached, the left wheel in port `m0`, and the right wheel in `m1`.

The motor board does not have a part code, so it needs to be indexed using `0`.

### Ruggeduino

Your robot has two microswitches and six distance sensors, attached to the digital and analogue pins respectively. These are all attached to a single ruggeduino.

Because these sensors are pre-attached to the ruggeduino, you do not need to set its `pin_mode`.

#### Microswitches

The microswitches are attached to digital pins 2 and 3:

| Pin | Location |
|-----|----------|
| 2   | Front    |
| 3   | Back     |

These are shown as red coloured blocks on the robot. Using the `digital_read`  method, you'll receive a `bool` telling you whether the switch is current actuated.

#### Distance Sensors

Analogous to ultrasound sensors, distance sensors allow you to retrieve the distance between your robot and an object. These are attached to analogue pins 0-5:

| Pin | Location |
|-----|----------|
| 0   | Front Left |
| 1   | Front Right |
| 2   | Left     |
| 3   | Right    |
| 4   | Back Left |
| 5   | Back Right |

These are shown as blue coloured blocks on the robot. The `analogue_read` method will return the distance in metres. They can see in a narrow cone up to a maximum of about 2m away.
Since these sensors rely on echoes being reflected back from objects, if the angle of incidence between the sensor's pulse and the contacted surface exceeds 22.5 degrees then the sensor will be unable to detect the object.

#### LEDs

The LEDs are attached to digital pins 4-9:

| Pin | Location |
|-----|----------|
| 4   | Red (right) |
| 5   | Green (right) |
| 6   | Blue (right) |
| 7   | Blue (left) |
| 8   | Green (left) |
| 9   | Red (left) |

Using the `digital_write` method, you can set these to True (On) or False (Off).

### Time

In the simulated environment, time advances only at the pace that the simulator
is run. As a result, using `time.time` to know how long your robot has been
running for or `time.sleep` to wait for some duration will be unreliable.

As a result the API present in the simulator supports a slightly different
approach to handling time. See the documentation about [simulated time](./time)
for more details.
