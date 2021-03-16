let pauseFlag = false; // flag for checking if the system is on pause mode

// array for defining all of the buttons objects
const looperButtons = [
  {
    id: 0,
    keyboradButton: "q",
    audio: new Audio("sounds/120_future_funk_beats_25.mp3"),
    isPressed: false,
    isPlaying: false,
  },
  {
    id: 1,
    keyboradButton: "w",
    audio: new Audio("sounds/120_stutter_breakbeats_16.mp3"),
    isPressed: false,
    isPlaying: false,
  },
  {
    id: 2,
    keyboradButton: "e",
    audio: new Audio("sounds/Bass Warwick heavy funk groove on E 120 BPM.mp3"),
    isPressed: false,
    isPlaying: false,
  },
  {
    id: 3,
    keyboradButton: "a",
    audio: new Audio("sounds/electric guitar coutry slide 120bpm - B.mp3"),
    isPressed: false,
    isPlaying: false,
  },
  {
    id: 4,
    keyboradButton: "s",
    audio: new Audio("sounds/FUD_120_StompySlosh.mp3"),
    isPressed: false,
    isPlaying: false,
  },
  {
    id: 5,
    keyboradButton: "d",
    audio: new Audio("sounds/GrooveB_120bpm_Tanggu.mp3"),
    isPressed: false,
    isPlaying: false,
  },
  {
    id: 6,
    keyboradButton: "z",
    audio: new Audio("sounds/MazePolitics_120_Perc.mp3"),
    isPressed: false,
    isPlaying: false,
  },
  {
    id: 7,
    keyboradButton: "x",
    audio: new Audio("sounds/PAS3GROOVE1.03B.mp3"),
    isPressed: false,
    isPlaying: false,
  },
  {
    id: 8,
    keyboradButton: "c",
    audio: new Audio("sounds/SilentStar_120_Em_OrganSynth.mp3"),
    isPressed: false,
    isPlaying: false,
  },
];

// Detecting Button Press

for (let i = 0; i < looperButtons.length; i++) {
  looperButtons[i].audio.addEventListener("ended", function () {
    // marks that the audio has ended the cycle
    console.log(`${looperButtons[i].keyboradButton} has ended`);
    looperButtons[i].isPlaying = false;
    startPlayback();
  });

  document.querySelectorAll(".pad")[i].addEventListener("click", function () {
    let padInnerHTML = this.innerHTML;
    handleClick(padInnerHTML);
  });
}

// function for the play button

function play() {
  pauseFlag = false;
  looperButtons.forEach((button) => {
    if (button.audio.currentTime > 0) {
      button.audio.play();
      button.isPlaying = true;
    }
  });
  startPlayback();
}

// function for the pause button

function pause() {
  pauseFlag = true;
  looperButtons.forEach((button) => {
    if (button.isPlaying) {
      button.isPlaying = false;
      button.audio.pause();
    }
  });
}

// Detecting keyboard Press

document.addEventListener("keydown", function (event) {
  handleClick(event.key);
});

function handleClick(key) {
  console.log("handle click...");
  const button = looperButtons.find((button) => button.keyboradButton === key);
  if (button) {
    padAnimation(button);

    if (button.isPressed) {
      button.isPressed = false;
      button.audio.pause();
      button.audio.currentTime = 0;
      button.isPlaying = false;
    } else {
      if (pauseFlag) {
        looperButtons.forEach((button) => {
          if (button.isPressed) {
            button.audio.currentTime = 0;
          }
        });
      }
      button.isPressed = true;
    }
    startPlayback();
  }
}

function startPlayback() {
  console.log("start playback...");
  if (pauseFlag) {
    console.log("tried to start playback while system on pause...");
    return;
  }

  for (let i = 0; i < looperButtons.length; i++) {
    if (looperButtons[i].isPlaying) {
      console.log("sound already plays... do nothing");
      // if someone is playing do nothing (we need to wait to next cycle)
      return;
    }
  }
  console.log("new cycle...");
  looperButtons.forEach((button) => {
    if (button.isPressed) {
      button.isPlaying = true;
      button.audio.play();
    }
  });
}

// function for adding/removing the animation for each pressed pad

function padAnimation(button) {
  let activePad = document.querySelector("." + button.keyboradButton);
  if (activePad) {
    if (button.isPressed) {
      activePad.classList.remove("pressed");
    } else {
      activePad.classList.add("pressed");
    }
  }
}
