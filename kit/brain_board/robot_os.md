---
layout: page
title: Robot OS
---

Robot OS
========

TODO

# Updates

Keeping your kit up to date is very important. It enables us to deploy new features, as well as fix bugs.

Once you have downloaded the file you need, refer to the documentation on [updating your brain board]({{ site.baseurl }}/kit/brain_board#flashing-the-sd-card) to apply the update.

Each update file is a complete upgrade. Each file contains the changes of those before it. If you need to jump up multiple versions, you can do so by using the latest file.

{% if site.data.kit_versions.size > 0 %}
{% include updates-list.html %}
{% else %}
There are currently no updates available.
{% endif %}