<?php
// Get data from form
if (isset($_POST['submit'])) {
	$name = $_POST['name'];
	$subject = $_POST['subject'];
	$message= $_POST['message'];
	$email= $_POST['email'];

	$mailTo = "eguriasel98@yahoo.com";
	$headers = "From: ".$email;
	$txt ="You have received an e-mail from ". $name .".\n\n".$message; 
	// "\r\n" . $email . "\r\n Message =" . $message;
	mail($mailto, $subject, $txt, $headers);
	header("Location:index.html");
}


// The following text will be sent
// Name = user entered name
// Email = user entered email
// Message = user entered message


//  . "\r\n" .
// 			"CC: somebodyelse@example.com";
if($email != NULL) {
	mail($to, $subject, $txt);
}

// Redirect to
header("Location:index.html");
?>
