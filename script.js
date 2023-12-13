const minutesEl = document.querySelector('#minutes');
const secondsEl = document.querySelector('#seconds');
const startBtn = document.querySelector('#startBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const resumeBtn = document.querySelector('#resumeBtn');
const resetBtn = document.querySelector('#resetBtn');
const title = document.getElementById("titulo");
const title_h1 = document.getElementById("titulo_h1");

let interval;
let minutes = 0;
let seconds = 0;
let isPause = false;
let finish = 0;

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resumeBtn.addEventListener('click', resumeTimer);
resetBtn.addEventListener('click', resetTimer);

pauseBtn.style.display = "block";
startBtn.style.display = "block";
resumeBtn.style.display = "none";
resetBtn.style.display = "none";



function playSound() {
    var mp3 = '<source src="alarm_clock_old.mp3" type="audio/mpeg">';
    let audio = document.getElementById("sound");
    audio.innerHTML = '<audio autoplay="autoplay">' + mp3 + "</audio>"; 
}

function startTimer() {
    minutes = document.querySelector('#fnum').value;
    interval = setInterval(() => {

        if(!isPause) {

            
            seconds -= 1;
            console.log(minutes);

            if(seconds <= finish) {
                
                minutes--;
                seconds = 59;
            }

            if(minutes <= -1) {
                clearInterval(interval);
                minutes = 0;
                seconds = 0;
                minutesEl.textContent = formatTimer(minutes);
                secondsEl.textContent = formatTimer(seconds);
                isPause = true;
                if(window.Notification && Notification.permission !=="denied") {
                    Notification.requestPermission(function(status){
                        let notification = new Notification('Pomodoro Timer', {
                            body:'TIME TO BREAK',
                            icon:'https://icons8.com.br/icon/GokNRZdD1mWz/tomate'
                        });
                    })
                }
                playSound(); 
                shortBreak();
                pauseBtn.style.display = "none";
                startBtn.style.display = "none";
                resetBtn.style.display = "block";

            }
            
            minutesEl.textContent = formatTimer(minutes);
            secondsEl.textContent = formatTimer(seconds);
            title.textContent = formatTimer(minutes);
            title.textContent += `:`
            title.textContent += formatTimer(seconds);
            title.textContent += ` - Time to focus`;
            
        } 

        
    }, 1000);
            pauseBtn.style.display = "block";
            startBtn.style.display = "none";
            resumeBtn.style.display = "none";
            document.querySelector("#fnum").style.display = "none";
            document.querySelector("#fnum1").style.display = "none";
            document.querySelector(".text-timer").style.display = "none";
            document.querySelector(".text-timer1").style.display = "none";
            document.getElementsByTagName('body').style.background = "#000000"
                   
}


function pauseTimer() {
    pauseBtn.style.display = "none";
    resumeBtn.style.display = "block";
    startBtn.style.display = "none";
    resetBtn.style.display = "block";
    isPause = true;
}

function resumeTimer() {
    resumeBtn.style.display = "none";
    pauseBtn.style.display = "block";
    
    isPause = false;
}

function resetTimer() {
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    window.location.reload(true);

    minutesEl.textContent = "00";
    secondsEl.textContent = "00";

    startBtn.style.display = "block";
    pauseBtn.style.display = "block";
    resumeBtn.style.display = "none";
    
}

function formatTimer(time) {
    return time < 10 ? `0${time}` : time
}

