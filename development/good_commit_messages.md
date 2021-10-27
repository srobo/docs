---
layout: page
title: Writing Good Commit Messages
---

Writing Good Commit Messages
============================

Writing good commit messages is easy; sadly, writing lazy ones is even easier.
With a bit of discipline, though, it will become natural over time.
There are 2 parts to a good commit message:

1. a summary of **what you've done**
2. an explanation as to **why you've done it** or **what problem it solves**

And there should be a blank line between them.
Here's an example:

~~~~~ not-code
Added function to get nearest blob of colour

A refactoring that returns a blob object that is the nearest one visible to
the vision software; makes blob selection/targeting easier.
~~~~~

How much you should write depends on how much code you've written.
More information on what to write can be found on [this website](http://lbrandy.com/blog/2009/03/writing-better-commit-messages/).
It is good practice to produce small commits that do just one thing.
If you need more than one line (less than 80 characters) to summarise the change, then the commit does too much!

Although not essential, it is a good idea to format your commit messages in a certain way.
As mentioned above you should leave a blank line between the summary and the main message,
 [this website](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
 explains the reasoning behind this and many other commit message formatting conventions.
