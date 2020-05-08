<?php
require_once 'database.php';
require_once 'getID3-master/getid3/getid3.php';
$filename = $_FILES["song"]["name"]; // 文件名
$date = date('Y-m-d'); //上传时间
$temp = explode(" - ",$filename);
$singer = $temp[0]; //获取歌手名
$temp2 = explode(".",$temp[1]);
$type = end($temp2); //获取文件名后缀（文件类型）
array_pop($temp2);
$song = implode(".",$temp2); //获取歌曲名
$tempurl = $_FILES["song"]["tmp_name"]; //临时存储位置
$url = "song/". $_FILES["song"]["name"]; //目标存储位置
$getID3 = new getID3();  //实例化类
$ThisFileInfo = $getID3->analyze($tempurl); //分析文件，$path为音频文件的地址
$fileduration=$ThisFileInfo['playtime_string']; //这个获得的便是音频文件的时长
//判断歌曲文件类型
$allowedExts = array("mp3");  //支持的文件类型
if (in_array($type,$allowedExts)){
    $sqlConnect = new sqlConnect();
    $sql_select = "SELECT * FROM admin_song WHERE song_name='$song' AND song_singer='$singer'";
    $select_result = $sqlConnect->doSql($sql_select);
    if(mysqli_num_rows($select_result)>0){
        exit("当前歌曲已存在");
    }
    else{
        $sql_insert = "INSERT INTO admin_song (song_name,song_singer,song_url,song_duration,song_upload) 
                                        VALUES ('$song','$singer','$url','$fileduration','$date')";
        $insert_result = $sqlConnect->doSql($sql_insert);
        if($insert_result){
            if (move_uploaded_file($tempurl, iconv("UTF-8","GB2312",$url))) {
                $time = date('Y-m-d H:i:s', time());
                $content = '超级管理员上传了歌曲【'.$url.'】';
                $system = "INSERT INTO system_message (message_type,message_time,message_content) value ('系统','$time','$content')";
                $sqlConnect->doSql($system);
                echo "上传成功";
            }
            else {
                $sql_delete = "DELETE FROM admin_song WHERE song_url='$url'";
                $sqlConnect->doSql($sql_delete);
                echo "上传失败";
            }
        }
        else{
            echo "上传失败";
        }
    }
}
else{
    echo "目前仅支持mp3格式文件";
}
$sqlConnect->closeConnect();
?>
