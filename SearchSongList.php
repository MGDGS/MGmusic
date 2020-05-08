<?php
require_once 'database.php';
require_once 'ProcessInput.php';
$content = test_input($_REQUEST["content"]);
$sqlConnect = new sqlConnect();
$sql_select = "SELECT a.*,b.user_name,(select count(*) from song_songmenu where songmenu_id=a.songmenu_id) AS song_count FROM admin_songmenu a JOIN user_message b ON a.songmenu_user=b.user_id WHERE songmenu_name like '%$content%' or user_name like '%$content%'";
$select_result = $sqlConnect->doSql($sql_select);
if (mysqli_num_rows($select_result)!=0) {
    while ($row = mysqli_fetch_array($select_result)) {
        $arr[] = $row;
    }
    echo json_encode($arr);
}
else {
    echo "";
}
?>
