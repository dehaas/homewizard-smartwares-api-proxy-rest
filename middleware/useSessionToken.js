const getToken = require(`../routes/token`);

module.exports = async (req, res, next) => {
  const {token} = await getToken();

  req.headers[`x-session-token`] = token;

  next();
};
