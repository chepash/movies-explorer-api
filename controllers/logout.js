const { MESSAGE_SUCCESS_LOGOUT } = require('../utils/constants');

module.exports.logout = (req, res) => {
  res.clearCookie('jwt')
    .send({ message: MESSAGE_SUCCESS_LOGOUT })
    .end();
};
