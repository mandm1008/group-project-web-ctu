// search events
const searchInputElement = document.querySelector(".header__search-box input")
const linkSearchElement = document.querySelector(".header__search-icon a")

searchInputElement.addEventListener("input", (e) => {
  linkSearchElement.href = e.target.value.length > 0 ? `/search?q=${encodeURIComponent(e.target.value)}` : '/'
})

linkSearchElement.addEventListener("click", (e) => {
  if (!e.target.href) e.preventDefault()
})

// visible cart events
const cartElement = document.querySelector(".header__cart")

cartElement.addEventListener("click", (e) => {
  e.stopPropagation()
  if (!cartElement.classList.contains("visible-tippy")) {
    cartElement.classList.add("visible-tippy")

    function setEvents() {
      cartElement.classList.remove("visible-tippy")

      window.removeEventListener("click", setEvents)
    }
    window.addEventListener("click", setEvents)
  } else {
    cartElement.classList.remove("visible-tippy")
  }
})
