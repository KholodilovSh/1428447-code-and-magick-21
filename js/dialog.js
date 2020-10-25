"use strict";

(function () {

  const DEBOUNCE_INTERVAL = 500; // ms
  let lastTimeout;

  const colorize = function (element, input, index, arrayColors, indicator) {
    element.addEventListener(`click`, colorizeOnClick(element, input, index, arrayColors, indicator));
  };

  const colorizeOnClick = function (element, input, index, arrayColors, indicator) {
    element.addEventListener(`click`, function () {
      index = (index + 1) % arrayColors.length;
      if (element.tagName.toLowerCase() === `div`) {
        element.style.backgroundColor = arrayColors[index];
      } else {
        element.style.fill = arrayColors[index];
      }
      input.value = arrayColors[index];

      if (indicator) {
        if (indicator === `coatColor`) {
          window.setup.coatColor = arrayColors[index];
        } else {
          window.setup.eyesColor = arrayColors[index];
        }

        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }

        lastTimeout = window.setTimeout(function () {
          window.updateWizards();
        }, DEBOUNCE_INTERVAL);
      }
    });
  };

  const colorizeClear = function (element, input, index, arrayColors) {
    element.removeEventListener(`click`, colorizeOnClick(element, input, index, arrayColors));
  };

  window.dialog = {
    colorize,
    colorizeClear
  };
})();
