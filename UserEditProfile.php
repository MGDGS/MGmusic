<?php
//编辑个人信息
require_once 'database.php';
require_once 'ProcessInput.php';
$username = test_input($_REQUEST["username"]);
$userlable = test_input($_REQUEST["userlable"]);
$usergender = $_REQUEST["usergender"];
$userbirthday = $_REQUEST["userbirthday"];
session_start();
$userid = $_SESSION["userid"];
$sqlConnect = new sqlConnect();
$sql_select = "select user_name from user_message where user_name='$username' and user_id!='$userid'";
$select_result = $sqlConnect->doSql($sql_select);
if (mysqli_num_rows($select_result)>0) {
    exit("当前用户名已存在");
}
else {
    $sql_update = "UPDATE user_message
                        SET user_name='$username',user_lable='$userlable',user_gender='$usergender',user_birthday='$userbirthday'
                        WHERE user_id='$userid'";
    $update_result = $sqlConnect->doSql($sql_update);
    if ($update_result) {
        echo "保存成功";
    }
    else {
        echo "保存失败";
    }
}
?>
