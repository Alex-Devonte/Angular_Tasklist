<?php
	require_once("db_connect.php");

	//Needed for CORS
	header("Access-Control-Allow-Origin: *");

	$id = $_GET['task_id'];

	$query = $connection->prepare("SELECT task_id, task_name FROM tasks WHERE task_id = :id");
	$query->execute(array("id" => $id));
	
	$data = $query->fetchAll();
	echo json_encode($data);
?>