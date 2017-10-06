const debug = require('debug')('weathermap');

const id = process.env.APPID;

var lat;
var lng;

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID || id;
const mapURI = process.env.MAP_ENDPOINT || "http://api.openweathermap.org/data/2.5";
const targetCity = process.env.TARGET_CITY || "Helsinki,fi";

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async () => {
  const endpoint = `${mapURI}/weather?lat=${lat}&lon=${lng}&APPID=${appId}`;
  console.log("Haku coords:" + lat + " ja " + lng);
  const response = await fetch(endpoint);

  return response ? response.json() : {}
};

router.get('/api/weather', async ctx => {
  lat = ctx.query.lat;
  lng = ctx.query.lng;
  const weatherData = await fetchWeather();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.weather ? weatherData.weather[0] : {};
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
