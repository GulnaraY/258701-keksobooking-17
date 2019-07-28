'use strict';

/**
* Фильтрация данных
* Зависит от модуля pins.js
* метод window.getFilteredData доступен для других модулей
*/
(function () {
  var filtersForm = document.querySelector('.map__filters');
  var housingTypeFilter = document.querySelector('#housing-type');
  var housingPriceFilter = document.querySelector('#housing-price');
  var housingRoomsFilter = document.querySelector('#housing-rooms');
  var housingGuestsFilter = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var filters;
  var pricingMap = {
    'middle': [10000, 50000],
    'low': [0, 10000],
    'high': [50000, Infinity],
    'any': [0, Infinity]
  };

  /**
   * Создает карту с первоначальным состоянием фильтров
   */
  var fillFiltersMapStartStatement = function () {
    filters = {
      'housing-type': 'any',
      'housing-price': 'any',
      'housing-rooms': 'any',
      'housing-guests': 'any',
      'filter-wifi': 'unchecked',
      'filter-dishwasher': 'unchecked',
      'filter-parking': 'unchecked',
      'filter-washer': 'unchecked',
      'filter-elevator': 'unchecked',
      'filter-conditioner': 'unchecked'
    };
  };
  fillFiltersMapStartStatement();

  window.filter = {
    /**
    * Отдает отфильтрованные данные
    * @return {array} - массив отфильтрованных данных
    */
    getFilteredData: function () {
      var data = window.data.dataWithId.filter(function (item) {
        var isFilteredType = filters['housing-type'] === item.offer.type || filters['housing-type'] === 'any';
        var isFilteredPrice = (pricingMap[filters['housing-price']][0] <= item.offer.price && pricingMap[filters['housing-price']][1] >= item.offer.price) || filters['housing-price'] === 'any';
        var isFilteredRooms = filters['housing-rooms'] === String(item.offer.rooms) || filters['housing-rooms'] === 'any';
        var isFilteredGuests = filters['housing-guests'] === String(item.offer.guests) || filters['housing-guests'] === 'any';
        var isFilteredWifi = item.offer.features.includes(filters['filter-wifi']) || filters['filter-wifi'] === 'unchecked';
        var isFilteredDishwasher = item.offer.features.includes(filters['filter-dishwasher']) || filters['filter-dishwasher'] === 'unchecked';
        var isFilteredParking = item.offer.features.includes(filters['filter-parking']) || filters['filter-parking'] === 'unchecked';
        var isFilteredElevator = item.offer.features.includes(filters['filter-elevator']) || filters['filter-elevator'] === 'unchecked';
        var isFilteredWasher = item.offer.features.includes(filters['filter-washer']) || filters['filter-washer'] === 'unchecked';
        var isFilteredConditioner = item.offer.features.includes(filters['filter-conditioner']) || filters['filter-conditioner'] === 'unchecked';

        return isFilteredType && isFilteredPrice && isFilteredRooms && isFilteredGuests && isFilteredWifi && isFilteredDishwasher
        && isFilteredParking && isFilteredElevator && isFilteredWasher && isFilteredConditioner;
      });
      return data.slice(0, window.pins.PINS_QUANTITY);
    },

    /**
     * Сброс фильтров
     */
    resetFilters: function () {
      filtersForm.reset();
      fillFiltersMapStartStatement();
    }
  };

  /**
  * Отрисовка отфильтрованных данных. Удаляет старые данные. Получает новые. Отрисовывает новые.
  * @param {object} filterValue - значение, по которому фильтруются данные
  */
  var showFilteredAdvertisments = function () {
    window.pins.removePins();
    var filteredData = window.filter.getFilteredData();
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
        filters[evt.target.id] = 'unchecked';
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
