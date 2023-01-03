const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();
const channelMessages = require('../services/channelMessageServices');


/* PUBLIC : CHANNEL MESSAGES LIST */
router.get('/channel/:id', async (req, res) => {
  channelMessages.getAllMessages(req, res)
});

module.exports = router;