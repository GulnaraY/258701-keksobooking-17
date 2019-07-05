'use strict';
/**
 * Фильтрация данных
 * Зависит от модуля pins.js
 */

(function () {
  var housingTypeFilter = document.querySelector('#housing-type');

  var getFilteredData = function (filterValue) {
    var filteredPins = window.data.serverData.filter(function (value) {
      if (filterValue !== 'any') {
        return value.offer.type === filterValue;
      } else {
        return true;
      }
    });

    return filteredPins.slice(0, window.pins.PINS_QUANTITY);
  };

  var showFilteredAdvertisments = function (filterValue) {
    window.pins.removePins();
    var filteredData = getFilteredData(filterValue);
    window.pins.showSimilarOffers(filteredData);
  };

  housingTypeFilter.addEventListener('change', function (evt) {
    showFilteredAdvertisments(evt.target.value);
  });
})();
