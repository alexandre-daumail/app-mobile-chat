const { rolesMiddleware } = require("../middlewares/roleMiddleware");
const db = require("../models");
const Channel = db.channel;


/* 
  PUBLIC : 
  GROUPES LIST 
*/
async function getAllChannel(req, res){
  return Channel.findAll({
    attributes: ['name']
  })
  .then(groups => {
    res.json(groups);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Channel."
    });
  });
}


/* 
  PUBLIC : 
  GROUPES LIST WITH USERS
*/
async function getAllUsersInChannel(req, res){
  await Channel.findAll({
    attributes: ['name'],
    include: [
      { 
        model: db.user, 
        attributes: ['firstname', 'lastname']
      }
    ]
  })
  .then(channel => {
    res.json(channel);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Channel."
    });
  });
}


/* 
  PRIVATE (ADMIN) : 
  CREATE A GROUP 
*/
async function createChannel(req, res){
  const userRole = await rolesMiddleware(req.body.tokenData);

  const channel = {
    name: req.body.name,
  };

  if(userRole === 'ADMIN') {
    Channel.create(channel)
    .then(data => {
      res.send({
        message: `Channel ${data.name} was created successfully.`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Channel."
      });
    });
  } else {
    res.status(500).send({
      message: "You're not autorized to create a Channel"
    });
  }
}


/* 
  PRIVATE (ADMIN) : 
  UPDATE A GROUP
*/
async function updateChannel(req, res){
  const id = req.params.id;

  const userRole = await rolesMiddleware(req.body.tokenData);

  if(userRole === 'ADMIN') {
    Channel.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Channel name was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Channel name with id n°${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Channel name with id n°" + id
      });
    });
  } else {
    res.status(500).send({
      message: "You're not autorized to update a Channel"
    });
  }
}

/* 
  PUBLIC : 
  GROUPES LIST WITH USERS
*/
async function updateUsersInChannel(req, res){
  const id = req.params.id;
  const usersArray = req.body.Users;
  const newUsersArray = [];

  const userRole = await rolesMiddleware(req.body.tokenData);

  if(userRole === 'ADMIN') {
    const channelExist = await Channel.findByPk(id);

    if(!channelExist) res.send({ message: "This Channel doesn't exists"});

    for (const user of usersArray) {
      let userToUpdate = await db.user.update(
        { channel_id: id },
        { where: { id: user }}
      )

      newUsersArray.push(userToUpdate)
    }

    if(newUsersArray.length == usersArray.length) {
      res.send({
        message: "User channel was added successfully."
      });
    } else {
      res.send({
        message: "Error updating channel's users. This channel may not exists"
      });
    }
  } else {
    res.status(500).send({
      message: "You're not autorized to modify users in a channel"
    });
  }
}


/* 
  PRIVATE (ADMIN) : 
  DELETE A GROUP
*/
async function deleteChannel(req, res){
  const id = req.params.id;

  const user = {
    channel_id: null,
  };

  const userRole = await rolesMiddleware(req.body.tokenData);

  if(userRole === 'ADMIN') {
    await db.user.update(user, {
      where: { channel_id: id }
    });

    Channel.destroy({
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Channel was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Channel with id n°${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Channel with id n°" + id
      });
    });
  } else {
    res.status(500).send({
      message: "You're not autorized to delete a Channel"
    });
  }
}


module.exports = {
  getAllChannel,
  getAllUsersInChannel,
  createChannel,
  updateChannel,
  updateUsersInChannel,
  deleteChannel
}