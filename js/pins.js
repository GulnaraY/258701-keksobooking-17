'use strict';

/*
* Отрисовка похожих меток на карте
* функция window.showSimilarОffers доступна для других модулей
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
    return pinTemplate;
  };

  /**
  * отрисовка похожих меток
  */
  window.swowSimilarOffers = function () {
    var onSuccess = function (pins) {
      window.util.errorTemplate.style.display = 'none';
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < pins.length; i++) {
        var similarOffer = pins[i];
        fragment.appendChild(renderPin(similarOffer));
      }
      map.appendChild(fragment);
    };

    window.backend.load(onSuccess, window.util.onError);
  };
})();
