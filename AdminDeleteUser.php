<?php
require_once 'database.php';
$sqlConnect = new sqlConnect();
if (is_array($_REQUEST['user'])) {
    $userarr = $_REQUEST['user'];
    for ($i = 0; $i < count($userarr); $i++) {
        $sql_delete = "delete a,b,c,d,e,f,g from user_message a
                              left join admin_songmenu b on a.user_id = b.songmenu_user  
                              left join song_songmenu c on b.songmenu_id=c.songmenu_id
                              left join user_songmenu d on a.user_id = d.songmenu_id
                              left join user_moments e on a.user_id = e.moment_user
                              left join song_comment f on a.user_id = f.comment_user
                              left join user_concern g on a.user_id = g.user_id or a.user_id = g.concern_id
                              where a.user_id = '$userarr[$i]'";
        $delete_result[$i] = $sqlConnect->doSql($sql_delete);
    }
    if (count($delete_result)>0) {
        echo "删除成功";
    } else {
        exit("删除失败");
    }

} else {
    $userid = $_REQUEST['user'];
    $sql_delete = "delete a,b,c,d,e,f,g from user_message a
                              left join admin_songmenu b on a.user_id = b.songmenu_user  
                              left join song_songmenu c on b.songmenu_id=c.songmenu_id
                              left join user_songmenu d on a.user_id = d.songmenu_id
                              left join user_moments e on a.user_id = e.moment_user
                              left join song_comment f on a.user_id = f.comment_user
                              left join user_concern g on a.user_id = g.user_id or a.user_id = g.concern_id
                              where a.user_id = '$userid'";
    $delete_result = $sqlConnect->doSql($sql_delete);
    if ($delete_result) {
        echo "删除成功";
    } else {
        echo "删除失败";
    }
}
?>
