const userRouter = require('./router/userRouter');
const channelRouter = require('./router/channelRouter');
const channelMessageRouter = require('./router/channelMessageRouter');
const conversationRouter = require('./router/conversationRouter');
const conversationMessageRouter = require('./router/conversationMessageRouter');
const port = 3000;

const express = require('express');
const cors = require('cors')
const app = express();

const db = require('./models');

/** SOCKET.IO */
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

/** DATABASE SYNCHRONISATION */
db.sequelize.sync()
.then(() => { console.log('Synced db.') })
.catch((err) => { console.log('Error : ' + err.message) });

/** CORS ORIGIN */
const allowedOrigins = [`http://localhost:${port}`, 'http://yourapp.com'];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);

    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

/** API */
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