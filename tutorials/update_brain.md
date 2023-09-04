---
layout: page
title: Updating your brain board
---

{% comment %}
The below will automatically calculate the latest version number, to be used when mentioning the version in this page.
{% endcomment %}

{% assign latest_version = site.data.kit_versions | first %}
{% assign latest_version = latest_version.version %}


# Updating your brain board

The SD card is located on the underside of the board underneath the green power connector.
Grab the SD card with your fingers and simply pull it out of the slot.

To fully update your Brain Board's software, or refresh it if you think it's not working correctly, you can flash our SD card image onto the microSD card in your Brain Board.

To update the SD card, you'll need to download our image from the [updates page]({{ site.baseurl }}/kit/brain_board/robot_os).
The latest version is `{{ latest_version }}`.
The flashing procedure is identical to flashing Raspberry Pi images.


### Etcher

We recommend using [Etcher](https://etcher.io), as it's simple to use, and available on Windows, macOS and Linux.
If you're familiar with Raspberry Pis or other similar boards and have flashed images before with a different tool, that should also work.

![Etcher example]({{ site.baseurl }}/images/content/kit/etcher.png)

<div class="info" markdown="1">
If you choose to use a tool other than Etcher, you may need to extract the `srobo-robot-{{ latest_version }}.img.xz` to `srobo-robot-{{ latest_version }}.img`.
There are many tools available for this, e.g. [7-zip](https://www.7-zip.org/).
</div>


### Flashing

1. Open Etcher and select the `srobo-robot-{{ latest_version }}.img.xz` file you downloaded
2. Select your SD card from the devices window
3. Click 'Flash!'
4. When the flash is complete you should safely eject the SD card.<br>
   Your computer may complain that the SD card is no longer readable, however
   this is expected as the data being written to the SD card is not in a format
   that either Windows or macOS can natively understand.
