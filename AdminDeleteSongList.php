<?php
require_once 'database.php';
$sqlConnect = new sqlConnect();
if (is_array($_REQUEST['songlist'])) {
    $songlistarr = $_REQUEST['songlist'];
    for ($i = 0; $i < count($songlistarr); $i++) {
        $sql_delete = "delete a,b,c from admin_songmenu a
                                left join song_songmenu b on a.songmenu_id=b.songmenu_id
                                left join user_songmenu c on a.songmenu_id=c.songmenu_id
                                where a.songmenu_id = '$songlistarr[$i]'";
        $delete_result[$i] = $sqlConnect->doSql($sql_delete);
    }
    if (count($delete_result)>0) {
        echo "删除成功";
    } else {
        exit("删除失败");
    }
} else {
    $songlistid = $_REQUEST['songlist'];
    $sql_delete = "delete a,b,c from admin_songmenu a
                                left join song_songmenu b on a.songmenu_id=b.songmenu_id
                                left join user_songmenu c on a.songmenu_id=c.songmenu_id
                                where a.songmenu_id = '$songlistid'";
    $delete_result = $sqlConnect->doSql($sql_delete);
    if ($delete_result) {
        echo "删除成功";
    } else {
        echo "删除失败";
    }
}

?>
