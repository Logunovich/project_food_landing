import {postData} from '../servises/servises';
import {closeModal, openModal} from './modal';
function forms(formSelector, modalTimerId) {
    // Отправляем данные на сервер FormData

const forms = document.querySelectorAll(formSelector),
message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    falure: 'Что-то пошло не так...'
};

forms.forEach(item => {
bindPostData(item);
});

function bindPostData(form) {
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const statusMessage = document.createElement('img');
  statusMessage.src = message.loading;
  statusMessage.style.cssText = `
  display: block;
  margin: 0 auto;
  `;

  form.insertAdjacentElement('afterend', statusMessage)



  
  const formData = new FormData(form);

  const json = JSON.stringify(Object.fromEntries(formData.entries()));


  postData('http://localhost:3000/requests', json)
  .then(data => {
      console.log(data);
      showThanksModal(message.success);
      form.reset();
      statusMessage.remove();
  }).catch(() => {
      showThanksModal(message.falure);
  }).finally(() => {
      form.reset();
  })
  
  // request.addEventListener('load', () => {
  //     if (request.status === 200) {
  //         console.log(request.response);
  //         showThanksModal(message.success);
  //         form.reset();
  //         statusMessage.remove();
  //         }
  //     else {
  //         showThanksModal(message.falure);
  //     }
  // });
});
}

function showThanksModal(message) {
const prevModalDialog = document.querySelector('.modal__dialog');
prevModalDialog.classList.add('hide');
openModal('.modal', modalTimerId);

const thanksModal = document.createElement('div');
thanksModal.classList.add('modal__dialog');
thanksModal.innerHTML = `
<div class="modal__content">
  <div class="modal__close" data-close>×</div>
  <div class="modal__title">${message}</div>
</div>
`;

document.querySelector('.modal').append(thanksModal);
setTimeout(() => {
  thanksModal.remove();
  prevModalDialog.classList.add('show');
  prevModalDialog.classList.remove('hide');
  closeModal('.modal');
}, 4000)
}

// Fetch API

// fetch('http://localhost:3000/menu')
//     .then(data => data.json())
//     .then(res => console.log(res));
}


export default forms;