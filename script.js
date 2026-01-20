// Set the date we're counting down to
// Format: Month Day, Year Time
const weddingDate = new Date("Apr 30, 2026 09:10:00").getTime();

// Update the count down every 1 second
const x = setInterval(function() {

  const now = new Date().getTime();
  const distance = weddingDate - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result
  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  // If the count down is finished
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "<h3>HAPPILY MARRIED!</h3>";
  }
}, 1000);