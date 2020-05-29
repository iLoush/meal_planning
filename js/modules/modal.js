function closeModalWindow(modalSelector) {
   const modalWindow = document.querySelector(modalSelector);

   modalWindow.classList.add('hide');
   modalWindow.classList.remove('show');
   document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
   const modalWindow = document.querySelector(modalSelector);

   modalWindow.classList.add('show');
   modalWindow.classList.remove('hide');
   document.body.style.overflow = 'hidden';

   console.log(modalTimerId);
   if (modalTimerId) {
      clearInterval(modalTimerId);
   }
}

function modal(buttonSelector, modalSelector, modalTimerId) {
   const modalButton = document.querySelectorAll(buttonSelector);
   const modalWindow = document.querySelector(modalSelector);

   modalButton.forEach(btn => {
      btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
   });

   modalWindow.addEventListener('click', (e) => {
      if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
         closeModalWindow(modalSelector);
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
         closeModalWindow(modalSelector);
      }
   });

   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal(modalSelector, modalTimerId);
         window.removeEventListener('scroll', showModalByScroll);
      }
   }
   window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {
   closeModalWindow
};
export {
   openModal
};