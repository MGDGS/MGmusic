<?php
require_once "database.php";
$singer = $_REQUEST["singer"];
$sqlConnect = new sqlConnect();
if ($singer=="all") {
    $sql_seclect = "SELECT * FROM admin_song ORDER BY song_singer";

}
else {
    $sql_seclect = "SELECT * FROM admin_song WHERE song_singer='$singer'";
}
$select_result = $sqlConnect->doSql($sql_seclect);
$arr = [];
while($num = mysqli_fetch_array($select_result)) {
    $arr[] = $num;
}
echo json_encode($arr);
$sqlConnect->closeConnect();

?>
