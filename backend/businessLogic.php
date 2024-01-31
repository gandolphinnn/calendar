<?php
require_once("dbaccess.php");

class TicketManager {
	public function create($title, $description, $expireString, $idUser, $idLabel) {
		$db = new DbAccess();
		$conn = $db->connect();
		$stmt = $conn->prepare('INSERT INTO ticket (title, description, expire, idUser, idLabel) VALUES (?, ?, ?, ?, ?)');
		$stmt->bind_param("sssii", $title, $description, $expireString, $idUser, $idLabel);
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
			if(is_null($value)) {
				$sql .= ' ' . $key . ' = NULL,';
			}
			else {
				$sql .= ' ' . $key . ' = \'' . $value . '\',';
			}
		}
		$sql = substr($sql, 0, strlen($sql) - 1);
		$sql .= ' WHERE id = ' . $id;
		return $db->execSql($sql);
	}

	public function delete($id) {
		$db = new DbAccess();
		return $db->execSql('DELETE FROM ticket WHERE id = ' . $id);
	}
}
/* $tm = new TicketManager();
debug($tm->create('Title2', 'Description2', date('Y-m-d h:i:s'), 1, 1));
debug($tm->readAll());
debug($tm->read(2));
debug($tm->update(['idLabel' => NULL], 3));
debug($tm->delete(4)); */
?>