<?php
require_once "database.php";
require_once 'changePinyin.php';
$category = $_REQUEST["category"];
$sqlConnect = new sqlConnect();
$sql_seclect = "SELECT song_singer FROM admin_song group by song_singer";
$select_result = $sqlConnect->doSql($sql_seclect);
$arr = [];
//所有歌手
if ($category=="all") {
    while($num = mysqli_fetch_array($select_result)) {
        $arr[] = $num;
    }
}
else {
    $py = new PinYin();
    while($num = mysqli_fetch_array($select_result)) {
        if (stristr(str_split($py->getJp($num[0]))[0],$category)) {
            $arr[] = $num;
        }
    }
}
echo json_encode($arr);
$sqlConnect->closeConnect();
?>
