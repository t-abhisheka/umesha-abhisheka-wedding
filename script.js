document.addEventListener("DOMContentLoaded", function() {
    // --- CONFIGURATION ---
    // PASTE YOUR GOOGLE SCRIPT WEB APP URL HERE
    const SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE"; 

    // --- COUNTDOWN TIMER ---
    const weddingDate = new Date("Apr 30, 2026 09:10:00").getTime();
    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(document.getElementById("days")) {
            document.getElementById("days").innerText = days;
            document.getElementById("hours").innerText = hours;
            document.getElementById("minutes").innerText = minutes;
            document.getElementById("seconds").innerText = seconds;
        }

        if (distance < 0) {
            clearInterval(x);
            if(document.getElementById("countdown")) document.getElementById("countdown").innerHTML = "<h3>HAPPILY MARRIED!</h3>";
        }
    }, 1000);

    // --- RSVP LOGIC ---
    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    const guestName = getQueryParam('guest');

    // 1. Personalize Welcome Message
    if (guestName) {
        const welcomeElement = document.getElementById('welcome-msg');
        if (welcomeElement) {
            welcomeElement.innerHTML = `Welcome, ${guestName}!`;
            welcomeElement.style.color = "#fff"; 
        }
    } else {
        // If no guest name, hide the RSVP buttons (prevent random people from clicking)
        document.getElementById('rsvp-buttons-container').style.display = 'none';
        document.getElementById('rsvp-instruction').innerText = "Please use the personalized link sent to you to RSVP.";
    }

    // 2. Handle Button Clicks
    const sendRsvp = (status) => {
        if (!guestName) return;

        // UI Updates: Disable buttons and show loading
        const buttons = document.querySelectorAll('.rsvp-btn');
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.innerText = "Sending...";
        });

        // Send data to Google Sheet
        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Important for Google Apps Script
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: guestName,
                status: status
            })
        }).then(response => {
            // Success!
            document.getElementById('rsvp-buttons-container').style.display = 'none';
            document.getElementById('response-message').style.display = 'block';
            document.getElementById('rsvp-instruction').style.display = 'none';

            const msgText = document.getElementById('msg-text');
            if (status === 'Accepted') {
                msgText.innerText = "Thank you! We can't wait to see you.";
                msgText.style.color = "#4CAF50";
            } else {
                msgText.innerText = "Thank you for letting us know.";
                msgText.style.color = "#555";
            }
        }).catch(error => {
            console.error('Error:', error);
            alert("Something went wrong. Please try again.");
            buttons.forEach(btn => btn.disabled = false); // Re-enable if error
        });
    };

    // Attach listeners
    const acceptBtn = document.getElementById('accept-btn');
    const declineBtn = document.getElementById('decline-btn');

    if (acceptBtn && declineBtn) {
        acceptBtn.addEventListener('click', () => sendRsvp('Accepted'));
        declineBtn.addEventListener('click', () => sendRsvp('Declined'));
    }
});