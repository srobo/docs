---
redirect_from:
  - /programming/getting_code_on_the_robot
layout: page
title: Getting Code on the Robot
---

# Getting Code on the Robot

For your robot to function, it needs some code to tell it what to do.
This code will be written on your computer, but then needs to be transferred to your robot to execute it.

You must provide your code in a file named _exactly_ **`robot.py`**, placed on a USB drive.
You can also provide other files as well and use them from your `robot.py` file, however the robot will always look for and run the `robot.py` file.

Your USB drive will need to be formatted with either FAT32, exFAT or ext2/3/4.
The USB drive provided in your kit will already be formatted in a suitable manner.
FAT32 and exFAT are common formats which USB drives will likely already be using, so often you will not need to change this.

Upon plugging in the drive or starting up, the robot will run the `robot.py` file found in the root of the drive.
If the robot does not find this file, the Code LED on the [Brain Board]({{ site.baseurl }}/kit/brain_board/) will not light and no logs will be produced.

To re-run your program, remove the USB stick from the robot and plug it back in again and it will restart automatically.


## Windows

1. Open your code in File Explorer
2. Select all of your code files (<kbd>Ctrl</kbd><kbd>A</kbd> to select all files)
3. Right-click the files and click "Copy" <span aria-hidden="true">(<i class="fa-regular fa-copy"></i> on Windows 11)</span>
4. Open your USB drive in File Explorer
5. Right-click in the directory and click "Paste"

If the drive is mounted at `E:`, then the path to the file must be `E:\robot.py`.


## macOS

1. Open your code in Finder
2. Select all of your code files (<kbd>⌘</kbd><kbd>A</kbd> to select all files)
3. Right-click (or Control-click) the files and click "Copy"
4. Open your USB drive in Finder
5. Right-click in the directory and click "Paste N items"


## Robot Logs

When your program runs on the robot, the output of `print(...)` statements and any errors which occur are written to a log file on the USB stick as `log.txt`.
These logs are also available to view live on the [web interface]({{ site.baseurl }}/kit/brain_board/web_interface).

If the robot did not find any code to run then no logs will be created.
If you don't get any logs, be sure to check that you've named the file correctly.
