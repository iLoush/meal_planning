/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calculator() {

   // formula is here
   // https://fitseven.ru/zdorovie/metabolism/sutochnaya-norma-kaloriy

   const result = document.querySelector('.calculating__result span');
   let sex, height, weight, age, ratio;

   if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
   } else {
      sex = 'female';
      localStorage.setItem('sex', sex);
   }

   if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
   } else {
      ratio = 1.375;
      localStorage.setItem('ratio', ratio);
   }

   function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
         result.textContent = '____';
         return;
      }

      if (sex === 'female') {
         result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      } else {
         result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
   }

   calcTotal();

   function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
         elem.classList.remove(activeClass);
         if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
         }
         if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
         }
      });
   }

   initLocalSettings('#gender div', 'calculating__choose-item_active');
   initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

   function getStaticData(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
         elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
               ratio = +e.target.getAttribute('data-ratio');
               localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
            } else {
               sex = e.target.getAttribute('id');
               localStorage.setItem('sex', e.target.getAttribute('id'));
            }

            elements.forEach(elem => {
               elem.classList.remove(activeClass);
            });

            e.target.classList.add(activeClass);
            calcTotal();
         });
      });
   }

   getStaticData('#gender div', 'calculating__choose-item_active');
   getStaticData('.calculating__choose_big div', 'calculating__choose-item_active');

   // function for inputs
   function getDynamicData(selector) {
      const input = document.querySelector(selector);

      input.addEventListener('input', () => {
         if (input.value.match(/\D/g)) {
            input.style.border = '1px solid red';
         } else {
            input.style.border = 'none';
         }
         switch (input.getAttribute('id')) {
            case 'height':
               height = +input.value;
               break;
            case 'weight':
               weight = +input.value;
               break;
            case 'age':
               age = +input.value;
               break;
         }
         calcTotal();
      });

   }

   getDynamicData('#height');
   getDynamicData('#weight');
   getDynamicData('#age');

}

/* harmony default export */ __webpack_exports__["default"] = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
   class MenuCard {
      constructor(src, alt, title, desrc, price, parentSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.desrc = desrc;
         this.price = price;
         this.classes = classes;
         this.parent = document.querySelector(parentSelector);
         this.transfer = 27;
         this.changeToUAH();
      }

      changeToUAH() {
         this.price = +this.price * this.transfer;
      }

      render() {
         const element = document.createElement('div');

         if (this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
         } else {
            this.classes.forEach(className => element.classList.add(className));
         }

         element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.desrc}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
               <div class="menu__item-cost">Price:</div>
               <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
         `;
         this.parent.append(element);
      }
   }

   Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getData"])('http://localhost:3000/menu')
      .then(data => {
         data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
         }) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
         });
      });

}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");





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

         Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', json)
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
      Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModal"])('.modal', modalTimerId);

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
         Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModalWindow"])('.modal');
      }, 4000);
   }
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, closeModalWindow, openModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModalWindow", function() { return closeModalWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
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

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider({
   container,
   slide,
   nextArrow,
   prevArrow,
   totalCounter,
   currentCounter,
   wrapper,
   inner
}) {
   // slider
   const slides = document.querySelectorAll(slide);
   const slider = document.querySelector(container);
   const prev = document.querySelector(prevArrow);
   const next = document.querySelector(nextArrow);
   const total = document.querySelector(totalCounter);
   const currentSlide = document.querySelector(currentCounter);
   const slidesWrapper = document.querySelector(wrapper);
   const slidesInner = document.querySelector(inner);
   const width = window.getComputedStyle(slidesWrapper).width;

   let slideIndex = 1;
   let offset = 0;

   if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
      currentSlide.textContent = `0${slideIndex}`;
   } else {
      total.textContent = slides.length;
      currentSlide.textContent = slideIndex;
   }

   slidesInner.style.width = 100 * slides.length + '%';
   slidesInner.style.display = 'flex';
   slidesInner.style.transition = 'all 0.5s';
   slidesWrapper.style.overflow = 'hidden';

   slides.forEach(slide => {
      slide.style.width = width;
   });


   // create dots
   slider.style.position = 'relative';

   const dots = document.createElement('ol');
   const dotsArray = [];

   dots.classList.add('carousel-dots');
   dots.style.cssText = `
       position: absolute;
       right: 0;
       bottom: 0;
       left: 0;
       z-index: 15;
       display: flex;
       justify-content: center;
       margin-right: 15%;
       margin-left: 15%;
       list-style: none;
 `;
   slider.append(dots);

   for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.style.cssText = `
          box-sizing: content-box;
          flex: 0 1 auto;
          width: 30px;
          height: 6px;
          margin-right: 3px;
          margin-left: 3px;
          cursor: pointer;
          background-color: #fff;
          background-clip: padding-box;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          opacity: 0.5;
          transition: opacity 0.6s ease;
       `;
      if (i == 0) {
         dot.style.opacity = 1;
      }
      dots.append(dot);
      dotsArray.push(dot);
   }

   function deleteNotDigits(str) {
      return +str.replace(/\D/g, '');
   }


   next.addEventListener('click', () => {
      if (offset == deleteNotDigits(width) * (slides.length - 1)) {
         offset = 0;
      } else {
         offset += deleteNotDigits(width);
      }
      slidesInner.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == slides.length) {
         slideIndex = 1;
      } else {
         slideIndex++;
      }

      if (slides.length < 10) {
         currentSlide.textContent = `0${slideIndex}`;
      } else {
         currentSlide.textContent = slideIndex;
      }

      dotsArray.forEach(dot => dot.style.opacity = '0.5');
      dotsArray[slideIndex - 1].style.opacity = 1;
   });

   prev.addEventListener('click', () => {
      if (offset == 0) {
         offset = deleteNotDigits(width) * (slides.length - 1);
      } else {
         offset -= deleteNotDigits(width);
      }
      slidesInner.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == 1) {
         slideIndex = slides.length;
      } else {
         slideIndex--;
      }

      if (slides.length < 10) {
         currentSlide.textContent = `0${slideIndex}`;
      } else {
         currentSlide.textContent = slideIndex;
      }

      dotsArray.forEach(dot => dot.style.opacity = '0.5');
      dotsArray[slideIndex - 1].style.opacity = 1;
   });

   dotsArray.forEach(dot => {
      dot.addEventListener('click', (e) => {
         const slideTo = e.target.getAttribute('data-slide-to');

         slideIndex = slideTo;
         offset = deleteNotDigits(width) * (slideTo - 1);

         slidesInner.style.transform = `translateX(-${offset}px)`;

         if (slides.length < 10) {
            currentSlide.textContent = `0${slideIndex}`;
         } else {
            currentSlide.textContent = slideIndex;
         }

         dotsArray.forEach(dot => dot.style.opacity = '0.5');
         dotsArray[slideIndex - 1].style.opacity = 1;
      });
   });

}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

   // selectors
   const tabs = document.querySelectorAll(tabsSelector);
   const tabsContent = document.querySelectorAll(tabsContentSelector);
   const tabsParent = document.querySelector(tabsParentSelector);

   // function to hide tabs
   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
      });
      tabs.forEach(item => {
         item.classList.remove(activeClass);
      });
   }

   // function to show tab
   function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add(activeClass);
   }

   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', (event) => {
      const target = event.target;

      if (target && target.classList.contains(tabsSelector.slice(1))) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(id, deadline) {
   function getTimeRemaining(endtime) {

      const t = Date.parse(endtime) - Date.parse(new Date());
      const days = Math.floor(t / (1000 * 60 * 60 * 24));
      const hours = Math.floor((t / (1000 * 60 * 60) % 24)); // оператор остатка
      const minutes = Math.floor((t / 1000 / 60) % 60);
      const seconds = Math.floor((t / 1000) % 60);

      return {
         'total': t,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds,
      };
   }

   // fanction helper will add "0" before #of days or hours if value is less than 10
   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setTimer(selector, endtime) {
      const timer = document.querySelector(selector);
      const days = timer.querySelector('#days');
      const hours = timer.querySelector('#hours');
      const minutes = timer.querySelector('#minutes');
      const seconds = timer.querySelector('#seconds');
      const timeInterval = setInterval(updateTimer, 1000);

      updateTimer();

      // finction will be update pur timer every second
      function updateTimer() {
         const t = getTimeRemaining(endtime);

         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);

         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   }
   setTimer(id, deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");











window.addEventListener('DOMContentLoaded', () => {

   const modalTimerId = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["openModal"])('.modal', modalTimerId), 50000);

   Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
   Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
   Object(_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2020-06-15');
   Object(_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
   Object(_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
   Object(_modules_calculator__WEBPACK_IMPORTED_MODULE_5__["default"])();
   Object(_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
      container: '.offer__slider',
      nextArrow: '.offer__slider-next',
      prevArrow: '.offer__slider-prev',
      totalCounter: '#total',
      currentCounter: '#current',
      wrapper: '.offer__slider-wrapper',
      inner: '.offer__slider-inner',
      slide: '.offer__slide'
   });
});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postData, getData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
const postData = async (url, data) => {
   const result = await fetch(url, {
      method: 'POST',
      headers: {
         'Content-type': 'application/json'
      },
      body: data
   });
   return await result.json();
};

async function getData(url) {
   let result = await fetch(url);

   if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
   }
   return await result.json();
}





/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map