# CSCI 3601 Production Template -- Spring 2018 Iteration 2 Notes
[![Build Status](https://travis-ci.org/munnsmunns/iteration-2-bed-mia.svg?branch=master)](https://travis-ci.org/munnsmunns/iteration-2-bed-mia)
<!-- TOC depthFrom:1 depthTo:5 withLinks:1 updateOnSave:1 orderedList:0 -->
## Table of Contents
- [Credits](#credits)
<!-- /TOC -->

## Credits

Emoji credits: 

https://www.flaticon.com/packs/emoji-3

Notes related to login:
- Currently we do not use google authentication properly so that would need to be implemented.
- As is a 'bad guy' could spoof a users email and access their information.
- The solution we have here is a step above showing all users info.

What to do next:
- Fix css for phones on journal
- Implement google authentication
- Change color scheme
- Add dark theme switcher
- Fix e2e test for edit a journal entry
- Add e2e test for reports
- More java coverage
- Add a secondary check on the server side for the email being defined
    - If it's not make sure not to return anything to the client

##Emoji Folders
- 1 = angry 
- 2 = anxious
- 3 = happy
- 4 = meh
- 5 = sad

##Emoji Animation Html
                        <!--Emoji Mood 1 -->
                        <div *ngIf="emoji.mood == 1">
                            <!-- If swiped from Left -->
                            <div *ngIf="parseSwipeDirection(emoji.mood) == 'left'">
                                <div class="w3-container w3-center" style="overflow-x:hidden">
                                    <img draggable="false" class="w3-animate-left" id="emoji1FromLeft" src="assets/Emojis/{{emoji.mood}}/{{emoji.intensity}}.png" style="width:33%;height:33%">
                                </div>
                            </div>

                            <!-- If swiped from Right -->
                            <div *ngIf="parseSwipeDirection(emoji.mood) == 'right'">
                                <div class="w3-container w3-center" style="overflow-x:hidden">
                                    <img draggable="false" class="w3-animate-right" id="emoji1FromRight" src="assets/Emojis/{{emoji.mood}}/{{emoji.intensity}}.png" style="width:33%;height:33%">
                                </div>
                            </div>
                        </div>

                        <!--Emoji Mood 2 -->
                        <div *ngIf="emoji.mood == 2">
                            <!-- If swiped from Left -->
                            <div *ngIf="parseSwipeDirection(emoji.mood) == 'left'">
                                <div class="w3-container w3-center" style="overflow-x:hidden">
                                    <img draggable="false" class="w3-animate-left" id="emoji2FromLeft" src="assets/Emojis/{{emoji.mood}}/{{emoji.intensity}}.png" style="width:33%;height:33%">
                                </div>
                            </div>

                            <!-- If swiped from Right -->
                            <div *ngIf="parseSwipeDirection(emoji.mood) == 'right'">
                                <div class="w3-container w3-center" style="overflow-x:hidden">
                                    <img draggable="false" class="w3-animate-right" id="emoji2FromRight" src="assets/Emojis/{{emoji.mood}}/{{emoji.intensity}}.png" style="width:33%;height:33%">
                                </div>
                            </div>
                        </div>


                        <!--Emoji Mood 3 -->
                        <div *ngIf="emoji.mood == 3">
                            <!-- If swiped from Left -->
                            <div *ngIf="parseSwipeDirection(emoji.mood) == 'left'">
                                <div class="w3-container w3-center" style="overflow-x:hidden">
                                    <img draggable="false" class="w3-animate-left" id="emoji3FromLeft" src="assets/Emojis/{{emoji.mood}}/{{emoji.intensity}}.png" style="width:33%;height:33%">
                                </div>
                            </div>

                            <!-- If swiped from Right -->
                            <div *ngIf="parseSwipeDirection(emoji.mood) == 'right'">
                                <div class="w3-container w3-center" style="overflow-x:hidden">
                                    <img draggable="false" class="w3-animate-right" id="emoji3FromRight" src="assets/Emojis/{{emoji.mood}}/{{emoji.intensity}}.png" style="width:33%;height:33%">
                                </div>
                            </div>

                            <!-- Special case: When the object is first created -->
                            <div *ngIf="parseSwipeDirection(emoji.mood) == 'none'">
                                <img draggable="false" id="currentEmoji" src="assets/Emojis/{{emoji.mood}}/{{emoji.intensity}}.png" style="width:33%;height:33%">
                            </div>
                        </div>

                        <!--Emoji Mood 4 -->
                        <div *ngIf="emoji.mood == 4">
                            <!-- If swiped from Left -->
                            <div *ngIf="parseSwipeDirection(emoji.mood) == 'left'">
                                <div class="w3-container w3-center" style="overflow-x:hidden">
                                    <img draggable="false" class="w3-animate-left" id="emoji4FromLeft" src="assets/Emojis/{{emoji.mood}}/{{emoji.intensity}}.png" style="width:33%;height:33%">
                                </div>
                            </div>

                            <!-- If swiped from Right -->
                            <div *ngIf="parseSwipeDirection(emoji.mood) == 'right'">
                                <div class="w3-container w3-center" style="overflow-x:hidden">
                                    <img draggable="false" class="w3-animate-right" id="emoji4FromRight" src="assets/Emojis/{{emoji.mood}}/{{emoji.intensity}}.png" style="width:33%;height:33%">
                                </div>
                            </div>
                        </div>


                        <!--Emoji Mood 5 -->
                        <div *ngIf="emoji.mood == 5">
                            <!-- If swiped from Left -->
                            <div *ngIf="parseSwipeDirection(emoji.mood) == 'left'">
                                <div class="w3-container w3-center" style="overflow-x:hidden">
                                    <img draggable="false" class="w3-animate-left" id="emoji5FromLeft" src="assets/Emojis/{{emoji.mood}}/{{emoji.intensity}}.png" style="width:33%;height:33%">
                                </div>
                            </div>

                            <!-- If swiped from Right -->
                            <div *ngIf="parseSwipeDirection(emoji.mood) == 'right'">
                                <div class="w3-container w3-center" style="overflow-x:hidden">
                                    <img draggable="false" class="w3-animate-right" id="emoji5FromRight" src="assets/Emojis/{{emoji.mood}}/{{emoji.intensity}}.png" style="width:33%;height:33%">
                                </div>
                            </div>
                        </div>
