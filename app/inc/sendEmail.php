<?php
	require 'mailer/PHPMailerAutoload.php';

	header('Content-Type: application/json');
	$name = $_POST['name'];
	$email = $_POST['email'];
	if(!$_POST['contactSubject']){
		$subject = "Správa z www.davidkocman.sk";
	}else{
		$subject = $_POST['contactSubject'];
	}
	$message = $_POST['message'];

	$mail = new PHPMailer();
	//$mail->isSMTP();									// Set mailer to use SMTP
	$mail->Host = 'smtp.websupport.sk';					// Specify main and backup SMTP servers
	$mail->SMTPAuth = true;								// enable SMTP authentication
	$mail->Username = 'hello@davidkocman.sk';			// SMTP username
	$mail->Password = 'Rufusak21..';					// SMTP password
	$mail->SMTPSecure = 'tls';							// Enable TLS encryption, `ssl` also accepted
	$mail->Port = 465;									// TCP port to connect to
	$mail->CharSet = 'UTF-8';

	$mail->setFrom($_POST['email'], $_POST['name']);	// Add a recipient
	$mail->addAddress('hello@davidkocman.sk');			// Name is optional


	$mail->isHTML(true);								// Set email format to HTML

	$mail->Subject = $subject;
	$mail->Body    = $message;
	//$mail->AltBody = '$message';
	
	if(!$mail->send()) {
		$msg = array('error' => true, 'info' => $mail->ErrorInfo);
		echo json_encode($msg);
		return false;
	}else{
		$msg = array('error' => false);
		echo json_encode($msg);
		return true;
	}
?>