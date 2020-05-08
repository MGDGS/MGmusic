<?php
require_once 'database.php';
require_once 'ProcessInput.php';
$number = test_input($_REQUEST["number"]);
if (empty($number)) {
    exit("手机号不能为空");
}
else {
    $sqlConnect = new sqlConnect();
    $sql_select = "select user_number from user_message where user_number='$number'";
    $select_result = $sqlConnect->doSql($sql_select);
    if (mysqli_num_rows($select_result)>0) {
        exit("该手机号已被注册");
    }
    else {
        exit("");
    }
}
?>
