<?php
require_once 'database.php';
$songmenuid = $_REQUEST["songmenuid"];
$sqlConnect = new sqlConnect();
$sql_select = "SELECT a.*,b.user_avatar,b.user_name FROM admin_songmenu a JOIN user_message b ON songmenu_user=user_id WHERE songmenu_id = '$songmenuid'";
$select_result = $sqlConnect->doSql($sql_select);
echo json_encode(mysqli_fetch_array($select_result, MYSQLI_ASSOC));
