<?php
require_once 'database.php';
require_once 'ProcessInput.php';
$username_or_number = test_input($_REQUEST['username_or_number']);
$password = test_input($_REQUEST['password']);
$sqlConnect = new sqlConnect();
$sql_select = "select user_id from user_message where (user_name='$username_or_number' or user_number='$username_or_number') and user_pwd='$password'";
$select_result = $sqlConnect->doSql($sql_select);
if (mysqli_num_rows($select_result)==1) {
    $msg = mysqli_fetch_array($select_result);
    session_start();
    $_SESSION['userid']=$msg["user_id"];
    echo json_encode($msg["user_id"]);
}
else {
    exit("error");
}
$sqlConnect->closeConnect();
?>
