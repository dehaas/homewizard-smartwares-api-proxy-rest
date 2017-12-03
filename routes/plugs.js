const got = require(`got`);

const API_URL = `https://plug.homewizard.com/plugs`;

module.exports = async token => {
  try {
    const res = await got(API_URL, {
      headers: {
        'x-session-token': token,
      }
    });

    return JSON.parse(res.body);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}
