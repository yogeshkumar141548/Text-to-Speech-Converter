const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const error = document.querySelector(".error-para");

convertBtn.addEventListener("click", () => {
    const speechSynth = window.speechSynthesis;
    const enteredText = text.value.trim();

    if (!enteredText) {
        error.textContent = "Nothing to Convert! Enter text in the text area.";
        return;
    }

    error.textContent = "";

    // Stop any ongoing speech
    if (speechSynth.speaking) {
        speechSynth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(enteredText);
    convertBtn.textContent = "Sound is Playing...";

    utterance.onend = () => {
        convertBtn.textContent = "Play Converted Sound";
    };

    speechSynth.speak(utterance);
});
