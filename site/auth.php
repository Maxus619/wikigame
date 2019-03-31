<?php
require('db.php');

$login = $_POST["login"];
$password = $_POST["pswd"];

$user = R::findOne('users', 'login = ?', array($login));
if ($user) {
	if (password_verify($password, $user->password)) {
		die("Success");
    }
	else {
		die("Wrong password");
	}
}
else {
	die("User is not found");
}
?>
