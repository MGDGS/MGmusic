<?php
require_once 'database.php';
require_once 'ProcessInput.php';
$content = test_input($_REQUEST['content']);
$sqlConnect = new sqlConnect();
$system = "INSERT INTO admin_todo (todo_content) value ('$content')";
$sqlConnect->doSql($system);
echo "添加成功";
?>
