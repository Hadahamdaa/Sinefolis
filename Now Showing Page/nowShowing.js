document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

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

  const chooseCinemaBtn = document.querySelector(".choose-cinema-btn")
  if (chooseCinemaBtn) {
    chooseCinemaBtn.addEventListener("click", () => {
      window.location.href = "../Cinema Page/cinema.html"
    })
  }

  const searchInput = document.getElementById("searchInput")
  const searchBtn = document.querySelector(".search-btn")
  const movieCards = document.querySelectorAll(".movie-card")

  function searchMovies() {
    const searchTerm = searchInput.value.toLowerCase()
    const currentCategory = document.querySelector(".tab-btn.active").getAttribute("data-filter")

    movieCards.forEach((card) => {
      const movieTitle = card.querySelector("h3").textContent.toLowerCase()
      const movieDescription = card.querySelector("p").textContent.toLowerCase()
      const cardCategory = card.getAttribute("data-category")

      if ((movieTitle.includes(searchTerm) || movieDescription.includes(searchTerm)) && 
          cardCategory === currentCategory) {
        card.style.display = "block"
        setTimeout(() => {
          card.classList.add("visible")
        }, 100)
      } else {
        card.style.display = "none"
        card.classList.remove("visible")
      }
    })
  }

  searchBtn.addEventListener("click", searchMovies)
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      searchMovies()
    }
  })

  const filterTabs = document.querySelectorAll(".tab-btn")
  const allMovieCards = document.querySelectorAll(".movie-card")

  function filterMovies(category) {
    allMovieCards.forEach((card, index) => {
      const cardCategory = card.getAttribute("data-category")
      card.classList.remove("visible")
      
      if (category === cardCategory) {
        card.style.display = "block"
        setTimeout(() => {
          card.classList.add("visible")
        }, index * 100)
      } else {
        setTimeout(() => {
          card.style.display = "none"
        }, 300)
      }
    })
  }

  filterMovies("now-playing")

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      filterTabs.forEach((t) => t.classList.remove("active"))
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")
      filterMovies(filter)

      if (searchInput) {
        searchInput.value = ""
      }
    })
  })

  const style = document.createElement("style")
  style.textContent = `
    .movie-card {
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
  `
  document.head.appendChild(style)

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mainNav && mainNav.classList.contains("active")) {
      if (navToggle) {
        navToggle.classList.remove("active")
        mainNav.classList.remove("active")
        menuOverlay.classList.remove("active")
        body.classList.remove("no-scroll")
      }
    }
  })

  document.documentElement.style.scrollBehavior = "smooth"

  window.scrollTo(0, 0)

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 200)
      }
    })
  }, observerOptions)

  movieCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    cardObserver.observe(card)
  })
})
