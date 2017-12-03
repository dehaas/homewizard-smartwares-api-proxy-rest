const express = require(`express`);
const bodyParser = require(`body-parser`);
require(`dotenv`).config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(require(`./middleware/useSessionToken`));

// Routes
app.get(`/plugs`, async (req, res) => {
  const getPlugs = require(`./routes/plugs`);
  const plugs = await getPlugs(req.headers[`x-session-token`]);

  return res.json(plugs);
});

app.get(`/plugs/:id`, async (req, res) => {
  const getPlugs = require(`./routes/plugs`);
  const plugs = await getPlugs(req.headers[`x-session-token`]);

  return res.json(plugs.filter(plug => plug.id === req.params.id)[0]);
});

app.get(`/plugs/:id/location`, async (req, res) => {
  const getPlugs = require(`./routes/plugs`);
  const plugs = await getPlugs(req.headers[`x-session-token`]);
  const {latitude, longitude} = plugs.filter(plug => plug.id === req.params.id)[0];

  return res.json({
    latitude,
    longitude,
  });
});

app.get(`/plugs/:id/devices`, async (req, res) => {
  const getPlugs = require(`./routes/plugs`);
  const plugs = await getPlugs(req.headers[`x-session-token`]);
  const {devices} = plugs.filter(plug => plug.id === req.params.id)[0];

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

// Init
app.listen((process.env.PORT || 3000), () => {
  console.log(`🔌 Homewizard Proxy API running on port ${process.env.PORT || 3000}`);
});

