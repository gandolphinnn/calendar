<?php

function debug($obj) {
	echo '<pre>' . print_r($obj, true) . '</pre>';
}

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

	private function parseResult($result) {
		if (is_bool(($result))) {
			return $result;
		}
		$list = array();
		while ($row = $result->fetch_assoc()) {
			$list[] = $row;
		}
		return $list;
	}

	public function getTable($tableName) {
		$sql = "SELECT * FROM " . $tableName;
		return $this->parseResult(mysqli_query($this->connect(), $sql));
	}
	public function execSql($sql) {
		return $this->parseResult(mysqli_query($this->connect(), $sql));
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
		return $this->parseResult(mysqli_query($this->connect(), $sql));
	}
}

/* $db = new DbAccess();
debug($db->execStored('usp_Ticket_SelectAll'));
debug($db->execStored('usp_Ticket_SelectByID', [1]));
debug($db->getTable('user'));
debug($db->getTable('ticket'));
debug($db->getTable('label')) */

?>