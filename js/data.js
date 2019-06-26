'use strict';

/**
 * Создает случайную метку
 * Функция window.createAdvertisment доступна для других модулей
 * Зависит от модуля util.js, использует widdow.utils.getRandomNumber, window.util.getRandomElement
 */
(function () {
  var PIN_WIDTH = 50;
  var MIN_X = PIN_WIDTH / 2;
  var MAX_X = 1200 - PIN_WIDTH / 2;
  var MAIN_PIN_HEIGHT = 87;
  var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var MIN_Y = 130 + MAIN_PIN_HEIGHT;
  var MAX_Y = 630 + MAIN_PIN_HEIGHT;

  var getAvatar = function (index) {
    index = index + 1;
    if (index >= 0 && index <= 9) {
      index = '0' + index;
    }
    return 'img/avatars/user' + index + '.png';
  };

  /**
   * генерирует данные для случайной метки
   *@param {number} avatarNumber - порядковый номер аватара
   *@return {object} advertisment - сгенерированный объект с данными метки для отрисовки
   */

  window.createAdvertisment = function (avatarNumber) {
    var advertisment = {
      author: {avatar: getAvatar(avatarNumber)},
      offer: {type: window.util.getRandomElement(HOUSING_TYPES)},
      location: {
        x: window.util.getRandomNumber(MIN_X, MAX_X),
        y: window.util.getRandomNumber(MIN_Y, MAX_Y)
      }
    };
    return advertisment;
  };
})();
