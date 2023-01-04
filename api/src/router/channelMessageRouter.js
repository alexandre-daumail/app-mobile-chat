const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();
const channelMessages = require('../services/channelMessageServices');


/* PUBLIC : CHANNEL MESSAGES LIST */
router.get('/channel/:id', async (req, res) => {
  channelMessages.getAllMessages(req, res)
});

/* PRIVATE : CREATE MESSAGE IN CHANNEL */
router.post('/channel/:id/user/:user_id/message', authMiddleware, async (req, res) => {
  channelMessages.createMessage(req, res)
});

/* PRIVATE : UPDATE MESSAGE IN CHANNEL */
router.put('/channel/:id/user/:user_id/message/:message_id', authMiddleware, async (req, res) => {
  channelMessages.updateMessage(req, res)
});

/* PRIVATE : DELETE A MESSAGE IN CHANNEL */
router.delete('/channel/:id/user/:user_id/message/:message_id', authMiddleware, async (req, res) => {
  channelMessages.deleteMessage(req, res)
});

module.exports = router;