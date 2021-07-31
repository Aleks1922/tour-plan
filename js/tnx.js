$(document).ready(function () {

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

});