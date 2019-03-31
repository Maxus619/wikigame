<?php
require('db.php');

$login = $_POST["login"];
$password = $_POST["pswd"];
$action = $_POST["action"];
$table = $_POST["table"];
$title = $_POST["title"];
$url = $_POST["url"];

$user = R::findOne('users', 'login = ?', [ $login ]);
if ($user) {
	if (password_verify($password, $user->password)) {
		// GET
		if ($action == "get") {
			if ($table == "users") {
				$search = R::findOne($table, 'login = ?', array($login));
				if ($search) {
					echo $search;
		        }
		        else {
			    	echo 0;
		        }
			}
			else {
				$search = R::find($table, 'user_login = ?', array($login));
				if ($search) {
					echo json_encode($search);
		        }
		        else {
		        	echo 0;
		        }
			}
        }
		// ADD
        else if ($action == "add") {
			$user = R::findOne($table, 'user_login = ? AND url = ?', array($login, $url));
			if ($user) {
			    die('Already exists');
			}
			R::exec("INSERT INTO {$table} (user_login, title, url) VALUES ('{$login}', '{$title}', '{$url}')");

			echo 'Success';

			R::exec("UPDATE users SET experience = experience + 1 WHERE login = '{$login}'");

			// Удаление из запланированного при прочтении
			if ($table == "read_article") {
				$article = R::findOne('toread_article', 'url = ?', array($url));
				R::trash($article);
			}
        }
		// DEL
		else if ($action == "del") {
			$search = R::find($table, 'user_login = ? AND url = ?', array($login, $url));
			if ($search) {
				 R::exec("DELETE FROM {$table} WHERE user_login = '{$login}' AND url = '{$url}'");
				 echo 'Success';
			}
			else {
				echo 0;
			}
		}
    }
}
else {
	echo 'Auth fail';
}
?>
