const { authMiddleware } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();
const conversationMessage = require('../services/conversationMessageServices');

/* PRIVATE : GET ALL MESSAGES IN A PRIVATE CONVERSATION */
router.get(
  '/user/:id/conversation/:conversation_id', 
  authMiddleware, 
  async (req, res) => {
    conversation.getAllMessages(req, res)
  }
);

/* PRIVATE : CREATE MESSAGE IN A PRIVATE CONVERSATION */
router.post(
  '/user/:id/conversation/:conversation_id/message', 
  authMiddleware, 
  async (req, res) => {
    conversationMessage.createMessage(req, res)
  }
);

/* PRIVATE : UPDATE MESSAGE IN A PRIVATE CONVERSATION */
router.put(
  '/user/:id/conversation/:conversation_id/message/:message_id', 
  authMiddleware, 
  async (req, res) => {
    conversationMessage.updateMessage(req, res)
  }
);

/* PRIVATE : DELETE A MESSAGE IN A PRIVATE CONVERSATION */
router.delete(
  '/user/:id/conversation/:conversation_id/message/:message_id', 
  authMiddleware, 
  async (req, res) => {
    conversationMessage.deleteMessage(req, res)
  }
);


module.exports = router;