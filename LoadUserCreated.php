<?php
require_once 'database.php';
$userid = $_REQUEST['userid'];
$sqlConnect = new sqlConnect();
$sql_select = "SELECT * FROM admin_songmenu WHERE songmenu_user = '$userid'";
$select_result = $sqlConnect->doSql($sql_select);
if (mysqli_num_rows($select_result)>0) {
    while ($num = mysqli_fetch_array($select_result)) {
        $arr[] = $num;
    }
    echo json_encode($arr);
}
else {
    echo "";
}
$sqlConnect->closeConnect();
?>
