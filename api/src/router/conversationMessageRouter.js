const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();
const conversationMessage = require('../services/conversationMessageServices');


/* PRIVATE : GET ALL PRIVATE CONVERSATIONS */
router.get('/user/:id/conversations', authMiddleware, async (req, res) => {
  conversationMessage.getAllConversations(req, res)
});

/* PRIVATE : CREATE A PRIVATE CONVERSATION */
router.post('/user/:id/conversation/:user_id_to', authMiddleware, async (req, res) => {
  conversationMessage.createConversation(req, res)
});

/* PRIVATE : GET A PRIVATE CONVERSATION & MESSAGES IN IT */
router.get('/user/:id/conversation/:conversation_id', authMiddleware, async (req, res) => {
  conversationMessage.getOneConversation(req, res)
});

/* PRIVATE : CREATE MESSAGE IN A PRIVATE CONVERSATION */
router.post('/user/:id/conversation/:conversation_id/message', authMiddleware, async (req, res) => {
  conversationMessage.createMessage(req, res)
});

/* PRIVATE : UPDATE MESSAGE IN A PRIVATE CONVERSATION */
router.put('/user/:id/conversation/:conversation_id/message/:message_id', authMiddleware, async (req, res) => {
  conversationMessage.updateMessage(req, res)
});

/* PRIVATE : DELETE A MESSAGE IN A PRIVATE CONVERSATION */
router.delete('/user/:id/conversation/:conversation_id/message/:message_id', authMiddleware, async (req, res) => {
  conversationMessage.deleteMessage(req, res)
});

module.exports = router;