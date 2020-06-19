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

<div class="warning">
  You will be responsible for backing up and versioning your code, and collaborating with your fellow team members. The <a href="https://studentrobotics.org/ide/">IDE</a> is unsuitable for this simulator.
</div>

## Programming Interface

Unless otherwise stated, the simulator’s API is the same as the real SR API described in the [programming docs]({{ site.baseurl }}/programming/).

To assist with converting your existing code from Python 2 to Python 3, you can use [`2to3`](https://docs.python.org/3/library/2to3.html).

### Motors

Your robot has two motor boards attached, each with two motors. Board `0` has the left wheel in port `m0`, and the right wheel in `m1`. Board `1` has the gripper lift motor in `m0`, and the finger motors in `m1`.

The motor boards do not have part codes, and so need to be indexed using `0` and `1`. The motor boards will always be in this order.

### Ruggeduino

Your robot has five microswitches and six distance sensors, attached to the digital and analogue pins respectively. These are all attached to a single ruggeduino.

Because these sensors are pre-attached to the ruggeduino, you do not need to set its `pin_mode`.

#### Microswitches

The microswitches are attached to digital pins 2-6:

| Pin | Location |
|-----|----------|
| 2   | Front    |
| 3   | Back     |
| 4   | Between gripper fingers |
| 5   | Left gripper finger |
| 6   | Right gripper finger |

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

- As well as the [existing constants](http://localhost:4000/docs/programming/sr/vision/#MarkerInfo), `Marker.info.marker_type` can be referred to as `MarkerType.SILVER`, `MarkerType.GOLD` or `MarkerType.ARENA`. `MarkerType` can be imported with `from sr.robot import MarkerType`
- The following attributes are not available:
  - `Marker.res`
  - `Point.image`

### Time

In the simulated environment, time advances only at the pace that the simulator
is run. As a result, using `time.time` to know how long your robot has been
running for or `time.sleep` to wait for some duration will be unreliable.

Instead the simulated `Robot` API provides some alternatives which you are
encouraged to use instead.

#### Sleeping

If you want to wait for something to happen within the simulation, and you can
be reasonably confident that it will take a given amount of time, you can use
`Robot.sleep` method to pause your code for a given duration.

Internally this uses the simulation's own clock and so is suitable for use in
place of `time.sleep`. Note that, just as with `time.sleep`, while your code is
sleeping your robot will continue any actions it was doing.

``` python
R = Robot()

# Blink the output
R.ruggeduinos[0].digital_write(A_PIN, 1)
R.sleep(1.5)  # Sleep for a second and a half of simulation time
R.ruggeduinos[0].digital_write(A_PIN, 0)
```

#### Getting the current time

If you need to measure the time since some previous moment within the simulator,
`Robot.time` can be used in place of `time.time` to get a number (in seconds)
which increases in line with simulation time.

Time zero as returned by this method is the point at which the simulation began,
however you should not rely on that being a useful reference point as it may not
be the moment at which the _match_ began.

``` python
R = Robot()

then = R.time()

# .. do some other things ..

now = R.time()

duration = now - then
```
