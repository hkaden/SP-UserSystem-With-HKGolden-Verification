<?php
session_start();
	require_once 'dbconfig.php';

	if($_POST)
	{
		$username = $_POST['username'];
		$password = $_POST['password'];
		$goldenid = $_POST['goldenid'];
		$token = $_POST['token'];
		if ($token != $_SESSION['token']) {
			echo "ERROR";
			return;
		}
		else {
			unset($_SESSION['token']);
		}
		//$username = "l2022221";
		//$password = "123456";
		//$goldenid = "1223456";

		try
		{

			$stmt = $db_con->prepare("SELECT * FROM users WHERE usr_name=:name");
			$stmt->execute(array(":name"=>$username));
			$count = $stmt->rowCount();
			$stmt1 = $db_con->prepare("SELECT * FROM goldenuser WHERE goldenid=:id");
			$stmt1->execute(array(":id"=>$goldenid));
			$count1 = $stmt1->rowCount();

			if ($count1==0){
				if($count==0){

				$stmt = $db_con->prepare("INSERT INTO users(usr_name,usr_pw) VALUES(:uname, :pass); INSERT INTO equipments(eqp_mag) VALUES (-1); INSERT INTO goldenuser(goldenid,gameid) VALUES(:hkid, :uname);");
				$stmt->bindParam(":uname",$username);
				$stmt->bindParam(":pass",$password);
				$stmt->bindParam(":hkid",$goldenid);

					if($stmt->execute())
					{
						echo "1";
					}
					else
					{
						echo "4";
					}

				}
				else{

					echo "2"; //  not available
				}
			}
			else{
				echo "3";
			}

			}
		catch(PDOException $e){
			echo $e->getMessage();
		}
	}

?>
