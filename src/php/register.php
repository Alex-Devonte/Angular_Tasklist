<?php
	require_once("db_connect.php");

	//Header needed for CORS
  header('Access-Control-Allow-Origin: *');

  //Read in raw input
	$data = file_get_contents("php://input");

	//Deserialize JSON so data can be used
  $request = json_decode($data);


  $username = trim(filter_var($request->username, FILTER_SANITIZE_STRING));
  $firstName = trim(filter_var($request->first_name, FILTER_SANITIZE_STRING));
  $lastName = trim(filter_var($request->last_name, FILTER_SANITIZE_STRING));
  $password = $request->password;
  
  $errors = array();

  //Validate Names
  if (!validateName($firstName))
  {
    array_push($errors, "First name must contain letters only and be between 2 and 20 characters");
  }

  if (!validateName($lastName))
  {
    array_push($errors, "Last name must contain letters only and be between 2 and 20 characters");
  }

  //Validate Username
  if (!validateUsername($username))
  {
    array_push($errors, "Usernames must be a minimum of 4 characters and only contain periods, hypens, and underscores as special characters");
  }
  else if (usernameExists($connection, $username))
  {
    array_push($errors, "Username already exists");
  }

  //Validate Password
  if (!validatePassword($password))
  {
    array_push($errors, "Passwords must be a minimum of 5 characters and contain at least 1 digit and 1 letter");
  }

  //Send back the error messages if there are any
  if (count($errors) > 0)
  {
    echo json_encode($errors);

    //exit so rest of script won't run
    exit(0);
  }

  try 
  {
    $password = password_hash($password, PASSWORD_DEFAULT);
    $query = $connection->prepare("INSERT INTO users (first_name, last_name, username, password) VALUES (:first, :last, :user, :pass)");
    $query->execute(array("first" => $firstName, "last" => $lastName, "user" => $username, "pass" => $password));
    echo json_encode(true);
  }
  catch (PDOException $e)
  {
    echo $e->getMessage();
  }

  function usernameExists($connection, $username) {
    $query = $connection->prepare("SELECT username FROM users WHERE username = :username");
    $query->execute(array("username" => $username));
    if ($query->rowCount() > 0)
    {
      return true;
    }
    return false;
  }
 
  function validateName($name) {
    if (strlen($name) >=2 && strlen($name) <= 20)
    {
      //Check if name contains only letters
      if (ctype_alpha($name))
      {
        return true;
      }
    }
    else
    {
      return false;
    }
  }

  function validatePassword($password) {
    //Minimun 5 characters and contain at least one digit and one letter
    $passwordRegex = '/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{5,}$/';
    if (preg_match($passwordRegex, $password))
    {
      return true;
    }
    else 
    {
      return false;
    }
  }

  function validateUsername($username) {
    //Between 4 & 20 characters and container only letters, numbers, and periods, hyphens, and underscores
    $usernameRegex = '/^(?=.{4,20}$)[a-zA-Z0-9._-]+$/';
    if (preg_match($usernameRegex, $username))
    {
      return true;
    }
    else 
    {
      return false;
    }
  }

?>