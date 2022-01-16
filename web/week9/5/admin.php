<!DOCTYPE html>
<html lang="en">
<head>
	<title> Add student </title>
	<meta charset="utf-8"/>
	<meta name="description" content="add student to database"/>
	<link rel="stylesheet" href="styles.css">

</head>

<body>
	<h1>Add a new student</h1>
	<form method="POST" action="new_student.php">
		<fieldset>
			<legend>New student detail:</legend>
			<p> 
				<label for="name">Enter Student Name:</label>
				<input type="text" name="name"/>
			</p>
			<p> 
				<label for="grade">Enter Student Grade :</label>
				<input type="text" name="grade"/>
			</p>
			<p> 
				<label for="class">Enter Student Class:</label>
				<input type="text" name="class"/>
			</p>
			<p> 
				<input type="submit" value="Add student"/>
				<?php 
					session_start();
					if (isset( $_SESSION['notification'])) {
						echo $_SESSION['notification'];
					}

					if ( isset($_SESSION["success"]) and ($_SESSION["success"] == 1)) {
						echo ". Successfully added new student: <br>Name: ", $_SESSION['name'], "<br>Class: ", $_SESSION["class"], "<br>Grade: ", $_SESSION["grade"];
					}

					session_destroy();
				?>
			</p>
		</fieldset>
	</form>

	<br>
	<form method="POST" action="display_student.php">
		<fieldset>
			<legend>Display all students:</legend>
			<input type="submit" value="Click to show all students"/>
			<?php
				if (isset($_SESSION["students"])){
					echo "<table>";
					echo "<tr>"
						."  <th>Name</th>"
						."  <th>Grade</th>"
						."  <th>Class</th>"	
						."</tr>";

					foreach($_SESSION["students"] as $student) {
						echo "<tr>";
						echo "<td>", $student["name"], "</td>";
						echo "<td>", $student["grade"], "</td>";
						echo "<td>", $student["class"], "</td>";
						echo "</tr>";
					}
				}
			?>
		</fieldset>
	</form>
</body>
</html>