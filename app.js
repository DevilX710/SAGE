// ================================
// SAGE AI v0.1
// ================================

let currentMode = "ssc";

const chat = document.getElementById("chat");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const welcomeText = document.getElementById("welcomeText");


// ================================
// MODE SWITCHING
// ================================

document.querySelectorAll(".mode").forEach(button => {

  button.addEventListener("click", () => {

    document.querySelectorAll(".mode").forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    currentMode = button.dataset.mode;

    if (currentMode === "ssc") {

      welcomeText.textContent =
        "Your SSC study assistant. Ask me anything about your subjects.";

    } else {

      welcomeText.textContent =
        "Your everyday AI assistant. Ask me anything you want.";

    }

  });

});


// ================================
// SEND MESSAGE
// ================================

function sendMessage() {

  const message = input.value.trim();

  if (!message) return;

  addMessage(message, "user");

  input.value = "";
  input.style.height = "42px";

  // Temporary response
  setTimeout(() => {

    let response;

    if (currentMode === "ssc") {

      response =
        "I'm SAGE SSC Mode. 🤖\n\n" +
        "The AI engine isn't connected yet, but this chat interface is working.\n\n" +
        "Next we'll connect SAGE to its SSC knowledge and AI engine.";

    } else {

      response =
        "I'm SAGE Daily Mode. 🌎\n\n" +
        "The AI engine isn't connected yet.\n\n" +
        "Next we'll connect me to a real AI model.";

    }

    addMessage(response, "ai");

  }, 500);

}


// ================================
// ADD MESSAGE
// ================================

function addMessage(text, type) {

  const wrapper = document.createElement("div");

  wrapper.className = `message ${type}`;

  const bubble = document.createElement("div");

  bubble.className = "bubble";

  bubble.textContent = text;

  wrapper.appendChild(bubble);

  chat.appendChild(wrapper);

  chat.scrollTop = chat.scrollHeight;

}


// ================================
// SUGGESTION BUTTONS
// ================================

function useSuggestion(text) {

  input.value = text;

  input.focus();

  sendMessage();

}


// ================================
// SEND BUTTON
// ================================

sendBtn.addEventListener("click", sendMessage);


// ================================
// ENTER TO SEND
// SHIFT + ENTER = NEW LINE
// ================================

input.addEventListener("keydown", event => {

  if (event.key === "Enter" && !event.shiftKey) {

    event.preventDefault();

    sendMessage();

  }

});


// ================================
// AUTO RESIZE TEXTAREA
// ================================

input.addEventListener("input", () => {

  input.style.height = "42px";

  input.style.height =
    Math.min(input.scrollHeight, 120) + "px";

});


// ================================
// PHOTO BUTTON
// ================================

document.getElementById("photoBtn").addEventListener("click", () => {

  alert(
    "Photo questions will be added when we build SAGE's AI engine."
  );

});
