import { modalFormTemplate } from "./templates/form-template.js"

const getCreateUserFormDiv = () => {
  return $("#modal-form");
}

const getCreateUserForm = () => {
  return $("#prompt-form")[0];
}

const getCreateUserFormContainer = () => {
  return $("#prompt-form-container")[0];
}

const getCoverDiv = () => {
  return $("#cover-div");
}

function showCover() {
    let coverDiv = document.createElement('div');
    coverDiv.id = 'cover-div';

    // убираем возможность прокрутки страницы во время показа модального окна с формой
    document.body.style.overflowY = 'hidden';

    document.body.append(coverDiv);
  }

  function hideCover() {
    getCoverDiv().remove();
    document.body.style.overflowY = '';
  }

  export function showPrompt(text, callback) {
    showCover();
    const formTemplate = _.template(modalFormTemplate);
    const htmlForm = formTemplate({text});
    const formDiv = getCreateUserFormDiv();
    formDiv.append(htmlForm);

    let form = getCreateUserForm();
    let container = getCreateUserFormContainer();

    function complete(values) {
      hideCover();
      container.style.display = 'none';
      document.removeEventListener("keydown", escapeEventListener);
      callback(values);
    }

    form.onsubmit = function() {
      const values = { name: form.name.value, login: form.login.value, password: form.password.value };
      if (values.name == '' && values.login == '' && values.password == '') return false; // игнорируем отправку пустой формы

      complete(values);
      return false;
    };

    form.cancel.onclick = function() {
      complete(null);
    };

    const escapeEventListener = (e) => {
      if (e.key == 'Escape') {
        complete(null);
      }
    }

    document.addEventListener("keydown", escapeEventListener);
    container.style.display = 'block';
  }
