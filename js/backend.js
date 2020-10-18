"use strict";

(function () {

  const URL = `https://21.javascript.pages.academy/code-and-magick/data`;
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const load = function (onLoad, onError) {
    linkServer(onLoad, onError);
  };

  const save = function (data, onLoad, onError) {
    linkServer(onLoad, onError, data);
  };

  const linkServer = function (onLoad, onError, data) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(data ? `POST` : `GET`, URL);
    xhr.send(data);
  };

  window.backend = {
    load,
    save
  };

})();
