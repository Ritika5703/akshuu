// Create balloons
function createBalloons() {
  const colors = [
    "#ffcad4",
    "#f4acb7",
    "#9d8189",
    "#d8e2dc",
    "#ffe5d9",
    "#ffcad4",
    "#f9dcc4",
    "#fec89a",
  ];
  const balloonsContainer = document.getElementById("balloons-container");

  for (let i = 0; i < 20; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";

    // Random position, size, color, and animation delay
    const size = Math.floor(Math.random() * 30) + 30;
    const left = Math.floor(Math.random() * 100);
    const delay = Math.random() * 15;

    balloon.style.width = size + "px";
    balloon.style.height = size * 1.2 + "px";
    balloon.style.left = left + "%";
    balloon.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    balloon.style.animationDelay = delay + "s";

    balloonsContainer.appendChild(balloon);
  }
}

// Create confetti
function createConfetti() {
  const colors = [
    "#ffcad4",
    "#f4acb7",
    "#9d8189",
    "#d8e2dc",
    "#ffe5d9",
    "#f9dcc4",
    "#fec89a",
    "#ffb3c6",
  ];
  const confettiCount = 150;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";

    // Random position, size, color, and animation
    const size = Math.floor(Math.random() * 10) + 5;
    const left = Math.floor(Math.random() * 100);
    const backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    const delay = Math.random() * 5;
    const duration = Math.random() * 5 + 5;

    confetti.style.width = size + "px";
    confetti.style.height = size + "px";
    confetti.style.left = left + "%";
    confetti.style.backgroundColor = backgroundColor;

    // Set animation
    confetti.style.animation = `fall ${duration}s linear ${delay}s infinite`;

    document.body.appendChild(confetti);
  }
}

// Define fall animation in JavaScript
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
      @keyframes fall {
          0% {
              transform: translateY(-100px) rotate(0deg);
              opacity: 1;
          }
          100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
          }
      }
  `;
document.head.appendChild(styleSheet);

// Section visibility animation
function checkSectionVisibility() {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      section.classList.add("active");
    }
  });
}

// Gallery modal functionality
function setupGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector(".modal-img");
  const modalCaption = document.querySelector(".modal-caption");
  const closeModal = document.querySelector(".close-modal");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imgSrc = item.querySelector("img").src;
      const caption = item.querySelector(".gallery-caption").textContent;

      modalImg.src = imgSrc;
      modalCaption.textContent = caption;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // Close modal on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

// Birthday cake functionality
function setupCake() {
  const cake = document.querySelector(".cake-container");
  const flame = document.querySelector(".flame");

  cake.addEventListener("click", () => {
    // Animation for blowing out the candle
    flame.style.opacity = "0";

    // Show birthday message
    setTimeout(() => {
      flame.style.display = "none";
      showBirthdayMessage();
      createConfetti();
    }, 500);
  });
}

// Show birthday message
function showBirthdayMessage() {
  const messageDiv = document.createElement("div");
  messageDiv.className = "birthday-message";
  messageDiv.style.position = "fixed";
  messageDiv.style.top = "50%";
  messageDiv.style.left = "50%";
  messageDiv.style.transform = "translate(-50%, -50%)";
  messageDiv.style.backgroundColor = "white";
  messageDiv.style.padding = "30px";
  messageDiv.style.borderRadius = "20px";
  messageDiv.style.boxShadow = "0 10px 30px rgba(244, 172, 183, 0.5)";
  messageDiv.style.zIndex = "1000";
  messageDiv.style.maxWidth = "80%";
  messageDiv.style.textAlign = "center";

  messageDiv.innerHTML = `
          <h2 style="color: #f4acb7; margin-bottom: 20px;">Your wish has been made!</h2>
          <p style="font-size: 1.2rem; margin-bottom: 20px;">May all your dreams come true this year and always!</p>
          <button class="btn" style="margin-top: 10px;" id="close-message">Continue Celebrating</button>
      `;

  document.body.appendChild(messageDiv);

  document.getElementById("close-message").addEventListener("click", () => {
    document.body.removeChild(messageDiv);
  });
}

// Handle birthday wishes form
function setupWishForm() {
  const form = document.getElementById("birthday-wish-form");
  const wishesContainer = document.getElementById("wishes-container");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    // Create new wish card
    const wishCard = document.createElement("div");
    wishCard.className = "wish-card";
    wishCard.innerHTML = `
              <div class="wish-sender">${name}</div>
              <div class="wish-message">${message}</div>
          `;

    // Add the new wish to the top
    wishesContainer.insertBefore(wishCard, wishesContainer.firstChild);

    // Clear form
    form.reset();

    // Show confirmation
    alert("Your birthday wish has been sent!");
  });
}

// Music player functionality
function setupMusicPlayer() {
  const musicToggle = document.getElementById("music-toggle");
  const music = document.getElementById("birthday-music");
  const musicIcon = musicToggle.querySelector("i");
  let isPlaying = false;

  // Since we don't have an actual audio file, we'll simulate the behavior
  musicToggle.addEventListener("click", () => {
    if (isPlaying) {
      // Pause music
      music.pause();
      musicIcon.className = "fas fa-music";
    } else {
      // Play music
      music.play();
      musicIcon.className = "fas fa-pause";
    }

    isPlaying = !isPlaying;
  });
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: "smooth",
      });
    });
  });
}

// Initialize everything when the page loads
window.addEventListener("DOMContentLoaded", () => {
  createBalloons();
  checkSectionVisibility();
  setupGallery();
  setupCake();
  setupWishForm();
  setupMusicPlayer();
  setupSmoothScrolling();

  // Check section visibility on scroll
  window.addEventListener("scroll", checkSectionVisibility);
});
