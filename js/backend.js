"use strict";

(function () {

  const TIMEOUT_IN_MS = 10000;

  const StatusCode = {
    OK: 200
  };

  const serverParams = {
    load: {
      method: `GET`,
      url: `https://21.javascript.pages.academy/code-and-magick/data`},
    save: {
      method: `POST`,
      url: `https://21.javascript.pages.academy/code-and-magick`}
  };

  const load = function (onLoad, onError) {
    makeRequestToServer(onLoad, onError);
  };

  const save = function (data, onLoad, onError) {
    makeRequestToServer(onLoad, onError, data);
  };

  const makeRequestToServer = function (onLoad, onError, data) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    const {method, url} = data ? serverParams.save : serverParams.load;

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

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load,
    save
  };

})();
