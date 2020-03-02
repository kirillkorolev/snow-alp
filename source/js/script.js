"use strict";

(function() {
  var header = document.querySelector(".page-header");
  var menuToggle = header.querySelector(".js-open-menu-button");

  var successModal = document.querySelector(".success-modal");
  var closeSuccessModalButton = successModal.querySelector(
    ".js-close-success-modal"
  );

  var blackout = document.querySelector(".blackout");
  var form = document.querySelector(".form");
  var checkbox = form.querySelector(".form__checkbox-input");
  var itemNameInput = form.querySelector(".form__item--name .form__input");
  var itemPhoneInput = form.querySelector(".form__item--phone .form__input");
  var submitButton = form.querySelector(".js-form-submit-button");
  var callBackButton = header.querySelector(".js-call-back-button");
  var callBackModal = document.querySelector(".call-back-modal");
  var closeCallBackModalButton = callBackModal.querySelector(
    ".js-close-call-back-modal"
  );

  var callBackNameInput = callBackModal.querySelector(
    ".call-back-modal__item--name .call-back-modal__input"
  );
  var callBackPhoneInput = callBackModal.querySelector(
    ".call-back-modal__item--phone .call-back-modal__input"
  );
  var callBackCheckbox = callBackModal.querySelector(
    ".call-back-modal__checkbox-input"
  );
  var callBackModalSubmitButton = callBackModal.querySelector(
    ".js-call-back-modal-submit-button"
  );

  var ESC_KEYCODE = 27;

  var errors = {
    noname: "не заполнено имя",
    nophone: "не заполнен телефон",
    noconfirmation: "подтвердите согласие"
  };

  var removeHiddenClass = function(modal, visibleClass) {
    modal.classList.remove(visibleClass);
  };

  var closeSuccessModal = function() {
    removeHiddenClass(successModal, "success-modal--visible");
    blackout.classList.add("blackout--none");
    document.removeEventListener("keydown", onMessageEscPress);
    blackout.removeEventListener("click", closeModalOnButtonClick);
  };

  var onMessageEscPress = function(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSuccessModal();
    }
  };

  var closeModalOnButtonClick = function() {
    blackout.addEventListener("click", closeSuccessModal());
  };

  menuToggle.addEventListener("click", function() {
    header.classList.toggle("page-header--menu-closed");
  });

  var openModal = function(
    modal,
    visibleClass,
    onEscFunction,
    onClickFunction
  ) {
    modal.classList.add(visibleClass);
    blackout.classList.remove("blackout--none");
    document.addEventListener("keydown", onEscFunction);
    blackout.addEventListener("click", onClickFunction);
  };

  closeSuccessModalButton.addEventListener("click", function() {
    closeSuccessModal();
  });

  var resetForm = function(inputName, inputPhone, inputCheckbox) {
    inputName.value = "";
    inputPhone.value = "";
    inputName.setCustomValidity("");
    inputPhone.setCustomValidity("");

    inputCheckbox.checked = false;
  };

  var validateName = function(input, errorClass) {
    var name = input.value;

    if (!name) {
      input.setCustomValidity(errors.noname);
      input.classList.add(errorClass);
      return false;
    } else {
      input.setCustomValidity("");
      if (input.classList.contains(errorClass)) {
        input.classList.remove(errorClass);
      }
      return true;
    }
  };

  var validatePhone = function(input, errorClass) {
    var phone = input.value;
    var regEx = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    if (regEx.test(phone) === false) {
      input.setCustomValidity(errors.nophone);
      input.classList.add(errorClass);
      return false;
    } else {
      input.setCustomValidity("");
      if (input.classList.contains(errorClass)) {
        input.classList.remove(errorClass);
      }
      return true;
    }
  };

  var validateCheckbox = function(check, errorClass) {
    if (check.checked === false) {
      check.setCustomValidity(errors.noconfirmation);
      check.classList.add(errorClass);
      return false;
    } else {
      check.setCustomValidity("");
      if (check.classList.contains(errorClass)) {
        check.classList.remove(errorClass);
      }
      return true;
    }
  };

  submitButton.addEventListener("click", function(evt) {
    if (
      validateName(itemNameInput, "form__input--error") &&
      validatePhone(itemPhoneInput, "form__input--error") &&
      validateCheckbox(checkbox, "form__checkbox-input--error")
    ) {
      evt.preventDefault();
      openModal(
        successModal,
        "success-modal--visible",
        onMessageEscPress,
        closeModalOnButtonClick
      );
      resetForm(itemNameInput, itemPhoneInput, checkbox);
      if (!header.classList.contains("page-header--menu-closed")) {
        header.classList.add("page-header--menu-closed");
      }
    }
  });

  var closeCallBackModal = function() {
    removeHiddenClass(callBackModal, "call-back-modal--visible");
    blackout.classList.add("blackout--none");
    document.removeEventListener("keydown", onMessageEscPressCallBackModal);
    blackout.removeEventListener("click", closeModalOnButtonClickCallBackModal);
    resetForm(callBackNameInput, callBackPhoneInput, callBackCheckbox);
  };

  var onMessageEscPressCallBackModal = function(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCallBackModal();
    }
  };

  var closeModalOnButtonClickCallBackModal = function() {
    blackout.addEventListener("click", closeCallBackModal());
  };

  callBackButton.addEventListener("click", function() {
    openModal(
      callBackModal,
      "call-back-modal--visible",
      onMessageEscPressCallBackModal,
      closeModalOnButtonClickCallBackModal
    );
    resetForm(itemNameInput, itemPhoneInput, checkbox);
  });

  closeCallBackModalButton.addEventListener("click", function() {
    closeCallBackModal();
  });

  callBackModalSubmitButton.addEventListener("click", function(evt) {
    if (
      validateName(callBackNameInput, "call-back-modal__input--error") &&
      validatePhone(callBackPhoneInput, "call-back-modal__input--error") &&
      validateCheckbox(
        callBackCheckbox,
        "call-back-modal__checkbox-input--error"
      )
    ) {
      evt.preventDefault();
      closeCallBackModal();
      openModal(
        successModal,
        "success-modal--visible",
        onMessageEscPress,
        closeModalOnButtonClick
      );
    }
  });
})();
