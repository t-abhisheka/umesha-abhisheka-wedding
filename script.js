document.addEventListener("DOMContentLoaded", function() {
    
    // --- PART 1: COUNTDOWN TIMER ---
    const weddingDate = new Date("Apr 30, 2026 09:10:00").getTime();

    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Check if elements exist before updating to avoid errors
        if(document.getElementById("days")) {
            document.getElementById("days").innerText = days;
            document.getElementById("hours").innerText = hours;
            document.getElementById("minutes").innerText = minutes;
            document.getElementById("seconds").innerText = seconds;
        }

        if (distance < 0) {
            clearInterval(x);
            if(document.getElementById("countdown")) {
                document.getElementById("countdown").innerHTML = "<h3>HAPPILY MARRIED!</h3>";
            }
        }
    }, 1000);


    // --- PART 2: NAME PERSONALIZATION ---
    console.log("Script loaded. Checking for guest name...");

    // Helper to get URL params
    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    const guestName = getQueryParam('guest');

    if (guestName) {
        console.log("Guest found:", guestName); // Check your browser console for this
        const welcomeElement = document.getElementById('welcome-msg');
        
        if (welcomeElement) {
            welcomeElement.innerHTML = `Welcome, ${guestName}!`;
            welcomeElement.style.color = "#fff"; 
            welcomeElement.style.textShadow = "2px 2px 4px rgba(0,0,0,0.5)";
        } else {
            console.error("Error: Could not find element with id 'welcome-msg'");
        }
    } else {
        console.log("No guest name in URL.");
    }

});