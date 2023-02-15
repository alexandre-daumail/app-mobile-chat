const db = require("../models");

function Socket(io) {
  return io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('create-user-channel', (id) => {
      socket.emit("get-user-channel", id);
    })

    socket.on('create-channel', (id) => {
      socket.emit("get-user-channel", id);
    })

    socket.on('get-public-channel', async () => {
      const channels = await db.channel.findAll({
        order: [
          ['created_at', 'DESC'],
        ],
        attributes: [
          'id', 
          'name',
          'creator',
          'private',
          'created_at',
        ],
        where: {
          private: 0,
        },
      })

      console.log(channels)

      socket.emit("publicChannelList", channels);
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

    socket.on('get-channel-msg', async (id) => {
      const channelMessage = await db.channelMessage.findAll({
        order: [
          ['created_at', 'ASC'],
        ],
        attributes: [
          'id', 
          'user_id', 
          'message', 
          'created_at', 
          'updated_at'
        ],
        include: [
          { 
            model: db.user,
            attributes: ['firstname', 'lastname']
          },
        ],
        where: { channel_id: id }
      })

      socket.emit("channelMsg", channelMessage);
      socket.broadcast.emit("channelMsg", channelMessage);
    })

    socket.on('get-conversation-msg', async (id) => {
      const conversationMessage = await db.conversationMessage.findAll({
        order: [
          ['created_at', 'ASC'],
        ],
        attributes: [
          'id', 
          'user_id_from',
          'user_id_to',
          'message', 
          'created_at', 
          'updated_at'
        ],
        include: [
          { 
            model: db.user, as: 'id_from',
            attributes: ['id', 'firstname', 'lastname']
          },
          { 
            model: db.user, as: 'id_to',
            attributes: ['id', 'firstname', 'lastname']
          },
        ],
        where: { conversation_id: id }
      })
  
      socket.emit("conversationMsg", conversationMessage);
      socket.broadcast.emit("conversationMsg", conversationMessage);
    })
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  
}

module.exports = {
  Socket,
}