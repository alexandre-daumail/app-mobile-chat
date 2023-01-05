# Mobile chat application


### RESUME
Our mobile application first ask user to register. Once logged, the user can create a channel and chat with other users. The user is also allowed to send private message to another one user.  
<br/>

### LAUNCH
```
cd api
npm install
npm start
```
<br/>

### FOLDER ORGANISATION
- api >
  - src >
    - jwt > 
      - authJwt.js : contains methods to generate / verify token
    - middlewares >
      - authMiddleware.js : contains method to check user credentials (token)
      - roleMiddleware.js : contains method to check user role (user, admin, ...)
      - securityMiddleware.js : contains method who return a value, used to control if user get autorizations to act on specifics endpoints
    - models >
      - channel.model.js : Channel entity
      - channelMessage.model.js : Channel Message entity
      - conversationMessage.model.js : Conversation Message entity
      - app.js : contains Sequelize config and Entity associations (OneToOne, ManyToOne, OneToMany, ManyToMany)
      - user.model.js : User entity
      - userChannel.model.js : User Channel entity
      - userConversation.model.js : User Conversation entity
    - router >
      - channelMessageRouter.js : contains endpoints related to Channel Message Entity
      - channelRouter.js : contains endpoints related to Channel Entity
      - conversationMessageRouter.js : contains endpoints related to User Conversation and Conversation Message Entities
      - userRouter.js : contains endpoints related to User Entity
    - services >
      - channelMessageServices.js : contains methods related to Channel Message Entity
      - channelServices.js : contains methods related to Channel Entity
      - conversationMessageServices.js : contains methods related to User Conversation and Conversation Message Entities
      - userServices.js : contains methods related to User Entity 
