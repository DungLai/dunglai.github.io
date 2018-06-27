---
layout : post
title : Journey Preparation Tool Project
desc : <div class="tag">3D sound</div><div class="tag">GoogleVR</div><div class="tag">Voice interaction</div><br> An auditory based simulator for blind people. This report shows 3 different web, desktop and android versions that supports ambisonic 3D sound technology with motion-compensation, sound field rotation capability, voice interation and more.
img  : ../public/post-assets/NavigationTrainer/title.gif
---

<h3><a href="https://dunglai.github.io/COM/index.html">Demo web application</a></h3>

<div class="imgcap">
<img style="display: inline-block; width: 100%;" src ="/public/post-assets/NavigationTrainer/poster.png" width = "500" align = "center">
<div class="thecap">Research Poster</div>
</div>


**Content:** 

<!-- MarkdownTOC -->

- Abstract
- 1. Introduction
- 2. Surround Sound Technology
	- 2.1. Ambisonic Technology
	- 2.2. Recording Technique
- 3. Development
	- 3.1. Web Application, voice-based interaction
	- 3.2. Desktop Application, external Headtracker integrated on headphone
	- 3.3. Mobile Application, rotation capability using on device sensor
- 4. User Experience Testing
- 5. Technical Challanges
- Acknowledgement
- Reference

<!-- /MarkdownTOC -->
## Abstract

This report summarizes the development of a long-term scalable technology-enable solution to assist journey preparation for members of vision impaired community. The existing application allows users to familiarize themselves with a specific location in the CBD by letting them experience the immersive auditory-based simulator supported with state-of-the-art surround-sound technology called Ambisonic and dynamic interactive voice interface. 

## 1. Introduction

With almost one in five Australians experiencing some form of disability, a substantial proportion of the community faces challenges to actively participate in city life [1]. This project is developing a long-term scalable technology-enable solution to assist journey preparation for members of vision impaired community. A cross-platform application has been developed to simulate the sensory experience of Flinders Street Railway Station located in the Melbourne CBD. The simulator would allow users to rotate their body and experience the sounds change. 

## 2. Surround Sound Technology

### 2.1. Ambisonic Technology

To achieve an “immersive” experience, Ambisonic Technology [2]: a full-sphere surround sound technique, in addition to the horizontal plane, it covers sound sources above and below the listener. 3D audio can be reproduced over many loudspeakers positioned all around the listener. For the scope of the project, the 3D audio is played through the headphone, the technology used is called Binaural Synthesis. It consists of simulating, at someone’s eardrums, the same acoustical sound field produced as one which would have been produced by a real audio scene. This immersive 3D audio will assist people with vision impairment to visualize the surrounding areas in conjunction with improving their mental mapping skills.  

<div class="imgcap">
<img style="display: inline-block; width: 40%;" src ="/public/post-assets/NavigationTrainer/fig1.png" width = "500" align = "center">
<div class="thecap">Fig. 1. Stereo sound and 3D audio comparison [3]</div>
</div>

### 2.2. Recording Technique

Sounds are recorded by a tetrahedron microphone, which contains 4 capsules pointing toward 4 different directions (fig 2.1), to get 4-channel monophonic A-format. This is converted into 4-channel B-format, encoding the directional information of a given three-dimensional sound field to four channels called W, X, Y, Z using mathematical formula (fig 2.2)

<div class="imgcap" style="text-align: center;">
<img style="display: inline-block; width: 30%;" src ="/public/post-assets/NavigationTrainer/mic.PNG" width = "500" align = "center">
<img id="fig1" style="display: inline-block; width: 30%;" src ="/public/post-assets/NavigationTrainer/math.png" width = "500" align = "center">
</div>
<div style="clear:left"></div>
<div class="thecap">Fig. 2. (1) soundfield microphone , (2) B-format encoding formula [2]</div>

Where $$s_i$$ are mono audio signal recorded by each individual capsule we want to encode at the position $$\phi$$ (horizontal angle (azimuth) phi), and $$\theta$$ (vertical angle (elevation) theta) [2].
The microphone we utilized is called Sennheiser Ambeo VR Mic, an application is provided with the Mic with the capability of converting sound file from A to B. This software works as a VST2 or VST3 plugin, which can be used in any digital audio workstation (DAW) for editing purposes. Reaper software (a complete digital audio production application) is used within the project to generate a set of B-format audio files.

<div class="imgcap">
<img style="display: inline-block; width: 55%;" src ="/public/post-assets/NavigationTrainer/fig3.png" width = "500" align = "center">
<div class="thecap">Fig. 1. Stereo sound and 3D audio comparison [3]</div>
</div>

## 3. Development

### 3.1. Web Application, voice-based interaction

The Ambisonic sound capsules have been encoded in 360 videos, recorded by Garmin Virb 360 Video Camera, using Facebook 360 Encoder (image on the right) and deployed on YouTube. To upload 360 videos with 3D audio on YouTube, the audio must be a 4 channels B-format with first-order ambiX, ACN ordering, and SN3D normalization. This will make the video compatible with VR mode, allowing users to use Google Cardboard or Oculus Rift to navigate and change direction. The video can also be rotated by sliding the video using a mouse or using WASD keys on the keyboard or using the controller on the top left of the video

<div class="imgcap">
<img style="display: inline-block; width: 30%;" src ="/public/post-assets/NavigationTrainer/encoder.png" width = "500" align = "center">
<div class="thecap">Fig: Facebook 360 Encoder</div>
</div>

Users can interact with the interface using either voice or text commands and then narration will be played back upon user’s request. This function is based on [Web Speech API](https://www.google.com/chrome/demos/speech.html) [6], a JavaScript API provided by Google Inc to enable web developers to incorporate speech recognition and synthesis into web pages. Here are current support commands that users can interact with the web interface via microphone.

* Help – provide a list of available commands for users
* What is this – describe the project and website
* Where am I – describe the place where the video was recorded
* Describe – describe the surrounding environment
* When recorded – show the time when the video was recorded
* Next location – play the next video
* Replay – replay the current video
* Hi/ Hello – guide user to help command.
* Start Exploring – play the first location (outside Flinders Street Station entrance)

<div class="imgcap">
<img style="display: inline-block; width: 80%;" src ="/public/post-assets/NavigationTrainer/web_interface.png" width = "500" align = "center">
<div class="thecap">Fig. 4. Web application interface </div> Link to Web Demo: https://dunglai.github.io/COM/index.html
</div>

### 3.2. Desktop Application, external Headtracker integrated on headphone

A Desktop application is also being developed using Max/MSP, a visual programming language, to explore the use of headtracking, allowing the tracking of yaw-pitch-roll value that determine the orientation of the head/body. This value is used to change sound field and generate directional narration. 

<div class="imgcap">
<img style="display: inline-block; width: 25%;" src ="/public/post-assets/NavigationTrainer/rotation.png" width = "500" align = "center">
<div class="thecap">Fig: 3 values that define the orientation in 3D space</div>
</div>

The Hedrot head tracker [9] is successfully implemented and the integration is shown in figure 4. By separate the Yaw value from the head tracker into 4 quarters representing front, left, right and back, the surround area will be described so that description is on-request and dynamically adjusted based on head direction.

<div class="imgcap">
<img style="display: inline-block; width: 55%;" src ="/public/post-assets/NavigationTrainer/fig5.png" width = "500" align = "center">
<div class="thecap">Fig. 5. Teensy board parts – Schematics – Build head tracker – Integration on the headphone</div>
</div>

The implementation of Hedrot headtracker and desktop application is done in Max/MSP programming language.

<div class="imgcap">
<img style="display: inline-block; width: 55%;" src ="/public/post-assets/NavigationTrainer/maxmsp_interface.png" width = "500" align = "center">
<div class="thecap">Fig. 6. Desktop application interface </div>
</div>

### 3.3. Mobile Application, rotation capability using on device sensor

In the process of building a proof of concept in a variety of platforms, an Android application was developed, allowing users to experience immersive spatial audio recorded in various locations on Flinders Street Station. The application is capable of changing soundfield using hardware-based sensors which are physical components built into a handset or tablet device. Specifically, data is extracted from the geomagnetic field sensor in combination with the accelerometer using android sensor API [8] to determine a device's position relative to the magnetic north pole, this orientation data in quaternion format is then passed through Google VR audio engine to rotate Ambisonic soundfield.

The [Google VR audio engine](https://developers.google.com/vr/reference/android/com/google/vr/sdk/audio/GvrAudioEngine) [7] allows the user to spatialize sound sources in 3D space, including distance and height cues. The GvrAudioEngine is capable of playing back spatial sound in two separate ways: Sound Object rendering, allows the user to create a virtual sound source in 3D space, the second method allows the user to play back Ambisonic soundfield. The first method was used to create the artificial directional audio narration of surrounding environment and objects, the second method was used to playback Ambisonic audio files recorded in real-time using Sennheiser Ambeo VR Microphone.

<div class="imgcap">
<img style="display: inline-block; width: 40%;" src ="/public/post-assets/NavigationTrainer/mobile_interface.png" width = "500" align = "center">
<div class="thecap">Fig. 7. Android application interface </div>
</div>

[Github link to Java code](https://github.com/DungLai/Navigation-Trainer)

Get Jaw-Pitch-Roll from android sensor:

```java
public class MainActivity extends Activity {
    private float[] mOrientation;
    private float[] mQuaternion;
    private float[] mMagneticField;
    private float[] mGravity;
    private float mAzimut;
    private float mPitch;
    private float mRoll;
    SensorManager sm = null;
    TextView textView1 = null;
    TextView testView;
    List list;

    SensorEventListener sel = new SensorEventListener(){
        public void onAccuracyChanged(Sensor sensor, int accuracy) {}
        public void onSensorChanged(SensorEvent event) {
            if (event.sensor.getType() == Sensor.TYPE_MAGNETIC_FIELD)
                mMagneticField = event.values;
            if (event.sensor.getType() == Sensor.TYPE_ACCELEROMETER)
                mGravity = event.values;
            if ((mGravity == null) || (mMagneticField == null)) {
                textView1.setText("null");
                return;
            }

            float R[] = new float[9];
            float I[] = new float[9];
            boolean success = SensorManager.getRotationMatrix(R, I, mGravity, mMagneticField);
            if (success) {
                mOrientation = new float[3];
                mQuaternion = new float[4];
                SensorManager.getOrientation(R, mOrientation);
                mAzimut = mOrientation[0]; // orientation contains: azimut, pitch and roll
                mPitch = mOrientation[1];
                mRoll = mOrientation[2];

                SensorManager.getQuaternionFromVector(mQuaternion, mOrientation);
            }
            gvrAudioEngine.setSoundfieldRotation(soundFieldId, mQuaternion[0], mQuaternion[1], mQuaternion[2], mQuaternion[3]);

            // print rotation value to screen
            textView1.setText("x: "+ mAzimut +"\ny: "+ mPitch +"\nz: "+ mRoll);
        }
    };
 }
```

Load soundfield using GoogleVR audio engine and pass data from sensor:

```java
public class MainActivity extends Activity {
    private GvrAudioEngine gvrAudioEngine;
//    private volatile int sourceId = GvrAudioEngine.INVALID_ID;
    private volatile int soundFieldId = GvrAudioEngine.INVALID_ID;


        // Initialize 3D audio engine.
        gvrAudioEngine = new GvrAudioEngine(this, GvrAudioEngine.RenderingMode.BINAURAL_LOW_QUALITY);

        radbut2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                gvrAudioEngine.stopSound(soundFieldId);
                soundFieldId = gvrAudioEngine.createSoundfield("2-Bformat-32bits.wav");
                gvrAudioEngine.setSoundVolume(soundFieldId, 40);
                gvrAudioEngine.playSound(soundFieldId, true);
                testView.setText("Currently playing: Location 2");
            }
        });

    @Override
    protected void onStop() {
        if(list.size()>0){
            sm.unregisterListener(sel);
        }
        super.onStop();
    }
}
```

## 4. User Experience Testing 

The information being delivered by the app is refined constantly during the project to ensure that users will be benefited by the given information. A small consultation has been made with [Lil Deverell](http://www.lildeverell.net/) – an orientation and mobility specialist with the aim of improving the quality of the overall system. It is suggested to add doppler effect in the platform, showing when and where trains are going, the transition between locations, the sound of cane, GPS sequence instructions in linear order. These factors will help users develop mental mapping skills. Furthermore, videos should be captured at different time of day and ideally, in crowded and pressure environment, crossroad route should also be recorded. This will prepare them with the real pressure of navigating around the city on their own and reduce their stress.

Improvement could also be done to existing directional description. The information provided need to have learned elements. The users should be notified when their orientation is perpendicular to the train lines or aligned with the train direction. Information such as tactile pavers and objects they can hear in real-time is also beneficial in making educated guesses. Information is not restricted to visual, non-visual cue such as smells, materials, temperature, wind, light pulse (for people with low vision), lift, entrance point, coffee shop sounds, barrier, reflect sound, consistent sound, and toilet. Additionally, information about the structure of the area will help users to get the big picture. Another significant detail that help reducing stress is preparing them to find convenient spots to wait for someone, this could be corners, spots where low vision people can lean on, solid objects that they can touch, and balance surface, this prevents them from standing on the way of other people. Lastly, the source of assistance is also as important as other factors.


## 5. Technical Challanges

Currently, the existing feature of the system has many technical aspects that need to be investigated. The Ambisonic playback on mobile application produces some form of white noise when the sound fields are being changed, audio processing techniques can be applied to reduce the level of white noise (the mixture of different frequency). Voice recognition and gesture recognition are useful features of the mobile application, it helps people with vision impairment interact with the application without other sources of assistance. Each Ambisonic B-format file contains 4 channels with high fidelity sound quality, this leads to the increase in memory if files are encoded in the Android app itself. However, the Android application has limited heap space, other approaches such as uploading sound files to the cloud and let users download them individually can solve the problem. Currently, users must put their Android device horizontally to correctly rotate the sound field, this is not effective and unusual for users. The application should allow users to point the device toward the directions that they want to rotate into. 

## Acknowledgement

The authors would like to thank Stuart Favilla, David Sly, Lil Deverell, Denny Myer and other faculty members of Swinburne University as well as other summer internship students for providing insight and expertise and equipment that greatly assisted the research and development.

## Reference

[1]	Open Innovation Competition on Accessibility [http://www.melbourne.vic.gov.au/about-melbourne/melbourne-profile/smart-city/Pages/innovation-competition-city-accessibility.aspx]

[2]	An Introduction to Higher Order Ambisonic by Florian Hollerweger, 2008 [http://flo.mur.at/writings/HOA-intro.pdf]

[3]	3D Audio, 3D sound lab [http://pro.3dsoundlabs.com/category/intro-to-3d-audio/]

[4]	Ambeo software for virtual Reality [https://en-us.sennheiser.com/ambeo-blueprints-virtual-reality]

[5]	Add Spatial Audio to a Video For YouTube [https://fb360spatialworkstation.zendesk.com/hc/en-us/articles/207888189-Add-Spatial-Audio-to-a-Video-For-YouTube]

[6]	Web Speech API [https://w3c.github.io/speech-api/speechapi.html]

[7] 	Google VR Audio Engine for Android [https://developers.google.com/vr/reference/android/com/google/vr/sdk/audio/GvrAudioEngine]

[8]  Android Sensor API [https://developer.android.com/guide/topics/sensors/sensors_overview.html]

[9]  Hedrot headtracker [https://abaskind.github.io/hedrot/] 


[Download Technical Report in PDF]()

[Download Poster]()
