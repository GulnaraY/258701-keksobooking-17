'use strict';
/*
* Отрисовка похожих меток на карте
* функция window.showSimilarОffers доступна для других модулей
* зависит от модуля data.js. Исплользует его для генерации данных для случайных меток
 */

(function () {
  var BOOKING_OBJECTS_COUNT = 8;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var map = document.querySelector('.map');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (similarItem) {
    var pinTemplate = pin.cloneNode(true);
    pinTemplate.querySelector('img').src = similarItem.author.avatar;
    pinTemplate.style = 'left: ' + (similarItem.location.x - PIN_WIDTH / 2) + 'px; top: ' + (similarItem.location.y - PIN_HEIGHT) + 'px;';
    pinTemplate.querySelector('img').alt = 'Заголовок';
    return pinTemplate;
  };
  /**
  * отрисовка похожих пересонажей
  */
  window.swowSimilarOffers = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < BOOKING_OBJECTS_COUNT; i++) {
      var similarOffer = window.createAdvertisment(i);
      fragment.appendChild(renderPin(similarOffer));
    }
    map.appendChild(fragment);
  };
})();