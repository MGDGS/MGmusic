<?php
require_once 'database.php';
$sqlConnect = new sqlConnect();
$sql_seclect = "SELECT * FROM admin_songmenu ORDER BY RAND() LIMIT 4";
$select_result = $sqlConnect->doSql($sql_seclect);
if (mysqli_num_rows($select_result)>0) {
    while ($row=mysqli_fetch_array($select_result)){
        $arr[] = $row;
    }
    echo json_encode($arr);
}
else{
    echo '';
}
$sqlConnect->closeConnect();
?>
