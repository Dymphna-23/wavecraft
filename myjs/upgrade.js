// =========================================
// WAVECRAFT INTRO VIDEO + LIGHT/DARK MODE
// =========================================


// =========================================
// ELEMENTS
// =========================================

const intro = document.getElementById("intro");
const introVideo = document.getElementById("introVideo");
const mainContent = document.getElementById("main-content");
const themeBtn = document.getElementById("themeBtn");


// =========================================
// INTRO VIDEOS
// =========================================

const darkIntroVideo =
    "video/wavecraft-intro-dark.mp4";

const lightIntroVideo =
    "video/wavecraft-intro-light.mp4";


// =========================================
// GET SAVED THEME
// =========================================

let savedTheme =
    localStorage.getItem("wavecraftTheme");


// If there is no saved theme,
// default to dark mode

if (!savedTheme) {

    savedTheme = "dark";

    localStorage.setItem(
        "wavecraftTheme",
        "dark"
    );

}


// =========================================
// APPLY THE SAVED THEME
// =========================================

function applyTheme() {

    if (savedTheme === "light") {

        document.body.classList.add("light");

    } else {

        document.body.classList.remove("light");

    }

}


// Apply theme immediately

applyTheme();


// =========================================
// UPDATE MOON / SUN ICON
// =========================================

function updateThemeIcon() {

    if (!themeBtn) return;

    const icon =
        themeBtn.querySelector("i");

    if (!icon) return;


    if (
        document.body.classList.contains("light")
    ) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

}


// Update icon when page loads

updateThemeIcon();


// =========================================
// SELECT INTRO VIDEO
// =========================================

function selectIntroVideo() {

    if (!introVideo) return;


    if (savedTheme === "light") {

        introVideo.src =
            lightIntroVideo;

    } else {

        introVideo.src =
            darkIntroVideo;

    }

}


// =========================================
// SHOW MAIN WEBSITE
// =========================================

function revealMainContent() {

    if (intro) {

        intro.style.display = "none";

    }

    if (mainContent) {

        mainContent.style.display = "block";

    }

}


// =========================================
// START INTRO VIDEO
// =========================================

function startIntroVideo() {

    if (!intro || !introVideo) {

        revealMainContent();

        return;

    }


    // Select correct video

    selectIntroVideo();


    // Show intro

    intro.style.display = "block";


    // Hide website

    if (mainContent) {

        mainContent.style.display = "none";

    }


    // Reset video

    introVideo.currentTime = 0;


    // Load selected video

    introVideo.load();


    // Play selected video

    introVideo.play()
        .catch(error => {

            console.log(
                "Intro video could not autoplay:",
                error
            );

            // Don't leave the website stuck

            revealMainContent();

        });

}


// =========================================
// INTRO VIDEO EVENTS
// =========================================

if (introVideo) {


    // Video finished

    introVideo.addEventListener(
        "ended",
        function () {

            revealMainContent();

        }
    );


    // Video error

    introVideo.addEventListener(
        "error",
        function () {

            console.error(
                "WaveCraft intro video failed to load."
            );

            revealMainContent();

        }
    );

}


// =========================================
// PLAY INTRO WHEN PAGE LOADS
// =========================================

startIntroVideo();


// =========================================
// THEME BUTTON
// =========================================

if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        function () {


            // =================================
            // TOGGLE LIGHT / DARK
            // =================================

            document.body.classList.toggle(
                "light"
            );


            // =================================
            // CHECK CURRENT MODE
            // =================================

            if (
                document.body.classList.contains(
                    "light"
                )
            ) {

                savedTheme = "light";

            } else {

                savedTheme = "dark";

            }


            // =================================
            // SAVE THEME
            // =================================

            localStorage.setItem(
                "wavecraftTheme",
                savedTheme
            );


            // =================================
            // UPDATE ICON
            // =================================

            updateThemeIcon();


            // =================================
            // PLAY NEW THEME INTRO
            // =================================

            startIntroVideo();

        }
    );

}

// end of intro video

// SCROLL PROGRESS BAR
const progressBar = document.querySelector(".progress-bar");

function updateProgressBar() {
  if (!progressBar) return;

  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

  progressBar.style.width = `${scrollPercentage}%`;
}

// listen for scrolling and page load
window.addEventListener("scroll", updateProgressBar);
window.addEventListener("load", updateProgressBar);

// End Of Progress Bar

// menu toggle
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const nav = document.querySelector("nav");
const navLogoHost = document.getElementById("navLogoHost");
const sidebarLogo = document.getElementById("sidebarLogo");

function toggleNavbarLogo() {
    if (!nav || !navLogoHost || !sidebarLogo) return;

    const isClosed = sidebar.classList.contains("close");

    if (isClosed) {
        if (!navLogoHost.querySelector("img")) {
            const clonedLogo = sidebarLogo.cloneNode(true);
            clonedLogo.id = "navbarLogo";
            clonedLogo.alt = "WaveCraft logo";
            navLogoHost.appendChild(clonedLogo);
        }

        nav.classList.add("nav-with-logo");
    } else {
        nav.classList.remove("nav-with-logo");
        navLogoHost.innerHTML = "";
    }
}

menuBtn.addEventListener("click", function () {
    // Toggle collapsed state
    const isClosed = sidebar.classList.toggle("close");

    // If collapsed, hide link text but allow icons to be focusable
    if (isClosed) {
        sidebar.setAttribute('aria-expanded','false');
    } else {
        sidebar.setAttribute('aria-expanded','true');
    }

    toggleNavbarLogo();

    // Expand or reduce main area when the sidebar closes or opens
    const mainArea = document.getElementById("mainArea");
    if (mainArea) {
        mainArea.classList.toggle("expand", isClosed);
    }
});
// END OF MENU TOGGLE

// NEWSLETTER

const footerSubscribe = document.querySelector(".footer-subscribe");

if (footerSubscribe) {

    footerSubscribe.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = this.querySelector("input").value.trim();

        if (!email) return;

        alert("Thanks for subscribing to WaveCraft!");

        this.reset();

    });

}

// END OF NEWSLETTER


// Scroll to top button
// Select the Button
const scrollTopBtn = document.getElementById("scroll-top");

if (scrollTopBtn) {
  // Listen for Scrolling
  window.addEventListener("scroll", () => {

    // Check if the user has scrolled down
    if (window.scrollY > 300) {

      // Show the Button
      scrollTopBtn.style.display = "block";

    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  // Listen for Button Clicks
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// active navigation links
// select all navigation links
const navlinks=document.querySelectorAll(".nav-link a");

// select all sections
const sections=document.querySelectorAll("section");

// listen for scrolling
window.addEventListener("scroll", () => {
  let currentSection="";

  // check which section is currently on the screen
  sections.forEach(section => {
    const sectionTop=section.offsetTop - 120;
    const sectionHeight=section.offsetHeight;
    if(window.scrollY >= sectionTop){
      currentSection=section.getAttribute("id");

    }

  });

  // remove the active class from every link
  navlinks.forEach(link => {
    link.classList.remove("active");
    
    // add the ative class to the matching link
    if(link.getAttribute("href")==="#"+currentSection){
      link.classList.add("active");
    }
  });

});

// UPGRADE PAGE INTERACTIONS

const planCards = document.querySelectorAll(".upgrade-plan-card");
const planButtons = document.querySelectorAll("[data-plan-select]");
const faqItems = document.querySelectorAll(".faq-item");
const internalLinks = document.querySelectorAll('a[href^="#"]');
const revealTargets = document.querySelectorAll(
    ".premium-benefits, .premium-feature, .premium-exclusives, .premium-plans, .plan-comparison, .premium-faq, .premium-final-cta, .benefit-card, .exclusive-card, .upgrade-plan-card"
);

function selectPlan(planName) {
    planCards.forEach((card) => {
        card.classList.toggle("selected-plan", card.dataset.plan === planName);
    });

    const selectedButton = document.querySelector(`[data-plan-select="${planName}"]`);
    if (!selectedButton) return;

    const originalLabel = selectedButton.dataset.originalLabel || selectedButton.textContent.trim();
    selectedButton.dataset.originalLabel = originalLabel;
    selectedButton.textContent = `${planName[0].toUpperCase()}${planName.slice(1)} plan selected.`;

    window.setTimeout(() => {
        if (selectedButton.isConnected) selectedButton.textContent = originalLabel;
    }, 2400);
}

planButtons.forEach((button) => {
    button.addEventListener("click", () => selectPlan(button.dataset.planSelect));
});

function closeFaq(item) {
    item.classList.remove("active");
    const question = item.querySelector(".faq-question");
    if (question) question.setAttribute("aria-expanded", "false");
}

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;

    question.setAttribute("aria-expanded", "false");
    question.addEventListener("click", () => {
        const shouldOpen = !item.classList.contains("active");
        faqItems.forEach(closeFaq);

        if (shouldOpen) {
            item.classList.add("active");
            question.setAttribute("aria-expanded", "true");
        }
    });
});

internalLinks.forEach((link) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    link.addEventListener("click", (event) => {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", targetId);
    });
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
} else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    revealTargets.forEach((target) => {
        target.classList.add("reveal-on-scroll");
        revealObserver.observe(target);
    });
}

const demoPlayButton = document.querySelector(".premium-play-button");
if (demoPlayButton) {
    demoPlayButton.setAttribute("aria-label", "Play premium preview");
    demoPlayButton.addEventListener("click", () => {
        const icon = demoPlayButton.querySelector("i");
        if (!icon) return;
        const isPlaying = demoPlayButton.classList.toggle("is-playing");
        icon.classList.toggle("ri-play-fill", !isPlaying);
        icon.classList.toggle("ri-pause-fill", isPlaying);
    });
}