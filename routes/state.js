const got = require(`got`);

const API_URL = `https://plug.homewizard.com/plugs`;

module.exports = async req => {
  try {
    const res = await got(`${API_URL}/${req.params.id}/devices/${req.body.deviceId}/action`, {
      headers: {
        "x-session-token": req.headers[`x-session-token`]
      },
      json: true,
      body: {
        action: req.body.action,
      },
    });

    return res.body;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
