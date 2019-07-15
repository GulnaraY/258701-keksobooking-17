'use strict';

/*
* Отрисовка похожих меток на карте
* объект window.pins доступен для других модулей
* зависит от модуля backend.js. Исплользует его для генерации данных для случайных меток
*/
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var map = document.querySelector('.map');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (similarItem) {
    var pinTemplate = pin.cloneNode(true);
    pinTemplate.querySelector('img').src = similarItem.author.avatar;
    pinTemplate.style = 'left: ' + (similarItem.location.x - PIN_WIDTH / 2) + 'px; top: ' + (similarItem.location.y - PIN_HEIGHT) + 'px;';
    pinTemplate.querySelector('img').alt = 'Заголовок';
    pinTemplate.id = similarItem.id;
    return pinTemplate;
  };

  window.pins = {
    /**
     *Количество отрисовываемых похожих меток
     */
    PINS_QUANTITY: 5,
    /**
     *Отрисовка похожих меток
     * @param {Array} pins - данные для отрисовки меток
     */
    showSimilarOffers: function (pins) {
      var fragment = document.createDocumentFragment();
      pins.forEach(function (value) {
        var similarOffer = value;
        fragment.appendChild(renderPin(similarOffer));
      });
      map.appendChild(fragment);
    },
    /**
     * Удаление отрисованных меток похожих объявлений
     */
    removePins: function () {
      var renderedPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
      var similarPins = Array.from(renderedPins);
      similarPins.forEach(function (value) {
        map.removeChild(value);
      });
    }
  };

})();
