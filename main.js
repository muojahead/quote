// Variables
const qouteText = document.getElementById("quoteContent"),
    nextQouteBtn = document.getElementById("next_qoute"),
    qouteAuthorName = document.getElementById("name"),
    loader = document.querySelector(".loader"),
    playBtn = document.querySelector(".play"),
    copyBtn = document.querySelector(".copy"),
    twitterShareBtn = document.querySelector(".twitter_share"),
    rootEle = document.querySelector(":root"),
    colors = ["#EA304C", "#039DFC"];
let index = 0;
// Functions
function quotesGetter() {
    nextQouteBtn.textContent = "loading...";

    fetch("https://api.quotable.io/random").then(res => {
        if (res.status == 200) {
            loader.style.opacity = "0";
            loader.style.pointerEvents = "none";
            colorChanger();

        } else {
            loader.style.opacity = "1";
            loader.style.pointerEvents = "unset";
        }
        return res.json();
    }).then(newQuote => {
        nextQouteBtn.textContent = "New Quote";
        qouteAuthorName.textContent = newQuote.author;
        qouteText.textContent = newQuote.content;
    });

}
function colorChanger() {
    rootEle.style.setProperty("--mainColor", colors[index]);
    index = index + 1;
    if (index == colors.length) {
        index = 0;
    }
}
// Events
window.onload = quotesGetter;
nextQouteBtn.addEventListener("click", quotesGetter);

playBtn.addEventListener("click", () => {
    let qouteSpeaker = new SpeechSynthesisUtterance(`${qouteText.textContent} Qoute By ${qouteAuthorName.textContent}`);
    speechSynthesis.speak(qouteSpeaker);
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(`${qouteText.textContent} -- by ${qouteAuthorName.textContent}`);
    copyBtn.innerHTML = `<i class="fas fa-check" style="color:green"></i>`;
    setTimeout(() => {
        copyBtn.innerHTML = `<i class="fas fa-copy"></i>`;
    }, 2000);
});

twitterShareBtn.addEventListener("click", () => {
    let tweetURL = `https://twitter.com/intent/tweet?url=${qouteText.textContent} - by ${qouteAuthorName.textContent}`;
    window.open(tweetURL, "_blank");
});