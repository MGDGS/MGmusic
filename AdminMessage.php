<?php
require_once 'database.php';
$sqlConnect = new sqlConnect();
$sql_seclect = "SELECT * FROM admin_message";
$select_result = $sqlConnect->doSql($sql_seclect);
$arr = [];
while ($row = mysqli_fetch_array($select_result)) {
    $arr[] = $row;
}
echo json_encode($arr);
?>
