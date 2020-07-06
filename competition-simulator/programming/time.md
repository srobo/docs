---
layout: page
title: Simulated Time
---

# Simulated Time

In the simulated environment, time advances only at the pace that the simulator
is run and in cooperation with the controller code (such as the code controlling
your robot). As a result, using `time.time` to know how long your robot has been
running for or `time.sleep` to wait for some duration may be unreliable.

## Approaches

### Existing projects: the `Robot` class

<!-- We should drop this after SR2020 and move `ManualTimestepRobot` to being the default. -->

For existing projects the default `Robot` class will automatically advance the
simulator all the time. This can make programming your robot slightly easier as
you don't need to worry about the progress of time and (just like a real robot)
you can assume that time passing will just happen.

However this has a drawback -- because the simulator advances time in small
chunks (rather than the smooth progression we're used to in reality) it can mean
that your robots actions sometimes run for slightly more or less time than you
expect. While the time difference will be small (a few tens of milliseconds), it
is likely to impact attempts at more precise movement more than larger actions
due to their shorter time.

This may mean for example that turning by a small angle to line up with a token
will sometimes work and sometimes point the robot in not quite the right
direction.

If your robot code is impacted by these unpredictability issues we recommend
that you change over to using the `ManualTimestepRobot` class instead. For
guidance on doing this, see the [upgrade guide](#upgrading) below.

This class is maintained for compatibility with earlier releases of the
simulator, though its use is discouraged (especially for new projects).

### New projects: the `ManualTimestepRobot` class {#manual-timestep-robot}

For new projects, or existing projects that want to be sure of getting precise
robot behaviour, the recommended approach is to use the `ManualTimestepRobot`
class.

This approach relies upon your code advancing the simulation explicitly by
calling its `sleep` method (documented below) in order for the simulation to
actually run. This should not be an issue for most robot code however as you
will likely be doing this anyway in order to wait for things to happen.

<div class="info">
  If you find that the simulator freezes then this indicates that your code is
  busy doing something without giving the simulator a chance to run.

  This usually indicates that you have a loop somewhere which is expecting time
  to advance on its own and which should be modified to call <code>R.sleep</code>
  occasionally (even a very small value will allow the simulator to progress).
</div>

## Sleeping

If you want to wait for something to happen within the simulation, and you can
be reasonably confident that it will take a given amount of time, you can use
`sleep` method on your robot to pause your code for a given duration.

Internally this uses the simulation's own clock and so is suitable for use in
place of `time.sleep`. Note that, just as with `time.sleep`, while your code is
sleeping your robot will continue any actions it was doing.

``` python
# Blink the output
R.ruggeduinos[0].digital_write(A_PIN, 1)
R.sleep(1.5)  # Sleep for a second and a half of simulation time
R.ruggeduinos[0].digital_write(A_PIN, 0)
```

## Getting the current time

If you need to measure the time since some previous moment within the simulator,
your robot has a `time` method which can be used in place of `time.time` to get
a number (in seconds) that increases in line with simulation time.

Time zero as returned by this method is the point at which the simulation began,
however you should not rely on that being a useful reference point as it may not
be the moment at which the _match_ began.

``` python
then = R.time()

# .. do some other things ..

now = R.time()

duration = now - then
```

## Changing from `Robot` to `ManualTimestepRobot` {#upgrading}

The changes needed to move from using `Robot` to `ManualTimestepRobot` are
fairly small since both classes have the same interface. This means that
anywhere in the docs a <code>Robot</code> is used, you can also use a
<code>ManualTimestepRobot</code>.

1. Anywhere that your code mentions `Robot`, change it to `ManualTimestepRobot`,
   for example:

    ``` python
    from sr.robot import Robot  # change this

    R = Robot()  # change this

    R.motors[0].m1.power = 20  # this stays the same
    ```

   should be changed to:

    ``` python
    from sr.robot import ManualTimestepRobot

    R = ManualTimestepRobot()

    R.motors[0].m1.power = 20
    ```

2. Remove any usages of either `time.time` or `time.sleep` and replace them with
   the equivalent robot methods (documented above). For example:

    ``` python
    import time  # remove this everywhere

    start = time.time()
    time.sleep(1.2)
    print("I slept for {} seconds".format(time.time() - start))
    ```

   should be changed to:

    ``` python
    start = R.time()
    R.sleep(1.2)
    print("I slept for {} seconds".format(R.time() - start))
    ```

3. Check for any places where you have code which expect that `R.time()` will
   increase on its own and ensure that they sleep for at least a very small
   amount of time on each iteration. For example:

    ``` python
    end = R.time() + 5
    while R.time() < end:
        if has_touched_something(R):
            break
    ```

   should be changed to:

    ``` python
    end = R.time() + 5
    while R.time() < end:
        R.sleep(0.01)  # note addition of this line
        if has_touched_something(R):
            break
    ```
