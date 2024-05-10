// window.js

let mousePosition = { x: undefined, y: undefined };
let startMousePosition = { x: undefined, y: undefined };
let startWindowPosition = { x: undefined, y: undefined };

let openedWindows = [];
let focusedWindowId = null;
let movingWindowId = null;
let isMouseDown = false;
let interval;

const createDomElementWithAttributes = (elementType, attributes) => {
  const element = document.createElement(elementType);
  Object.assign(element, attributes);
  return element;
};

const appendElement = (parent, child) => {
  parent.appendChild(child);
};

const addEventListener = (target, eventType, listener) => {
  target.addEventListener(eventType, listener);
};

const showDefaultWindow = (
  icon = "",
  title = "",
  content = "",
  windowId = "default-action"
) => {
  initializeWindow(icon, title, content, windowId);
};

const initializeWindow = (
  icon = "",
  title = "",
  content = "",
  windowId = "default-action"
) => {
  if (!checkForOpenedWindow(windowId)) {
    openedWindows.push({ icon, title, content, windowId });

    const newWindow = createDomElementWithAttributes("div", {
      id: windowId,
      className: "window-container background-blur",
    });

    appendElement(document.body, newWindow);

    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    const SpawnPercentage = 7;
    let newTop;
    let newLeft;
    if (vw < 960 && vw > 500) {
      newTop = 45;
      newLeft = 5;
    } else if (vw < 500) {
      newTop = 5;
      newLeft = 5;
    } else {
      newTop = (vh * SpawnPercentage) / 100 + openedWindows.length * 20;
      newLeft = (vw * SpawnPercentage) / 100 + openedWindows.length * 20;
    }

    newWindow.style.top = `${newTop}px`;
    newWindow.style.left = `${newLeft}px`;

    const WINDOW_HEAD = createDomElementWithAttributes("div", {
      id: `${windowId}-head`,
      className: "window-head",
    });
    const CLOSE_BUTTON = createDomElementWithAttributes("button", {
      id: `${windowId}-close-button`,
      innerHTML: "X",
      className: "window-close-btn",
    });

    addEventListener(CLOSE_BUTTON, "click", () => {
      closeWindow(windowId);
    });

    const WINDOW_HEAD_CONTAINER = createDomElementWithAttributes("div", {
      id: `${windowId}-head-container`,
      className: "window-head-container",
    });
    appendElement(WINDOW_HEAD, WINDOW_HEAD_CONTAINER);
    appendElement(WINDOW_HEAD, CLOSE_BUTTON);

    const ICON_IMAGE = createDomElementWithAttributes("img", {
      id: `${windowId}-icon`,
      src: icon,
      className: "window-icon",
    });
    const TITLE_ELEMENT = createDomElementWithAttributes("h4", {
      id: `${windowId}-title`,
      innerHTML: title,
      className: "window-title",
    });

    appendElement(WINDOW_HEAD_CONTAINER, ICON_IMAGE);
    appendElement(WINDOW_HEAD_CONTAINER, TITLE_ELEMENT);
    appendElement(newWindow, WINDOW_HEAD);

    addEventListener(newWindow, "click", () => {
      bringWindowToFront(newWindow);
    });

    const CONTENT = createDomElementWithAttributes("div", {
      id: `${windowId}-body`,
      className: "window-body",
    });
    const CONTENT_FRAME = createDomElementWithAttributes("iframe", {
      id: `${windowId}-content`,
      className: "window-content",
      src: content,
    });

    appendElement(CONTENT, CONTENT_FRAME);
    appendElement(newWindow, CONTENT);

    newWindow.classList.add("window-open");

    const taskbar = document.querySelector(".taskbar-left");
    const newIcon = document.createElement("button");
    newIcon.className = "taskbar-button taskbar-icon-in taskbar-app";
    newIcon.id = `taskbaricon-${windowId}`;
    newIcon.appendChild(
      Object.assign(document.createElement("img"), {
        src: icon,
        className: "taskbar-button-icon",
      })
    );
    newIcon.onclick = () => {
      bringWindowToFront(document.getElementById(windowId));
    };

    taskbar.appendChild(newIcon);

    bringWindowToFront(newWindow);
  } else {
    bringWindowToFront(document.getElementById(windowId));
  }

  const WINDOW = document.getElementById(windowId);
  const WINDOW_HEAD = document.getElementById(`${windowId}-head`);
  WINDOW_HEAD.addEventListener("mousedown", () => {
    if (movingWindowId === "") {
      isMouseDown = true;
      bringWindowToFront(WINDOW);
      moveWindow(WINDOW);
    }
  });
  WINDOW_HEAD.addEventListener("mouseup", () => {
    isMouseDown = false;
    moveWindowStop();
  });
  WINDOW_HEAD.addEventListener("mouseleave", () => {
    if (
      isMouseDown === false &&
      movingWindowId !== "" &&
      movingWindowId === WINDOW
    ) {
      moveWindowStop();
    }
  });
};

const checkForOpenedWindow = (windowId) => {
  return openedWindows.some((window) => window.windowId === windowId);
};

const closeWindow = (target) => {
  openedWindows = openedWindows.filter((window) => window.windowId !== target);
  const WINDOW = document.getElementById(target);
  WINDOW.classList.remove("window-open");
  WINDOW.classList.add("window-close");
  const TASK_ICON = document.getElementById(`taskbaricon-${target}`);
  TASK_ICON.classList.remove("taskbar-icon-in");
  TASK_ICON.classList.add("taskbar-icon-out");
  setTimeout(() => {
    WINDOW.remove();
    TASK_ICON.remove();
  }, 500);
};

const bringWindowToFront = (target) => {
  const OTHER_WINDOWS = document.getElementsByClassName("window-container");
  for (let i = 0; i < OTHER_WINDOWS.length; i++) {
    OTHER_WINDOWS[i].style.zIndex = OTHER_WINDOWS[i].style.zIndex - 1;
    OTHER_WINDOWS[i].classList.remove("window-in-front");
    OTHER_WINDOWS[i].classList.remove("window-focused");
    OTHER_WINDOWS[i].classList.add("window-not-in-front");
  }
  target.style.zIndex = 100 + openedWindows.length;

  target.classList.remove("window-not-in-front");
  target.classList.add("window-in-front");
  target.classList.add("window-focused");

  focusedWindowId = target.id;

  const TASK_BAR = document.querySelector(".taskbar-left").children;
  for (let i = 1; i < TASK_BAR.length; i++) {
    const elem = document.getElementById(TASK_BAR[i].id);
    elem.classList.remove("taskbar-icon-active");
  }
  document
    .getElementById(`taskbaricon-${focusedWindowId}`)
    .classList.add("taskbar-icon-active");
};

const moveWindow = (target) => {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  if (vw > 960) {
    movingWindowId = target.id;
    startMousePosition = mousePosition;
    const WINDOW = document.getElementById(movingWindowId);
    const WINDOW_CONTENT = document.getElementById(`${movingWindowId}-content`);
    WINDOW.style.transitionDuration = "0ms";
    WINDOW_CONTENT.style.pointerEvents = "none";
    startWindowPosition = { x: WINDOW.style.left, y: WINDOW.style.top };
    startWindowPosition.x = parseFloat(
      startWindowPosition.x.toString().replace("px", "")
    );
    startWindowPosition.y = parseFloat(
      startWindowPosition.y.toString().replace("px", "")
    );
  }
};

const moveWindowStop = () => {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  if (vw > 960 && movingWindowId !== "") {
    const WINDOW = document.getElementById(movingWindowId);
    if (WINDOW) {
      WINDOW.style.transitionDuration = "200ms";
      const WINDOW_CONTENT = document.getElementById(
        `${movingWindowId}-content`
      );
      if (WINDOW_CONTENT) {
        WINDOW_CONTENT.style.pointerEvents = "all";
      }
    }
    movingWindowId = "";
  }
};

const setupEventListeners = () => {
  document.addEventListener("click", (event) => {
    if (event.target.matches(".window-close-btn")) {
      const windowId = event.target.id.replace("-close-button", "");
      closeWindow(windowId);
    }
  });

  document.getElementById("taskbar").addEventListener("click", (event) => {
    if (event.target.matches(".taskbar-app")) {
      const windowId = event.target.id.replace("taskbaricon-", "");
      bringWindowToFront(document.getElementById(windowId));
    }
  });

  document.addEventListener("mousedown", (event) => {
    if (event.target.matches(".window-head")) {
      const window = event.target.closest(".window-container");
      isMouseDown = true;
      bringWindowToFront(window);
      moveWindow(window);
    }
  });

  document.addEventListener("mouseup", () => {
    isMouseDown = false;
    moveWindowStop();
  });

  document.addEventListener("mouseleave", (event) => {
    if (
      isMouseDown === false &&
      movingWindowId !== "" &&
      movingWindowId === event.target
    ) {
      moveWindowStop();
    }
  });
};

const handleWindowMouseMove = (e) => {
  mousePosition = { x: e.clientX, y: e.clientY };
  if (movingWindowId) {
    const windowElement = document.getElementById(movingWindowId);
    if (!windowElement) return;

    let newWindowPosition = {
      x: mousePosition.x - (startMousePosition.x - startWindowPosition.x),
      y: mousePosition.y - (startMousePosition.y - startWindowPosition.y),
    };

    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );

    newWindowPosition = limitWindowToScreenEdges(
      windowElement,
      newWindowPosition,
      vw,
      vh
    );

    windowElement.style.left = `${newWindowPosition.x}px`;
    windowElement.style.top = `${newWindowPosition.y}px`;
  }
};

const trackWindowFocus = () => {
  const activeElement = document.activeElement;

  if (activeElement.className === "window-content") {
    const activeWindowId = activeElement.parentElement.parentElement.id;

    if (activeWindowId !== focusedWindowId) {
      const windowToFocus = openedWindows.find(
        (window) => window.windowId === activeWindowId
      );

      if (windowToFocus) {
        windowToFocus.bringWindowToFront(
          activeElement.parentElement.parentElement
        );
        console.log(
          "Changement de focus :",
          focusedWindowId,
          "->",
          activeWindowId
        );
      }
    }
  }
};

const TASKBAR_SIZE = 39;
const SCREEN_BORDER_PADDING = 4;

const limitWindowToScreenEdges = (windowElement, targetPosition, vw, vh) => {
  const windowWidth = windowElement.offsetWidth;
  const windowHeight = windowElement.offsetHeight;


  const adjustedPosition = {
    x: Math.min(
      Math.max(targetPosition.x, SCREEN_BORDER_PADDING),
      vw - windowWidth - SCREEN_BORDER_PADDING
    ),

    y: Math.min(
      Math.max(targetPosition.y, TASKBAR_SIZE + SCREEN_BORDER_PADDING),
      vh - windowHeight - SCREEN_BORDER_PADDING
    ),
  };
  return adjustedPosition;
};

interval = window.setInterval(trackWindowFocus, 100);
window.addEventListener("mousemove", handleWindowMouseMove);
document.addEventListener("DOMContentLoaded", setupEventListeners);

export { showDefaultWindow };
