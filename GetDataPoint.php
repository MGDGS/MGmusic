<?php
require_once 'database.php';
require_once 'ProcessInput.php';
$content = test_input($_REQUEST['content']);
$temp = explode(",",$content);
$ip = $temp[0];
$address = $temp[1];
$time = date('Y-m-d H:i:s', time());
$sqlConnect = new sqlConnect();
$sql_insert = "INSERT INTO system_visit (IP,address,time) VALUE ('$ip','$address','$time')";
$insert_result = $sqlConnect->doSql($sql_insert);
?>
