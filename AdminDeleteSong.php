<?php
require_once 'database.php';
$sqlConnect = new sqlConnect();
if (is_array($_REQUEST['song'])) {
    $songarr = $_REQUEST['song'];
    for ($i = 0; $i < count($songarr); $i++) {
        $sql_delete = "delete a,b,c from admin_song a
                                left join song_comment b on a.song_id = b.song_id
                                left join song_songmenu c on a.song_id=c.song_id
                                where a.song_id = '$songarr[$i]'";
          $delete_result[$i] = $sqlConnect->doSql($sql_delete);
      }
      if (count($delete_result)>0) {
          echo "删除成功";
      } else {
          exit("删除失败");
      }
} else {
    $songid = $_REQUEST['song'];
    $sql_delete = "delete a,b,c from admin_song a
                                left join song_comment b on a.song_id = b.song_id
                                left join song_songmenu c on a.song_id=c.song_id
                                where a.song_id = '$songid'";
    $delete_result = $sqlConnect->doSql($sql_delete);
    if ($delete_result) {
        echo "删除成功";
    } else {
        echo "删除失败";
    }
}

?>
