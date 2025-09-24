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

  const searchInput = document.getElementById("locationSearch")
  const searchBtn = document.querySelector(".search-btn")
  const cinemaCards = document.querySelectorAll(".cinema-card")

  function searchCinemas() {
    const searchTerm = searchInput.value.toLowerCase()

    cinemaCards.forEach((card) => {
      const cinemaName = card.querySelector("h3").textContent.toLowerCase()
      const cinemaAddress = card.querySelector(".cinema-address").textContent.toLowerCase()
      const cinemaLocation = card.getAttribute("data-location").toLowerCase()

      if (
        cinemaName.includes(searchTerm) ||
        cinemaAddress.includes(searchTerm) ||
        cinemaLocation.includes(searchTerm)
      ) {
        card.style.display = "block"
        card.style.animation = "fadeIn 0.5s ease"
      } else {
        card.style.display = "none"
      }
    })
  }

  searchBtn.addEventListener("click", searchCinemas)
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      searchCinemas()
    }
  })

  const filterTabs = document.querySelectorAll(".tab-btn")

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
  
      filterTabs.forEach((t) => t.classList.remove("active"))
      
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      cinemaCards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "block"
          card.style.animation = "fadeIn 0.5s ease"
        } else {
          const location = card.getAttribute("data-location")
          if (location === filter) {
            card.style.display = "block"
            card.style.animation = "fadeIn 0.5s ease"
          } else {
            card.style.display = "none"
          }
        }
      })
    })
  })

  const bookBtns = document.querySelectorAll(".action-btn.primary")
  bookBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = this.closest(".cinema-card")
      const cinemaName = card.querySelector("h3").textContent
      window.location.href = "../Now Showing Page/nowShowing.html"
    })
  })

  const directionBtns = document.querySelectorAll(".action-btn.secondary")
  directionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = this.closest(".cinema-card")
      const cinemaAddress = card.querySelector(".cinema-address").textContent
      const encodedAddress = encodeURIComponent(cinemaAddress)
      window.open(`https://maps.google.com?q=${encodedAddress}`, "_blank")
    })
  })

  const style = document.createElement("style")
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `
  document.head.appendChild(style)
})
