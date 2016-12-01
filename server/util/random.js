// Returns a random integer between min (included) and max (included)
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = getRandomInt;