
const playerSelection = document.querySelector('#h1Selection')
const numplay = parseFloat(`${sessionStorage.getItem('number_Of_Players')}`)
let clicks = 0


function spaceship (imgsrc) {
    clicks ++
    sessionStorage.setItem(`Player${clicks}`,imgsrc)
    if (clicks === numplay) {
        window.location.href = 'index.html'
    }
    
   setTimeout(() => {
    playerSelection.innerHTML = `Player ${clicks+1}`
   }, 100);

}
