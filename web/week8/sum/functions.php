<?php

function calculateSum($n) {
	$i = 1;
	$sum = 0;
	while ($i < $n) {
		$sum = $sum + $i;
		$i = $i + 1;
	}
	return $sum;
}

function isPositiveInt($n) {
	$result = false;
	if (is_numeric($n)) {
		if (floor($n) == $n) {
			$result = true;
		}
	}
	return $result;
}

?>