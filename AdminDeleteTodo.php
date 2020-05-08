<?php
require_once 'database.php';
$todo = $_REQUEST['todo'];
$sqlConnect = new sqlConnect();
$sql_delete = "delete from admin_todo where todo_id='$todo'";
$sqlConnect->doSql($sql_delete);
$sqlConnect->closeConnect();
?>
