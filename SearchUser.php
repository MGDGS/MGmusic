<?php
require_once 'database.php';
require_once 'ProcessInput.php';
$username = test_input($_REQUEST['username']);
$sqlConnect = new sqlConnect();
$sql_select = "SELECT user_id,user_name,user_avatar,user_gender,user_lable,
                         (SELECT COUNT(*) FROM admin_songmenu where songmenu_user=a.user_id) AS songmenu_count,
                         (SELECT COUNT(*) FROM user_concern where concern_id = a.user_id) as user_fans 
                         FROM user_message a WHERE  user_name like '%$username%'";
$select_result = $sqlConnect->doSql($sql_select);
if (mysqli_num_rows($select_result)>0) {
    $arr= [];
    while ($row = mysqli_fetch_array($select_result)) {
        $arr[] = $row;
    }
    echo json_encode($arr);
}
else {
    echo "";
}
$sqlConnect->closeConnect();
?>
