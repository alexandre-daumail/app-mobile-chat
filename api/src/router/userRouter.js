const { authMiddleware } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();
const user = require('../services/userServices');


/* PUBLIC : USERS LIST */
router.get('/users', async (req, res) => {
  user.getAllUsers(req, res);
});

/* PUBLIC : REGISTER */
router.post('/register', async (req, res) => {
  user.createUser(req, res);
});

/* PUBLIC : LOGIN */
router.post('/login', async (req, res) => {
  user.getJwt(req, res);
})

/* PRIVATE : USER INFORMATION */
router.get(
  '/user/:id', 
  authMiddleware, 
  async (req, res) => {
    user.getOneUser(req, res);
  }
);

/* PRIVATE : UPDATE AN USER */
router.put(
  '/user/:id', 
  authMiddleware, 
  async (req, res) => {
    user.updateUser(req, res);
  }
);

/* PRIVATE : JOIN A CHANNEL */
router.post('/user/:id/channel/:channel_id', authMiddleware, async (req, res) => {
  user.userJoinChannel(req, res);
}
);

/* PRIVATE : DELETE AN USER */
router.delete(
  '/user/:id', 
  authMiddleware, 
  async (req, res) => {
    user.deleteUser(req, res);
  }
);


module.exports = router;