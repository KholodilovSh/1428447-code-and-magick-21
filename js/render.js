"use strict";

(function () {
  const HEROES = 4;
  const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

  const similarListElement = window.setup.blockSetup.querySelector(`.setup-similar-list`);


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

    while (similarListElement.firstChild) {
      similarListElement.firstChild.remove();
    }

    for (let i = 0; i < LIMIT_HEROES; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  window.render = {
    showWizards
  };
})();
