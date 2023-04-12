const router = require('express').Router();
const {
  getUser,
  updateUserInfo,
} = require('../controllers/users');

const { validateUserDataWithJoi } = require('../utils/validation');

router.get('/me', getUser);
router.patch('/me', validateUserDataWithJoi, updateUserInfo);

module.exports = router;
