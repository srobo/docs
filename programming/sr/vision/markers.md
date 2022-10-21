---
layout: page
title: Markers
---

Markers
=======

<img src="{{ site.baseurl }}/images/content/vision/marker-0.png" alt="An Example Marker: 0" class="right half" />

An example marker is given to the right; this one is `0`. The marker is the correct way up, as shown by the text in the bottom left corner.

There is also some text in the bottom-left corner of the marker, in its padding: `Student Robotics APRILTAG_36H11 - Dev #0`.

- `#0` means marker number 0
- `APRILTAG_36H11` is the marker type
- `Dev` shows it's a development marker, rather than a competition marker

Details of the types and size of markers used in the game can be found in the [rules](/docs/rules).

You can download all the markers as a single [ZIP file](/docs/resources/2023/sr-markers-sr2023.zip) or individually from the [git repo](https://github.com/srobo/game-markers/tree/master/SR2023/markers).

You must ensure that your PDF viewer is not resizing the documents when printing.
This can be checked by measuring the grey box around the marker and comparing this to the size defined in the rules.
If the printed marker is not the correct size then the distance information reported by the vision API will be wrong.

Note that a different set of markers will be used in the arenas at the competition.
However, this is not something you need to worry about.
We will handle this for you automatically when your robot is started in competition mode.

The white space around the markers is very important -- without it, the markers probably won't be recognised. This white border is needed to ensure there's enough contrast between the black marker and whatever it's attached to - its size isn't strictly important.

If the markers become damaged (scuff markers, tears, etc...) they will not function as well (if at all). If this happens, it is best to just print another one.
