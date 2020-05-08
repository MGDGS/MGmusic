<?php
require_once 'database.php';
$userid = $_REQUEST['userid'];
$sqlConnect = new sqlConnect();
$sql_select = "SELECT a.moment_id,a.moment_content,moment_time,
                    (select song_name from admin_song b where song_id=a.moment_songid) as song_name,
                    (select songmenu_name from admin_songmenu c where songmenu_id=a.moment_songmenuid) as songmenu_name
                    FROM user_moments a 
                    WHERE moment_user = '$userid'";
$select_result = $sqlConnect->doSql($sql_select);
if (mysqli_num_rows($select_result)>0) {
    while ($num = mysqli_fetch_array($select_result)) {
        $arr[] = $num;
    }
    echo json_encode($arr);
}
else {
    echo "";
}
$sqlConnect->closeConnect();
?>
