'use strict';

/**
* Работа с данными, полученными от сервера
* объект window.data доступен для других модулей
* Зависит от модулей pins.js, ulil.js, backend.js, data.js
*
*/
(function () {

  /** На основе данных от сервера формирует новый массив, в котором каждому объекту добавляет идентификатор
  * @param {array} data - массив данных, полученных от сервера
  */
  var addId = function (data) {
    window.data.withId = data.slice(0);
    window.data.withId.forEach(function (element, i) {
      element.id = i.toString();
    });
  };

  window.data = {
    /**
    * содержит данные, загруженные с сервера
    */
    fromServer: [],
    /**
    * копия массива данных загруженных с сервера, к каждому элементу которого, добавлен идентификатор
    */
    withId: [],
    /**
    * Обработка данных, полученных от сервера
    */
    load: function () {
      var onSuccess = function (data) {
        window.data.fromServer = data;
        addId(window.data.fromServer);
        var renderingPins = window.filter.getFilteredData();
        window.pins.showSimilarOffers(renderingPins);
      };
      window.backend.load(onSuccess, window.messages.onErrorLoad);
    }
  };
})();
