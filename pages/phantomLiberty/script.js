document.addEventListener("DOMContentLoaded", () => {
    const imagePart = document.querySelector(".image-part");
    const images = [
      'url("phantom_liberty.jpg")',
      'url("phantom_liberty_2.jpg")',
      'url("phantom_liberty_3.jpg")',
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