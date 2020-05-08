<?php
require_once "database.php";
session_start();
$userid = $_SESSION['userid'];
$otherid = $_REQUEST['userid'];
$sqlConnect = new sqlConnect();
$sql_seclect = "select COUNT(*) as concern from user_concern where user_id='$userid' and concern_id='$otherid'";
$select_result = $sqlConnect->doSql($sql_seclect);
echo mysqli_fetch_array($select_result)["concern"];
$sqlConnect->closeConnect();
?>
