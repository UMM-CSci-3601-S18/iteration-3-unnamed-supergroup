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
