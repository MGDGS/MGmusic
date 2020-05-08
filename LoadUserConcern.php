<?php
require_once 'database.php';
$userid = $_REQUEST['userid'];
$sqlConnect = new sqlConnect();
$sql_select = "SELECT b.* FROM user_concern a JOIN user_message b ON a.concern_id=b.user_id WHERE a.user_id='$userid'";
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
