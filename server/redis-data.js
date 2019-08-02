const keys = require('./keys');
// Redis Client Setup
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
const pub = redisClient.duplicate();

module.exports.getAllValues = function (callback) {
  redisClient.hgetall('values', (err, values) => {
    callback(values);
  });
}

module.exports.insertIndexForValue = function (index) {
  redisClient.hset('values', index, 'Nothing yet!');
  pub.publish('insert', index);
}