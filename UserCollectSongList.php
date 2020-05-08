<?php
require_once 'database.php';
session_start();
$userid = $_SESSION['userid'];
$songmenuid = $_REQUEST["songmenuid"];
$sqlConnect = new sqlConnect();
$sql_insert = "INSERT INTO user_songmenu (user_id,songmenu_id) VALUES ('$userid','$songmenuid')";
$insert_result = $sqlConnect->doSql($sql_insert);
if ($insert_result) {
    echo "收藏成功";
} else {
    echo "您已收藏该歌单";
}
?>
