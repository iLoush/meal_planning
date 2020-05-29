import {
   closeModalWindow,
   openModal
} from './modal';

import {
   postData
} from '../services/services';


function forms(formSelector, modalTimerId) {

   const forms = document.querySelectorAll(formSelector);
   const message = {
      loading: 'img/form/spinner.svg',
      success: 'Thanks! We will contact you soon',
      failure: 'Something went wrong...'
   };

   forms.forEach(item => {
      bindPostData(item);
   });

   function bindPostData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         let statusMessage = document.createElement('img');
         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
         display: block;
         margin: 0 auto;
         `;
         form.insertAdjacentElement('afterend', statusMessage);

         const formData = new FormData(form);

         const json = JSON.stringify(Object.fromEntries(formData.entries()));

         postData('http://localhost:3000/requests', json)
            .then(data => {
               console.log(data);
               showUserResponse(message.success);
               statusMessage.remove();
            }).catch(() => {
               showUserResponse(message.failure);
            }).finnaly(() => {
               form.reset();
            });
      });
   }

   function showUserResponse(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');
      openModal('.modal', modalTimerId);

      const userResponseModal = document.createElement('div');
      userResponseModal.classList.add('modal__dialog');
      userResponseModal.innerHTML = `
      <div class="modal__content">
         <div class="modal__close" data-close>×</div>
         <div class="modal__title">${message}</div>
      </div>
      `;
      document.querySelector('.modal').append(userResponseModal);

      setTimeout(() => {
         userResponseModal.remove();
         prevModalDialog.classList.add('show');
         prevModalDialog.classList.remove('hide');
         closeModalWindow('.modal');
      }, 4000);
   }
}

export default forms;