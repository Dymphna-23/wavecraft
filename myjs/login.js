// =========================================
// WAVECRAFT INTRO VIDEO + LIGHT/DARK MODE
// =========================================


// =========================================
// ELEMENTS
// =========================================

const intro = document.getElementById("intro");
const introVideo = document.getElementById("introVideo");
const mainContent = document.getElementById("main-content");
// const themeBtn = document.getElementById("themeBtn");


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

// ============================================
// WAVECRAFT LOGIN
// ============================================

const loginForm = document.getElementById("loginForm");


// ============================================
// PASSWORD SHOW / HIDE
// ============================================

const passwordToggle = document.getElementById("passwordToggle");
const loginPassword = document.getElementById("loginPassword");


if (passwordToggle && loginPassword) {

    passwordToggle.addEventListener("click", function () {

        const icon = passwordToggle.querySelector("i");

        if (loginPassword.type === "password") {

            loginPassword.type = "text";

            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

            passwordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            loginPassword.type = "password";

            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

            passwordToggle.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    });

}



// ============================================
// LOGIN FORM
// ============================================

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");

        const loginButton =
            document.getElementById("loginSubmit");


        // Clear previous message

        message.textContent = "";



        // ====================================
        // BASIC VALIDATION
        // ====================================

        if (!email || !password) {

            message.textContent =
                "Please enter your email and password.";

            return;

        }



        // ====================================
        // GET SAVED ACCOUNT
        // ====================================

        const savedUser =
            localStorage.getItem("wavecraftUser");


        if (!savedUser) {

            message.textContent =
                "No WaveCraft account was found. Please sign up first.";

            return;

        }



        // Convert saved data to object

        const user = JSON.parse(savedUser);



        // ====================================
        // CHECK EMAIL
        // ====================================

        if (
            user.email.toLowerCase() !==
            email.toLowerCase()
        ) {

            message.textContent =
                "Incorrect email or password.";

            return;

        }



        // ====================================
        // CHECK PASSWORD
        // ====================================

        if (user.password !== password) {

            message.textContent =
                "Incorrect email or password.";

            return;

        }



        // ====================================
        // LOGIN SUCCESSFUL
        // ====================================

        user.isLoggedIn = true;


        localStorage.setItem(
            "wavecraftUser",
            JSON.stringify(user)
        );



        // ====================================
        // BUTTON LOADING STATE
        // ====================================

        loginButton.disabled = true;

        loginButton.querySelector("span").textContent =
            "Logging in...";



        // ====================================
        // GO TO HOMEPAGE
        // ====================================

        setTimeout(function () {

            window.location.href = "index.html";

        }, 700);

    });

}



// ============================================
// FORGOT PASSWORD
// ============================================

const forgotPassword =
    document.getElementById("forgotPassword");


if (forgotPassword) {

    forgotPassword.addEventListener("click", function (e) {

        e.preventDefault();

        alert(
            "Password recovery will be connected when we add the WaveCraft backend."
        );

    });

}



// ============================================
// GOOGLE LOGIN
// ============================================

const googleLogin =
    document.getElementById("googleLogin");


if (googleLogin) {

    googleLogin.addEventListener("click", function () {

        alert(
            "Google login will be connected when we add authentication."
        );

    });

}

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