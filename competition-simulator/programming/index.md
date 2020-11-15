---
layout: page
title: Programming
---

# Programming

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

To assist with converting your existing code from Python 2 to Python 3, you can use [`2to3`](https://docs.python.org/3/library/2to3.html).

### Robot

There are two possible classes you can use to control your robot. You are
encouraged to use the newer [`ManualTimestepRobot` class][manual-timestep-class]
rather than the older `Robot` class. This avoids unpredictable behaviour which
can result from simulator time not passing at the same rate as real time.

[manual-timestep-class]: /docs/competition-simulator/programming/time#manual-timestep-robot

### Motors

Your robot has one motor board attached, the left wheel in port `m0`, and the right wheel in `m1`.

The motor boards do not have part codes, and so need to be indexed using `0`.

### Ruggeduino

Your robot has five microswitches and six distance sensors, attached to the digital and analogue pins respectively. These are all attached to a single ruggeduino.

Because these sensors are pre-attached to the ruggeduino, you do not need to set its `pin_mode`.

#### Microswitches

The microswitches are attached to digital pins 2-6:

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

These are shown as blue coloured blocks on the robot. The `analogue_read` method will return the distance in metres, however only measure up to 30cm.

#### LEDs

The LEDs are attached to digital pins 7-12:

| Pin | Location |
|-----|----------|
| 7   | Red (right) |
| 8   | Green (right) |
| 9   | Blue (right) |
| 10  | Blue (left) |
| 11  | Green (left) |
| 12  | Red (left) |

Using the `digital_write` method, you can set these to True (On) or False (Off).

### Camera

Your robot has a camera, which is attached to the top of your robot. A live preview of what the camera sees is shown in the top-left corner. The vision system uses Webots' object recognition, rather than [fiducial markers]({{ site.baseurl }}/programming/sr/vision/markers/).

The `see` method will return a list of visible markers in the arena, but doesn't allow a resolution argument. Each token is as described in the [vision docs]({{ site.baseurl }}/programming/sr/vision/), except:

- As well as the [existing constants]({{ site.baseurl }}/programming/sr/vision/#MarkerInfo), `Marker.info.marker_type` can be referred to as `MarkerType.SILVER`, `MarkerType.GOLD` or `MarkerType.ARENA`. `MarkerType` can be imported with `from sr.robot import MarkerType`
- The following attributes are not available:
  - `Marker.res`
  - `Point.image`

### Time

In the simulated environment, time advances only at the pace that the simulator
is run. As a result, using `time.time` to know how long your robot has been
running for or `time.sleep` to wait for some duration will be unreliable.

As a result the API present in the simulator supports a slightly different
approach to handling time. See the documentation about [simulated time](./time)
for more details.
