'use strict';

var BOOKING_OBJECTS_COUNT = 8;
var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MIN_X = PIN_WIDTH / 2;
var MAX_X = 1200 - PIN_WIDTH / 2;
var MIN_Y = 130;
var MAX_Y = 630;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 87;
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
var form = document.querySelector('.ad-form');
var formFieldsets = form.querySelectorAll('fieldset');
var mainPin = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');
var isMapActive = false;

var activateMap = function () {
  map.classList.remove('map--faded');
  isMapActive = true;
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

var onFormTypeClick = function (evt) {
  compareTypeAndPrice(evt.target.value);
};

typeInput.addEventListener('input', onFormTypeClick);

var setTimeInOut = function (time) {
  timeInInput.value = time;
  timeOutInput.value = time;
};

var onFormTimeClick = function (evt) {
  setTimeInOut(evt.target.value);
};

timeInInput.addEventListener('input', onFormTimeClick);
timeOutInput.addEventListener('input', onFormTimeClick);

var disableFormElements = function () {
  for (var j = 0; j < formFieldsets.length; j++) {
    formFieldsets[j].disabled = true;
  }
};

var enableFormElements = function () {
  for (var j = 0; j < formFieldsets.length; j++) {
    formFieldsets[j].disabled = false;
  }
};

var enableForm = function () {
  form.classList.remove('ad-form--disabled');
};

var setAddress = function () {
  var mainPinX = parseInt(mainPin.style.left, 10) + Math.round(MAIN_PIN_WIDTH / 2);
  var mainPinY = parseInt(mainPin.style.top, 10) + Math.round(MAIN_PIN_HEIGHT / 2);
  addressInput.value = mainPinX + ', ' + mainPinY;
};

setAddress();
disableFormElements();

var onMapPinClick = function () {
  if (!isMapActive) {
    swowSimilarOffers();
    activateMap();
    enableForm();
    enableFormElements();
  }
};

mainPin.addEventListener('click', onMapPinClick);

mainPin.addEventListener('mouseup', function () {
  setAddress();
});
