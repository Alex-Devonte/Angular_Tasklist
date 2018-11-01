<?php
	require_once("db_connect.php");

  //Needed for CORS
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-type");

  //Needed to prevent script from running twice on
  /*Before the addition of the following code, the script was running on the preflight
    request as well as the POST request*/
  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
      header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
    }
    exit(0);
  }

  $data = file_get_contents("php://input");

	//Deserialize JSON so data can be used
	$request = json_decode($data);

  $task =  trim(filter_var($request->task_name, FILTER_SANITIZE_STRING));
  $userID = $_GET['user_id'];

  try
  {
    $query = $connection->prepare("INSERT INTO tasks (user_id, task_name) VALUES (:id, :task)");
    $query->execute(array("id" => $userID,
                          "task" => $task));

    //Retrieve the ID from the last inserted task                   
    $lastID = $connection->lastInsertId($task);
    echo json_encode(array('task_id' => $lastID, 'task_name' => $task));
  }
  catch (PDOException $e)
  {
    echo $e->getMessage();
  }
?>