<?php
require_once 'database.php';
$sqlConnect = new sqlConnect();
$sql_select = "select count(*) as usercount,
                    (select count(*) from admin_songmenu) as songmenucount,
                    (select count(*) from user_moments ) as momentscount,
                    (select count(*) from admin_song) as songcount,
                    (select count(*) from system_visit) as visitcount,
                    (select count(*) from song_comment) as commentcount
                    from user_message";
$select_result = $sqlConnect->doSql($sql_select);
if (mysqli_num_rows($select_result) > 0) {
    $arr = [];
    while ($row = mysqli_fetch_array($select_result)) {
        $arr[] = $row;
    }
    echo json_encode($arr);
} else {
    echo "";
}
$sqlConnect->closeConnect();
?>
