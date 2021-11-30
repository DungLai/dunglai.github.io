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
	$sum = $_GET['sum'];
	$num = $_GET['num'];
	$date = $_GET['date'];
	echo "Previous result: <br> <strong>", $date, "</strong>. You enter: ", $num, " result is: ", $sum;
?>

</html>