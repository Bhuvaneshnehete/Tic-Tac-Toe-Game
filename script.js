console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
music.loop = true;
music.volume = 0.4;
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let isgameover = false;
let musicStarted = false;

// Try to start the music as soon as the page loads.
const startMusic = ()=>{
    if(!musicStarted){
        music.play().then(()=>{
            musicStarted = true;
        }).catch(()=>{
            // Most browsers block audio with sound until the user
            // interacts with the page at least once. If that happens,
            // fall back to starting on the very first click anywhere.
        });
    }
}
startMusic();
['click', 'keydown', 'scroll', 'touchstart', 'mousemove'].forEach(evt => {
    document.addEventListener(evt, startMusic, { once: true });
});

// Function to change the turn
const changeTurn = ()=>{
    return turn === "X"? "O": "X"
}

// Function to check for a win. Returns true if a win was found, false otherwise.
// (Rewritten with a plain for loop instead of forEach, since forEach can't
// actually stop early or hand a result back to the caller.)
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    for(let i = 0; i < wins.length; i++){
        let e = wins[i];
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "") ){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won"
            isgameover = true
            gameover.play()
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "20vw";
            return true;
        }
    }
    return false;
}

// Function to check whether the board is completely full (used for draw detection)
const isBoardFull = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    return Array.from(boxtext).every(el => el.innerText !== "");
}

// Game Logic
// music.play()



let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        startMusic();
        if(boxtext.innerText === '' && !isgameover){
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            let won = checkWin();
            if (!won && isBoardFull()){
                isgameover = true;
                document.getElementsByClassName("info")[0].innerText = "It's a Draw!";
            } else if (!won){
                document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
            }
        }
    })
})





// Add onclick listener to reset button
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X"; 
    isgameover = false
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
})