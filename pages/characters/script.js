document.addEventListener("DOMContentLoaded", () => {
  const imagePart = document.querySelector(".image-part");
  const images = [
    'url("character01.webp")',
    'url("character02.webp")',
    'url("character03.webp")',
  ];
  let currentIndex = 0;

  const changeBackgroundImage = () => {
    imagePart.style.backgroundImage = images[currentIndex];
    currentIndex = (currentIndex + 1) % images.length;
  };

  setTimeout(() => {
    changeBackgroundImage();
    setInterval(changeBackgroundImage, 5000);
  }, 2000);
});
