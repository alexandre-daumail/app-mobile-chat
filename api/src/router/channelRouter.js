const { authMiddleware } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();
const channel = require('../services/channelServices');


/* PUBLIC : CHANNELS LIST */
router.get(
  '/api/channels',
  async (req, res) => {
    channel.getAllChannel(req, res)
  }
);

/* PUBLIC : USERS LIST IN A CHANNEL */
router.get(
  '/api/channel/:id/users', 
  async (req, res) => {
    channel.getAllUsersInChannel(req, res)
  }
);

/* PRIVATE : GET USER CHANNELS */
router.get(
  '/api/user/:id/channels', 
  authMiddleware, 
  async (req, res) => {
    channel.getUserChannels(req, res)
  }
);

/* PRIVATE : CREATE A CHANNEL */
router.post(
  '/api/user/:id/channel', 
  authMiddleware, 
  async (req, res) => {
    channel.createChannel(req, res)
  }
);

/* PRIVATE : UPDATE A CHANNEL */
router.put(
  '/api/user/:id/channel/:channel_id', 
  authMiddleware, 
  async (req, res) => {
    channel.updateChannel(req, res)
  }
);

/* PRIVATE : DELETE A CHANNEL */
router.delete(
  '/api/user/:id/channel/:channel_id', 
  authMiddleware, 
  async (req, res) => {
    channel.deleteChannel(req, res)
  }
);


/* PRIVATE : CREATOR ADD USER IN A CHANNEL */
router.post(
  '/api/user/:id/channel/:channel_id/add/:id_to_add', 
  authMiddleware, 
  async (req, res) => {
    channel.addUserChannel(req, res)
  }
);

/* PRIVATE : CREATOR REMOVE USER IN A CHANNEL */
router.delete(
  '/api/user/:id/channel/:channel_id/remove/:id_to_remove', 
  authMiddleware, 
  async (req, res) => {
    channel.revokeUserChannel(req, res)
  }
);


module.exports = router;