let timers = []; // Array to hold active timers
let timerId = 0; // Unique ID for each timer

document.getElementById('start-timer').addEventListener('click', startTimer);

function startTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    // Validate input
    if (hours < 0 || minutes < 0 || seconds < 0) {
        alert("Please enter valid time values.");
        return;
    }

    const totalTime = (hours * 3600) + (minutes * 60) + seconds;

    if (totalTime <= 0) {
        alert("Please enter a time greater than zero.");
        return;
    }

    // Create timer object
    const timer = {
        id: timerId++,
        timeRemaining: totalTime,
        intervalId: null
    };

    timers.push(timer);
    
    // Start countdown
    timer.intervalId = setInterval(() => countdown(timer), 1000);
    
    // Update display
    updateTimersDisplay();
    
    // Reset input fields
    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';
}

function countdown(timer) {
    if (timer.timeRemaining > 0) {
        timer.timeRemaining--;
        updateTimersDisplay();
    } else {
        clearInterval(timer.intervalId);
        playAlert();
        updateTimersDisplay();
        // Optionally remove the timer from the list after it ends
        setTimeout(() => removeTimer(timer.id), 3000); // Remove after showing ended state for a while
    }
}

function updateTimersDisplay() {
   const timersList = document.getElementById('timers-list');
   timersList.innerHTML = ''; // Clear current list

   timers.forEach(timer => {
       const timeDisplay = formatTime(timer.timeRemaining);
       const timerItem = document.createElement('div');
       timerItem.className = 'timer-item';
       timerItem.innerHTML = `
           ${timeDisplay}
           <button onclick="stopTimer(${timer.id})">Stop Timer</button>
       `;
       
       if (timer.timeRemaining === 0) {
           timerItem.classList.add('timer-ended');
           timerItem.innerHTML = 'Timer Ended!';
       }

       timersList.appendChild(timerItem);
   });
}

function formatTime(totalSeconds) {
   const hours = Math.floor(totalSeconds / 3600);
   const minutes = Math.floor((totalSeconds % 3600) / 60);
   const seconds = totalSeconds % 60;

   return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function stopTimer(id) {
   const timerIndex = timers.findIndex(t => t.id === id);
   if (timerIndex !== -1) {
       clearInterval(timers[timerIndex].intervalId);
       timers.splice(timerIndex, 1); // Remove from array
       updateTimersDisplay(); // Update display after stopping
   }
}

function playAlert() {
   const audio = document.getElementById('timer-end-sound');
   audio.play();
}

function removeTimer(id) {
   stopTimer(id); // Stop the timer and remove it from the display
}