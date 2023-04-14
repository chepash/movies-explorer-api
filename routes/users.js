const router = require('express').Router();
const {
  getUser,
  updateUserInfo,
} = require('../controllers/users');

const { validatePatchUserData } = require('../utils/validation');

router.get('/me', getUser);
router.patch('/me', validatePatchUserData, updateUserInfo);

module.exports = router;
