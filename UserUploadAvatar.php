<?php
require_once 'database.php';
session_start();
$userid = $_SESSION["userid"];
$filename = $_FILES["avatar"]["name"];
$tempurl = $_FILES["avatar"]["tmp_name"]; //临时存储路径
$url = "userAvatar/". $_SESSION['userid'] . "_Avatar.jpg";  //文件保存路径
//判断图片类型
$allowedExts = array("jpg");  //支持的图片类型
$temp = explode(".",$filename);
$extension = end($temp); //获取文件后缀名
if (in_array($extension,$allowedExts)){
    //保存文件
    if(move_uploaded_file($tempurl, iconv("UTF-8","GB2312",$url))) {
        //将路径存储到数据库
        $sqlConnect = new sqlConnect();
        $sql_update = "UPDATE user_message SET user_avatar='$url' WHERE user_id='$userid'";
        $update_result = $sqlConnect->doSql($sql_update);
        if($update_result){
            echo $url;
        }
        else{
            echo "false";
        }
        $sqlConnect->closeConnect();
    }
}
else{
    echo "false";
}
?>
