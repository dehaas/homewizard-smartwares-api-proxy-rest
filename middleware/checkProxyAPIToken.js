module.exports = (req, res, next) => {
  const tokenHeader = req.headers[`x-proxy-api-token`];

  if (!tokenHeader) {
    res.status(500).json({
      message: `X-PROXY-API-TOKEN missing in request headers`,
      status: 500,
      type: `Error<Authentication>`,
    });
  }

  if (tokenHeader !== process.env.X_PROXY_API_TOKEN) {
    res.status(401).json({
      message: `Invalid X-PROXY-API-TOKEN`,
      status: 401,
      type: `Error<Authentication>`,
    });
  }

  next();
};
