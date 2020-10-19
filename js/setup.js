"use strict";

const HEROES = 4;
const HERO_COAT = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const HERO_EYES = [`black`, `red`, `blue`, `yellow`, `green`];
const HERO_FIREBALL = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

const KeysCode = {ESCAPE: `Escape`, ENTER: `Enter`};

const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
const blockSetup = document.querySelector(`.setup`);
window.blockSetup = blockSetup;
const similarListElement = blockSetup.querySelector(`.setup-similar-list`);

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
  window.dialog.colorize(wizardCoat, inputCoat, indexCoat, HERO_COAT);
  window.dialog.colorize(wizardEyes, inputEyes, indexEyes, HERO_EYES);

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

const errorHandler = function (errorMessage) {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const initSetup = function () {
  blockSetup.querySelector(`.setup-similar`).classList.remove(`hidden`);

  // const wizards = getWizards();
  // showWizards(wizards);
  window.backend.load(showWizards, errorHandler);

  setupWizardForm.addEventListener(`submit`, function (evt) {
    window.backend.save(new FormData(setupWizardForm), function () {
      blockSetup.classList.add(`hidden`);
    }, errorHandler);
    evt.preventDefault();
  });

};

const renderWizard = function (wizard) {
  const wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

  return wizardElement;
};

const showWizards = function (wizards) {
  const fragment = document.createDocumentFragment();
  const LIMIT_HEROES = HEROES < wizards.length ? HEROES : wizards.length;
  for (let i = 0; i < LIMIT_HEROES; i++) {
    const j = HEROES >= wizards.length ? i : getRandomNumber(0, wizards.length - 1);
    fragment.appendChild(renderWizard(wizards[j]));
  }
  similarListElement.appendChild(fragment);
};

const getRandomNumber = (minNumber = 0, maxNumber = 100, roundDigit = 0) => minNumber + Math.round((maxNumber - minNumber) * Math.random(), roundDigit);

// const getRandomItem = (array) => array[getRandomNumber(0, array.length - 1)];

// const getWizards = function () {
//   const wizards = [];
//   for (let i = 0; i < HEROES; i++) {
//     wizards.push({
//       name: `${getRandomItem(HERO_NAMES)} ${getRandomItem(HERO_SURNAMES)}`,
//       coatColor: getRandomItem(HERO_COAT),
//       eyesColor: getRandomItem(HERO_EYES)
//     });
//   }
//   return wizards;
// };

window.addEventListener(`load`, initSetup);
