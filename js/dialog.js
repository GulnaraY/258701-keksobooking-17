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

    currentElement = data.find(function (element) {
      return element.id === pinId;
    });
    window.cards.showOfferInfo(currentElement);
  };

  /**
  * Обработчик клика на пин
  * @param {object} evt -  объект, который отдает обработчик
  */
  var onMapClick = function (evt) {
    var parent = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (parent) {
      findInfo(parent.id);
    }
  };
  pinsContainer.addEventListener('click', onMapClick);
})();
