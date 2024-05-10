// desktop.js

export const desktop = document.getElementById("desktop-icons-container");

export const createDomElementWithAttributes = (
  tag,
  attributes,
  ...children
) => {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    if (key in element) {
      element[key] = value;
    } else {
      element.setAttribute(key, value);
    }
  });
  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  return element;
};

export const createDesktopIcon = (
  title,
  icon,
  onClickIconFunction,
  iconUniqueId
) => {
  const desktopIconImage = createDomElementWithAttributes("img", {
    className: "desktop-icon-image",
    src: icon,
  });
  const desktopIconTitle = createDomElementWithAttributes(
    "p",
    { className: "desktop-icon-label" },
    title
  );

  const iconButton = createDomElementWithAttributes(
    "button",
    {
      id: `shortcut-${iconUniqueId}`,
      className: "desktop-icon",
      onclick: onClickIconFunction,
    },
    desktopIconImage,
    desktopIconTitle
  );

  desktop.appendChild(iconButton);
};

export const displayDesktopIcons = () => {
  const icons = [...document.getElementsByClassName("desktop-icon")];
  icons.forEach((icon, index) => {
    setTimeout(() => {
      icon.classList.add("desktop-icon--fade-in");
    }, index * 200);
  });
};

document.addEventListener("DOMContentLoaded", displayDesktopIcons);
