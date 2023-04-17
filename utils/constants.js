module.exports.ERR_STATUS_BAD_REQUEST = 400;
module.exports.ERR_STATUS_UNAUTHORIZED = 401;
module.exports.ERR_STATUS_FORBIDDEN = 403;
module.exports.ERR_STATUS_NOT_FOUND = 404;
module.exports.ERR_STATUS_CONFLICT = 409;
module.exports.ERR_STATUS_INTERNAL_SERVER = 500;

module.exports.STATUS_OK_CREATED = 201;

module.exports.ERR_MESSAGE_BAD_REQUEST = 'Incorrect data in request';
module.exports.ERR_MESSAGE_UNAUTHORIZED = 'User unauthorized';
module.exports.ERR_MESSAGE_FORBIDDEN = 'User is not the owner of the movie';
module.exports.ERR_MESSAGE_NOT_FOUND = 'Document not found';
module.exports.ERR_MESSAGE_WRONG_PAGE = 'Page not found';
module.exports.ERR_MESSAGE_CONFLICT_EMAIL = 'User with this email already exist';
module.exports.ERR_MESSAGE_CONFLICT_MOVIE_ID = 'Movie with this movieID is already added to favorites for this user';
module.exports.ERR_MESSAGE_INTERNAL_SERVER = 'General problem with the server';

module.exports.SCHEMA_ERR_EMAIL = 'Email adress is not valid';
module.exports.SCHEMA_ERR_IMAGE_URL = 'Image url is not valid';
module.exports.SCHEMA_ERR_TRAILER_URL = 'Trailer url is not valid';
module.exports.SCHEMA_ERR_THUMBNAIL_URL = 'Thumbnail url is not valid';

module.exports.MESSAGE_SUCCESS_AUTH = 'Successful authorization';
module.exports.MESSAGE_SUCCESS_LOGOUT = 'Logged out successfully';

module.exports.urlRegex = /^https?:\/\/((www\.)|(?!www\.)).+\./i;
module.exports.objectIdRegex = /^[0-9a-fA-F]{24}$/;
