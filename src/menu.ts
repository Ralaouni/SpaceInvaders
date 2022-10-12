

function numberOfPlayers (number) {
    sessionStorage.setItem('number_Of_Players', `${number}`)
    console.log(sessionStorage)
    window.location.href = 'selection.html'
}


