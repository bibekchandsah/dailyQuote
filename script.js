const quoteText = document.querySelector(".quote"),
  quoteBtn = document.querySelector(".newQuote"), // Update the selector to use ".newQuote"
  authorName = document.querySelector(".name"),
  speechBtn = document.querySelector(".speech"),
  copyBtn = document.querySelector(".copy"),
  synth = speechSynthesis;

function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";
  fetch("http://api.quotable.io/random")
    .then((response) => response.json())
    .then((result) => {
      quoteText.innerText = result.content;
      authorName.innerText = result.author;
      quoteBtn.classList.remove("loading");
      quoteBtn.innerText = "New Quote";
    });
}

// Function to click the new quote button
function clickNewQuoteButton() {
  quoteBtn.click();
}

// Click the new quote button when the page loads
window.addEventListener("load", clickNewQuoteButton);

speechBtn.addEventListener("click", () => {
  if (!quoteBtn.classList.contains("loading")) {
    let utterance = new SpeechSynthesisUtterance(
      `${quoteText.innerText} by ${authorName.innerText}`
    );
    synth.speak(utterance);
    setInterval(() => {
      !synth.speaking
        ? speechBtn.classList.remove("active")
        : speechBtn.classList.add("active");
    }, 10);
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
  // Change the background color of the copy button for 3 seconds
  copyBtn.style.backgroundColor = "green";
  setTimeout(() => {
    copyBtn.style.backgroundColor = ""; // Reset to default color after 3 seconds
  }, 3000);
});

quoteBtn.addEventListener("click", randomQuote);
