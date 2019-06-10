'use strict';

var BOOKING_OBJECTS_COUNT = 8;
var HOUSING_TYPES = ['place', 'flat', 'house', 'bungalo'];
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var map = document.querySelector('.map');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');

var activateMap = function () {
  map.classList.remove('map--faded');
};

var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

var getRandomNumber = function (minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
};

var getAvatar = function (index) {
  return 'img/avatars/user0' + index + '.png';
};

var createAdvertisment = function (avatarNumber) {
  var advertisment = {
    author: {avatar: getAvatar(avatarNumber + 1)},
    offer: {type: getRandomElement(HOUSING_TYPES)},
    location: {x: getRandomNumber(MIN_X, MAX_X), y: getRandomNumber(MIN_Y, MAX_Y)}
  };
  return advertisment;
};

var renderPin = function (similarItem) {
  var pinTemplate = pin.cloneNode(true);
  pinTemplate.querySelector('img').src = similarItem.author.avatar;
  pinTemplate.style = 'left: ' + (similarItem.location.x + PIN_WIDTH / 2) + 'px; top: ' + (similarItem.location.y + PIN_HEIGHT) + 'px;';
  pinTemplate.querySelector('img').alt = similarItem.offer.type;
  return pinTemplate;
};

var swowSimilarOffers = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < BOOKING_OBJECTS_COUNT; i++) {
    var similarOffer = createAdvertisment(i);
    fragment.appendChild(renderPin(similarOffer));
  }
  map.appendChild(fragment);
};

swowSimilarOffers();
activateMap();
