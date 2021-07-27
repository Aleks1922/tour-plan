<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь

if(isset($_POST['email'])){
    // если есть что-то в $_POST['email']
    $email = $_POST['email'];

    $title = "Новый email для регистрации Best Tour Plan";
    $body = "
    <h2>Новый Email Для регистрации пользователя</h2>
    <b>email:</b> $email<br>
    ";
} else {
    // если нет, отправлена форма с телефоном и пр.
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    $title = "Новое обращение Best Tour Plan";
    $body = "
    <h2>Новое обращение</h2>
    <b>Имя:</b> $name<br>
    <b>Телефон:</b> $phone<br><br>
    <b>Сообщение:</b><br>$message
    ";

}


// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'besttourplanmerinov@yandex.ru'; // Логин на почте
    $mail->Password   = 'lslazvfqcpyfsodh'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('besttourplanmerinov@yandex.ru', 'Aleksey Merinov'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('kinderLOLpingui@yandex.ru');

// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";}
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
header('Location: thankyou.html');