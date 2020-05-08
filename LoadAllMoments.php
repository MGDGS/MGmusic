<?php
require_once 'database.php';
$sqlConnect = new sqlConnect();
$sql_select = "SELECT a.*,b.user_avatar,b.user_name FROM user_moments a JOIN user_message b ON a.moment_user = b.user_id ORDER BY a.moment_time DESC";
$select_result = $sqlConnect->doSql($sql_select);
if (mysqli_num_rows($select_result)!=0) {
    while ($row=mysqli_fetch_array($select_result)) {
        if ($row["moment_songmenuid"]!=null) {
            $moment_id = $row["moment_id"];
            $sql_select_songmenu = "select a.*,user_name,user_avatar,songmenu_name,songmenu_user,songmenu_cover from user_moments a join admin_songmenu on moment_songmenuid=songmenu_id join user_message on moment_user=user_id WHERE moment_id='$moment_id'";
            $select_songmenu_result = $sqlConnect->doSql($sql_select_songmenu);
            $arr[] = mysqli_fetch_array($select_songmenu_result);
        }
        elseif ($row["moment_songid"]!=null) {
            $moment_id = $row["moment_id"];
            $sql_select_song = "select a.*,user_name,user_avatar,song_name,song_singer from user_moments a join admin_song on moment_songid=song_id join user_message on moment_user=user_id WHERE moment_id='$moment_id'";
            $select_song_result = $sqlConnect->doSql($sql_select_song);
            $arr[] = mysqli_fetch_array($select_song_result);
        }
        else {
            $arr[] = $row;
        }
    }
    echo json_encode($arr);
}
else {
    echo '';
}
$sqlConnect->closeConnect();
?>
