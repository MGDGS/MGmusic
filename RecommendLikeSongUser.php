<?php
require_once 'database.php';
$songid = $_REQUEST['songid'];
session_start();
$userid = $_SESSION['userid'];
$sqlConnect = new sqlConnect();
$sql_select = "select user_id,user_avatar 
                    from user_message a 
                    join admin_songmenu b on a.user_id=b.songmenu_user 
                    join song_songmenu c on b.songmenu_id=c.songmenu_id 
                    where c.song_id = '$songid' and user_id!='$userid' group by user_id";
$select_result = $sqlConnect->doSql($sql_select);
if (mysqli_num_rows($select_result)>0) {
    while ($num = mysqli_fetch_array($select_result)) {
        $arr[] = $num;
    }
    if (count($arr)>4) {
        $key = array_rand($arr,4);
        for ($i=0;$i<count($key);$i++) {
            $result[] = $arr[$key[$i]];
        }
        echo json_encode($result);
    }
    else {
        echo json_encode($arr);
    }
}
else {
    echo "";
}
$sqlConnect->closeConnect();
?>
