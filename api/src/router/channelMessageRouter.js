const { authMiddleware } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();
const channelMessages = require('../services/channelMessageServices');


/* PUBLIC : CHANNEL MESSAGES LIST */
router.get(
  '/channel/:id', 
  async (req, res) => {
    channelMessages.getAllMessages(req, res)
  }
);

/* PRIVATE : CREATE MESSAGE IN CHANNEL */
router.post(
  '/user/:id/channel/:channel_id/message', 
  authMiddleware, 
  async (req, res) => {
    channelMessages.createMessage(req, res)
  }
);

/* PRIVATE : UPDATE MESSAGE IN CHANNEL */
router.put(
  '/user/:id/channel/:channel_id/message/:message_id', 
  authMiddleware, 
  async (req, res) => {
    channelMessages.updateMessage(req, res)
  }
);

/* PRIVATE : DELETE A MESSAGE IN CHANNEL */
router.delete(
  '/user/:id/channel/:channel_id/message/:message_id', 
  authMiddleware, 
  async (req, res) => {
    channelMessages.deleteMessage(req, res)
  }
);


module.exports = router;