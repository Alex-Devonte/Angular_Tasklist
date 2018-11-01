<?php
	require_once("db_connect.php");

	//Needed for CORS
  header("Access-Control-Allow-Origin: *");

  $taskID = $_GET['task_id'];
  try
  {
    $query = $connection->prepare("DELETE from tasks WHERE task_id = :id");
    $query->execute(array("id" => $taskID));
  }
  catch (PDOException $e)
  {
    echo $e->getMessage();
  }
?>