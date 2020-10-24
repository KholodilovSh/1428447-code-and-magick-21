"use strict";

const HERO_COAT = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const HERO_EYES = [`black`, `red`, `blue`, `yellow`, `green`];
const HERO_FIREBALL = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

const KeysCode = {ESCAPE: `Escape`, ENTER: `Enter`};

const blockSetup = document.querySelector(`.setup`);
window.blockSetup = blockSetup;

const setupOpen = document.querySelector(`.setup-open`);
const setupClose = blockSetup.querySelector(`.setup-close`);
const setupUserName = blockSetup.querySelector(`.setup-user-name`);

const setupWizardForm = blockSetup.querySelector(`.setup-wizard-form`);

const setupFireBall = blockSetup.querySelector(`.setup-fireball-wrap`);
const inputFireball = blockSetup.querySelector(`.js-fireball-color`);
const indexFireball = 0;

const setupWizard = blockSetup.querySelector(`.setup-wizard`);
const wizardCoat = setupWizard.querySelector(`.wizard-coat`);
const inputCoat = blockSetup.querySelector(`.js-coat-color`);
const indexCoat = 0;

const wizardEyes = setupWizard.querySelector(`.wizard-eyes`);
const inputEyes = blockSetup.querySelector(`.js-eyes-color`);
const indexEyes = 0;

const upLoad = blockSetup.querySelector(`.upload`);
const setupCoord = {
  x: blockSetup.style.left,
  y: blockSetup.style.top
};

let wizards = [];
const coatColor = {
  save: `rgb(101, 137, 164)`
};
const eyesColor = {
  save: `black`
};

const getRank = function (wizard) {
  let rank = 0;

  if (wizard.colorCoat === coatColor.save) {
    rank += 2;
  }
  if (wizard.colorEyes === eyesColor.save) {
    rank += 1;
  }

  return rank;
};

window.updateWizards = function () {
  window.render.showWizards(wizards.sort(function (left, right) {
    return getRank(right) - getRank(left);
  }));
};

setupUserName.addEventListener(`keydown`, function (evt) {
  if (evt.key === KeysCode.ESCAPE) {
    evt.stopPropagation();
  }
});

const onPopupEscPress = function (evt) {
  if (evt.key === KeysCode.ESCAPE) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = function () {
  blockSetup.style.left = setupCoord.x;
  blockSetup.style.top = setupCoord.y;

  blockSetup.classList.remove(`hidden`);

  window.dialog.colorize(setupFireBall, inputFireball, indexFireball, HERO_FIREBALL);
  window.dialog.colorize(wizardCoat, inputCoat, indexCoat, HERO_COAT, coatColor);
  window.dialog.colorize(wizardEyes, inputEyes, indexEyes, HERO_EYES, eyesColor);

  window.move.moveSetup(upLoad);

  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = function () {
  blockSetup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);

  window.dialog.colorizeClear(setupFireBall, inputFireball, indexFireball, HERO_FIREBALL);
  window.dialog.colorizeClear(wizardCoat, inputCoat, indexCoat, HERO_COAT);
  window.dialog.colorizeClear(wizardEyes, inputEyes, indexEyes, HERO_EYES);

};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === KeysCode.ENTER) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === KeysCode.ENTER) {
    closePopup();
  }
});

const successHandler = function (data) {
  wizards = data;
  updateWizards();
};

const initSetup = function () {
  blockSetup.querySelector(`.setup-similar`).classList.remove(`hidden`);

  window.backend.load(successHandler, window.utils.errorHandler);

  setupWizardForm.addEventListener(`submit`, function (evt) {
    window.backend.save(new FormData(setupWizardForm), function () {
      blockSetup.classList.add(`hidden`);
    }, window.utils.errorHandler);
    evt.preventDefault();
  });

};

window.addEventListener(`load`, initSetup);
