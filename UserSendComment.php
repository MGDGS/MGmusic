<?php
require_once 'database.php';
require_once 'ProcessInput.php';
session_start();
$userid = $_SESSION["userid"];
$songid = $_REQUEST["songid"];
if (empty($_REQUEST["content"])) {
    exit("评论内容不能为空");
}
else {
    $content = test_input($_REQUEST["content"]);
}
$time = date('Y-m-d H:i:s', time());
$sqlConnect = new sqlConnect();
$sql_insert = "INSERT INTO song_comment (song_id,comment_user,comment_content,comment_time) VALUE ($songid,'$userid','$content','$time')";
$insert_result = $sqlConnect->doSql($sql_insert);
if ($insert_result) {
    echo "发表成功";
}
else {
    exit("发表失败");
}
$sqlConnect->closeConnect();
?>
