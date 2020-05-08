<?php
require_once 'database.php';
$songmenuid = $_REQUEST['songmenuid'];
$sqlConnect = new sqlConnect();
$sql_select = "select a.* from admin_song a join song_songmenu b on a.song_id=b.song_id where songmenu_id = '$songmenuid'";
$select_result = $sqlConnect->doSql($sql_select);
if (mysqli_num_rows($select_result)>0) {
    while ($row = mysqli_fetch_array($select_result)) {
        $arr[] = $row;
    }
    echo json_encode($arr);
}
else {
    echo "";
}
$sqlConnect->closeConnect();
?>
