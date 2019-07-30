'use strict';

/**
* Фильтрация данных
* Зависит от модуля pins.js
* метод window.getFilteredData доступен для других модулей
*/
(function () {
  var PricingMap = {
    MIDDLE: [10000, 50000],
    LOW: [0, 10000],
    HIGH: [50000, Infinity],
    ANY: [0, Infinity]
  };
  var filtersForm = document.querySelector('.map__filters');
  var housingTypeFilter = document.querySelector('#housing-type');
  var housingPriceFilter = document.querySelector('#housing-price');
  var housingRoomsFilter = document.querySelector('#housing-rooms');
  var housingGuestsFilter = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var filters = {};
  var noFilter = 'any';
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

  var filterTypes = [filterType, filterPrice, filterRooms, filterGuests];
  var filterFeatures = [filterWifi, filterDishwasher, filterParking, filterWasher, filterElevator, filterConditioner];
  /**
   * Создает карту с первоначальным состоянием фильтров
   */
  var fillFiltersMapStartStatement = function () {
    filterTypes.forEach(function (element) {
      filters[element] = noFilter;
    });
    filters.features = {};
    filterFeatures.forEach(function (element) {
      filters.features[element] = noFilter;
    });
  };
  fillFiltersMapStartStatement();

  window.filter = {

    /**
    * Отдает отфильтрованные данные
    * @return {array} - массив отфильтрованных данных
    */
    getFilteredData: function () {
      var data = window.data.withId.filter(function (item) {
        var isFilteredType = filters[filterType] === item.offer.type || filters[filterType] === noFilter;
        var isFilteredPrice = (PricingMap[filters[filterPrice].toUpperCase()][0] <= item.offer.price && PricingMap[filters[filterPrice].toUpperCase()][1] >= item.offer.price) || filters[filterPrice] === noFilter;
        var isFilteredRooms = filters[filterRooms] === String(item.offer.rooms) || filters[filterRooms] === noFilter;
        var isFilteredGuests = filters[filterGuests] === String(item.offer.guests) || filters[filterGuests] === noFilter;
        var isFilteredFeatures = filterFeatures.every(function (featureName) {
          return item.offer.features.includes(filters.features[featureName]) || filters.features[featureName] === noFilter;
        });
        return isFilteredType && isFilteredPrice && isFilteredRooms && isFilteredGuests && isFilteredFeatures;
      });
      return data.slice(0, window.pins.QUANTITY);
    },

    /**
     * Сброс фильтров
     */
    reset: function () {
      filtersForm.reset();
      fillFiltersMapStartStatement();
    }
  };

  /**
  * Отрисовка отфильтрованных данных. Удаляет старые данные. Получает новые. Отрисовывает новые.
  * @param {object} filterValue - значение, по которому фильтруются данные
  */
  var showFilteredAdvertisments = function () {
    window.pins.remove();
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
        filters.features[evt.target.id] = evt.target.value;
      } else {
        filters.features[evt.target.id] = noFilter;
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
