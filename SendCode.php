<?php
//发送验证码
require_once 'ZhenziSmsClient.php';
require_once 'ProcessInput.php';
$rand = $_REQUEST["rand"];
$number = test_input($_REQUEST["number"]);
$params = array('message'=>'验证码为:'.$rand.'，您正在MGmusic音乐网站进行相关操作，如非本人操作，请忽略本短信。','number'=>$number);
$client = new  ZhenziSmsClient("https://sms_developer.zhenzikj.com", "105330", "NTcxODRkNWItMDRmMS00MTcwLWIyNjMtMzg5MTA2ODM1NjEw");
$result=$client->send($params);
echo $result;
?>
