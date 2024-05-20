//import Swiper from "swiper";
//import { Navigation, Pagination } from "swiper/modules";

const swiper = new Swiper(".swiper", {
  speed: 400,
  spaceBetween: 100,
  slidesPerView: 4,
  spaceBetween: 10,
  //paginationClickable: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
  },
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    190: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },

  //  prevSlideMessage: "Previous slide",
  //  nextSlideMessage: "Next slide",

  //  creativeEffect: {
  //    prev: {
  //      // will set `translateZ(-400px)` on previous slides
  //      translate: [0, 0, -400],
  //    },
  //    next: {
  //      // will set `translateX(100%)` on next slides
  //      translate: ["100%", 0, 0],
  //    },
  //  },
  //  effect: "cube",
  //  cubeEffect: {
  //    slideShadows: false,
  //  },
});

//animation

// функция определяет нахождение элемента в области видимости
// если элемент видно - возвращает true
// если элемент невидно - возвращает false
function isOnVisibleSpace(element) {
  var bodyHeight = window.innerHeight;
  var elemRect = element.getBoundingClientRect();
  var offset = elemRect.top; // - bodyRect.top;
  if (offset < 0) return false;
  if (offset > bodyHeight) return false;
  return true;
}

// глобальный объект с элементами, для которых отслеживаем их положение в зоне видимости
var listenedElements = [];
// обработчик события прокрутки экрана. Проверяет все элементы добавленные в listenedElements
// на предмет попадания(выпадения) в зону видимости
window.onscroll = function () {
  listenedElements.forEach((item) => {
    // проверяем находится ли элемент в зоне видимости
    var result = isOnVisibleSpace(item.el);

    // если элемент находился в зоне видимости и вышел из нее
    // вызываем обработчик выпадения из зоны видимости
    if (item.el.isOnVisibleSpace && !result) {
      item.el.isOnVisibleSpace = false;
      item.outVisibleSpace(item.el);
      return;
    }
    // если элемент находился вне зоны видимости и вошел в нее
    // вызываем обработчик попадания в зону видимости
    if (!item.el.isOnVisibleSpace && result) {
      item.el.isOnVisibleSpace = true;
      item.inVisibleSpace(item.el);
      return;
    }
  });
};

// функция устанавливает обработчики событий
// появления элемента в зоне видимости и
// выхода из нее
function onVisibleSpaceListener(elementId, cbIn, cbOut) {
  // получаем ссылку на объект элемента
  var el = document.getElementById(elementId);
  // добавляем элемент и обработчики событий
  // в массив отслеживаемых элементов
  listenedElements.push({
    el: el,
    inVisibleSpace: cbIn,
    outVisibleSpace: cbOut,
  });
}

// устанавливаем обработчики для элемента "video"
onVisibleSpaceListener(
  "video",
  (el) => {
    // функция вызываемая при попадании элемента в зону видимости
    // тут вставляем код запуска анимации
    //el.innerHTML = "111111111111111111111111";
    //window.alert("элемент в зоне видимости");
  },
  (el) => {
    // функция вызываемая при выпадении элемента из зоны видимости
    // тут вставляем код остановки анимации
    el.innerHTML = "000000000000000000000000";
    //window.alert("элемент вне зоны видимости");
  }
);
