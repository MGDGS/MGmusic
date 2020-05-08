<?php
require_once 'database.php';
$sqlConnect = new sqlConnect();
$sql_seclect = "SELECT a.*,b.user_name FROM admin_songmenu a JOIN user_message b ON a.songmenu_user=b.user_id";
$select_result = $sqlConnect->doSql($sql_seclect);
$arr = [];
while ($row = mysqli_fetch_array($select_result)) {
    $arr[] = $row;
}
echo json_encode($arr);
?>
