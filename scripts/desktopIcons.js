// desktopIcons.js

import { createDesktopIcon } from "./desktop.js";
import { showDefaultWindow } from "./window.js";

export function createIcons() {
  // Trailer
  createDesktopIcon(
    "Bande-Annonce",
    "assets/icons/hacker.webp",
    () =>
      showDefaultWindow(
        "assets/icons/hacker.webp",
        "Bande-Annonce",
        "pages/trailer/index.html",
        "trailer"
      ),
    "trailer"
  );

  // Scenario
  createDesktopIcon(
    "Scénario",
    "assets/icons/code.webp",
    () =>
      showDefaultWindow(
        "assets/icons/code.webp",
        "Scénario",
        "pages/scenario/index.html",
        "scenario"
      ),
    "scenario"
  );

  // Night City
  createDesktopIcon(
    "Night City",
    "assets/icons/night-city.webp",
    () =>
      showDefaultWindow(
        "assets/icons/night-city.webp",
        "Night City",
        "pages/nightCity/index.html",
        "nightCity"
      ),
    "nightCity"
  );

  // Characters
  createDesktopIcon(
    "Personnages",
    "assets/icons/character.webp",
    () =>
      showDefaultWindow(
        "assets/icons/character.webp",
        "Personnages",
        "pages/characters/index.html",
        "characters"
      ),
    "characters"
  );

  // Phantom Liberty
  createDesktopIcon(
    "Phantom Liberty",
    "assets/icons/phantom-liberty.webp",
    () =>
      showDefaultWindow(
        "assets/icons/phantom-liberty.webp",
        "Phantom Liberty",
        "pages/phantomLiberty/index.html",
        "phantomLiberty"
      ),
    "phantomLiberty"
  )

  // Informations
  createDesktopIcon(
    "Informations",
    "assets/icons/informations.webp",
    () =>
      showDefaultWindow(
        "assets/icons/informations.webp",
        "Informations",
        "pages/informations/index.html",
        "informations"
      ),
    "informations"
  );
}
