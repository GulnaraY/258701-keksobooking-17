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
  var filters = {};
  var noFilter = 'any';
  var pricingMap = {
    'middle': [10000, 50000],
    'low': [0, 10000],
    'high': [50000, Infinity],
    'any': [0, Infinity]
  };
  var filterType = 'housing-type';
  var filterPrice = 'housing-price';
  var filterRooms = 'housing-rooms';
  var filterGuests = 'housing-guests';
  var filterWifi = 'filter-wifi';
  var filterDishwasher = 'filter-dishwasher';
  var filterParking = 'filter-parking';
  var filterWasher = 'filter-washer';
  var filterElevator = 'filter-elevator';
  var filterConditioner = 'filter-conditioner';

  var filterTypes = [filterType, filterPrice, filterRooms, filterGuests, filterWifi, filterDishwasher, filterParking, filterWasher, filterElevator, filterConditioner];

  /**
   * Создает карту с первоначальным состоянием фильтров
   */
  var fillFiltersMapStartStatement = function () {
    filterTypes.forEach(function (element) {
      filters[element] = noFilter;
    });
  };
  fillFiltersMapStartStatement();

  window.filter = {
    /**
    * Отдает отфильтрованные данные
    * @return {array} - массив отфильтрованных данных
    */
    getFilteredData: function () {
      var data = window.data.dataWithId.filter(function (item) {
        var isFilteredType = filters[filterType] === item.offer.type || filters[filterType] === noFilter;
        var isFilteredPrice = (pricingMap[filters[filterPrice]][0] <= item.offer.price && pricingMap[filters[filterPrice]][1] >= item.offer.price) || filters[filterPrice] === noFilter;
        var isFilteredRooms = filters[filterRooms] === String(item.offer.rooms) || filters[filterRooms] === noFilter;
        var isFilteredGuests = filters[filterGuests] === String(item.offer.guests) || filters[filterGuests] === noFilter;
        var isFilteredWifi = item.offer.features.includes(filters[filterWifi]) || filters[filterWifi] === noFilter;
        var isFilteredDishwasher = item.offer.features.includes(filters[filterDishwasher]) || filters[filterDishwasher] === noFilter;
        var isFilteredParking = item.offer.features.includes(filters[filterParking]) || filters[filterParking] === noFilter;
        var isFilteredElevator = item.offer.features.includes(filters[filterElevator]) || filters[filterElevator] === noFilter;
        var isFilteredWasher = item.offer.features.includes(filters[filterWasher]) || filters[filterWasher] === noFilter;
        var isFilteredConditioner = item.offer.features.includes(filters[filterConditioner]) || filters[filterConditioner] === noFilter;

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
  * Обработчик изменения фильтров. Заполняет объект filters в случает выбора фильтра
  * @param {object} evt - объект, который отдает слушатель событий
  */
  var onFilterChange = function (evt) {
    if (!evt.target.classList.contains('map__checkbox')) {
      filters[evt.target.id] = evt.target.value;
    } else {
      if (evt.target.checked) {
        filters[evt.target.id] = evt.target.value;
      } else {
        filters[evt.target.id] = noFilter;
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
