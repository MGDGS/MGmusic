<?php
require_once "database.php";

$songid = $_REQUEST["songid"];
$sqlConnect = new sqlConnect();
$sql_select = "SELECT * FROM admin_song WHERE song_id=$songid;";
$select_result = $sqlConnect->doSql($sql_select);
echo json_encode(mysqli_fetch_array($select_result,MYSQLI_ASSOC));

?>
