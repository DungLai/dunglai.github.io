<!DOCTYPE html>
<html lang="en">
<head>
	<title> Add new student </title>
	<meta charset="utf-8"/>
	<meta name="description" content="add student to database"/>
</head>

<body>
	<h1>Add a new student</h1>

<?php
	require_once("settings.php");

	$conn = @mysqli_connect($host,$user,$pwd, $sql_db);

	if (!$conn) {
		echo "<p>Connection fail</p>";
	} else {
		echo "<p>Connection successfully</p>";

		$sql_table = "student";

		if (isset($_POST["name"]) && isset($_POST["grade"]) && isset($_POST["class"])) {
			$name = trim(htmlspecialchars($_POST["name"]));
			$grade = trim(htmlspecialchars($_POST["grade"]));
			$class = trim(htmlspecialchars($_POST["class"]));
		}

		$query = "INSERT INTO $sql_table(name,grade,class) VALUES ('$name','$grade','$class');";
		$result = mysqli_query($conn, $query);
		
		session_start();

		if ($result) {
			$noti = "Successfuly run adding student query";
			$_SESSION['success'] = 1;
		} else {
			$noti = "Something wrong when executing query: " + $query;
			$_SESSION['success'] = 0;
		}

		$_SESSION['notification'] = $noti;
		$_SESSION['name'] = $name;
		$_SESSION['grade'] = $grade;
		$_SESSION['class'] = $class;


		header("Location: admin.php");

		mysqli_close($conn);
	}
?>


</body>
</html>