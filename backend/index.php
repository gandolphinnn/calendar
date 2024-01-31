
<?php
require_once("businessLogic.php");

/*
URL endpoints:

[GET] ./index.php -> select all ticket
[GET] ./index.php?id=$id -> select specific ticket
[POST] ./index.php -> create a new ticket
[PUT] ./index.php/?id=$id -> update an existing ticket
[DELETE] ./index.php/?id=$id -> delete an existing ticket
*/

class RestService {
	private function setHttpHeaders($contentType, $statusCode){
		http_response_code($statusCode);
		header("Content-Type:". $contentType);
		header("Access-Control-Allow-Origin: *");
	}

	public function returnCode($statusCode) {
		$this->setHttpHeaders("application/json", $statusCode);
		echo '{\"result\": \"' . $statusCode . '\"}';
	}

	public function parseRequest() {
		try {
			//debug($_SERVER['REQUEST_METHOD']);
			$ticketManager = new TicketManager();
			switch($_SERVER['REQUEST_METHOD']) {
				case 'GET': {
					if (isset($_GET['id']) && $_GET['id']) {
						$result = $ticketManager->read($_GET['id']);
					}
					else {
						$result = $ticketManager->readAll();
					}
					$this->setHttpHeaders("application/json", 200);
					echo json_encode($result);
				}
				break;
				/* case 'POST': {
					$data = json_decode(file_get_contents('php://input'), true);
					if (array_key_exists("title",$data) && array_key_exists("date",$data)) {
						$result = $ticketManager->createOne($data);
						if ($result) {
							$this->returnCode(200);
						} else {
							$this->returnCode(400);
						}
					} else {
						$this->returnCode(400);
					}
				}
				break;
				case 'PUT': {
					if(isset($_GET["id"])) {
						$result = $ticketManager->completeOne($_GET["id"]);
						if ($result) {
							$this->returnCode(200);
						} else {
							$this->returnCode(400);
						}
					} else {
						$this->returnCode(400);
					}
				}
				break;
				case 'DELETE': {
					if(isset($_GET["id"])) {
						$result = $ticketManager->deleteOne($_GET["id"]);
						if ($result) {
							$this->returnCode(200);
						} else {
							$this->returnCode(400);
						}
					} else {
						$this->returnCode(400);
					}
				}
				break; */
			} 
		} catch (Exception $e) {
			echo $e->getMessage();
		}
	}
}

$restService = new RestService();
$restService->parseRequest();