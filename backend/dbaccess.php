<?php

class DbAccess {
	public function connect() {
		$servername = "127.0.0.1";
		$database = "calendar";
		$username = "root";
		$password = "";
		$conn = mysqli_connect($servername, $username, $password, $database);
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}
		return $conn;
	}

	public function getTable($tableName) {
		$sql = "SELECT * FROM " . $tableName;
		$result = mysqli_query($this->connect(), $sql);
		$list = array();
		while ($row = $result->fetch_assoc()) {
			$list[] = $row;
		}
		return $list;
	}
	public function execSql($sql) {
		$result = mysqli_query($this->connect(), $sql);
		$list = array();
		while ($row = $result->fetch_assoc()) {
			$list[] = $row;
		}
		return $list;
	}
	public function execStored($storedName, $params = []) {
		$sql = "CALL " . $storedName;
		if (count($params) > 0) {
			$sql .= '(';
			foreach ($params as $param) {
				$sql .= ' ' . $param;
			}
			$sql .= ')';
		}
		$result = mysqli_query($this->connect(), $sql);
		$list = array();
		while ($row = $result->fetch_assoc()) {
			$list[] = $row;
		}
		return $list;
	}
}

/* $db = new DbAccess();
echo '<pre>' . print_r($db->execStored('usp_Ticket_SelectAll'), true) . '</pre>';
echo '<pre>' . print_r($db->execStored('usp_Ticket_SelectByID', [1]), true) . '</pre>';
echo '<pre>' . print_r($db->getTable('user'), true) . '</pre>';
echo '<pre>' . print_r($db->getTable('ticket'), true) . '</pre>';
echo '<pre>' . print_r($db->getTable('label'), true) . '</pre>'; */

?>