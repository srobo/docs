---
layout: page
title: Simulator Programming
---

Simulator Programming
=====================

## Developing your code

On first run, the robot will execute an example program for convenience. This program will be copied to the directory `competition-simulator-<version>` is stored in:

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

### Running multiple robots

To test how your robot behaves in each starting zone of the arena, you can copy your robot's code to run in each corner. Code can be placed in a `zone-<zone>` directory to run in starting zone `<zone>`:

```
.
├── competition-simulator-<version>
│   ├── ...
│   └─ worlds
│       └── Arena.wbt
├── zone-0
│   └── robot.py
└── zone-1
   └── robot.py
```

This will run two robots in the arena, each with different `robot.py`s. You can run as many or as few zones as you like, in any combination.

## Robot

There is a pre-built robot used in the simulator.
To allow this simulated robot to move around and sense its environment a set of motors and sensors have been connected as detailed below.

The simulator’s API is very similar to the real SR API described in the [programming docs]({{ site.baseurl }}/programming/).
The main differences are the way that [time is handled](#simulated-time), some discrepancies in the vision API we hope to resolve soon and the simulated robot not having the Brain Board LEDs.

<div class="info">
  To more closely reflect reality, artificial noise has been added to simulated
  values such that sensors and actuators are not perfectly accurate, and may
  fluctuate slightly between measurements or operations.
</div>

### Motors

Your robot has one motor board attached, the left wheel is connected to the first port, and the right wheel to the second.

The motor board has the part code `srABC1`, since only a single motor board is attached it can be referenced as `R.motor_board`.

### Servos

Your robot has one servo board attached, the jaws of the robot are controlled by a pair of servos:

| Servo | Location  |
|-------|-----------|
| 0     | Left Jaw  |
| 1     | Right Jaw |

Setting each servo to -1 fully opens the respective jaw.

The servo board has the part code `srXYZ2`, but since only a single servo board is attached it can be referenced as `R.servo_board`.

### Ruggeduino

Your robot has a microswitch and six distance sensors, attached to the digital and analogue pins respectively. These are all attached to a single ruggeduino.

Because these sensors are pre-attached to the ruggeduino, you do not need to set its `pin_mode`.

#### Microswitches

The microswitch is attached to digital pin 2:

| Pin | Location |
|-----|----------|
| 2   | Back     |

This is shown as a red coloured block on the robot. Using the `digital_read`  method, you'll receive a `bool` telling you whether the switch is currently actuated.

#### Distance Sensors

Analogous to ultrasound sensors, distance sensors allow you to retrieve the distance between your robot and an object. These are attached to analogue pins A0-A5:

| Pin | Location |
|-----|----------|
| A0  | Front Left |
| A1  | Front Right |
| A2  | Left     |
| A3  | Right    |
| A4  | Front    |
| A5  | Back     |

These are shown as blue boards with silver transceivers on the robot. The `analogue_read` method will return the distance in metres. They can see in a narrow cone up to a maximum of about 2m away.
Since these sensors rely on echoes being reflected back from objects, if the angle of incidence between the sensor's pulse and the contacted surface exceeds 22.5 degrees then the sensor will be unable to detect the object.

#### LEDs

The LEDs are attached to digital pins 3-4:

| Pin | Location |
|-----|----------|
| 3   | Red (Left) |
| 4   | Green (right) |

Using the `digital_write` method, you can set these to True (On) or False (Off).

### Vision

The simulated robot has a camera which provides position and orientation
information about other objects within the simulation. This simulates the
system of fiducial markers which the physical robot's camera can detect.

The information returned by the simulated vision API is similar to the physical
robot's [vision API](/docs/programming/vision/), however there are a number
of differences as are noted in the vision docs.

### Pressure sensing

Your simulated robot has two deployable 'fingers' that are able to lift the front of the robot up. These fingers have pressure sensors on their tips, with these you can determine the weight of an object your robot is carrying.

The servos to move the fingers are attached to servo pins 2 and 3 in the servo board:

| Servo | Location           |
|-------|--------------------|
| 2     | Left finger servo  |
| 3     | Right finger servo |

Once the fingers are deployed, your robot will have reduced manoeuvrability, but you will be able to sense the total pressure on the front of the robot. The pressure measuring devices on the end of the fingers are available as analogue inputs on A6 and A7. They are meant to emulate sensors that output a value proportional to pressure, the higher the pressure the higher the voltage reading.

| Pin | Location                     |
|-----|------------------------------|
| A6  | Left finger pressure sensor  |
| A7  | Right finger pressure sensor |

## Simulated Time

In the simulated environment, time advances only at the pace that the simulator
is run. As a result, using `time.time` to know how long your robot has been
running for or `time.sleep` to wait for some duration will be unreliable.

As a result the API present in the simulator supports a slightly different
approach to handling time.
The methods `R.time` and `R.sleep` are provided as a direct replacement of `time.time` and `time.sleep` respectively and can be used anywhere the previous methods were used.

<div class="warning">
  Since the simulator does not simulate the time taken to execute your code, any loop or decision which needs an event to occur must be accompanied by a <code>R.sleep</code> even if with a small value.

  <b>If in doubt add an <code>R.sleep</code></b>.

  If you find that the simulator freezes then this indicates that your code is reaching a loop which does not contain any <code>R.sleep</code> and is expecting time to advance.
</div>
