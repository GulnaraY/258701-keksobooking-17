'use strict';

/**
* Модуль для работы с сервером. Отправка и загрузка данных
* Объект windows.backend доступен для других модулей
* Зависит от модуля messages.js
*/
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_SEND = 'https://js.dump.academy/keksobooking';
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
        window.form.onErrorLoad('Произошла ошибка соединения');
      };

      xhr.addEventListener('error', onConnectionError);
    },
    /**
     * Отправка данных на сервер
     * @param {object} data - объект Formdata, который содержит данные формы для отправки на сервер
     * @param {function} onLoad - функция, которая выполнится при успешной загрузке данных
     * @param {function} onError - функция, которая выполнится при ошибке
     */
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        xhr.removeEventListener('error', onConnectionError);
        if (xhr.status === 200) {
          onLoad();
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      var onConnectionError = function () {
        window.form.onErrorSend('Произошла ошибка соединения');
      };

      xhr.addEventListener('error', onConnectionError);
      xhr.open('POST', URL_SEND);
      xhr.send(data);
    }
  };
})();
