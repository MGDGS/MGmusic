<?php
require_once 'database.php';
require_once 'ProcessInput.php';
$username = test_input($_REQUEST["username"]);
if (empty($username)) {
    exit("用户名不能为空");
}
else {
    $sqlConnect = new sqlConnect();
    $sql_select = "select user_name from user_message where user_name='$username'";
    $select_result = $sqlConnect->doSql($sql_select);
    if (mysqli_num_rows($select_result)>0) {
        exit("用户名已存在");
    }
    else {
        exit("");
    }
}
?>
