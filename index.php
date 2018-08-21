<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Slot Mashine</title>

    <!-- Styles here -->
    <link rel="stylesheet" type="text/css" href="css/main.css">

</head>
<body>
    
    <!-- switch game START -->
    <button id="switch"></button>
    <!-- switch game END -->

    <!-- Info START -->
    <div id="info-action">
        <h2>Pay-Table</h2>
    </div>
    <div id="info-container">
        <div id="info-table"></div>
    </div>
    <!-- Info END -->

    <div id="main-container"><!--main-container START-->
        <div id="slot-mashine"><!-- slot-mashine corpus START -->
            <div id="screen"><!-- screen START -->
            </div><!-- screen END -->
        </div><!-- slot-mashine corpus END -->
        <div id="control-pult"><!--control-pult START-->

            <div id="amount-container">
                <label for="amount">Amount:</label>
                <div id="amount-controls">
                    <p id="amount"></p>
                </div>
            </div>

            <div id="bet-container">
                <label for="bet">BET:</label>
                <div id="bet-controls">
                    <p id="bet"></p>
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

    </div><!--main-container END-->
    <div id="corpus-front-cover"></div>

    <script src="scripts/jQuery.js"></script>
    <script src="scripts/CustomEvent.js"></script>
    <script src="scripts/Config.js"></script>
    <script src="scripts/Buttons.js"></script>
    <script src="scripts/Amount.js"></script>
    <script src="scripts/Bet.js"></script>
    <script src="scripts/AutoPlay.js"></script>
    <script src="scripts/Screen.js"></script>
    <script src="scripts/Wins.js"></script>
    <script src="scripts/Info.js"></script>
    <script src="scripts/GameSwitcher.js"></script>
    <script src="scripts/Matrix.js"></script>
    <script src="scripts/SlotMashine.js"></script>
    <script src="scripts/main.js"></script>
    
</body>
</html>