$(document).ready(() => {
  const form = $('#form'),
    email = $('#email'),
    password = $('#password'),
    // for test inputs
    patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    patternPass = /.+/,
    // show and close popup
    mainArea = $('#main'),
    showPopup = document.getElementById('showPopup'),
    showPopupHide = $('#showPopup'),
    formClose = document.getElementById('formClose'),
    formCloseIco = document.getElementById('formCloseIco');

  // func for testing
  const testInput = e => {
    if (!patternEmail.test(email.val())) {
      email.addClass('validate__input');
    } else {
      email.removeClass('validate__input');
    }

    if (!patternPass.test(password.val())) {
      password.addClass('validate__input');
    } else {
      password.removeClass('validate__input');
    }

    if (patternEmail.test(email.val()) && patternPass.test(password.val())) {
      form.addClass('display__none');
      showPopupHide.removeClass('display__none');
    }

    e.preventDefault();
  };

  // func for showing and closing popup
  const showClosePopup = e => {
    if (e.target === showPopup) {
      showPopupHide.addClass('display__none');
      form.removeClass('display__none');
    }
    if (e.target === formClose || e.target === formCloseIco) {
      form.addClass('display__none');
      showPopupHide.removeClass('display__none');
    }
  };

  mainArea.on('click', showClosePopup);
  form.on('submit', testInput);
});
