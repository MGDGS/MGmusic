<?php
require_once 'database.php';
require_once 'ProcessInput.php';
session_start();
$userid = $_SESSION['userid'];
$moment_content = test_input($_REQUEST["moment_content"]);
if (empty($_REQUEST["moment_song"])) {
    $moment_songid = 'NULL';
}
else {
    $moment_songid=$_REQUEST["moment_song"];
}
if (empty($_REQUEST["moment_songmenu"])) {
    $moment_songmenuid = 'NULL';
}
else {
    $moment_songmenuid=$_REQUEST["moment_songmenu"];
}
$moment_time = date('Y-m-d H:i:s', time());
//发布动态
$sqlConnect = new sqlConnect();
$sql_insert = "INSERT INTO user_moments (moment_user,moment_content,moment_songid,moment_songmenuid,moment_time) 
                                VALUES ('$userid','$moment_content',$moment_songid,$moment_songmenuid,'$moment_time')";
$insert_result = $sqlConnect->doSql($sql_insert);
if ($insert_result) {
    echo "发布成功";
} else {
    echo "发布失败";
}
$sqlConnect->closeConnect();
?>
