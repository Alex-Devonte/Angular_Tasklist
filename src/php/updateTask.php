<?php
	require_once("db_connect.php");

	//Needed for CORS
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");
  header("Access-Control-Allow-Headers: Content-type");

  //Needed to prevent script from running twice on
  /*Before the addition of the following code, the script was running on the preflight
    request as well as the POST request*/
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, PUT, POST, OPTIONS"); 
      }
      exit(0);
    }

    $data = file_get_contents("php://input");
    $request = json_decode($data);

    //echo var_dump($request);
    $task_id = $request->task_id;
    $task_name = trim(filter_var($request->task_name, FILTER_SANITIZE_STRING));

  $query = $connection->prepare("UPDATE tasks set task_name = :name WHERE task_id = :id");
	$query->execute(array("name" => $task_name, "id" => $task_id));

?>