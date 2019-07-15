'use strict';

/**
* Фильтрация данных
* Зависит от модуля pins.js
* метод window.getFilteredData доступен для других модулей
*/
(function () {
  var housingTypeFilter = document.querySelector('#housing-type');

  /**
  * Отдает отфильтрованные данные
  * @param {object} filterValue - значение, по которому должны фильтроваться данные
  * @return {array} - массив с отфильтрованными данными
  */
  window.getFilteredData = function (filterValue) {
    var filteredPins = window.data.dataWithId.filter(function (value) {
      if (filterValue !== 'any') {
        return value.offer.type === filterValue;
      } else {
        return true;
      }
    });
    return filteredPins.slice(0, window.pins.PINS_QUANTITY);
  };

  /**
  * Отрисовка отфильтрованных данных. Удаляет старые данные. Получает новые. Отрисовывает новые.
  * @param {object} filterValue - значение, по которому фильтруются данные
  */
  var showFilteredAdvertisments = function (filterValue) {
    window.pins.removePins();
    var filteredData = window.getFilteredData(filterValue);
    window.pins.showSimilarOffers(filteredData);
  };

  var onHousingTypeChange = function (evt) {
    showFilteredAdvertisments(evt.target.value);
  };

  housingTypeFilter.addEventListener('change', onHousingTypeChange);
})();
