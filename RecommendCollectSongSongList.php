<?php
require_once 'database.php';
$songid = $_REQUEST['songid'];
$sqlConnect = new sqlConnect();
$sql_select = "select b.songmenu_id,b.songmenu_cover,b.songmenu_name,c.user_name from song_songmenu a 
                              join admin_songmenu b on a.songmenu_id=b.songmenu_id
                              join user_message c on b.songmenu_user=c.user_id 
                              where a.song_id='$songid'";
$select_result = $sqlConnect->doSql($sql_select);
if (mysqli_num_rows($select_result)>0) {
    while ($num = mysqli_fetch_array($select_result)) {
        $arr[] = $num;
    }
    if (count($arr)>6) {
        $key = array_rand($arr,6);
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
