---
layout: page
title: Using the Code Submitter
---

# Using the Code Submitter

For virtual aspects of the competition, such as the [Virtual League][virtual-league], you will submit your code using the [code-submitter][code-submitter].
Your code will then be run alongside other teams' code in the [simulator][simulator].

To prepare your code for upload, you should create a zip archive containing all the code you want to submit.
As with running the code in the simulator locally or on your robot, this must include a file named _exactly_ **`robot.py`**, placed in the root of the archive (not within a subfolder).
You can also provide other files as well and use them from your `robot.py` file, however the code-submitter will always look for a `robot.py` file as that is what the simulator will run.

Once you have prepared the archive containing your code:

1. Visit the [Code Submitter][code-submitter]
1. Log in using:
  * your team's TLA as the username, in UPPERCASE\
    (your team's channel in Discord is named like `#team-tla`)
  * the same password as you used to get access to your team's area in Discord\
    (check with your supervisor if you're not sure what this is)
1. Upload the archive to the Code Submitter

You team can make as many submissions as you like.
Each is recorded along with the date & time of the submission and can be downloaded again if needed.
This allows you to continue working on their code even after having made an initial submission.
The last submission before the deadline is the one which will be used.

[virtual-league]: {{ site.baseurl }}/robots_101/programme_structure#virtual-league
[simulator]: {{ site.baseurl }}/simulator/
[code-submitter]: https://studentrobotics.org/code-submitter/
