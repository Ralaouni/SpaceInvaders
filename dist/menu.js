function numberOfPlayers(number) {
    sessionStorage.setItem('number_Of_Players', "".concat(number));
    console.log(sessionStorage);
}
// function ArrowNavigation () {
//     const ul = document.querySelector('ul')
//     const button = document.querySelectorAll('button')
//     addEventListener('keyup',({key}) => {
//         switch (key) {
//             case 'ArrowRight':
//                 console.log('right')
//                 break;
//             case 'ArrowLeft':
//                 console.log('left')
//                 break;
//             default:
//                 break;
//         }
//     })
//     console.log(button)
// }
// ArrowNavigation()
