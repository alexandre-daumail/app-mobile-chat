const bcrypt = require('bcrypt');


async function LoadDefaultData(db) {
  const john_pwd = await bcrypt.hash('test33', 12).then(hash => {
    return hash;
  });
  const jane_pwd = await bcrypt.hash('test33', 12).then(hash => {
    return hash;
  });

  db.user.create({
    username: 'JohnDoe',
    email: 'johndoe@gmail.com',
    password: john_pwd,
    firstname: 'John',
    lastname: 'Doe',
  })
  .then(user => {
    db.channel.create({
      name: 'Développeur Python',
      private: true,
      creator: user.id,
    })
    .then(channel => {
      db.userChannel.create({
        UserId: channel.creator,
        ChannelId: channel.id,
      })
    })
  })

  db.user.create({
    username: 'JaneDoe',
    email: 'janedoe@gmail.com',
    password: jane_pwd,
    firstname: 'Jane',
    lastname: 'Doe',
  })
  .then(user => {
    db.channel.create({
      name: 'Développeur Javascript',
      creator: user.id,
    })
    .then(channel => {
      db.userChannel.create({
        UserId: channel.creator,
        ChannelId: channel.id,
      })

      db.channelMessage.create({
        message: 'Lorem ipsum dolor sit amet. Nulla ut fringilla odio. Donec placerat metus in diam consectetur eleifend. Sed vitae eros mi.',
        user_id: channel.creator,
        channel_id: channel.id
      })

      db.channelMessage.create({
        message: 'Lorem ipsum dolor sit amet. Morbi tincidunt mi elit, nec feugiat neque auctor eget.',
        user_id: channel.creator,
        channel_id: channel.id
      })
    })
  })


  // GET CONVERSATIONS
  const conversation = await db.userConversation.findAll();

  if (conversation.length <= 1) {
    // GET JOHN DOE
    const john = await db.user.findOne({ where: { 
      email: 'johndoe@gmail.com'
    }});

    // GET JANE DOE
    const jane = await db.user.findOne({ where: { 
      email: 'janedoe@gmail.com'
    }});

    db.userConversation.create({
      user_id_from: john.id,
      user_id_to: jane.id,
    })
    .then(data => {
      db.conversationMessage.create({
        message: 'Hello Jane, how are you today ? See ya soon',
        user_id_from: data.user_id_from,
        user_id_to: data.user_id_to,
        conversation_id: data.id,
      })
      db.conversationMessage.create({
        message: 'Hi John, not so bad and what about you ? See ya soon',
        user_id_from: data.user_id_to,
        user_id_to: data.user_id_from,
        conversation_id: data.id,
      })
    })
  }
}


module.exports = {
  LoadDefaultData
}