<?php
require_once 'database.php';
session_start();
$userid = $_SESSION['userid'];
$otherid = $_REQUEST['otherid'];
$sqlConnect = new sqlConnect();
$sql_insert = "INSERT INTO user_concern (user_id,concern_id ) VALUE ($userid,$otherid)";
$insert_result = $sqlConnect->doSql($sql_insert);
if ($insert_result) {
    echo "关注成功";
}
else {
    echo "关注失败";
}
$sqlConnect->closeConnect();
?>
