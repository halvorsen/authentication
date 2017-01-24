<?php // query.php 
header('Content-Type: text/xml');
echo '<?xml version="1.0"?>';

echo '<response>';
    $user = $_GET['user'];
    $pass = $_GET['pass'];


$conn2 = new mysqli( 'localhost', 'Aaron', 'Barefoot25', 'login');
  if ($conn2 -> connect_error) {
  	die( $conn2 -> connect_error);
  }else{
  	echo '<message> Success!: User "'.$user.'" was created.</message>'; //how to send back encripted??
  }

  $insert = "INSERT INTO information (username, password) VALUES ('$user', '$pass')";
  $conn2 -> query($insert); //how to check if this is an error???


    
    echo '</response>';


  
  ?>


