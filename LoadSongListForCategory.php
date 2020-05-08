<?php
require_once 'database.php';
$category = $_REQUEST['category'];
$sqlConnect = new sqlConnect();
if ($category=="all") {
    $sql_seclect = "SELECT * FROM admin_songmenu";
}
else {
    $sql_seclect = "SELECT * FROM admin_songmenu WHERE tag_language='$category' OR tag_style='$category'";
}
$select_result = $sqlConnect->doSql($sql_seclect);
$arr = [];
while($num = mysqli_fetch_array($select_result)) {
    $arr[] = $num;
}
echo json_encode($arr);

?>
