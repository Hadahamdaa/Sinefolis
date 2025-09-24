document.addEventListener("DOMContentLoaded", () => {

  const navToggle = document.getElementById("navToggle")
  const mainNav = document.querySelector(".main-nav")
  const body = document.body

  const menuOverlay = document.createElement("div")
  menuOverlay.classList.add("menu-overlay")
  body.appendChild(menuOverlay)

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active")
      mainNav.classList.toggle("active")
      menuOverlay.classList.toggle("active")
      body.classList.toggle("no-scroll")
    })
  }

  if (menuOverlay) {
    menuOverlay.addEventListener("click", () => {
      if (navToggle) {
        navToggle.classList.remove("active")
        mainNav.classList.remove("active")
        menuOverlay.classList.remove("active")
        body.classList.remove("no-scroll")
      }
    })
  }

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

  const bookNowBtn = document.querySelector(".book-now-btn")
  const useCodeBtns = document.querySelectorAll(".use-code-btn")
  const footerLinks = document.querySelectorAll(".footer-link:not([data-page])")

  bookNowBtn.addEventListener("click", function () {
    this.style.transform = "scale(0.95)"
    setTimeout(() => {
      this.style.transform = "scale(1)"
    }, 150)
  })

  useCodeBtns.forEach((btn, index) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault()
      
      btn.classList.add("clicked")
      
      setTimeout(() => {
        btn.classList.remove("clicked")
      }, 300)

      const originalText = btn.textContent
      btn.textContent = "Redirecting..."
      btn.style.opacity = "0.8"

      setTimeout(() => {
        window.location.href = "../Now Showing Page/nowShowing.html"
      }, 500)
    })

    btn.addEventListener("touchstart", () => {
      btn.style.transform = "scale(0.98)"
    })

    btn.addEventListener("touchend", () => {
      btn.style.transform = "scale(1)"
    })
  })

  footerLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const linkText = this.textContent
      this.style.color = "#F4B942"
      setTimeout(() => {
        this.style.color = "#cccccc"
      }, 200)

      console.log(`Navigating to ${linkText} page`)
      alert(`Navigating to ${linkText} page...`)
    })
  })

  const socialIcons = document.querySelectorAll(".social-icon")
  socialIcons.forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.preventDefault()
      const platform = this.getAttribute("aria-label") || "social media"
      console.log(`Navigating to ${platform}`)
      alert(`Opening ${platform} page...`)
    })
  })

  document.documentElement.style.scrollBehavior = "smooth"

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  const promoCards = document.querySelectorAll(".promo-card")
  promoCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(card)
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const focusedElement = document.activeElement
      if (focusedElement.classList.contains("use-code-btn") || focusedElement.classList.contains("book-now-btn")) {
        e.preventDefault()
        focusedElement.click()
      }
    }

    if (e.key === "Escape" && mainNav.classList.contains("active")) {
      navToggle.classList.remove("active")
      mainNav.classList.remove("active")
      menuOverlay.classList.remove("active")
      body.classList.remove("no-scroll")
    }
  })

  console.log("🎬 Welcome to Sinéfolis! Enjoy our exclusive promotions.")

  const isMobile = window.innerWidth <= 768
  if (isMobile) {
    console.log("Mobile view detected - optimized layout loaded")
  }
})

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Promo code copied to clipboard!")
    })
    .catch((err) => {
      console.error("Failed to copy: ", err)
    })
}

window.addEventListener("load", () => {
  const loadTime = performance.now()
  console.log(`Page loaded in ${Math.round(loadTime)}ms`)
})
