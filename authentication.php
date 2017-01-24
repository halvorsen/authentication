<?php // query.php 

require_once 'login.php';
 $conn = new mysqli( $hn, $un, $pw, $db);
  if ($conn -> connect_error) die( $conn -> connect_error);

  $query = "SELECT * FROM information";
  $result = $conn -> query($query);
  if (!$result) die($conn -> error);


  $rows = $result -> num_rows; 
  for ($j = 0 ; $j < $rows ; ++$j) {
  	$result -> data_seek($j);
  	echo 'Username: ' . $result -> fetch_assoc()['username'] . '<br>';
  	$result -> data_seek($j);
  	echo 'Password: ' . $result -> fetch_assoc()['password'] . '<br>'; 
  }
  $result -> close();
  $conn -> close(); 
  
  ?>


