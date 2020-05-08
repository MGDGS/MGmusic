<?php
require_once 'database.php';
require_once 'ProcessInput.php';
session_start();
$userid = $_SESSION['userid'];
$songmenuname = test_input($_REQUEST['songlistname']);
$date = date('Y-m-d');
$sqlConnect = new sqlConnect();
$sql_insert = "INSERT INTO admin_songmenu (songmenu_name,songmenu_user,songmenu_cover,createdate) VALUES ('$songmenuname','$userid','songmenuCover/默认歌单封面.jpg','$date')";
$insert_result = $sqlConnect->doSql($sql_insert);
if($insert_result)
{
    echo "新建成功";
}
else {
    echo "新建失败";
}
$sqlConnect->closeConnect();
?>
