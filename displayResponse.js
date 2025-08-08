const response = (res, statusCode, object) => {
  return res.status(statusCode).json(object);
};
module.exports = response;
