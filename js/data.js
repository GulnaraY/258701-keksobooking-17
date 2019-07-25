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
  var addIdToData = function (data) {
    window.data.dataWithId = data.slice(0);
    window.data.dataWithId.forEach(function (element, i) {
      element.id = i.toString();
    });
  };

  window.data = {
    /**
    * содержит данные, загруженные с сервера
    */
    serverData: [],
    /**
    * копия массива данных загруженных с сервера, к каждому элементу которого, добавлен идентификатор
    */
    dataWithId: [],
    /**
    * Обработка данных, полученных от сервера
    */
    loadData: function () {
      var onSuccess = function (data) {
        window.data.serverData = data;
        addIdToData(window.data.serverData);
        var renderingPins = window.getFilteredData('any');
        window.pins.showSimilarOffers(renderingPins);
      };
      window.backend.load(onSuccess, window.messages.onErrorLoad);
    }
  };
})();
