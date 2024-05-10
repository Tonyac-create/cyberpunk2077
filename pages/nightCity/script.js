document.addEventListener("DOMContentLoaded", () => {
  const thumbnails = document.querySelectorAll(".thumbnail");

  const scrollIndicator = document.querySelector(".scroll-indicator");
  const thumbnailsContainer = document.querySelector(".thumbnails-container");

  const mainImage = document.getElementById("mainImage");

  const updateMainImage = (src) => {
    mainImage.src = src;
  };

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => updateMainImage(thumbnail.src));
  });

  const checkScrollDirection = () => {
    const tolerance = 10;
    if (
      thumbnailsContainer.scrollWidth -
        thumbnailsContainer.clientWidth -
        thumbnailsContainer.scrollLeft <=
      tolerance
    ) {
      // Si l'utilisateur est proche ou à la fin
      scrollIndicator.textContent = "←";
    } else if (thumbnailsContainer.scrollLeft <= tolerance) {
      scrollIndicator.textContent = "→";
    }
  };

  const scrollThumbnails = (direction) => {
    const scrollAmount = 800;
    if (direction === "left") {
      thumbnailsContainer.scrollLeft -= scrollAmount;
    } else {
      thumbnailsContainer.scrollLeft += scrollAmount;
    }
  };

  scrollIndicator.addEventListener("click", () => {
    if (scrollIndicator.textContent === "←") {
      scrollThumbnails("left");
    } else {
      scrollThumbnails("right");
    }
  });

  checkScrollDirection();

  thumbnailsContainer.addEventListener("scroll", checkScrollDirection);

  window.addEventListener("load", checkScrollDirection);
});
