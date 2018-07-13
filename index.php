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

					echo "<li class='slot-row'><div id='stopper" . ($i+1) . "''></div><ul>";

					for($j = 0;$j <= 4; $j++){
						echo "<li id='row-" . ($j) . "-col-" . ($i+1) . "'><img src='images/" . rand(1, 6) . ".png'></img></li>";
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
				<button id="min-bet" class="disabled">MIN-BET</button>
				<button id="max-bet" class="active">MAX-BET</button>
			</div>
		</div>

		<div id="spin-container">
			<button id="speed">Speed Up</button>
			<button id="spin" class="active">SPIN</button>
			<button id="auto-play" class="active">Auto-Play</button>
		</div>
		
	</div><!--control-pult END-->

	<script src="scripts/jQuery.js"></script>
	<script src="scripts/main.js"></script>

</body>
</html>