const text = document.getElementById("quote");
const author = document.getElementById("author");
const tweetButton = document.getElementById("user");
const copyBtn = document.getElementById("copy");
const speechBtn = document.getElementById("speaker");
const quoteBtn = document.querySelector(".next"),
    synth = speechSynthesis;

const getNewQuote = async () => {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    //api for quotes
    var url = "https://type.fit/api/quotes";

    // fetch the data from api
    const response = await fetch(url);
    console.log(typeof response);
    //convert response to json and store it in quotes array
    const allQuotes = await response.json();

    // Generates a random number between 0 and the length of the quotes array
    const indx = Math.floor(Math.random() * allQuotes.length);

    //Store the quote present at the randomly generated index
    const quote = allQuotes[indx].text;

    //Store the author of the respective quote
    const auth = allQuotes[indx].author;

    if (auth == null) {
        author = "Anonymous";
    }

    //function to dynamically display the quote and the author
    text.innerHTML = quote;
    author.innerHTML = "~ " + auth;

    quoteBtn.classList.remove("loading");
    quoteBtn.innerText = "New Quote";

    //tweet the quote
    // tweetButton.href="https://twitter.com/intent/tweet?text="+quote+" ~ "+auth;
    tweetButton.href = "https://bibek10550.github.io/bibek/";

}

getNewQuote();

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(text.innerText);
    // Change the background color of the copy button for 3 seconds
    copyBtn.style.color = "blue";
    copyBtn.style.fontWeight = 'bolder';
    setTimeout(() => {
        copyBtn.style.color = ""; // Reset to default color after 3 seconds
        copyBtn.style.fontWeight = 'normal';

    }, 3000);
});

speechBtn.addEventListener("click", () => {
    if (!quoteBtn.classList.contains("loading")) {
        let utterance = new SpeechSynthesisUtterance(
            `${text.innerText} by ${author.innerText}`
        );
        synth.speak(utterance);
        setInterval(() => {
            !synth.speaking
                ? speechBtn.classList.remove("active")
                : speechBtn.classList.add("active");
        }, 10);
    }
});
