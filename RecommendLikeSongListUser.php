<?php
require_once 'database.php';
$songmeuid = $_REQUEST['songmenuid'];
$sqlConnect = new sqlConnect();
$sql_select = "select a.user_id,user_avatar from user_songmenu a join user_message b on a.user_id=b.user_id where songmenu_id='$songmeuid'";
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
