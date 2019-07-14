'use strict';

/**
* Утилиты, хелперы
*/
(function () {

  var mainBlock = document.querySelector('main');
  var error = document.querySelector('#error').content.querySelector('.error');
  var errorTemplate = error.cloneNode(true);
  var errorButton = errorTemplate.querySelector('.error__button');
  mainBlock.appendChild(errorTemplate);
  errorButton.addEventListener('click', function () {
    window.pins.swowSimilarOffers();
  });
  errorTemplate.style.display = 'none';

  window.util = {

    /**
    * Отдает случайный элемент массива
    * @param {array} elements - массив из которого нужно получить случайный элемент
    * @return {any} - случайный элемент массива
    */
    getRandomElement: function (elements) {
      return elements[Math.floor(Math.random() * elements.length)];
    },

    /**
    * Отдает случайное число из заданного промежутка
    * @param {number} minValue - минимальное значение
    * @param {number} maxValue - максимальное
    * @return {number} случайное число
    */
    getRandomNumber: function (minValue, maxValue) {
      return Math.random() * (maxValue - minValue) + minValue;
    },

    /**
    * Записывает значение координаты острого конца пина  в поле адрес
    * @param {any} left - координата по x верхнего левого края пина
    * @param {any} top - координата по y верхнего левого края пина
    */
    setAddress: function (left, top) {
      var MAIN_PIN_WIDTH = 65;
      var MAIN_PIN_HEIGHT = 87;
      var addressInput = document.querySelector('#address');
      var mainPinX = parseInt(left, 10) + Math.round(MAIN_PIN_WIDTH / 2);
      var mainPinY = parseInt(top, 10) + Math.round(MAIN_PIN_HEIGHT);
      addressInput.value = mainPinX + ', ' + mainPinY;
    },
    /**
    * обработка ошибки при работе с сервером
    */
    onError: function () {
      errorTemplate.style.display = 'block';
    },
    /**
     * Ссылка на дом-элемент с ошибкой
     */
    errorTemplate: errorTemplate,
  };
})();
