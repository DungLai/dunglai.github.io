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
	$host = "localhost:4306";
	$user = "dung";
	$pwd = "1234";
	$sql_db = "dung";

	$conn = @mysqli_connect($host,$user,$pwd, $sql_db);

	if (!$conn) {
		echo "<p>Connection fail</p>";
	} else {
		echo "<p>Connection successfully</p>";
	}
?>


</body>
</html>