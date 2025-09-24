document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle")
  const mainNav = document.querySelector(".main-nav")
  const body = document.body

  const menuOverlay = document.createElement("div")
  menuOverlay.classList.add("menu-overlay")
  body.appendChild(menuOverlay)

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      this.classList.toggle("active")
      mainNav.classList.toggle("active")
      menuOverlay.classList.toggle("active")
      body.classList.toggle("no-scroll")
    })
  }

  menuOverlay.addEventListener("click", () => {
    if (navToggle) {
      navToggle.classList.remove("active")
      mainNav.classList.remove("active")
      menuOverlay.classList.remove("active")
      body.classList.remove("no-scroll")
    }
  })

  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navToggle) {
        navToggle.classList.remove("active")
        mainNav.classList.remove("active")
        menuOverlay.classList.remove("active")
        body.classList.remove("no-scroll")
      }
    })
  })

  const feedbackForm = document.getElementById("feedbackForm")
  const ratingInputs = document.querySelectorAll('input[name="rating"]')
  const ratingText = document.querySelector(".rating-text")

  ratingInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const ratingValue = this.value
      const ratingTexts = {
        1: "Poor",
        2: "Fair",
        3: "Good",
        4: "Very Good",
        5: "Excellent",
      }
      ratingText.textContent = ratingTexts[ratingValue] || "Click to rate"
    })
  })

  feedbackForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const feedbackData = {
      name: formData.get("name"),
      email: formData.get("email"),
      cinema: formData.get("cinema"),
      visitDate: formData.get("visitDate"),
      rating: formData.get("rating"),
      feedbackType: formData.get("feedbackType"),
      message: formData.get("message"),
      subscribe: formData.get("subscribe") === "on",
    }

    if (
      !feedbackData.name ||
      !feedbackData.email ||
      !feedbackData.cinema ||
      !feedbackData.visitDate ||
      !feedbackData.rating ||
      !feedbackData.feedbackType ||
      !feedbackData.message
    ) {
      showErrorMessage("Please fill in all required fields.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(feedbackData.email)) {
      showErrorMessage("Please enter a valid email address.")
      return
    }

    const visitDate = new Date(feedbackData.visitDate)
    const today = new Date()
    if (visitDate > today) {
      showErrorMessage("Visit date cannot be in the future.")
      return
    }

    const submitBtn = this.querySelector(".submit-btn")
    const originalText = submitBtn.textContent
    submitBtn.textContent = "Submitting..."
    submitBtn.disabled = true

    setTimeout(() => {
      submitBtn.textContent = originalText
      submitBtn.disabled = false

      showSuccessModal(feedbackData)

      this.reset()
      ratingText.textContent = "Click to rate"
    }, 2000)
  })

  function showErrorMessage(message) {
    const existingError = document.querySelector(".error-message")
    if (existingError) {
      existingError.remove()
    }

    const errorDiv = document.createElement("div")
    errorDiv.className = "error-message"
    errorDiv.style.cssText = `
            background-color: #ff4444;
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            animation: slideDown 0.3s ease;
        `
    errorDiv.textContent = message

  
    feedbackForm.insertBefore(errorDiv, feedbackForm.firstChild)

    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove()
      }
    }, 5000)
  }

  function showSuccessModal(feedbackData) {
    const modal = document.createElement("div")
    modal.className = "success-modal active"

    modal.innerHTML = `
            <div class="modal-content">
                <div class="success-icon">✓</div>
                <h2>Thank You!</h2>
                <p>Your feedback has been submitted successfully. We appreciate your time and will review your comments carefully.</p>
                <p><strong>Reference ID:</strong> FB${Date.now()}</p>
                <button class="modal-btn" onclick="closeSuccessModal()">Close</button>
            </div>
        `

    document.body.appendChild(modal)
    body.classList.add("no-scroll")

    console.log("Feedback submitted:", feedbackData)
  }

  window.closeSuccessModal = () => {
    const modal = document.querySelector(".success-modal")
    if (modal) {
      modal.classList.remove("active")
      setTimeout(() => {
        document.body.removeChild(modal)
        body.classList.remove("no-scroll")
      }, 300)
    }
  }

  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `
  document.head.appendChild(style)

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const modal = document.querySelector(".success-modal.active")
      if (modal) {
        window.closeSuccessModal()
      }

      if (navToggle && mainNav.classList.contains("active")) {
        navToggle.classList.remove("active")
        mainNav.classList.remove("active")
        menuOverlay.classList.remove("active")
        body.classList.remove("no-scroll")
      }
    }
  })

  document.documentElement.style.scrollBehavior = "smooth"

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
      }
    })
  }, observerOptions)

  const infoCards = document.querySelectorAll(".info-card")
  infoCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(card)
  })

  const visitDateInput = document.getElementById("visitDate")
  const today = new Date().toISOString().split("T")[0]
  visitDateInput.max = today
})
