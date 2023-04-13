const router = require('express').Router();
const {
  getUser,
  updateUserInfo,
} = require('../controllers/users');

const { validateUserData } = require('../utils/validation');

router.get('/me', getUser);
router.patch('/me', validateUserData, updateUserInfo);

module.exports = router;
