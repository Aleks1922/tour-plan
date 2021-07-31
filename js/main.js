$(document).ready(function () {
  const hotelSlider = new Swiper('.hotel-slider', {
    // Optional parameters
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.hotel-slider__button--next',
      prevEl: '.hotel-slider__button--prev',
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    }
  });

  const reviewsSlider = new Swiper('.reviews-slider', {
    // Optional parameters
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.reviews-slider__button--next',
      prevEl: '.reviews-slider__button--prev',
    },

  });

  // ymaps.ready(init);
  // function init() {
  //   var apiMaps = new ymaps.Map("api-maps", {
  //     center: [25.07, 55.13],
  //     zoom: 13
  //   });
  // }

  let mapContainer = document.getElementById('map_container');
  let options_map = {
    once: true,//запуск один раз, и удаление наблюдателя сразу
    passive: true,
    capture: true
  };
  mapContainer.addEventListener('click', start_lazy_map, options_map);
  mapContainer.addEventListener('mouseover', start_lazy_map, options_map);
  mapContainer.addEventListener('touchstart', start_lazy_map, options_map);
  mapContainer.addEventListener('touchmove', start_lazy_map, options_map);

  let map_loaded = false;
  function start_lazy_map() {
    if (!map_loaded) {
      let map_block = document.getElementById('ymap_lazy');
      map_loaded = true;
      map_block.setAttribute('src', map_block.getAttribute('data-src'));
      map_block.removeAttribute('data_src');
    }
  }

  let menuButton = document.querySelector('.menu-button');
  menuButton.addEventListener('click', function () {
    document.querySelector('.navbar-bottom').classList.toggle('navbar-bottom--visible')
    document.body.classList.toggle('lock')
  })

  // Отправка данных на сервер
  function send(event, php) {
    console.log("Отправка запроса");
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var req = new XMLHttpRequest();
    req.open('POST', php, true);
    req.onload = function () {
      if (req.status >= 200 && req.status < 400) {
        json = JSON.parse(this.response); // Ебанный internet explorer 11
        console.log(json);

        // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
        if (json.result == "success") {
          // Если сообщение отправлено
          alert("Сообщение отправлено");
        } else {
          // Если произошла ошибка
          alert("Ошибка. Сообщение не отправлено");
        }
        // Если не удалось связаться с php файлом
      } else { alert("Ошибка сервера. Номер: " + req.status); }
    };

    // Если не удалось отправить запрос. Стоит блок на хостинге
    req.onerror = function () { alert("Ошибка отправки запроса"); };
    req.send(new FormData(event.target));
  }

  var modalButton = $('[data-toggle=modal]')
  var closeModalButton = $('.modal__close')
  modalButton.on('click', openModal)
  closeModalButton.on('click', closeModal)

  function openModal() {
    var modalOverlay = $(".modal__overlay");
    var modalDialog = $(".modal__dialog");
    modalOverlay.addClass("modal__overlay--visible");
    modalDialog.addClass("modal__dialog--visible");
    document.body.classList.add('lock');
  }
  function closeModal(evt) {
    evt.preventDefault();
    var modalOverlay = $(".modal__overlay");
    var modalDialog = $(".modal__dialog");
    modalOverlay.removeClass("modal__overlay--visible");
    modalDialog.removeClass("modal__dialog--visible");
    document.body.classList.remove('lock');
  }

  $(".modal__overlay").on("click", closeModal);

  $(document).keydown('keydown', function (e) {
    // ESCAPE key pressed
    if (e.keyCode === 27) {
      var modalOverlay = $(".modal__overlay");
      var modalDialog = $(".modal__dialog");
      modalOverlay.removeClass("modal__overlay--visible");
      modalDialog.removeClass("modal__dialog--visible");
      document.body.classList.remove('lock');
    }
  });

  $('.form').each(function () {
    $(this).validate({
      errorClass: "invalid",
      messages: {
        name: {
          required: "Please specify your name",
          minlength: "Your name must contain more than 2 letters"
        },
        email: {
          required: "We need your email address to contact you",
          email: "Your email address must be in the format of name@domain.com"
        },
        phone: {
          required: "Please enter your phone number",
          minlength: "Your number is too short"
        }
      }
    });
  })


  //mask phone
  $('.phone-with-ddd').mask('+7 (000) 000-00-00');

  //AOS animation

  AOS.init();
});