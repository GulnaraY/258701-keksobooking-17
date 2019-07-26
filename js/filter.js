'use strict';

/**
* Фильтрация данных
* Зависит от модуля pins.js
* метод window.getFilteredData доступен для других модулей
*/
(function () {
  var housingTypeFilter = document.querySelector('#housing-type');
  var housingPriceFilter = document.querySelector('#housing-price');
  var housingRoomsFilter = document.querySelector('#housing-rooms');
  var housingGuestsFilter = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var filters = {};
  var pricingMap = {
    'middle': [10000, 50000],
    'low': [0, 10000],
    'high': [50000, Infinity]
  };

  /**
  * Отдает отфильтрованные данные
  * @return {array} - массив отфильтрованных данных
  */
  window.getFilteredData = function () {
    var data = window.data.dataWithId;
    for (var p in filters) {
      if (!filters.hasOwnProperty(p)) {
        continue;
      }
      if (p === 'housing-type') {
        data = data.filter(function (value) {
          if (filters[p] !== 'any') {
            return value.offer.type === filters[p];
          }
          return true;
        });
      } else if (p === 'housing-price') {
        data = data.filter(function (value) {
          if (filters[p] !== 'any') {
            return ((pricingMap[filters[p]][0] <= value.offer.price) && (pricingMap[filters[p]][1] >= value.offer.price));
          }
          return true;
        });
      } else if (p === 'housing-rooms') {
        data = data.filter(function (value) {
          if (filters[p] !== 'any') {
            return (String(value.offer.rooms) === filters[p]);
          }
          return true;
        });
      } else if (p === 'housing-guests') {
        data = data.filter(function (value) {
          if (filters[p] !== 'any') {
            return String(value.offer.guests) === filters[p];
          }
          return true;
        });
      } else if (p.slice(0, 6) === 'filter') {
        data = data.filter(function (value) {
          return (value.offer.features.includes(filters[p]));
        });
      }
    }
    return data.slice(0, window.pins.PINS_QUANTITY);
  };

  /**
  * Отрисовка отфильтрованных данных. Удаляет старые данные. Получает новые. Отрисовывает новые.
  * @param {object} filterValue - значение, по которому фильтруются данные
  */
  var showFilteredAdvertisments = function () {
    window.pins.removePins();
    var filteredData = window.getFilteredData();
    window.pins.showSimilarOffers(filteredData);
  };

  /**
   * Обработчик изменения фильтров
   * @param {object} evt - объект, который отдает слушатель событий
   */
  var onFilterChange = function (evt) {
    if (!evt.target.classList.contains('map__checkbox')) {
      filters[evt.target.id] = evt.target.value;
    } else {
      if (evt.target.checked) {
        filters[evt.target.id] = evt.target.value;
      } else {
        delete filters[evt.target.id];
      }
    }
    window.cards.hideOfferInfo();
    window.util.debounce(showFilteredAdvertisments);
  };

  housingTypeFilter.addEventListener('change', onFilterChange);
  housingPriceFilter.addEventListener('change', onFilterChange);
  housingRoomsFilter.addEventListener('change', onFilterChange);
  housingGuestsFilter.addEventListener('change', onFilterChange);
  housingFeatures.addEventListener('change', onFilterChange);
})();
