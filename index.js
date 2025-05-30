// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Initialize components
  initLoadingScreen();
  initThemeSwitcher();
  initFloatingNav();
  initParallax();
  initSectionAnimation();
  initGreetingCard();
  initGallery();
  initMemories();
  initCake();
  initWishesForm();
  initBalloons();
  initMusicPlayer();
});

// Loading Screen
function initLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (!loadingScreen) return;

  window.addEventListener("load", function () {
    setTimeout(function () {
      loadingScreen.style.opacity = "0";
      loadingScreen.style.visibility = "hidden";
    }, 1500);
  });
}
function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.style.transition = "opacity 1s ease";
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 1000);
  }
}

document.getElementById("main-content").style.opacity = "1";

// Try to hide when all resources are loaded
window.addEventListener("load", () => {
  setTimeout(hideLoadingScreen, 1500);
});

// Fallback: hide after 5 seconds in case 'load' fails
setTimeout(hideLoadingScreen, 5000);

// Theme Switcher
function initThemeSwitcher() {
  const themeOptions = document.querySelectorAll(".theme-option");
  const body = document.body;

  // Load saved theme from localStorage if available
  const savedTheme = localStorage.getItem("birthday-theme");
  if (savedTheme) {
    body.className = savedTheme;
  }

  themeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const theme = this.getAttribute("data-theme");
      body.className = theme ? "theme-" + theme : "";
      localStorage.setItem("birthday-theme", body.className);
    });
  });

  // Mini theme switcher in header
  const themeSwitcherOptions = document.querySelectorAll(
    "#theme-switcher .theme-option"
  );
  themeSwitcherOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const theme = this.getAttribute("data-theme");
      body.className = theme ? "theme-" + theme : "";
      localStorage.setItem("birthday-theme", body.className);

      // Update active state
      themeSwitcherOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

// Floating Navigation
function initFloatingNav() {
  const floatingNav = document.getElementById("floating-nav");
  const navToggle = document.querySelector(".nav-toggle");
  const navItems = document.querySelectorAll("#floating-nav li");
  const sections = document.querySelectorAll(".section");

  if (!floatingNav) return;

  // Toggle navigation visibility
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      floatingNav.classList.toggle("hidden");
    });
  }

  // Scroll to section when nav item is clicked
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const targetId = this.getAttribute("data-section"); // ✅ FIXED
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // Update active nav item on scroll
  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (
        pageYOffset >= sectionTop &&
        pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("data-section") === current) {
        item.classList.add("active");
      }
    });
  });
}

// Parallax Effect
function initParallax() {
  const parallaxLayers = document.querySelectorAll(".parallax-layer");

  window.addEventListener("scroll", function () {
    const scrollPosition = window.pageYOffset;

    parallaxLayers.forEach((layer, index) => {
      const speed = (index + 1) * 0.2;
      layer.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
  });
}

// Section Animation
function initSectionAnimation() {
  const sections = document.querySelectorAll(".section");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };

  const sectionObserver = new IntersectionObserver(function (
    entries,
    observer
  ) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  observerOptions);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// Greeting Card Flip
function initGreetingCard() {
  const greetingCard = document.querySelector(".greeting-card");
  if (!greetingCard) return;

  greetingCard.addEventListener("mouseenter", function () {
    this.querySelector(".greeting-card-inner").classList.add("flipped");
  });

  greetingCard.addEventListener("mouseleave", function () {
    this.querySelector(".greeting-card-inner").classList.remove("flipped");
  });
}

// Gallery and Modal
function initGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const modal = document.getElementById("gallery-modal");
  const modalImg = modal.querySelector(".modal-img");
  let modalVideo = modal.querySelector(".modal-video");
  const modalTitle = modal.querySelector(".modal-title");
  const modalDescription = modal.querySelector(".modal-description");
  const modalDate = modal.querySelector(".modal-date");
  const closeModal = modal.querySelector(".close-modal");
  const prevBtn = modal.querySelector(".prev-photo");
  const nextBtn = modal.querySelector(".next-photo");

  let currentIndex = 0;

  if (!galleryItems.length || !modal) return;

  // Create video element inside modal if not present
  if (!modalVideo) {
    modalVideo = document.createElement("video");
    modalVideo.classList.add("modal-video");
    modalVideo.controls = true;
    modalVideo.style.display = "none";
    // Insert video before modalImg so they occupy same space
    modalImg.parentNode.insertBefore(modalVideo, modalImg);
  }

  function showItem(index) {
    const item = galleryItems[index];

    // Media
    const img = item.querySelector("img");
    const video = item.querySelector("video");

    // Caption info
    const caption = item.querySelector(".gallery-caption");
    const title = caption ? caption.querySelector("h3")?.textContent || "" : "";
    const description = caption
      ? caption.querySelector("p")?.textContent || ""
      : "";
    const date = caption
      ? caption.querySelector(".gallery-date")?.textContent || ""
      : "";

    if (img) {
      modalImg.src = img.src;
      modalImg.style.display = "block";

      modalVideo.pause();
      modalVideo.removeAttribute("src");
      modalVideo.style.display = "none";
    } else if (video) {
      modalVideo.src = video.src;
      modalVideo.style.display = "block";
      modalVideo.load();
      modalVideo.play();

      modalImg.style.display = "none";
      modalImg.removeAttribute("src");
    }

    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalDate.textContent = date;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    currentIndex = index;
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      showItem(index);
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    document.body.style.overflow = "auto";
  });

  // Close modal on clicking outside content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      modalVideo.pause();
      modalVideo.removeAttribute("src");
      document.body.style.overflow = "auto";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") {
      modal.classList.remove("active");
      modalVideo.pause();
      modalVideo.removeAttribute("src");
      document.body.style.overflow = "auto";
    }

    if (e.key === "ArrowRight") {
      showItem((currentIndex + 1) % galleryItems.length);
    }

    if (e.key === "ArrowLeft") {
      showItem((currentIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  });

  nextBtn.addEventListener("click", () => {
    showItem((currentIndex + 1) % galleryItems.length);
  });

  prevBtn.addEventListener("click", () => {
    showItem((currentIndex - 1 + galleryItems.length) % galleryItems.length);
  });
}

// Memories Timeline
function initMemories() {
  const memoryItems = document.querySelectorAll(".memory-item");
  const prevBtn = document.querySelector(".memory-nav.prev");
  const nextBtn = document.querySelector(".memory-nav.next");
  const indicator = document.querySelector(".memory-indicator");
  let currentIndex = 0;

  if (!memoryItems.length) return;

  // Show first memory
  if (memoryItems.length > 0) {
    memoryItems[0].classList.add("active");
    updateIndicator();
  }

  // Navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      navigateMemories(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      navigateMemories(1);
    });
  }

  // Navigate through memories
  function navigateMemories(direction) {
    memoryItems[currentIndex].classList.remove("active");

    currentIndex += direction;

    if (currentIndex < 0) {
      currentIndex = memoryItems.length - 1;
    } else if (currentIndex >= memoryItems.length) {
      currentIndex = 0;
    }

    memoryItems[currentIndex].classList.add("active");
    updateIndicator();
  }

  // Update indicator text
  function updateIndicator() {
    if (indicator) {
      indicator.textContent = `${currentIndex + 1} / ${memoryItems.length}`;
    }
  }
}

// Birthday Cake
function initCake() {
  const cake = document.querySelector(".cake-container");
  const flames = document.querySelectorAll(".flame");
  const cakeButton = document.querySelector(".cake-button");

  if (!cake || !flames.length) return;

  // Blow out candle on click
  cake.addEventListener("click", function () {
    flames.forEach((flame) => {
      flame.classList.add("blow-out");
    });

    // Show confetti effect
    createConfetti();

    // Play sound effect if available
    const blowSound = document.getElementById("blow-sound");
    if (blowSound) {
      blowSound.play().catch((e) => console.log("Audio play failed:", e));
    }

    // Reset candle after some time
    setTimeout(function () {
      flames.forEach((flame) => {
        flame.classList.remove("blow-out");
      });
    }, 5000);
  });

  // Alternative blow button
  if (cakeButton) {
    cakeButton.addEventListener("click", function () {
      flames.forEach((flame) => {
        flame.classList.add("blow-out");
      });
      createConfetti();

      const blowSound = document.getElementById("blow-sound");
      if (blowSound) {
        blowSound.play().catch((e) => console.log("Audio play failed:", e));
      }

      setTimeout(function () {
        flames.forEach((flame) => {
          flame.classList.remove("blow-out");
        });
      }, 5000);
    });
  }

  // Speech recognition for blowing
  if (window.webkitSpeechRecognition || window.SpeechRecognition) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript.toLowerCase();
      if (
        transcript.includes("blow") ||
        transcript.includes("happy birthday")
      ) {
        flames.forEach((flame) => {
          flame.classList.add("blow-out");
        });
        createConfetti();

        setTimeout(function () {
          flames.forEach((flame) => {
            flame.classList.remove("blow-out");
          });
        }, 5000);
      }
    };

    recognition.onerror = function (event) {
      console.log("Speech recognition error:", event.error);
    };

    // Start recognition when mic button is clicked
    const micButton = document.querySelector(".mic-icon");
    if (micButton) {
      micButton.addEventListener("click", function () {
        try {
          recognition.start();
          micButton.style.backgroundColor = "#ff9d00";
          setTimeout(() => {
            micButton.style.backgroundColor = "var(--primary)";
          }, 3000);
        } catch (e) {
          console.log("Speech recognition not available:", e);
        }
      });
    }
  }

  // Create confetti effect
  function createConfetti() {
    const confettiContainer = document.createElement("div");
    confettiContainer.className = "confetti-container";
    document.body.appendChild(confettiContainer);

    const colors = ["#ffcad4", "#f4acb7", "#9d8189", "#ff90b3", "#b5d8cc"];

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
      confetti.style.animationDelay = Math.random() * 5 + "s";
      confetti.style.animation = `confetti-fall ${
        Math.random() * 3 + 2
      }s linear ${Math.random() * 2}s forwards`;
      confettiContainer.appendChild(confetti);
    }

    setTimeout(function () {
      confettiContainer.remove();
    }, 8000);
  }
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", initCake);

// Wishes Form
function initWishesForm() {
  const wishesForm = document.getElementById("wishes-form");
  const wishesContainer = document.getElementById("wishes-container");
  const emojis = document.querySelectorAll(".emoji");
  let selectedEmoji = "❤️";

  if (!wishesForm || !wishesContainer) return;

  // Load existing wishes from localStorage
  loadWishes();

  // Select emoji
  if (emojis.length) {
    emojis.forEach((emoji) => {
      emoji.addEventListener("click", function () {
        emojis.forEach((e) => e.classList.remove("selected"));
        this.classList.add("selected");
        selectedEmoji = this.textContent;
      });
    });
  }

  // Submit new wish
  wishesForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("wish-name");
    const messageInput = document.getElementById("wish-message");

    if (!nameInput || !messageInput) return;
    if (!nameInput.value.trim() || !messageInput.value.trim()) {
      alert("Please fill in your name and message!");
      return;
    }

    const newWish = {
      name: nameInput.value.trim(),
      message: messageInput.value.trim(),
      emoji: selectedEmoji,
      time: new Date().toLocaleString(),
    };

    // Add wish to the display
    addWishToDisplay(newWish);

    // Save to localStorage
    saveWish(newWish);

    // Reset form
    wishesForm.reset();
    emojis.forEach((e) => e.classList.remove("selected"));
    emojis[0].classList.add("selected");
    selectedEmoji = "❤️";
  });

  // Add wish to display
  function addWishToDisplay(wish) {
    const wishCard = document.createElement("div");
    wishCard.className = "wish-card";

    wishCard.innerHTML = `
      <div class="wish-emoji">${wish.emoji}</div>
      <div class="wish-content">
        <div class="wish-sender">${wish.name}</div>
        <div class="wish-message">${wish.message}</div>
        <div class="wish-time">${wish.time}</div>
      </div>
    `;

    wishesContainer.prepend(wishCard);

    // Add entrance animation
    wishCard.style.opacity = "0";
    wishCard.style.transform = "translateY(20px)";

    setTimeout(function () {
      wishCard.style.opacity = "1";
      wishCard.style.transform = "translateY(0)";
    }, 10);
  }

  // Save wish to localStorage
  function saveWish(wish) {
    let wishes = JSON.parse(localStorage.getItem("birthday-wishes") || "[]");
    wishes.push(wish);
    localStorage.setItem("birthday-wishes", JSON.stringify(wishes));
  }

  // Load wishes from localStorage
  function loadWishes() {
    const wishes = JSON.parse(localStorage.getItem("birthday-wishes") || "[]");

    wishesContainer.innerHTML = ""; // Clear container

    wishes.reverse().forEach((wish) => {
      addWishToDisplay(wish);
    });
  }
}

// Floating Balloons
function initBalloons() {
  const balloonsContainer = document.getElementById("balloons-container");
  if (!balloonsContainer) return;

  const colors = ["#ffcad4", "#f4acb7", "#9d8189", "#d8e2dc", "#ece4db"];
  const count = 15;

  // Create balloons
  for (let i = 0; i < count; i++) {
    createBalloon();
  }

  // Create balloon at intervals
  setInterval(createBalloon, 3000);

  function createBalloon() {
    const balloon = document.createElement("div");
    balloon.className = "balloon";

    // Random properties
    const size = Math.random() * 30 + 30;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;

    // Set styles
    balloon.style.width = `${size}px`;
    balloon.style.height = `${size * 1.2}px`;
    balloon.style.backgroundColor = color;
    balloon.style.left = `${left}%`;
    balloon.style.animationDuration = `${animationDuration}s`;
    balloon.style.animationDelay = `${delay}s`;

    // Add to container
    balloonsContainer.appendChild(balloon);

    // Remove after animation
    setTimeout(() => {
      balloon.remove();
    }, (animationDuration + delay) * 1000);
  }
}

// Music Player
function initMusicPlayer() {
  const musicToggle = document.getElementById("music-toggle");
  const music = document.getElementById("birthday-music");
  let isPlaying = false;

  if (!musicToggle || !music) return;

  // Play/pause on click
  musicToggle.addEventListener("click", function () {
    if (isPlaying) {
      music.pause();
      musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    } else {
      music.play().catch((error) => {
        console.log("Audio playback was prevented: ", error);
      });
      musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    }

    isPlaying = !isPlaying;
  });

  // Update button when audio ends
  music.addEventListener("ended", function () {
    isPlaying = false;
    musicToggle.innerHTML = '<i class="fas fa-music"></i>';
  });
}

// Customization Settings
function initCustomization() {
  const themeOptions = document.querySelectorAll(".theme-preview");
  const toggles = document.querySelectorAll(".customize-toggle");

  if (!themeOptions.length) return;

  // Theme selection
  themeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const theme = this.getAttribute("data-theme");
      document.body.className = theme ? "theme-" + theme : "";
      localStorage.setItem("birthday-theme", document.body.className);

      // Update active state
      themeOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Toggle features
  toggles.forEach((toggle) => {
    toggle.addEventListener("change", function () {
      const feature = this.getAttribute("data-feature");
      const isEnabled = this.checked;

      // Save preference
      localStorage.setItem("birthday-" + feature, isEnabled);

      // Toggle feature
      switch (feature) {
        case "animations":
          document.body.classList.toggle("no-animations", !isEnabled);
          break;
        case "music":
          const music = document.getElementById("birthday-music");
          if (music) {
            if (isEnabled) {
              music.volume = 0.5;
            } else {
              music.pause();
              music.volume = 0;
            }
          }
          break;
        case "balloons":
          const balloonsContainer =
            document.getElementById("balloons-container");
          if (balloonsContainer) {
            balloonsContainer.style.display = isEnabled ? "block" : "none";
          }
          break;
      }
    });

    // Load saved preferences
    const feature = toggle.getAttribute("data-feature");
    const savedPreference = localStorage.getItem("birthday-" + feature);

    if (savedPreference !== null) {
      toggle.checked = savedPreference === "true";
      // Trigger change event to apply settings
      const event = new Event("change");
      toggle.dispatchEvent(event);
    }
  });
}

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});
