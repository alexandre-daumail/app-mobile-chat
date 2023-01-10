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
const allowedOrigins = [
  `http://localhost:${port}`, 
  'http://localhost:19006',
  'http://127.0.0.1:19006',
];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps or curl requests)
    console.log(origin)
    if(!origin) return callback(null, true);

    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not ' +
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

app.get('/api', (req, res) => {
  return res.status(200).json({
    message: 'welcome to the API. You can try the followings: /users ; /channel ; /channel/users ; /register ; /login'
  })
})

app.listen(port, () => {
  console.log(`Serveur à l'écoute sur le port ${port}`);
})