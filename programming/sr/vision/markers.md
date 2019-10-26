---
layout: page
title: Markers
---

Markers
=======

<img src="{{ site.baseurl }}/images/content/marker-0.png" alt="An Example Marker: Arena marker 0" class="right" />
An example *libkoki* marker is given to the right; this one is *arena-0*.
There is a dot in the top-left corner of the black border.  This corner is known as the *principal corner*, and its location is important if measuring the marker's orientation about the Z-axis.
There is also some text in the bottom-left corner of the black border.
This text will say something like `"libkoki marker #0 (v0.5) 'ARENA'"`.
Let's break that down:
`#0` means marker number 0;
`(v0.5)` tells you the version of the marker, it is important the latest version is used; and
`'ARENA'` is just a human-readable description of what the marker is for.

Details of the types and size of markers used in the SR2020 game can be found in the [rules](/docs/rules).

You can download all of the markers as a single [ZIP file](/docs/resources/2020/sr-dev-markers-sr2020.zip)
or individually from the [git repo](https://github.com/srobo/game-markers/tree/master/SR2020/dev).
The arena markers, due to their size, need to be printed on A3 paper.
Token markers can be printed on A4 so long as your printer can handle the very narrow 5mm page margins; if not, they will need to be printed on A3 as well.
Ensure you download the correct file for the paper size you intend to print on - the filenames all end in "-A3paper.pdf" or "-A4paper.pdf".

You must ensure that your PDF viewer is not resizing the documents when printing.
This can be checked by measuring the grey box around the marker and comparing this to the size defined in the rules.
If the printed marker is not the correct size then the distance information reported by the vision API will be wrong.

Note that a different set of markers will be used in the arenas at the competition.
However, this is not something you need to worry about.
We will handle this for you automatically when your robot is started in competition mode.

The white space around the markers is very important -- without it, the markers probably won't be recognised.
If the markers become damaged (scuff markers, tears, etc...) they will not function as well (if at all).
If this happens, it is best to just print another one.
