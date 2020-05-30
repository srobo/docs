---
layout: page
title: Programming
---

# Programming

## Developing your code

On first run, the robot will execute an example program for convenience. On first run, this will be copied to the directory `competition-simulator` is stored in:

```
.
├── competition-simulator
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

### Motors

Your robot has 2 motor boards attached, each with 2 motors. Board `0` has the left wheel in port `m0`, and the right wheel in `m1`. Board `1` has the gripper lift motor in `m0`, and the finger motors in `m1`.

The motor boards do not have part codes, and so need to be indexed using `0` and `1`. The motor boards will always be in this order.

### Ruggeduino

Your robot has 5 microswitches and 6 distance sensors, attached to the digital and analogue pins respectively. These are all attached to a single ruggeduino.

Because these sensors are pre-attached to the ruggeduino, you do not need to set its `pin_mode`.

#### Microswitches

The microswitches are attached to digital pins 2-6:

| Pin | Location |
|-----|----------|
|2|Front|
|3|Back|
|4|Between gripper fingers|
|5|Left gripper finger|
|6|Right gripper finger|

These are shown as red coloured blocks on the robot. Using the `digital_read`  method, you'll receive a `bool` telling you whether the switch is current actuated.

#### Distance Sensors

Analogous to ultrasound sensors, distance sensors allow you to retrieve the distance between your robot and an object. These are attached to analogue pins 0-5:

| Pin | Location |
|-----|----------|
|0|Front Left|
|1|Front Right|
|2|Left|
|3|Right|
|4|Back Left|
|5|Back Right|

These are shown as blue coloured blocks on the robot. The `analogue_read` method will return the distance in metres, however only measure up to 30cm.

### Camera

Your robot has a camera, which is attached to the top of your robot. A live preview of what the camera sees is shown in the top-left corner. The vision system uses Webots' object recognition, rather than [fiducial markers]({{ site.baseurl }}/programming/sr/vision/markers/).

The `see` method will return a list of visible markers in the arena, but doesn't allow a resolution argument. Each token is as described in the [vision docs]({{ site.baseurl }}/programming/sr/vision/), except:

- As well as the [existing constants](http://localhost:4000/docs/programming/sr/vision/#MarkerInfo), `Marker.info.marker_type` can be referred to as `MarkerType.SILVER`, `MarkerType.GOLD` or `MarkerType.ARENA`. `MarkerType` can be imported with `from sr.robot import MarkerType`
- The following attributes are not available:
  - `Marker.res`
  - `Point.image`
