<?php
	require_once("settings.php");
	$conn = @mysqli_connect($host,$user,$pwd, $sql_db);
	if (!$conn) {
		echo "<p>Connection fail</p>";
	} else {
		echo "<p>Connection successfully</p>";

		$query = "SELECT name,grade,class FROM student";
		$result = mysqli_query($conn, $query);
		session_start();

		if ($result) {
			$_SESSION['students'] = array();

			while ($row = mysqli_fetch_assoc($result)) {
				array_push($_SESSION['students'], $row);
			}
		}

		header("Location: admin.php");
		mysqli_close($conn);
	}
?>