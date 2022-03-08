---
layout: page
title: Getting Code on the Robot
---

# Getting Code on the Robot

Getting your code on to the robot is quite simple.
You will need to put your code on a USB drive
Which will need to be formatted with either FAT32, exFAT or ext2/3/4.
Upon plugging in the drive or starting up, the robot will run the `robot.py` file found in the `robot.zip` in the root of the drive.

## Windows

1. Open your code in File Explorer
2. Select all of your code files (<kbd>Ctrl</kbd><kbd>A</kbd> to select all files)
3. Right-click the files
4. Click Compress to Zip file
5. Name the newly created file `robot` (or `robot.zip` if you have file extensions shown)

<img src="{{ site.baseurl }}/images/content/kit/zip_win10.jpg" alt="Screenshot for Windows 10" class="column half" />
<img src="{{ site.baseurl }}/images/content/kit/zip_win11.png" alt="Screenshot for Windows 11" class="column half" />

If you are on Windows 10 or older, you will need to use Send to &rarr; Compressed (zipped) folder.

## macOS

1. Open your code in Finder
2. Select all of your code files (<kbd>⌘</kbd><kbd>A</kbd> to select all files)
3. Right-click (or Control-click) the files and click Compress
4. Name the newly created file `robot.zip`

![Screenshot]({{ site.baseurl }}/images/content/kit/zip_macOS.png)

To re-run your program, simply remove the USB stick and plug it back in again and it will restart automatically.

## Robot Logs

When your program runs on the robot, the output of `print(...)` statements and
any errors which occur are written to a log file on the USB stick as `log.txt`.
