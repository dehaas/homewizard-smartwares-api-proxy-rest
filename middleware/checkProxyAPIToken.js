module.exports = (req, res, next) => {
  req.headers.hasOwnProperty(`x-proxy-api-token`)
    ? true
    : res.status(500).json({
      message: `X-PROXY-API-TOKEN missing in request headers`,
      status: 500,
      type: `Error<Authentication>`,
    });

  req.headers[`x-proxy-api-token`] === process.env.X_PROXY_API_TOKEN
    ? true
    : res.status(401).json({
      message: `Invalid X-PROXY-API-TOKEN`,
      status: 401,
      type: `Error<Authentication>`,
    });
  next();
};
