// ==========================================
// SAGE AI v0.2
// Real AI connection
// ==========================================

// YOUR SUPABASE PROJECT
const SUPABASE_URL =
  "https://telwykbrnnqqsbbhmbum.supabase.co";

// YOUR SUPABASE PUBLIC ANON/PUBLISHABLE KEY
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlbHd5a2Jybm5xcXNiYmhtYnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2MjY0MjQsImV4cCI6MjEwMjIwMjQyNH0._fEIbHzyHtIGboT0Q6zAL2vMGXquQWj9I92yfmymF6Y";

// SAGE EDGE FUNCTION
const SAGE_FUNCTION_URL =
  `${SUPABASE_URL}/functions/v1/sage-chat`;


let currentMode = "ssc";

const chat = document.getElementById("chat");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const welcomeText = document.getElementById("welcomeText");


// ==========================================
// MODE SWITCHING
// ==========================================

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


// ==========================================
// SEND MESSAGE
// ==========================================

async function sendMessage() {

  const message = input.value.trim();

  if (!message) return;

  addMessage(message, "user");

  input.value = "";
  input.style.height = "42px";

  // Loading message
  const loading = addMessage("SAGE is thinking...", "ai");

  try {

    const response = await fetch(SAGE_FUNCTION_URL, {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "apikey": SUPABASE_ANON_KEY
      },

      body: JSON.stringify({
        message: message,
        mode: currentMode
      })

    });


    const data = await response.json();


    // Remove loading message
    loading.remove();


    if (!response.ok) {

      throw new Error(
        data.error || "SAGE could not connect to the AI."
      );

    }


    addMessage(
      data.answer || "I couldn't generate an answer.",
      "ai"
    );


  } catch (error) {

    loading.remove();

    console.error(error);

    addMessage(
      "⚠️ SAGE couldn't connect right now.\n\n" +
      "Check your Supabase function and try again.",
      "ai"
    );

  }

}


// ==========================================
// ADD MESSAGE
// ==========================================

function addMessage(text, type) {

  const wrapper = document.createElement("div");

  wrapper.className = `message ${type}`;

  const bubble = document.createElement("div");

  bubble.className = "bubble";

  bubble.textContent = text;

  wrapper.appendChild(bubble);

  chat.appendChild(wrapper);

  chat.scrollTop = chat.scrollHeight;

  return wrapper;

}


// ==========================================
// SUGGESTIONS
// ==========================================

function useSuggestion(text) {

  input.value = text;

  input.focus();

  sendMessage();

}


// ==========================================
// SEND BUTTON
// ==========================================

sendBtn.addEventListener("click", sendMessage);


// ==========================================
// ENTER TO SEND
// SHIFT + ENTER = NEW LINE
// ==========================================

input.addEventListener("keydown", event => {

  if (event.key === "Enter" && !event.shiftKey) {

    event.preventDefault();

    sendMessage();

  }

});


// ==========================================
// AUTO RESIZE
// ==========================================

input.addEventListener("input", () => {

  input.style.height = "42px";

  input.style.height =
    Math.min(input.scrollHeight, 120) + "px";

});


// ==========================================
// PHOTO BUTTON
// ==========================================

document.getElementById("photoBtn").addEventListener("click", () => {

  alert(
    "📷 Photo questions are coming in the next SAGE update!"
  );

});
