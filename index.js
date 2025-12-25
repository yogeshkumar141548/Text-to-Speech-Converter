const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const previewBtn = document.getElementById("previewBtn");
const voiceSelect = document.getElementById("voiceSelect");
const speed = document.getElementById("speed");
const pitch = document.getElementById("pitch");
const themeToggle = document.getElementById("themeToggle");
const error = document.querySelector(".error-para");

const synth = window.speechSynthesis;
let voices = [];

function loadVoices() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = '<option value="">Select Voice</option>';
    voices.forEach((voice, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

synth.onvoiceschanged = loadVoices;

// PLAY
convertBtn.onclick = () => {
    if (!text.value.trim()) {
        error.textContent = "Please enter text!";
        return;
    }

    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text.value);
    utter.rate = speed.value;
    utter.pitch = pitch.value;

    if (voiceSelect.value !== "") {
        utter.voice = voices[voiceSelect.value];
    }

    error.textContent = "";
    synth.speak(utter);
};

// PAUSE
pauseBtn.onclick = () => {
    if (synth.speaking) synth.pause();
};

// RESUME
resumeBtn.onclick = () => {
    if (synth.paused) synth.resume();
};

// VOICE PREVIEW
previewBtn.onclick = () => {
    if (voiceSelect.value === "") return;
    synth.cancel();
    const preview = new SpeechSynthesisUtterance("Hello, this is a voice preview.");
    preview.voice = voices[voiceSelect.value];
    synth.speak(preview);
};

// THEME TOGGLE
themeToggle.onclick = () => {
    document.body.classList.toggle("light");
    themeToggle.textContent =
        document.body.classList.contains("light")
            ? "🌞 Light Mode"
            : "🌙 Dark Mode";
};
