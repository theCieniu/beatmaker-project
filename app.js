function cl(c) {
  console.log(c);
}

class DrumKit {
  constructor() {
    this.playBtn = document.querySelector(".play");
    this.pads = document.querySelectorAll(".pad");
    this.kickSound = document.querySelector(".kick-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.selectors = document.querySelectorAll("select");
    this.index = 0;
    this.bpm = 150;
    //this.isPlaying = null;
  }

  padActivation() {
    this.classList.toggle("active-pad");
  }

  loop() {
    let octave = this.index % 8;
    const animated = document.querySelectorAll(`.b${octave}`);
    animated.forEach((div) => {
      div.classList.add("animated-pad");
      div.addEventListener("animationend", () => {
        div.classList.remove("animated-pad");
      });
      // PLAY SOUND FOR MARKED PADS
      if (div.classList.contains("active-pad")) {
        if (div.classList.contains("kick-pad")) {
          this.kickSound.currentTime = 0;
          this.kickSound.play();
        }
        if (div.classList.contains("snare-pad")) {
          this.snareSound.currentTime = 0;
          this.snareSound.play();
        }
        if (div.classList.contains("hihat-pad")) {
          this.hihatSound.currentTime = 0;
          this.hihatSound.play();
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    this.index = 0;
    this.isPlaying = setInterval(() => {
      this.loop();
    }, interval);
  }

  selecting(event, kickS, snareS, hihatS) {
    switch (event.target.name) {
      case "kick-select":
        kickS.setAttribute("src", event.target.value);
        break;
      case "snare-select":
        snareS.setAttribute("src", event.target.value);
        break;
      case "hihat-select":
        hihatS.setAttribute("src", event.target.value);
        break;
      default:
        cl("other sound?");
    }
  }
}

const drumKit = new DrumKit();

// PLAY/STOP BUTTON FUNCTIONALITY
drumKit.playBtn.addEventListener("click", () => {
  if (drumKit.playBtn.classList.contains("is-playing")) {
    clearInterval(drumKit.isPlaying);
    drumKit.playBtn.classList.remove("is-playing");
    drumKit.playBtn.textContent = "Play";
  } else {
    drumKit.start();
    drumKit.playBtn.classList.add("is-playing");
    drumKit.playBtn.textContent = "Stop";
  }
});

// SELECTING PADS
drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.padActivation);
});

// PLAY/STOP BUTTON FUNCTIONALITY

drumKit.selectors.forEach((selector) => {
  selector.addEventListener("click", (event) => {
    let kickS = drumKit.kickSound;
    let snareS = drumKit.snareSound;
    let hihatS = drumKit.hihatSound;
    drumKit.selecting(event, kickS, snareS, hihatS);
  });
});
