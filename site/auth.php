<?php
require('db.php');

$login = $_POST["login"];
$password = $_POST["pswd"];

// TODO: Проверки

$user = R::findOne('users', 'login = ?', array($login));
if ($user) {
	if (password_verify($password, $user->password)) {
		// TODO: Вернуть данные о входе
		die("Success");
    }
	else {
        // TODO: Вернуть ошибку
		die("Wrong password");
	}
}
else {
	// TODO: Вернуть ошибку
	die("User is not found");
}
?>
