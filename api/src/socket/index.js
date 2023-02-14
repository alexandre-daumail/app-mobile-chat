const db = require("../models");

function Socket(io) {
  return io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('create-channel', async (id) => {
      console.log('channel created !')
      socket.emit("get-user-channel", id);
    })

    socket.on('get-user-channel', async (id) => {
      const userChannel = await db.userChannel.findAll({
        attributes: [
          'id', 
          'user_id',
          'channel_id',
        ],
        include: [
          { 
            model: Channel,
            attributes: ['id', 'name', 'private']
          },
        ],
        where: { user_id: id }
      })

      socket.emit("userChannelList", userChannel);
    })
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}

module.exports = {
  Socket,
}