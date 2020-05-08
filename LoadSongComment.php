<?php
require_once "database.php";
session_start();
$songid = $_REQUEST["songid"];
$sqlConnect = new sqlConnect();
$sql_select = "SELECT a.*,b.user_id,b.user_name,b.user_avatar FROM song_comment a JOIN user_message b ON a.comment_user = b.user_id where song_id='$songid'";
$select_result = $sqlConnect->doSql($sql_select);
$commentmsg = [];
$rowcount = mysqli_num_rows($select_result);
if ($rowcount>0) {
    while ($num=mysqli_fetch_array($select_result)) {
        $commentmsg[] = $num;
    };
    echo json_encode($commentmsg);
}
else {
    echo "";
}
$sqlConnect->closeConnect();
?>
