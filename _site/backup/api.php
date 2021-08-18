<html>
<head>
	<title>HTML Table</title>
	<style>
	table {
	  font-family: arial, sans-serif;
	  border-collapse: collapse;
	  width: 100%;
	}

	td, th {
	  border: 1px solid #dddddd;
	  text-align: left;
	  padding: 8px;
	}

	tr:nth-child(even) {
	  background-color: #dddddd;
	}
	</style>
</head>

<body>
	<h2>Dũng Lại Lập Trình<h2>
	<h2>HTML Table</h2>

	<table>
		<tr>
			<th>Name</th>
			<th>Value</th>
		</tr>

		<?php
		foreach($_POST as $key=>$value){
		    echo '<tr><td>', $key, '</td> <td>', $value,'</td></tr>';
		}
		?>
	</table>
</body>

</html>
