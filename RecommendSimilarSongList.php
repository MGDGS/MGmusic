<?php
require_once 'database.php';
$songmenuid = $_REQUEST['songmenuid'];
$sqlConnect = new sqlConnect();
$sql_select = " select b.songmenu_id,b.songmenu_name,b.songmenu_cover,c.user_name from admin_songmenu a 
                              join admin_songmenu b on a.tag_language=b.tag_language or a.tag_style=b.tag_style 
                              join user_message c on b.songmenu_user=c.user_id 
                              where a.songmenu_id='$songmenuid' and b.songmenu_id!=a.songmenu_id;";
$select_result = $sqlConnect->doSql($sql_select);
if (mysqli_num_rows($select_result)>0) {
    while ($num = mysqli_fetch_array($select_result)) {
        $arr[] = $num;
    }
    if (count($arr)>5) {
        $key = array_rand($arr,5);
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
