---
layout: page
title: Batteries and Charging
---

# Batteries and Charging

![Three cell, 2200mAh, lithium-ion polymer battery]({{ site.baseurl }}/images/content/kit/battery.png "Three cell, 2200mAh, lithium-ion polymer battery")

The electronics kit contains two lithium-ion polymer (LiPo) batteries.
These are similar to those used in laptops, and are small and light for the amount of energy they contain.
This is great for your robot but it is vital to treat such a high concentration of energy with respect.
If you do not, there is a serious risk of fire and injury.
To avoid this, you should follow the safety information on this page closely, at all times.

Your kit will come with several pieces of battery related equipment:

1. Two 11.1V 2200mAh LiPo Batteries.
2. One battery charger.
3. One battery charger power cable.
4. One battery safety bag.

You must **not** use any batteries, chargers, bags or cables not explicitly authorised by Student Robotics.
If you have any doubts or wish to request permission to use a battery, charger, charging bag or battery cable not provided by Student Robotics, please contact <{{ site.emails.kit-support }}>.

<div class="warning" markdown="1">
* Never leave batteries unattended when they are in use or charging.
* Always place the batteries in the provided battery safety bag when charging or when being stored.
* Always follow the charging checklist precisely to make sure the charger is correctly configured.
  See the [Charging Batteries](#charging-batteries) section for more details.
* If a battery has any cuts, nicks, exposed copper on the wires or is bulging to the point of no longer being squishy, contact <{{ site.emails.kit-support }}> immediately.
* Do not charge or use a damaged battery.
* Always leave the charging leads connected to the battery charger at all times.
</div>


## Operating Batteries

To use your batteries, you must connect them to the Student Robotics Power Board.
Do not tamper with the cable or connect the batteries to anything other than the Power Board (or the charger when charging).

During operation, the battery is protected by over-current protection and a fuse in the Power Board.
If any equipment is short circuited, the over-current protection will activate - protecting the battery.
In extreme circumstances the fuse may blow to prevent damage to the battery.
This is an important safety feature: do **not**, under any circumstances, bypass the fuse.
The fuse is not user serviceable and if the fuse has blown then the Power Board must be replaced.
If you suspect the fuse has blown then please contact <{{ site.emails.kit-support }}> straight away.

Mechanical damage to a battery can be dangerous, and a puncture or large force applied to a battery causes a serious risk of fire.
To avoid this, your battery should be shielded from mechanical damage while you operate it.
Secure your battery to your robot, so that it does not move or fall off while the robot moves.
You should also build a compartment for the battery to be placed in, so that accidental collisions do not damage the battery.

<div class="info" markdown="1">
The smaller lead is only used for voltage measurement when charging and must **not** be connected to anything except the battery charger when the battery is charging.
</div>


## Storing Batteries

When your batteries are not actively in use, they should be safely stored.
To do this you must disconnect the batteries from all electrical equipment, and place them in the battery safety bag.
You should then store the battery safety bag in a safe location, away from anything flammable and where it wont be physically damaged.


### Fully charged batteries

Storing a battery at 100% charge puts stress on the battery, reducing its life.
If you are planning on storing you battery for a long time (greater than 1 week) its best to discharge it to approximately 70%.
This can be done by running your robot.


### Flat batteries

When the battery has been almost completely discharged, the Power Board will automatically turn off and the LED marked "Power / Flat Battery Indicator" in the [diagram](/docs/kit/power_board#BoardDiagram) will flash red and green.
You should disconnect the battery, and begin charging it.
By themselves, batteries will discharge very slowly, and over-discharging will lead to damage.
Do not store a discharged battery for more than a few days without charging it, as it may discharge further and become damaged.


## Charging Batteries

Student Robotics provides two different kinds of chargers with our kit, the [iMAX B6](/docs/kit/batteries/imax_b6_charger), and the [HobbyKing HKE4](/docs/kit/batteries/hke4_charger).
You should only use the battery charger provided by Student Robotics to charge the batteries provided in the kit.
For precise instructions on how to charge your batteries with the provided charger, please see the charger specific documentation page.
