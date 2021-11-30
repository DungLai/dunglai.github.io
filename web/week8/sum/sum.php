<!DOCTYPE html>
<html lang="en">
<head>
 	<meta charset="utf-8" />
	<title>PHP Variables, Condition, and Loop</title>
</head>
<body>

<?php
	include("functions.php");
?>

<h1>Kết quả</h1>

<?php
	if (isset($_POST["number"])) {
		$num = $_POST["number"];
		if (isPositiveInt($num)){
			$sum = calculateSum($num);
			echo "<p>Tổng các số tự nhiên từ 1 đến ", $num, " là <strong>", $sum, "</strong>";
		} else {
			echo "Please enter an integer";
		}
	} else {
		echo "Something wrong, please contact";
	}
	echo "<p><a href='sum_calculator.html'>Quay lại trang trước</a></p>"
?>

</body>
</html>