<?php
require_once 'database.php';
$sqlConnect = new sqlConnect();
$sql_select = "SELECT * FROM admin_todo limit 6";
$select_result = $sqlConnect->doSql($sql_select);
if (mysqli_num_rows($select_result)>0) {
    while ($row = mysqli_fetch_array($select_result)) {
        $arr[] = $row;
    }
    echo json_encode($arr);
}
else {
    echo '';
}
$sqlConnect->closeConnect();
?>
