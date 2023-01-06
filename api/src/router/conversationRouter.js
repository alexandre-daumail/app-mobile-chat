const { authMiddleware } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();
const conversation = require('../services/conversationServices');


/* PRIVATE : GET ALL PRIVATE CONVERSATIONS */
router.get(
  '/api/user/:id/conversations',
  authMiddleware, 
  async (req, res) => {
    conversation.getAllConversations(req, res)
  }
);

/* PRIVATE : CREATE A PRIVATE CONVERSATION */
router.post(
  '/api/user/:id/conversation/:user_id_to',
  authMiddleware, 
  async (req, res) => {
    conversation.createConversation(req, res)
  }
);

/* PRIVATE : DELETE A PRIVATE CONVERSATION */
router.delete(
  '/api/user/:id/conversation/:conversation_id',
  authMiddleware, 
  async (req, res) => {
    conversation.deleteConversation(req, res)
  }
);


module.exports = router;