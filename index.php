<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Slot Mashine</title>
	
	<!-- Styles here -->
	<link rel="stylesheet" type="text/css" href="css/main.css">

</head>
<body>

	<div id="main-container"><!--main-container START-->
		<div id="slot-mashine"><!-- slot-mashine corpus START -->
			<div id="screen"><!-- screen START -->
				<ul>

				<?php
				for($i = 0;$i < 5; $i++){

					echo "<li><ul>";

					for($j = 0;$j < 3; $j++){
						echo "<li>" . rand(1, 6) . "</li>";
					}

					echo "</ul></li>";

				}
				?>

				</ul>
			</div><!-- screen END -->
		</div><!-- slot-mashine corpus END -->
	</div><!--main-container END-->

	<div id="control-pult"><!--control-pult START-->

		<div id="amount-container">
			<label for="amount">Amount:</label>
			<div id="amount-controls">
				<p id="amount">20.00</p>
			</div>
		</div>

		<div id="bet-container">
			<label for="bet">BET:</label>
			<div id="bet-controls">
				<p id="bet">00.05</p>
				<button id="bet-down" class="disabled">DOWN</button>
				<button id="bet-up" class="active">UP</button>
			</div>
		</div>

		<div id="spin-container">
			<button id="spin" class="active">SPIN</button>
		</div>
		
	</div><!--control-pult END-->

	<script src="scripts/jQuery.js"></script>
	<script src="scripts/main.js"></script>

</body>
</html>