var scores, roundScore, activePlayer, gamePlaying, dice1, dice2;

init();

var rollSound = new Audio('roll.mp3'); // Dice roll sound
var winSound = new Audio('win.mp3');   // Winning sound

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        rollSound.play(); // Play roll sound

        // Generate two random dice values
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;

        // Animate dice roll
        rollDiceAnimation(dice1, dice2);

        // Display dice images
        document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice2').src = 'dice-' + dice2 + '.png';
        document.getElementById('dice1').style.display = 'block';
        document.getElementById('dice2').style.display = 'block';

        // Check game rules
        if (dice1 === 1 && dice2 === 1) {
            scores[activePlayer] = 0; // Reset total score
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add current round score to total score
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore = input ? input : 100; // Default winning score is 100

        // Check if player wins
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            winSound.play(); // Play win sound
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false; // Stop the game
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', function () {
    init();
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
});

function nextPlayer() {
    if (!gamePlaying) return; // Stop switching players if game has ended

    activePlayer = activePlayer === 0 ? 1 : 0;
    roundScore = 0;

    // Reset round score display
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Toggle active player highlight
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    hideDice();
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    hideDice();

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.remove('winner', 'active');
    document.querySelector('.player-1-panel').classList.remove('winner', 'active');
    
    document.querySelector('.player-0-panel').classList.add('active');
}

function hideDice() {
    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';
}

function rollDiceAnimation(dice1, dice2) {
    let diceElements = [document.getElementById('dice1'), document.getElementById('dice2')];
    diceElements.forEach((dice) => {
        dice.style.animation = 'roll 0.5s ease-in-out';
        setTimeout(() => {
            dice.style.animation = '';
        }, 500);
    });
}
