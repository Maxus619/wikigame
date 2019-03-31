<?php
require('db.php');

$select = R::getAll('SELECT login, experience FROM users ORDER BY experience DESC LIMIT 10');
if ($select) {
    echo json_encode($select);
}
else {
    echo 0;
}
?>
