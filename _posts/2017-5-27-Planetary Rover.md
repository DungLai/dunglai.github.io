---
layout : post
title : Planetary Rover Game
desc : <div class="tag">C#</div><div class="tag">Winform</div><div class="tag">.NET</div><div class="tag">OOP</div></br>In developing the AI for a planetary rover, we are looking to create a small simulation for the rover to test various device options. The simulation will include an environment that contains a number of specimens and a number of rovers within a 20 x 20 meter area.
img : ../public/post_img/PlanetaryRover/title.png
---
<div class="tag">C#</div><div class="tag">Winform</div><div class="tag">.NET</div><div class="tag">OOP</div>
**Content:**
<!-- MarkdownTOC depth=3 -->

- [Introduction](#introduction)
- [Game Description](#game-description)
- [Demo video](#demo-video)
- [Object Oriented Design](#object-oriented-design)
    - [UML diagram](#uml-diagram)
- [Source code](#source-code)

<!-- /MarkdownTOC -->

<a name="introduction"></a>
## Introduction
In developing the AI for a planetary rover, we are looking to create a small simulation for the rover to test various device options. The simulation will include an environment that contains a number of specimens and a number of rovers within a 20 x 20 meter area.

This game makes use of 4 OOP principles, namely abstraction, encapsulation, inheritance and polymorphism (ad-hoc, subtyping and parametric).
<a name="game-description"></a>
## Game Description
Each rover is powered by one or more batteries, with each battery able to hold a given amount of charge represented in power units (which can never be less than 0). The batteries are used to power other devices attached to the rover.

Attached to each Rover are a number of devices. There are four different kinds of device: Motor, Radar, Solar Panel, and Drill. Each device has a name, for example the "Tien Corp: M5" motor, or the "Jai Force 27" Solor Panel.

1. Motor — when operated moves the rover. For this simulation, each motor moves the rover in one direction (up, down, left, or right) and uses 1 unit of power to move the rover 1 meter in that direction.

2. Radar — when operated, the radar subtracts 4 units of power from the Battery to which it is connected. It then scans the area within 5 meters of the rover and reports back on the specimens found. Different Radars have different capabilities, being able to report back (Type 1) the location of the found specimens, (Type 2) their size, or (Type 3) their name.

3. Solar Panel — when operated, the solar panel adds 1 unit of power to the battery to which it is connected.

4. Drill — when operated, the drill attempts to extract a specimen at the rovers current location.

The drill has a wear factor (percent worn), if this exceeds 100% then there is a 20% chance of drill failure otherwise the drill works successfully. When a specimen is extracted the wear factor increases by 5%, if the drill is operated without the rover being over a specimen then the wear factor increases by 10%.

Devices may be connected to one battery, which it will use when it is operated. Rover can attach or detach a device; when a new device is attached, the Rover connects it to the battery with the greatest charge. It is also possible for the rover to change which battery devices are connected to (by disconnect the device from a battery and connecting it to a different battery).

The environment surrounding the rover will have a number of specimens. These differ in location and size, and are each allocated a name based on the scientist who requested it be collected (for example: "Oliver: rocks").

Requirements:
1. The program must start with two rovers and 10 specimens (create randomly).
2. Create preset batteries and devices, and assign these to the rovers.
3. The user must be able to select a rover and power, attach or detach a device, or change battery connections.
4. Either output messages to the Terminal, or create a SwinGame version.

<a name="demo-video"></a>
## Demo video
<embed class="video" width="1600" height="400" style="width: 100%" src="/public/post_img/PlanetaryRover/demo.mp4" scale="aspect" controller="true">
<div class="thecap">Demo video</div>
<a name="object-oriented-design"></a>
## Object Oriented Design
<a name="uml-diagram"></a>
### UML diagram
[Download UML diagram](https://github.com/DungLai/Planetary-Rover-Game/blob/master/ClassDiagram1.png)
<div class="imgcap">
<img style="display: inline-block; width: 100%;" src ="/public/post_img/PlanetaryRover/uml.png" width = "500" align = "center">
<div class="thecap">UML diagram<br></div>
</div>

<a name="source-code"></a>
## Source code
*Demo Identifiable Object Class* 

This is the abstract class for all object in the game, the object will be identified by `id`, it is possible for one object to have multiple ID, `AreYou(string id)` will check if the object have `id` that is in the parameter of `AreYou` method or not. `AddIdentifier(string id)` Add id to list of id for the object.
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Planetary_Rover
{
    public abstract class IdentifiableObject
    {
        private List<String> _identifiers = new List<String>();

        // add list of passed string to list of identifier
        public IdentifiableObject(string[] idents)
        {
            foreach (string s in idents)
            {
                _identifiers.Add(s.ToLower());
            }
        }

        //check if the id is in list or not
        public bool AreYou(string id)
        {
            foreach (string s in _identifiers)
            {
                if (s == id.ToLower())
                {
                    return true;
                }
            }

            return false;
        }

        private static string GetFirstId(List<String> list)
        {
            return list.DefaultIfEmpty("").First();
        }

        //return the first string in the list or empty string if the list is empty
        //this will return "" because it run after string was put into list
        //private readonly string _firstId = GetFirstId(_identifiers);

        public string FirstId
        {
            get
            {
                return GetFirstId(_identifiers);
            }
        }

        //convert id to lower case then add to list of identifier
        public void AddIdentifier(string id)
        {
            _identifiers.Add(id.ToLower());
        }
    }
}
```
[Download Visual Studio Solution](https://github.com/DungLai/Planetary-Rover-Game/blob/master/Planetary%20Rover.zip)