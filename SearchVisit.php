<?php
require_once 'database.php';
require_once 'ProcessInput.php';
$username = test_input($_REQUEST['username']);
$sqlConnect = new sqlConnect();
$sql_select = "SELECT * from system_visit WHERE IP like '%$username%' or address like '%$username%' or time like '%$username%'";
$select_result = $sqlConnect->doSql($sql_select);
if (mysqli_num_rows($select_result)>0) {
    $arr= [];
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
