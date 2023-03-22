"use strict";

const headerHandler = {
  searchInputElement: document.querySelector(".header__search-box input"),
  searchIconElement: document.querySelector(".header__search-icon"),
  cartElement: document.querySelector(".header__cart"),

  search() {
    if (this.searchInputElement.value) location.assign(`${location.origin}/search?q=${encodeURIComponent(this.searchInputElement.value)}`)
  },
  init() {
    this.searchInputElement.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        this.search()
      }
    })

    this.searchIconElement.addEventListener("click", () => this.search())

    this.cartElement.addEventListener("click", (e) => {
      e.stopPropagation()
      if (!this.cartElement.classList.contains("visible-tippy")) {
        this.cartElement.classList.add("visible-tippy")

        const setEvents = (function () {
          this.cartElement.classList.remove("visible-tippy")

          window.removeEventListener("click", setEvents)
        }).bind(this)

        window.addEventListener("click", setEvents)
      } else {
        this.cartElement.classList.remove("visible-tippy")
      }
    })
  }
}

headerHandler.init()