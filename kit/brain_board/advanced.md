---
layout: page
title: Brain Board - Advanced
---

# Brain Board - Advanced

When connected to your Brain Board WiFi network, it is possible to access the brain board via a terminal interface. The Brain Board is running Student Robotics OS, a purpose-built Linux distribution that does not have all of the conveniences of a usual Linux system.

<div class="warning">
The following information is about advanced features for which we only provide limited support. Proceed at your own risk.
</div>

Please bear in mind the following:

- Student Robotics does not guarantee support for the modification of the OS.
- We may need you to upgrade the OS which will overwrite any changes.
- Any modifications you make must be in line with [the rules]({{ site.baseurl }}/rules).
- We reserve the right to inspect your Brain Board at any time.
- Feel free to tinker. If you are stuck, ask in [Discord]({{ site.baseurl }}/team_admin/discord), although we may be unable to help.

## SSH Access

You can access the robot over SSH:

```shell
ssh robot@robot
```

Your SSH client will prompt you for a password, which is `robot`.

## Terminal Interface

A terminal interface with similar functionality to the web interface is available as `rtui`.

```shell
$ rtui

Student Robotics OS

Available commands:
arena: Get or set the current arena
exit: Leave the terminal session.
help: Show available commands
kill: Kill running code
metadata: Show all robot metadata
mode: Get or set the current robot mode (COMP or DEV)
quit: Leave the terminal session.
restart: Restart running code
start: Trigger the virtual start button.
trigger: Trigger the virtual start button.
zone: Get or set the current zone
```

Some commands let you set data as well as get it:

- `arena B` - Set the arena to `B`
- `mode COMP` - Set the mode to `COMP`
- `zone 2` - Set the zone to `2`