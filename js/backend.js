'use strict';

/**
* Модуль для работы с сервером. Отправка и загрузка данных
* Объект windows.backend доступен для других модулей
*/
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  window.backend = {

    /**
    * Загрузка данных с сервера
    * @param {function} onLoad - функция, котороая выполнится при успешной загрузке
    * @param {function} onError - функция, которая выполнится при ошибке
    */
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URL);

      xhr.addEventListener('load', function () {
        xhr.removeEventListener('error', onConnectionError);
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError();
        }
      });

      xhr.send();
      var onConnectionError = function () {
        window.util.onError();
      };

      xhr.addEventListener('error', onConnectionError);
    }
  };
})();
