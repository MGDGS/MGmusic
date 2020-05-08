<?php
//删除歌单
require_once 'database.php';
session_start();
$userid = $_SESSION["userid"];
$songmenuid = $_REQUEST["songmenuid"]; //歌单id
$sqlConnect = new sqlConnect();
$sql_delete = "delete a,b from admin_songmenu a 
                                 left join user_songmenu b on a.songmenu_id=b.songmenu_id 
                                 where a.songmenu_id='$songmenuid'";
$delete_result = $sqlConnect->doSql($sql_delete);
if ($delete_result) {
    echo "删除成功";
}
else {
    echo "删除失败";
}
?>
