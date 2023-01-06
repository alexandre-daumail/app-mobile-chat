const userRouter = require('./router/userRouter');
const channelRouter = require('./router/channelRouter');
const channelMessageRouter = require('./router/channelMessageRouter');
const conversationRouter = require('./router/conversationRouter');
const conversationMessageRouter = require('./router/conversationMessageRouter');
const port = 3000;

const express = require('express');
const app = express();

const db = require('./models');

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

db.sequelize.sync()
.then(() => {
  console.log('Synced db.');
})
.catch((err) => {
  console.log('Error : ' + err.message);
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(userRouter);
app.use(channelRouter);
app.use(channelMessageRouter);
app.use(conversationRouter);
app.use(conversationMessageRouter);

app.get('*', (req, res) => {
  return res.status(404).json({ 
    message: 'Page not found. You can try the followings: /users ; /channel ; /channel/users ; /register ; /login' 
  })
})

app.listen(port, () => {
  console.log(`Serveur à l'écoute sur le port ${port}`);
})