const typewriterText = document.getElementById("typewriter-text");
const glitchElement = document.querySelector(".glitch");

const fullText = `Préparez le coup du siècle : volez un implant unique qui est la clé de
l'immortalité, et forgez votre légende dans le vaste mode ouvert
qu'est Night City. Ici, les choix que vous faites changeront le cours
de l'histoire et les relations avec les personnages qui vous
entourent. Complétez des missions diverses et variées pour vous faire
un nom, et passez de simple mercenaire à cyberpunk de légende. Au fil
de l'aventure, vous lèverez également le voile sur le mystère qui
plane autour de ce fameux implant que tout le monde vous envie.`;
let charIndex = 0;

const typeCharacter = () => {
  if (charIndex < fullText.length) {
    typewriterText.textContent += fullText[charIndex++];
    setTimeout(typeCharacter, 25);
  }
};

const glitch = (element) => {
  const startGlitchCycle = () => {
    const { startGlitch, stopGlitch } = PowerGlitch.glitch(element, {
      playMode: "always",
      hideOverflow: false,
      timing: {
        duration: 2000,
      },
      glitchTimeSpan: {
        start: 0.5,
        end: 0.7,
      },
      shake: {
        velocity: 0.2,
        amplitudeX: 0.1,
        amplitudeY: 0.1,
      },
      slice: {
        count: 6,
        velocity: 15,
        minHeight: 0.02,
        maxHeight: 0.15,
        hueRotate: true,
      },
      pulse: false,
    });

    startGlitch();

    setTimeout(() => {
      stopGlitch();
      setTimeout(startGlitchCycle, 4000);
    }, 2000);
  };
  startGlitchCycle();
};

window.onload = () => {
  typeCharacter();
  glitch(glitchElement);
};
