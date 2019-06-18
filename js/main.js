'use strict';

var BOOKING_OBJECTS_COUNT = 8;
var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MIN_X = PIN_WIDTH / 2;
var MAX_X = 1200 - PIN_WIDTH / 2;
var MIN_Y = 130;
var MAX_Y = 630;
var map = document.querySelector('.map');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var typeInput = document.querySelector('#type');
var priceInput = document.querySelector('#price');
var timeInInput = document.querySelector('#timein');
var timeOutInput = document.querySelector('#timeout');
var HOUSING_TYPES_PRICESES = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalo': 0
};

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
  index = index + 1;
  if (index >= 0 && index <= 9) {
    index = '0' + index;
  }
  return 'img/avatars/user' + index + '.png';
};

var createAdvertisment = function (avatarNumber) {
  var advertisment = {
    author: {avatar: getAvatar(avatarNumber)},
    offer: {type: getRandomElement(HOUSING_TYPES)},
    location: {
      x: getRandomNumber(MIN_X, MAX_X),
      y: getRandomNumber(MIN_Y, MAX_Y)
    }
  };
  return advertisment;
};

var renderPin = function (similarItem) {
  var pinTemplate = pin.cloneNode(true);
  pinTemplate.querySelector('img').src = similarItem.author.avatar;
  pinTemplate.style = 'left: ' + (similarItem.location.x - PIN_WIDTH / 2) + 'px; top: ' + (similarItem.location.y - PIN_HEIGHT) + 'px;';
  pinTemplate.querySelector('img').alt = 'Заголовок';
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

var compareTypeAndPrice = function (housingType) {
  var housingMinPrice = HOUSING_TYPES_PRICESES[housingType];
  priceInput.min = housingMinPrice;
  priceInput.placeholder = housingMinPrice;
};

swowSimilarOffers();
activateMap();

var onFormTypeClick = function (evt) {
  compareTypeAndPrice(evt.target.value);
};

typeInput.addEventListener('click', onFormTypeClick);

var setTimeIn = function (time) {
  timeInInput.value = time;
};

var setTimeOut = function (time) {
  timeOutInput.value = time;
};

var onFormTimeClick = function (evt) {
  if (evt.target === timeInInput) {
    setTimeOut(evt.target.value);
  } else {
    setTimeIn(evt.target.value);
  }
};

timeInInput.addEventListener('click', onFormTimeClick);
timeOutInput.addEventListener('click', onFormTimeClick);
