'use strict';

/**
* Работа с формой и элементами формы
* Зависит от модуля util.js, исплользует функцию window.util.setAddress для установки адреса при неактивной форме
*/
(function () {
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
  var submitButton = form.querySelector('.ad-form__submit');
  var compareTypeAndPrice = function (housingType) {
    var housingMinPrice = HOUSING_TYPES_PRICESES[housingType];
    priceInput.min = housingMinPrice;
    priceInput.placeholder = housingMinPrice;
  };
  var roomsQuantityInput = form.querySelector('#room_number');
  var guestsQuantityInput = form.querySelector('#capacity');

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

  window.util.setAddress(mainPin.style.left, mainPin.style.top);
  disableFormElements();

  /**
   * Проверка соответствия количества комнат количеству гостей
   * @return {boolean} - соответствует ли количество комнат количеству гостей
   */
  var roomsGuestsValidity = function () {
    if ((roomsQuantityInput.value <= guestsQuantityInput.value) && (roomsQuantityInput.value !== '100') && (guestsQuantityInput.value !== '0')) {
      return false;
    } else if ((roomsQuantityInput.value === '100') && (guestsQuantityInput.value !== '0')) {
      return false;
    } else if ((roomsQuantityInput.value !== '100') && (guestsQuantityInput.value === '0')) {
      return false;
    }
    return true;
  };

  /**
   * Обработчик для дополнительной валидации формы
   */
  var onSubmitButtonClick = function () {
    var validity = roomsGuestsValidity();
    if (!validity) {
      guestsQuantityInput.setCustomValidity('Количество гостей не соответствует количеству комнат');
    } else {
      guestsQuantityInput.setCustomValidity('');
    }
  };
  submitButton.addEventListener('click', onSubmitButtonClick);
})();
