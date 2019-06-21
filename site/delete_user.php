<?php
require('db.php');

$login = $_POST["login"];
$password = $_POST["pswd"];
$user_search = $_POST["user"];

$user = R::findOne('users', 'login = ?', [ $login ]);
if ($user) {
	if (password_verify($password, $user->password)) {
        // Вывод пользователей по запросу
		$search = R::findOne('users', 'login = ?', [ $user_search ]);
		if ($search) {
            R::exec("DELETE FROM users WHERE login = '?'", [ $login ]);
        }
        else {
            echo 0;
        }
    }
}
else {
	echo 'Auth fail';
}
?>
