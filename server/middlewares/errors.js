const errors = require('./../errors');

exports.handle = (error, _req, res, next) => {
  if (error && error.statusCode) {
    res.status(error.statusCode);
  } else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(500);
  }
  console.log(error);
  return res.send({ error: error.message });
};
