<?php
require('db.php');

$login = $_POST["login"];
$password = $_POST["pswd"];
$action = $_POST["action"];
$user_to = $_POST["user_to"];
$content = $_POST["content"];

$user = R::findOne('users', 'login = ?', [ $login ]);
if ($user) {
	if (password_verify($password, $user->password)) {
        // Вывод диалогов
        if ($action == "get_dialogs") {
            // $search = R::find('messages', 'user_to = ?', array($login));
			$search = R::getAll( "SELECT * FROM `messages` WHERE user_from = '{$login}' OR user_to = '{$login}' ORDER BY send_date DESC" );
			if ($search) {
                echo json_encode($search);
            }
            else {
                echo 0;
            }
        }

		// Вывод сообщений
		else if ($action == "get_messages") {
			$search = R::getAll( "SELECT * FROM messages WHERE (user_from = '{$login}' AND user_to = '{$user_to}') OR (user_from = '{$user_to}' AND user_to = '{$login}')");
			if ($search) {
                echo json_encode($search);
            }
            else {
                echo 0;
            }
		}

        // Отправка сообщений
        else if ($action == "send") {
            // TODO: Дата отправки
            R::exec( "INSERT INTO messages (user_from, user_to, content, send_date) VALUES ('{$login}', '{$user_to}', '{$content}', now())" );
            echo 'Success';
        }
    }
}
else {
	echo 'Auth fail';
}
?>
