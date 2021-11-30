<!DOCTYPE html>
<html lang="en">
<head>
	<title>Máy tính tổng </title>
	<meta charset="utf-8" />
</head>

<body>
	<form method="post" action="sum.php">
		<h1>Tính Tổng</h1>
		<label>Nhập số nguyên: </label>
		<input type="text" name="number" />
		<input type="submit" value="Calculate Sum"/>
	</form>
</body>

<?php
	session_start();
	$num = $_SESSION['result'][0];
	$sum = $_SESSION['result'][1];
	$date = $_SESSION['result'][2];
	echo "Previous result: <br> <strong>", $date, "</strong>. You enter: ", $num, " result is: ", $sum;
?>

</html>