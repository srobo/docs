---
layout: page
title: Troubleshooting
---

Troubleshooting
========================

There are a few common issues that you may encounter when setting up the simulator.
You may receive a warning about your computer's GPU not being good enough, which can be ignored.

If you see a message saying that Python cannot be found that looks similar to the image below, you need to rerun the setup script and check if it displays any errors.

![Python not found]({{ site.baseurl }}/images/content/simulator/python-unfound.png)

### Performance Optimisations

The default settings work for most users however if you are using a less powerful computer or one without a dedicated graphics card (as is the case on many laptops), you may wish to adjust the graphics settings to enable the simulation to run faster.

If you find that the simulation runs very slowly we suggest disabling Anti-Aliasing, Ambient Occlusion and Shadows.
These should not affect the behaviour of the simulation, only the rendered visuals.

To do this, open Webots and go to the menu **Tools** &rarr; **Preferences**, then select the **OpenGL** tab.
On this tab, set **Ambient Occlusion** to "Disabled" and check the boxes next to "Disable shadows" and "Disable anti-aliasing".

On macOS, **Preferences** is under the **Webots** menu instead of **Tools**.

<img class="half left" src="{{ site.baseurl }}/images/content/simulator/windows-preferences.png" alt="Preferences Location">
<img class="half right" src="{{ site.baseurl }}/images/content/simulator/reduced-settings.png" alt="Preferences Interface">
