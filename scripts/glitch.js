export const glitchEffect = () => {
  const glitchElement = document.querySelector(".glitch");
  const iconGlitchElement = document.querySelector(".icon-glitch");

  const applyGlitch = (element) => {
    if (element) {
      const { startGlitch, stopGlitch } = PowerGlitch.glitch(element, {
        playMode: "always",
        hideOverflow: false,
        timing: {
          duration: 2000,
          // supprimer itération pour un glitch infini
          // iterations: 1,
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
        setTimeout(glitchEffect, 4000);
      }, 2000);
    }
  };

  applyGlitch(glitchElement);
  applyGlitch(iconGlitchElement);
};
