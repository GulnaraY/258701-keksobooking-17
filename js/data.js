'use strict';

/**
 * Работа с данными, полученными от сервера
 * объект window.data доступен для других модулей
 * Зависит от модулей pins.js, ulil.js, backend.js, data.js
 *
 */
(function () {
  window.data = {
    /**
     * содержит данные, загруженные с сервера
     */
    serverData: {
    },
    /**
     * Обработка данных, полученных от сервера
     */
    loadData: function () {
      var onSuccess = function (data) {
        window.data.serverData = data;
        var renderingPins = data.slice(0, window.pins.PINS_QUANTITY);
        window.pins.showSimilarOffers(renderingPins);
        window.util.errorTemplate.style.display = 'none';
      };
      window.backend.load(onSuccess, window.util.onError);
    }
  };
})();
