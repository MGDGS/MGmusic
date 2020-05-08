<?php
require_once 'database.php';
require_once 'ProcessInput.php';
$number = test_input($_REQUEST["number"]);
$password = test_input($_REQUEST['password']);
$sqlConnect = new sqlConnect();
$sql_select = "update user_message set user_pwd='$password' where user_number='$number'";
$select_result = $sqlConnect->doSql($sql_select);
if ($select_result) {
    exit("修改成功");
} else {
    exit("修改失败");
}
?>
