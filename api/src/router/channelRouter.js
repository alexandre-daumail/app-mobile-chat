const { authMiddleware } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();
const channel = require('../services/channelServices');


/* PUBLIC : CHANNELS LIST */
router.get(
  '/channel', 
  async (req, res) => {
    channel.getAllChannel(req, res)
  }
);

/* PUBLIC : USERS LIST IN A CHANNEL */
router.get(
  '/channel/:id/users', 
  async (req, res) => {
    channel.getAllUsersInChannel(req, res)
  }
);

/* PRIVATE : GET USER CHANNELS */
router.get(
  '/user/:id/channel', 
  authMiddleware, 
  async (req, res) => {
    channel.createChannel(req, res)
  }
);

/* PRIVATE : CREATE A CHANNEL */
router.post(
  '/user/:id/channel', 
  authMiddleware, 
  async (req, res) => {
    channel.createChannel(req, res)
  }
);

/* PRIVATE : UPDATE A CHANNEL */
router.put(
  '/user/:id/channel/:channel_id', 
  authMiddleware, 
  async (req, res) => {
    channel.updateChannel(req, res)
  }
);

/* PRIVATE : DELETE A CHANNEL */
router.delete(
  '/user/:id/channel/:channel_id', 
  authMiddleware, 
  async (req, res) => {
    channel.deleteChannel(req, res)
  }
);


/* PRIVATE : CREATOR ADD USER IN A CHANNEL */
// router.post(
//   '/user/:id/channel/:channel_id/add/:id_to_add', 
//   authMiddleware, 
//   async (req, res) => {
//     channel.addUserChannel(req, res)
//   }
// );

/* PRIVATE : CREATOR REMOVE USER IN A CHANNEL */
// router.delete(
//   '/user/:id/channel/:channel_id/remove/:id_to_remove', 
//   authMiddleware, 
//   async (req, res) => {
//     channel.removeUserChannel(req, res)
//   }
// );


module.exports = router;