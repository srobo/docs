---
layout: page
title: Updates
extra_js: updates
---

# Updates

Keeping your kit up to date is very important. It enables us to deploy new features, as well as fix bugs.

Once you have downloaded the file you need, refer to the documentation on [updating your brain board]({{ site.baseurl }}/kit/brain_board#flashing-sd-card) to apply the update.

Each update file is a complete upgrade. Each file contains the changes of those before it. If you need to jump up multiple versions, you can do so by using the latest file.

{% if site.data.kit_versions.size > 0 %}
The following table outlines the updates which have been published.

{% include updates-table.html %}
{% else %}
There are currently no updates available.
{% endif %}