<?php
require_once 'database.php';
session_start();
$userid = $_SESSION['userid'];
$otherid = $_REQUEST['otherid'];
$sqlConnect = new sqlConnect();
$sql_insert = "delete from user_concern where user_id='$userid' and concern_id='$otherid'";
$insert_result = $sqlConnect->doSql($sql_insert);
if ($insert_result) {
    echo "取消成功";
}
else {
    echo "取消关注失败";
}
$sqlConnect->closeConnect();
?>
