const express = require(`express`);
const bodyParser = require(`body-parser`);
require(`dotenv`).config();

const app = express();

if (!process.env.HOMEWIZARD_USER && !process.env.HOMEWIZARD_PASS) {
  console.error(`
    HOMEWIZARD_USER and HOMEWIZARD_PASS env vars not found!

    You need to define these env vars on your system or in .env file in project root
    and add your credentials for Homewizard Lite.
  `);
  return process.exit(1);
}

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require(`./middleware/useSessionToken`));
if (process.env.NODE_ENV === `production`) {
  app.use(require(`./middleware/checkProxyAPIToken`));
}

// Routes
app.get(`/plugs`, async (req, res) => {
  const getPlugs = require(`./routes/plugs`);
  const plugs = await getPlugs(req);

  return res.json(plugs);
});

app.get(`/plugs/:id`, async (req, res) => {
  const getPlugs = require(`./routes/plugs`);
  const plugs = await getPlugs(req);

  return res.json(plugs.filter(plug => plug.id === req.params.id)[0]);
});

app.get(`/plugs/:id/location`, async (req, res) => {
  const getPlugs = require(`./routes/plugs`);
  const plugs = await getPlugs(req);
  const { latitude, longitude } = plugs.filter(plug => plug.id === req.params.id)[0];

  return res.json({
    latitude,
    longitude,
  });
});

app.get(`/plugs/:id/isAvailable`, async (req, res) => {
  const getPlugs = require(`./routes/plugs`);
  const plugs = await getPlugs(req);
  const { online } = plugs.filter(plug => plug.id === req.params.id)[0];

  return res.json({
    isAvailable: online,
  });
});

app.get(`/plugs/:id/devices`, async (req, res) => {
  const getPlugs = require(`./routes/plugs`);
  const plugs = await getPlugs(req);
  const { devices } = plugs.filter(plug => plug.id === req.params.id)[0];

  return res.json(devices);
});

app.post(`/state/:id`, async (req, res) => {
  const toggleState = require(`./routes/state`);
  const state = await toggleState(req);

  return res.json({
    ...state,
    deviceId: req.body.deviceId,
    toggledAction: req.body.action,
  });
});

app.get(`/token`, async (req, res) => {
  const getToken = require(`./routes/token`);
  const token = await getToken();

  return res.json(token);
});

app.listen((process.env.PORT || 3000), () => {
  console.log(`🔌 Homewizard Proxy API running on port ${process.env.PORT || 3000}`);
});
