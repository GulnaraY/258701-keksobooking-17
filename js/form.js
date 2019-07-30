'use strict';

/**
* Работа с формой и элементами формы
* Зависит от модуля util.js, исплользует функцию window.util.setAddress для установки адреса при неактивной форме
* Зависит от модуля messages.js
* Зависит от модуля map.js
* Зависит от модуля upload.js
* Зависит от модуля filter.js
*/
(function () {
  var HousingTypesPrices = {
    PALACE: 10000,
    FLAT: 1000,
    HOUSE: 5000,
    BUNGALO: 0
  };
  var typeInput = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var form = document.querySelector('.ad-form');
  var formFieldsets = form.querySelectorAll('fieldset');
  var mainPin = document.querySelector('.map__pin--main');
  var submitButton = form.querySelector('.ad-form__submit');
  var compareTypeAndPrice = function (housingType) {
    var housingMinPrice = HousingTypesPrices[housingType.toUpperCase()];
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

  var disableForm = function () {
    form.classList.add('ad-form--disabled');
    disableFormElements();
  };

  window.util.setAddress(mainPin.style.left, mainPin.style.top);
  disableFormElements();

  /**
  * Проверка соответствия количества комнат количеству гостей
  * @return {boolean} - соответствует ли количество комнат количеству гостей
  */
  var roomsGuestsValidity = function () {
    if (roomsQuantityInput.value < guestsQuantityInput.value) {
      return false;
    }
    return roomsQuantityInput.value !== '100' && guestsQuantityInput.value !== '0' ||
    roomsQuantityInput.value === '100' && guestsQuantityInput.value === '0';
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

  /**
  * Сбрасывает данные формы
  */
  var resetForm = function () {
    form.reset();
  };

  /**
  * Переводит форму в неактивное состояние
  */
  var showFormsInactiveStatement = function () {
    resetForm();
    disableForm();
  };
  /**
  * обработка успешной отправки данных на сервер
  */
  var onSuccessDataSend = function () {
    window.messages.successMessageShow();
  };
  /**
  * После успешной отправки данных на сервер
  */
  var onSuccess = function () {
    showFormsInactiveStatement();
    window.showMapsInactiveStatement();
    window.cards.hideOfferInfo();
    window.hideUploadedFiles();
    window.filter.resetFilters();
    onSuccessDataSend();
  };

  window.form = {
    /**
    * обработка ошибки при загрузке данных с сервера
    * @param {string} message - текст сообщения об ошибке
    */
    onErrorLoad: function (message) {
      var loadErrorElement = window.messages.loadErrorElement;
      var errorMessage = loadErrorElement.querySelector('.error__message');
      errorMessage.textContent = message;
      window.messages.errorMessageShow('load');
    },
    /**
    * обработка ошибки при отправке данных на сервер
    * @param {string} message - текст сообщения об ошибке
    */
    onErrorSend: function (message) {
      var saveErrorElement = window.messages.saveErrorElement;
      var errorMessage = saveErrorElement.querySelector('.error__message');
      errorMessage.textContent = message;
      window.messages.errorMessageShow('save');
    }
  };

  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(form), onSuccess, window.form.onErrorSend);
    evt.preventDefault();
  };

  form.addEventListener('submit', onFormSubmit);
})();
