var playerSelection = document.querySelector('#h1Selection');
var numplay = parseFloat("".concat(sessionStorage.getItem('number_Of_Players')));
var clicks = 0;
function spaceship(imgsrc) {
    clicks++;
    sessionStorage.setItem("Player".concat(clicks), imgsrc);
    if (clicks === numplay) {
        window.location.href = 'game.html';
    }
    else {
        playerSelection.innerHTML = "Player ".concat(clicks + 1);
    }
}
