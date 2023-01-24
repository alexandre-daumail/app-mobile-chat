# REACT NATIVE APPLICATION

### RESUME
Our mobile application first ask user to register. Once logged, the user can create a channel and chat with other users. The user is also allowed to send private message to another one user.  
<br/>

### STACK
```
React Native, Expo, React,
React Navigation, Async Storage
``` 
<br/>

## LAUNCH
```
npm run ios

i (reload on ios emulator)
r (reload application)
```
<br/>

## ARCHITECTURE OF SRC FOLDER
- Components >
  - button
  - flatlist
  - header
  - input
  - keyboard
  - iconbutton
<br/>

- Navigators >
  - AuthNavigator : Auth screens (not logged in)
  - ChannelNavigator : Channel screens
  - ConversationScreen : Conversation screens
  - ProfilNavigator : User screens
  - LoggedInNavigator : ChannelNavigator, ConversationScreen and ProfilNavigator (logged in)
<br/>

- Screens >
  - Auth >
    - Login : (POST registered user)
    - Register : (POST new user)
    - Welcome : (HomeScreen with buttons to go to Login or Register)
  - Channel >
    - Channel (GET messages and DELETE message one by one if user is the owner)
    - ChannelCreate (POST create a new channel and go to ChannelUsers to add new users)
    - Channels (GET public and private channels)
    - ChannelSettings (GET channel infos, PUT channel name, DELETE channel)
    - ChannelUsers (GET users in and not in the group, POST and DELETE user from groupe if creator)
  - Conversation >
    - Conversation (GET messages and DELETE message on by one)
    - Conversations (GET conversations list and users list)
    - ConversationSettings (POST blocked value and DELETE conversation)
  - User >
    - Profil (GET user informations)
    - ProfilUpdate (PUT user informations)
<br/>

- Security >
  - Api : contains all the CRUD requests with JWT or not
  - AsyncStorage : contains local storage using React-Native AsyncStorage package (access_token, refresh_token, user_id)
  - Context : contains init of useContext hook
  - Credential : contains functions to get, set and reset credentials. Futhermore, contains regenerate token function
<br/>

- Style >
  - common.style : contains default values
  - style : contains 'class' using default values from common.style