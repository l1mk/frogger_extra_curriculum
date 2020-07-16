document.addEventListener('DOMContentLoaded', ()=>{
const squares = document.querySelectorAll('.grid div')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const timeLeft = document.querySelector('#time-left')
const result = document.querySelector('#result')
const top = document.querySelector('#top')
const startBtn = document.querySelector('#start-pause')
const resetBtn = document.querySelector('#reset')
const instBtn = document.querySelector('#inst-Btn')
const instruction = document.querySelector('#instructions')
const width = 9
let currentIndex = 76
let currentTime = 20
let timerId
let topScore = 0


//render frog
squares[currentIndex].classList.add('frog')
//move frog
function moveFrog(e){
    squares[currentIndex].classList.remove('frog')
    switch(e.keyCode) {
        case 37:
            if (currentIndex % width !== 0) currentIndex -=1
            break
        case 38:
            if (currentIndex - width >= 0) currentIndex -= width
            break
        case 39:
            if (currentIndex % width < width - 1) currentIndex +=1
            break
        //case 40:
        //    if (currentIndex % width < width * width) currentIndex += width
        //    break
    }
    squares[currentIndex].classList.add('frog')
    lose()
    win()
}
//move cars
function autoMoveCars(){
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
}
//move car left on time loop
function moveCarLeft(carLeft){
    switch (true){
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break
    }
}
//move car right on time loop
function moveCarRight(carRight){
    switch (true){
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break
    }
}
//move logs
function autoMoveLogs(){
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
}
//move log left on time loop
function moveLogLeft(logLeft){
    switch(true){
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break        
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break
    }
}
//move log right on time loop
function moveLogRight(logRight){
    switch(true){
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break        
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break
    }
}
//win condition
function win(){
    if (squares[4].classList.contains('frog')){
        result.innerHTML = 'YOU WON'
        squares[currentIndex].classList.remove('frog')
        clearInterval(timerId)
        if (topScore < currentTime){
            topScore = currentTime
            top.innerHTML = `Finish in ${topScore} Seconds by Player1`
        }
        document.removeEventListener('keyup', moveFrog)
        alert('Good Job')
    }
}
//lose condition
function lose(){
    if ((currentTime === 0) || (squares[currentIndex].classList.contains('c1'))
    || (squares[currentIndex].classList.contains('l4'))
    || (squares[currentIndex].classList.contains('l5'))){
        result.innerHTML = "YOU LOSE"
        squares[currentIndex].classList.remove('frog')
        clearInterval(timerId)
        document.removeEventListener('keyup', moveFrog)      
    }
}
//move frog with logs
function moveWithLogLeft(){
    if (currentIndex >= 27 && currentIndex < 35){
        squares[currentIndex].classList.remove('frog')
        currentIndex += 1
        squares[currentIndex].classList.add('frog')
    }
}
//move frog with logs
function moveWithLogRight(){
    if (currentIndex > 18 && currentIndex <= 26){
        squares[currentIndex].classList.remove('frog')
        currentIndex += 1
        squares[currentIndex].classList.add('frog')
    }
}
//move all pieces
function movePieces(){
    currentTime--
    timeLeft.textContent = currentTime
    autoMoveCars()
    autoMoveLogs()
    moveWithLogLeft()
    moveWithLogRight()
    lose()
    console.log(currentTime, topScore)
}

function reset(){
    clearInterval(timerId)
    squares[currentIndex].classList.remove('frog')
    currentIndex = 76
    squares[currentIndex].classList.add('frog')
    currentTime = 20
    timeLeft.textContent = currentTime
    result.innerHTML = 0
    timerId = setInterval(movePieces, 1000)
    document.addEventListener('keyup', moveFrog)
    startBtn.innerHTML = 'Start'
}
    instBtn.addEventListener('click', () =>{
       if (instBtn.innerHTML === 'Instructions'){
        instBtn.innerHTML = 'Hide'
        instruction.style.display = 'block'
       } else if (instBtn.innerHTML === 'Hide'){
        instBtn.innerHTML = 'Instructions'
        instruction.style.display = 'none'  
       }
    })

    resetBtn.addEventListener('click', reset)
    startBtn.addEventListener('click', () =>{
        if (startBtn.innerHTML === 'Pause'){
            console.log('click pause')
            clearInterval(timerId)
            document.removeEventListener('keyup', moveFrog)  
            startBtn.innerHTML = 'Start'
        } else if (startBtn.innerHTML === 'Start'){
            console.log('click start')
            timerId = setInterval(movePieces, 1000)
            document.addEventListener('keyup', moveFrog)
            startBtn.innerHTML = 'Pause'
        }

    })

})