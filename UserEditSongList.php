<?php
//编辑歌单信息
require_once 'database.php';
require_once 'ProcessInput.php';
$id = $_REQUEST["id"];
if (empty($_REQUEST["name"])) {
    exit("歌单名不能为空");
} else {
    $name = test_input($_REQUEST["name"]);
}
if (empty($_REQUEST["lable"])){
   $lable = "";
} else {
    $lable = test_input($_REQUEST["lable"]);
}
if (empty($_REQUEST["language"])) {
    $language = "";
} else {
    $language = $_REQUEST["language"];
}
if (empty($_REQUEST["style"])) {
    $style = "";
} else {
    $style = $_REQUEST["style"];
}
$sqlConnect = new sqlConnect();
$sql_update = "UPDATE admin_songmenu
                        SET songmenu_name='$name',songmenu_lable='$lable',tag_language='$language',tag_style='$style'
                        WHERE songmenu_id='$id'";
$update_result = $sqlConnect->doSql($sql_update);
if ($update_result) {
    echo "保存成功";
}
else {
    echo "保存失败";
}
?>
