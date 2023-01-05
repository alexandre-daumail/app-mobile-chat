const userRouter = require('./router/userRouter');
const channelRouter = require('./router/channelRouter');
const channelMessageRouter = require('./router/channelMessageRouter')
const conversationMessageRouter = require('./router/conversationMessageRouter')

const express = require('express');
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(userRouter);
app.use(channelRouter);
app.use(channelMessageRouter)
app.use(conversationMessageRouter)

app.get('*', (req, res) => {
  return res.status(404).json({ 
    message: 'Page not found. You can try the followings: /users ; /channel ; /channel/users ; /register ; /login' 
  })
})

module.exports = app;