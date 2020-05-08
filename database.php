<?php
class sqlConnect
{
    var $conn;

    function getConnect()
    {
        $this->conn = mysqli_connect("localhost", "root", "898721492");
        mysqli_query($this->conn,"SET NAMES 'UTF8'");
        if ($this->conn->connect_error) {
            die("连接失败:" . $this->conn->connect_error);
        } else {
            mysqli_select_db($this->conn, 'MGmusic');
        }
    }

    function doSql($sql)
    {
        $this->getConnect();
        return mysqli_query($this->conn, $sql);
    }

    function closeConnect()
    {
        mysqli_close($this->conn);
    }
}

?>
