<?php
require_once 'database.php';
require_once 'ProcessInput.php';
$name = test_input($_REQUEST['username_or_number']);
$password = test_input($_REQUEST['password']);
$sqlConnect = new sqlConnect();
$sql_select = "select * from admin_message where name = '$name' and password = '$password'";
$select_result = $sqlConnect->doSql($sql_select);
if (mysqli_num_rows($select_result)==1) {
    echo '登陆成功';
}
else {
    echo("error");
}
$sqlConnect->closeConnect();
?>
