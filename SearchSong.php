<?php
require_once 'database.php';
require_once 'ProcessInput.php';
$content = test_input($_REQUEST["content"]);
$sqlConnect = new sqlConnect();
$sql_select = "SELECT * FROM admin_song WHERE song_name like '%$content%' or song_singer like '%$content%'";
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
