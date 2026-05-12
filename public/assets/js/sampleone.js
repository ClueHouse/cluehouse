(() => {
  "use strict";

  const input = document.getElementById("answerField");
  const button = document.getElementById("goBtn");
  const pill = document.getElementById("pill");

  if (!input || !button || !pill) return;

  function resetTimers() {
    if (pill._holdTimer) clearTimeout(pill._holdTimer);
    if (pill._hideTimer) clearTimeout(pill._hideTimer);
  }

  function resetForReplay() {
    pill.classList.remove("is-show", "is-hide");
    void pill.offsetWidth;
  }

  function showPill(text, success = false, autoFade = true) {
    resetTimers();

    pill.textContent = text;
    pill.classList.remove("yes", "no");
    pill.classList.add(success ? "yes" : "no");

    resetForReplay();
    pill.classList.add("is-show");

    if (autoFade) {
      const root = getComputedStyle(document.documentElement);
      const holdMs = parseInt(root.getPropertyValue("--pill-hold")) || 1100;
      const outMs = parseInt(root.getPropertyValue("--pill-out")) || 220;

      pill._holdTimer = setTimeout(() => {
        pill.classList.remove("is-show");
        pill.classList.add("is-hide");

        pill._hideTimer = setTimeout(() => {
          pill.classList.remove("is-hide");
          pill.textContent = "";
        }, outMs + 60);

      }, holdMs);
    }
  }

  function handleSubmit() {
    const v = (input.value || "").trim().toLowerCase();

    if (v === "") {
      showPill("Please enter your answer.");
      return;
    }

    if (v === "t") {
      window.location.href = "/sampletwo";
      return;
    }

    showPill("Try again.");
  }

  button.addEventListener("click", handleSubmit);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  });

})();
