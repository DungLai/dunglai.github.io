<!DOCTYPE html>
<html lang="en">
<head>
	<title> Add student </title>
	<meta charset="utf-8"/>
	<meta name="description" content="add student to database"/>
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
		</p>
	</fieldset>

</body>
</html>