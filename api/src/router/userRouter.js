const { authMiddleware } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();
const user = require('../services/userServices');


/* PUBLIC : USERS LIST */
router.get('/api/users', async (req, res) => {
  user.getAllUsers(req, res);
});

/* PUBLIC : REGISTER */
router.post('/api/register', async (req, res) => {
  user.createUser(req, res);
});

/* PUBLIC : LOGIN */
router.post('/api/login', async (req, res) => {
  user.getJwt(req, res);
})

/* PRIVATE : USER INFORMATION */
router.get(
  '/api/user/:id',
  authMiddleware, 
  async (req, res) => {
    user.getOneUser(req, res);
  }
);

/* PRIVATE : UPDATE AN USER */
router.put(
  '/api/user/:id',
  authMiddleware, 
  async (req, res) => {
    user.updateUser(req, res);
  }
);

/* PRIVATE : JOIN A CHANNEL */
router.post(
  '/api/user/:id/channel/:channel_id', 
  authMiddleware, 
  async (req, res) => {
    user.userJoinChannel(req, res);
  }
);

/* PRIVATE : DELETE AN USER */
router.delete(
  '/api/user/:id',
  authMiddleware, 
  async (req, res) => {
    user.deleteUser(req, res);
  }
);


router.post(
  '/api/refreshtoken',
  async (req, res) => {
    user.refreshToken(req, res);
  }
)



module.exports = router;