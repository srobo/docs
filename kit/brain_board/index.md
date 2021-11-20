---
layout: page
title: Brain Board
---

{% comment %}
The below will automatically calculate the latest version number, to be used when mentioning the version in this page.
{% endcomment %}

{% assign latest_version = site.data.kit_versions | first %}
{% assign latest_version = latest_version.version %}

Brain Board
===========

<img src="{{ site.baseurl }}/images/content/kit/brain.png" alt="A photo of a brain board" title="A brain board" class="right" />
The Odroid U3+ Brain Board provided with your kit is what runs the code you write
and controls the other peripheral boards.

### Flashing SD card

In order to get access to the SD card, you will need to open up the case for the brain board. Pull the latch at the end of the case in order to hinge it open.
The SD card is located on the underside of the board. Carefully open the Brain Board's plastic case, grab the SD card with your fingers and simply pull it out of the slot.

To fully update your Brain Board's software, or refresh it if you think it's not working correctly, you can flash our SD card image onto the microSD card in your Brain Board.

To update the SD card, you'll need to download our image from the [updates page]({{ site.baseurl }}/kit/brain_board/updates). The latest version is `{{ latest_version }}`.
The flashing procedure is identical to flashing Raspberry Pi images.

## Etcher

We recommend using [etcher](https://etcher.io), as it's simple to use, and available on Windows, macOS and Linux. If you're familiar with Raspberry Pis or other similar boards and have flashed images before with a different tool, that will also work.

![Etcher example]({{ site.baseurl }}/images/content/kit/etcher.png)

<div class="info" markdown="1">
If you choose to use a tool other than Etcher, you may need to extract the `srobo-robot-{{ latest_version }}.img.xz` to `srobo-robot-{{ latest_version }}.img`. There are many tools available for this, e.g. [7-zip](http://www.7-zip.org/).
</div>

### Flashing

1. Open Etcher and select the `srobo-robot-{{ latest_version }}.img.xz` file you downloaded
2. Select your SD card from the devices window
3. Click 'Flash!'
