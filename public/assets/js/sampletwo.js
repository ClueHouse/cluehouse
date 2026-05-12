(() => {
  "use strict";

  const input = document.getElementById("answerInput2");
  const button = document.getElementById("goBtn2");
  const msg = document.getElementById("msg2");

  if (!input || !button || !msg) return;

  const CORRECT = "5";

  function resetTimers() {
    if (msg._holdTimer) clearTimeout(msg._holdTimer);
    if (msg._hideTimer) clearTimeout(msg._hideTimer);
  }

  function resetForReplay() {
    msg.classList.remove("is-show", "is-hide");
    void msg.offsetWidth;
  }

  function showPill(text, success = false, autoFade = true) {
    resetTimers();

    msg.classList.remove("is-error", "is-success");
    msg.classList.add(success ? "is-success" : "is-error");
    msg.textContent = text;

    resetForReplay();
    msg.classList.add("is-show");

    if (autoFade) {
      const root = getComputedStyle(document.documentElement);
      const holdMs = parseInt(root.getPropertyValue("--pill-hold")) || 1100;
      const outMs = parseInt(root.getPropertyValue("--pill-out")) || 220;

      msg._holdTimer = setTimeout(() => {
        msg.classList.remove("is-show");
        msg.classList.add("is-hide");

        msg._hideTimer = setTimeout(() => {
          msg.classList.remove("is-hide");
          msg.textContent = "";
        }, outMs + 60);

      }, holdMs);
    }
  }

  function submit() {
    const value = (input.value || "").trim();

    if (!value) {
      showPill("Please enter your answer.");
      return;
    }

    if (value === CORRECT) {
      showPill("YES!! Now, go check out that Gameshelf...", true, false);
      return;
    }

    showPill("Try again!");
  }

  button.addEventListener("click", submit);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submit();
    }
  });

})();
