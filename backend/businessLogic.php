<?php
require_once("dbaccess.php");

class TicketManager {

	public function delete($id) {
		$db = new DbAccess();
		$result = $db->execSql('DELETE FROM ticket WHERE id = ' . $id);
		if ($result) {
			return true;
		} else {
			return false;
		}
	}

	public function create($title, $description, $expireString, $idUser, $idLabel) {
		$db = new DbAccess();
		$conn = $db->connect();
		$stmt = $conn->prepare('INSERT INTO ticket (title, description, expire, idUser, idLabel) VALUES (?, ?, ?, ?, ?)');
		$stmt->bind_param("sssii", $title, $description, $expireString, $idUser, $idLabel,);
		$return = $stmt->execute();
		$stmt->close();
		$conn->close();
		return $return;
	}
	
	public function readAll() {
		$db = new DbAccess();
		return $db->execStored('usp_Ticket_SelectAll');
	}

	public function read($id) {
		$db = new DbAccess();
		return $db->execStored('usp_Ticket_SelectByID', [$id]);
	}

	public function update($newValues, $id) {
		$db = new DbAccess();
		$sql = 'UPDATE ticket SET';
		foreach ($newValues as $key => $value) {
			$sql .= $key . ' = ' . $value;
		}
		$sql .= ' WHERE id = ' . $id;
		echo $sql;
		// $result = $db->execSql($sql);
		// if ($result > 0) {
		// 	return true;
		// } else {
		// 	return false;
		// }
	}
}
/* $tm = new TicketManager();
echo '<pre>' . print_r($tm->create('Title2', 'Description2', date('Y-m-d h:i:s'), 1, 1), true) . '</pre>';
echo '<pre>' . print_r($tm->readAll(), true) . '</pre>';
echo '<pre>' . print_r($tm->read(2), true) . '</pre>'; */
?>