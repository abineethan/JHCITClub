const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    let isValid = true;

    // Clear errors
    document.querySelectorAll(".error-message").forEach((el) => el.remove());
    document
      .querySelectorAll(".form-group")
      .forEach((el) => el.classList.remove("error"));

    // Validate fields
    if (name.value.trim() === "") {
      showError(name, "Name is required");
      isValid = false;
    }

    if (!validateEmail(email.value)) {
      showError(email, "Please enter a valid email");
      isValid = false;
    }

    if (message.value.trim() === "") {
      showError(message, "Message is required");
      isValid = false;
    }

    if (!isValid) return;

    // Build form data for Web3Forms
    const formData = new FormData(contactForm);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        showSuccess();
        contactForm.reset();
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong.");
    }
  });

  function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add("error");
    const errorMsg = document.createElement("small");
    errorMsg.className = "error-message";
    errorMsg.textContent = message;
    errorMsg.style.color = "#ef4444";
    errorMsg.style.display = "block";
    errorMsg.style.marginTop = "5px";
    formGroup.appendChild(errorMsg);
  }

  function showSuccess() {
    const successMsg = document.createElement("div");
    successMsg.className = "success-message";
    successMsg.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <p>Thank you! Your message has been sent successfully.</p>
    `;
    successMsg.style.background = "#10b981";
    successMsg.style.color = "white";
    successMsg.style.padding = "15px";
    successMsg.style.borderRadius = "8px";
    successMsg.style.marginTop = "20px";
    successMsg.style.display = "flex";
    successMsg.style.alignItems = "center";
    successMsg.style.gap = "10px";
    contactForm.appendChild(successMsg);

    setTimeout(() => {
      successMsg.remove();
    }, 5000);
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

// Initialize label positions for filled inputs (in case of browser autocomplete)
initializeFormLabels();

function initializeFormLabels() {
  const formGroups = document.querySelectorAll(".form-group");

  formGroups.forEach((group) => {
    const input = group.querySelector("input, textarea");
    const label = group.querySelector("label");
    if (input && input.value) {
      label.style.top = "-1.2rem";
      label.style.fontSize = "0.8rem";
      label.style.color = "var(--primary-color)";
    }
  });
}

// Animate form elements on load
animateFormElements();

function animateFormElements() {
  const formGroups = document.querySelectorAll(".form-group");

  formGroups.forEach((group, index) => {
    group.style.opacity = "0";
    group.style.transform = "translateY(20px)";
    group.style.transition = "all 0.5s ease";

    setTimeout(() => {
      group.style.opacity = "1";
      group.style.transform = "translateY(0)";
    }, 200 + index * 100);
  });
}
// });
