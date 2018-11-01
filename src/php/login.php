<?php
	require_once("db_connect.php");
	
	//Header needed for CORS
	header('Access-Control-Allow-Origin: *');

	//Read in raw input
	$data = file_get_contents("php://input");

	//Deserialize JSON so data can be used
	$request = json_decode($data);

	$username =  trim(filter_var($request->username, FILTER_SANITIZE_STRING));
	$password = $request->password;

	$query = $connection->prepare("SELECT * FROM users WHERE username = :username");
	$query->execute(array(
		"username" => $username,
	));

	$userInfo = $query->fetchAll();
	if ($userInfo)
	{
		$hashedPassword = $userInfo[0]['password'];
		if (password_verify($password, $hashedPassword))
		{
			echo json_encode($userInfo);
		}
		else
		{
			echo json_encode(false);
		}
	}
	else
	{
		echo json_encode(false);
	}

?>