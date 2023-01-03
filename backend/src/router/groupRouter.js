const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();
const channel = require('../services/channelServices');


/* PUBLIC : GROUPES LIST */
router.get('/channel', async (req, res) => {
  channel.getAllGroups(req, res)
});

/* PUBLIC : GROUPES LIST */
router.get('/channel/users', async (req, res) => {
  channel.getAllUsersInGroups(req, res)
});


/* PRIVATE (ADMIN) : CREATE A GROUP */
router.post('/channel', authMiddleware, async (req, res) => {
  channel.createGroup(req, res)
});

/* PRIVATE (ADMIN) : UPDATE A GROUP */
router.put('/channel/:id', authMiddleware, async (req, res) => {
  channel.updateGroup(req, res)
});

/* PRIVATE (ADMIN) : UPDATE USERS IN A GROUP */
router.put('/channel/:id/users', authMiddleware, async (req, res) => {
  channel.updateUsersInGroups(req, res)
});

/* PRIVATE (ADMIN) : DELETE A GROUP */
router.delete('/channel/:id', authMiddleware, async (req, res) => {
  channel.deleteGroup(req, res)
});

module.exports = router;