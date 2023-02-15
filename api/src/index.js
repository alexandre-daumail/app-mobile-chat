const userRouter = require('./router/userRouter');
const channelRouter = require('./router/channelRouter');
const channelMessageRouter = require('./router/channelMessageRouter');
const conversationRouter = require('./router/conversationRouter');
const conversationMessageRouter = require('./router/conversationMessageRouter');

const port = 3001;

const express = require('express');
const cors = require('cors')
const app = express();

const db = require('./models');

const http = require('http');
const { Server } = require("socket.io");
const { Socket } = require('./socket');


/** DATABASE SYNCHRONISATION */
db.sequelize.sync()
.then(() => { 
  console.log('Synced db.') 
})
.catch((err) => { 
  console.log('Error : ' + err.message) 
});


/** CORS ORIGIN */
const allowedOrigins = [
  `http://localhost:${port}`,
  'http://localhost:19006',
  'http://127.0.0.1:19006',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps or curl requests)
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

app.use(
  userRouter, 
  channelRouter, 
  channelMessageRouter, 
  conversationRouter, 
  conversationMessageRouter
);

app.get('/api', (req, res) => {
  return res.status(200).json({
    message: 'welcome to the API. You can try the followings: /users ; /channel ; /channel/users ; /register ; /login'
  })
})

const server = http.createServer(app);
const io = new Server(server);

Socket(io);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
