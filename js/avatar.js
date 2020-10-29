"use strict";

(function () {

  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  const fileChooser = document.querySelector(`.upload input[type=file]`);
  const preview = document.querySelector(`.setup-user-pic`);

  fileChooser.addEventListener(`change`, function () {
    const file = fileChooser.files[0];

    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (file) {
      if (matches) {
        const reader = new FileReader();

        reader.addEventListener(`load`, function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);

      }
    }
  });
})();
