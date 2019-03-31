<?php
require('db.php');

$email = $_POST["email"];
$login = $_POST["login"];
$password = $_POST["pswd"];

// Проверка на поля
if ($email == '' || $login == '' || $password == '') {
    die();
}
// Проверка на существующую почту
$user = R::findOne('users', 'email = ?', array($email));
if ($user) {
    die('Email is taken');
}
// Проверка на существующий логин
$user = R::findOne('users', 'login = ?', array($login));
if ($user) {
    die('Login is taken');
}

// TODO: Проверка на сложность пароля


$users = R::dispense('users');
$users->email = $email;
$users->login = $login;
$users->password = password_hash($password, PASSWORD_DEFAULT);
R::store($users);

echo 'Success';
?>
