<?php
require_once 'database.php';
$range = $_REQUEST['range'];
$sqlConnect = new sqlConnect();
if ($range=='new') {
    $sql_select = "SELECT * FROM system_message";
    $select_result = $sqlConnect->doSql($sql_select);
    while ($row = mysqli_fetch_array($select_result)) {
        $arr[] = $row;
    }
}
if ($range=='all') {
    $sql_select = "SELECT * FROM admin_message";
    $select_result = $sqlConnect->doSql($sql_select);
    while ($row = mysqli_fetch_array($select_result)) {
        $arr[] = $row;
    }
}
echo json_encode($arr);
$sqlConnect->closeConnect();
?>
