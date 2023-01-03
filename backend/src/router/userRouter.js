const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();
const userService = require('../services/userServices');


/* PUBLIC : USERS LIST */
router.get('/users', async (req, res) => {
  userService.getAllUsers(req, res);
});

/* PUBLIC : REGISTER */
router.post('/register', async (req, res) => {
  userService.createUser(req, res);
});

/* PUBLIC : LOGIN */
router.post('/login', async (req, res) => {
  userService.getJwt(req, res);
})


/* PRIVATE (USER/ADMIN) : USER INFORMATION */
router.get('/users/:id', authMiddleware, async (req, res) => {
  userService.getOneUser(req, res);
});

/* PRIVATE (USER/ADMIN) : UPDATE AN USER */
router.put('/users/:id', authMiddleware, async (req, res) => {
  userService.updateUser(req, res);
});

/* PRIVATE (ADMIN) : DELETE AN USER */
router.delete('/users/:id', authMiddleware, async (req, res) => {
  userService.deleteUser(req, res);
});


module.exports = router;