const { promisify } = require('util');
const request = promisify(require('request'));

async function main(params) {
  const {
    location = 'Seattle',
  } = params;
  let response;
  const url = 'https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast \
    where woeid in (select woeid from geo.places(1) where text="' + location + '")&format=json'
  try {
    response = await request(url);
  } catch (err) {
    return Promise.reject({
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: { message: 'Error processing your request' },
    });
  }
  /** The response body contains temperature data in the following format
   *    { code: '28',
   *    date: 'Tue, 26 Dec 2017 12:00 PM EST',
   *    temp: '18',
   *    text: 'Mostly Cloudy' } }
   */
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.parse(response.body).query.results.channel.item.condition,
  };
}
exports.main = main;
