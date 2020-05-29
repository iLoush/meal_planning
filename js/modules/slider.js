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

export default slider;