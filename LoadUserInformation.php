<?php
require_once 'database.php';
$userid = $_REQUEST['userid'];
$sqlConnect = new sqlConnect();
$sql_select = "SELECT a.*,(SELECT COUNT(*) FROM user_moments WHERE moment_user=a.user_id) AS moments_count,(SELECT COUNT(*) FROM user_concern WHERE user_id=a.user_id) AS concern,(SELECT COUNT(*) FROM user_concern WHERE concern_id=a.user_id) AS fans FROM user_message a WHERE a.user_id='$userid'";
$select_result = $sqlConnect->doSql($sql_select);
$arr=mysqli_fetch_array($select_result,MYSQLI_ASSOC);
echo json_encode($arr);
$sqlConnect->closeConnect();
?>
