<?php
  // $db_hostname = 'localhost';
  // $db_database = 'tasklist';
  // $db_username = 'root';
  // $db_password = '';

  $db_hostname = 'localhost';
  $db_database = 'alextayl_tasklist';
  $db_username = 'alextayl_root';
  $db_password = 'cka2e6E3!AH!S8';

  try
  {
    $connection = new PDO("mysql:host=$db_hostname; dbname=$db_database",
                          $db_username, $db_password);
    
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }
  catch (PDOException $e)
  {
    echo "Connection Failed: " . $e->getMessage();
  }
?>