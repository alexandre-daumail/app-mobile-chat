const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../jwt/authJwt');
const { securityMiddleware } = require('../middlewares/securityMiddleware');

const db = require("../models");
const User = db.user;
const UserChannel = db.userChannel;

require('dotenv').config()


/* PUBLIC : USERS LIST */
async function getAllUsers(req, res) {
  await User.findAll({
    attributes: [
      'id',
      'username',
      'firstname', 
      'lastname',
    ]
  })
  .then(users => {
    res.status(200).send({
      status: 'Success',
      data: users,
    });
  })
  .catch(err => {
    res.status(500).send({
      status: 'Error',
      message: err.message,
    });
  });
};


/* PUBLIC : REGISTER */
async function createUser(req, res){
  const hash_pwd = await bcrypt.hash(req.body.password, 12).then(hash => {
    return hash;
  });

  const user = {
    username: req.body.username,
    email: req.body.email,
    password: hash_pwd,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  User.create(user)
  .then(user => {
    res.status(201).send({
      status: 'Success',
      data: {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      }
    });
  })
  .catch(err => {
    res.status(500).send({
      status: 'Error',
      message: err.message,
    });
  });
}


/* PUBLIC : LOGIN */
async function getJwt(req, res){
  const user = await User.findOne({ where: { 
    email: req.body.email
  }})

  try {
    if(user) {
      await bcrypt.compare(req.body.password, user.password)
      .then(jwt => {
        if(jwt == true) {
          const token = generateToken(user);
          const refreshToken = generateRefreshToken(user);
          res.status(201).send({
            status: 'Success',
            data: {
              user_id: user.id,
              user_email: user.email,
              access_token: token,
              refresh_token: refreshToken,
            }
          })
        } else {
          res.status(404).send({
            status: 'Error',
            message: 'Error. Wrong login or password'
          });
        }
      });
    }
  }
  catch(err) {
    res.status(500).send({
      status: 'Error',
      message: err.message,
    });
  }
}


/* PRIVATE : USER INFORMATION */
async function getOneUser(req, res){
  const id = req.params.id;
  const userToken = req.body.tokenData;

  const userControl = await securityMiddleware(userToken, id);

  if((userControl === 1) || (userControl === 2)) {
    User.findByPk(id, {
      attributes: [
        'id',
        'username',
        'firstname', 
        'lastname',
        'email',
        'created_at'
      ],
    })
    .then(user => {
      if (user) {
        res.status(200).send({
          status: 'Success',
          data: user,
        });
      } else {
        res.status(404).send({
          status: 'Error',
          message: `Cannot find User with id n°${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: 'Error',
        message: err.message,
      });
    });
  } else {
    res.status(500).send({
      status: 'Error',
      message: "You're not autorized to see user informations",
    });
  }
}


/* PRIVATE : JOIN A GROUP */
async function userJoinChannel(req, res){  
  const id = req.params.id;
  const channelId = req.params.channel_id;
  const userToken = req.body.tokenData;
  
  const userControl = await securityMiddleware(userToken, id);

  if((userControl === 1) || (userControl === 2)) {
    const joinChannel = {
      UserId: id,
      ChannelId: channelId,
    };
  
    UserChannel.create(joinChannel)
    .then(userChannel => {
      res.status(201).send({
        status: 'Success',
        data: userChannel,
      })
    })
    .catch(err => {
      res.status(500).send({
        status: 'Error',
        message: err.message,
      });
    });
  } else {
    res.status(500).send({
      status: 'Error',
      message: "You're not autorized to make this action",
    });
  }
}


/* PRIVATE : UPDATE AN USER */
async function updateUser(req, res){
  const id = req.params.id;
  const userToken = req.body.tokenData;

  const userControl = await securityMiddleware(userToken, id);

  if((userControl === 1) || (userControl === 2)) {
    User.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status: 'Success',
          data: {
            user_id: id,
            updated: req.body,
          }
        });
      } else {
        res.status(500).send({
          status: 'Error',
          message: "Cannot update user. Please retry."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: 'Error',
        message: err.message,
      });
    });
  } else {
    res.status(500).send({
      status: 'Error',
      message: "You're not autorized to update user informations",
    });
  }
}


/* PRIVATE : DELETE AN USER */
async function deleteUser(req, res){
  const id = req.params.id;
  const userToken = req.body.tokenData;

  const userControl = await securityMiddleware(userToken, id);

  if((userControl === 1) || (userControl === 2)) {
    User.destroy({
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status: 'Success',
          data: {
            user_id: id,
            info: "User was deleted successfully!",
          }
        });
      } else {
        res.status(500).send({
          status: 'Error',
          message: `Cannot delete User with id n°${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: 'Error',
        message: err.message,
      });
    });
  } else {
    res.status(500).send({
      status: 'Error',
      message: "You're not autorized to delete user informations",
    });
  }
}


async function refreshToken(req, res) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if(token == null) {
    return res.status(401).send({
      status: 'Error',
      message: 'Empty token',
    })
  }

  verifyRefreshToken(res, token);
}


module.exports = {
  getAllUsers,
  createUser,
  getJwt,
  getOneUser,
  userJoinChannel,
  updateUser,
  deleteUser,
  refreshToken,
}