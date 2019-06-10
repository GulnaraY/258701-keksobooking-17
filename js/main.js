'use strict';

var BOOKING_OBJECTS_COUNT = 8;
var HOUSING_TYPES = ['place', 'flat', 'house', 'bungalo'];
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var map = document.querySelector('.map');

var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * (elements.length - 1))];
};

var getRandomNumber = function(minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
}

var getAvatar = function(index) {
  return 'img/avatars/user0' + index + '.png';
};

var createAdvertisment = function (authorValue, offerValue, xValue, yValue) {
  var advertisment = {
    author : {avatar: authorValue},
    offer : {type:offerValue},
    location: {x: xValue, y:yValue}
  }
  return advertisment;
};

var createSimilarOffers = function() {
  var bookingObjects = [];
  for (var i = 0; i < BOOKING_OBJECTS_COUNT; i++) {
    bookingObjects[i] = createAdvertisment(getAvatar(i + 1), getRandomElement(HOUSING_TYPES), getRandomNumber(MIN_X, MAX_X), getRandomNumber(MIN_Y,MAX_Y) );
  }
  return bookingObjects;
};


console.log(createSimilarOffers());

map.classList.remove('map--faded');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');

var similarOffers = createSimilarOffers();

var renderPin = function (similarItem) {
  var pinTemplate = pin.cloneNode(true);
  pinTemplate.querySelector('img').src = similarItem.author.avatar;
  pinTemplate.style = 'left: ' + similarItem.location.x + 'px; top: ' + similarItem.location.y + 'px;';
  pinTemplate.querySelector('img').alt = similarItem.offer.type;
  console.log(pinTemplate.style);
  return pinTemplate;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < similarOffers.length; i++ ) {
  fragment.appendChild(renderPin(similarOffers[i]));
}

map.appendChild(fragment);
