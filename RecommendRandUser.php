<?php
require_once "database.php";
session_start();
$userid = $_SESSION['userid'];
$sqlConnect = new sqlConnect();
$sql_seclect = " SELECT a.*,(select COUNT(*) from user_concern where concern_id=a.user_id) AS concern FROM user_message a WHERE a.user_id!=$userid ORDER BY RAND() LIMIT 5;";
$select_result = $sqlConnect->doSql($sql_seclect);
$arr=[];
while ($row=mysqli_fetch_array($select_result)){
    $arr[] = $row;
}
echo json_encode($arr);
$sqlConnect->closeConnect();
?>
