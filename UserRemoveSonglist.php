<?php
//取消收藏歌单
require_once 'database.php';
session_start();
$userid = $_SESSION["userid"];
$songmenuid = $_REQUEST["songmenuid"]; //歌单id
$sqlConnect = new sqlConnect();
$sql_delete = "delete from user_songmenu where songmenu_id='$songmenuid'";
$delete_result = $sqlConnect->doSql($sql_delete);
if ($delete_result) {
    echo "取消收藏成功";
}
else {
    echo "取消收藏失败";
}
?>
