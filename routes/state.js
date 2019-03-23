const got = require(`got`);

const API_URL = `https://plug.homewizard.com/plugs`;

module.exports = async req => {
  const apiUrl = req.deviceId
    ? `${API_URL}/${req.params.id}/devices/${req.body.deviceId}/action`
    : `${API_URL}/${req.params.id}/action`;

  try {
    const res = await got(apiUrl, {
      body: {
        action: req.body.action,
      },
      headers: {
        "x-session-token": req.headers[`x-session-token`],
      },
      json: true,
    });

    return res.body;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
