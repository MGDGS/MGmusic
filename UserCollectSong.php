<?php
require_once 'database.php';
session_start();
$userid = $_SESSION['userid'];
$songid = $_REQUEST['songid'];
$songmenuid = $_REQUEST['songmenuid'];
$sqlConnect = new sqlConnect();
$sql_select = "SELECT * FROM song_songmenu WHERE song_id = $songid AND songmenu_id = $songmenuid";
$select_result = $sqlConnect->doSql($sql_select);
if (mysqli_num_rows($select_result) > 0) {
    echo "歌曲已存在";
} else {
    $sql_insert = "INSERT INTO song_songmenu (song_id,songmenu_id) VALUES ($songid,$songmenuid)";
    $insert_result = $sqlConnect->doSql($sql_insert);
    if ($insert_result) {
        echo "收藏成功";
    } else {
        echo "收藏失败";
    }
}
?>
