<?php
require_once 'ProcessInput.php';
require_once 'database.php';
$username = test_input($_REQUEST['username']);
$password = test_input($_REQUEST['password']);
$number = test_input($_REQUEST['number']);
$number_check = '/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/';
if (empty($username) || empty($password)) {
    exit("用户名或密码不能为空");
} else if (!preg_match($number_check, $number)) {
    exit("请输入正确的电话号码");
} else {
    $sqlConnect = new sqlConnect();
    $sql_select = "select * from user_message where user_name='$username'";
    $select_result = $sqlConnect->doSql($sql_select);
    $rowcount = mysqli_num_rows($select_result);
    if ($rowcount > 0) {
        exit("用户名已存在");
    } else {
        $sql_select = "select * from user_message where user_number='$number'";
        $select_result = $sqlConnect->doSql($sql_select);
        $rowcount = mysqli_num_rows($select_result);
        if ($rowcount > 0) {
            exit("该手机号已注册");
        } else {
            $date = date('Y-m-d');
            $sql_insert = "INSERT INTO user_message (user_name,user_pwd,user_avatar,user_number,user_gender,user_register) VALUES ('$username','$password','userAvatar/默认头像2.jpg','$number','保密','$date')";
            $insert_result = $sqlConnect->doSql($sql_insert);
            if ($insert_result) {
                echo "注册成功";
            } else {
                echo "注册失败";
            }
        }
    }
    $sqlConnect->closeConnect();
}
?>
