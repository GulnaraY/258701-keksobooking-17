'use strict';

/**
 * Взаимодействие с пинами. Показ информации при клике на пин
 * зависит от модуля card.js
 */
(function () {
  var pinsContainer = document.querySelector('.map');

  /**
   * Находит соответсвующий переданной дом ноде объект в массиве с данными
   * @param {string} pinId - строка, содержащая идентификатор объекта
   */
  var findInfo = function (pinId) {
    var data = window.data.dataWithId;
    var currentElement = '';
    data.forEach(function (element) {
      if (element.id === pinId) {
        currentElement = element;
      }
    });
    window.showOfferInfo(currentElement);
  };

  /**
   * Обработчик клика на пин
   * @param {object} evt -  объект, который отдает обработчик
   */
  var onMapClick = function (evt) {
    if ((evt.target.classList.contains('map__pin')) && (!evt.target.classList.contains('map__pin--main'))) {
      findInfo(evt.target.id);
    } else if ((evt.target.parentElement.classList.contains('map__pin')) && (!evt.target.parentElement.classList.contains('map__pin--main'))) {
      findInfo(evt.target.parentElement.id);
    }
  };

  pinsContainer.addEventListener('click', onMapClick);
})();
