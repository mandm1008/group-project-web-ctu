const homeHandler = {
  slider: {
    slideItems: document.querySelectorAll(".slide .slide__item"),
    prevBtn: document.querySelector(".slide .slide__left"),
    nextBtn: document.querySelector(".slide .slide__right"),
    state: 0,
    interval: undefined,

    translate() {
      this.slideItems.forEach(item => {
        item.style.transform = `translateX(-${this.state}00%)`
      })
    },

    setAnimation() {
      clearInterval(this.interval)
      this.interval = setInterval(() => {
        homeHandler.slider.next()
      }, 4000)
    },

    next() {
      this.state++
      if (this.state > this.slideItems.length - 1) {
        this.state = 0
      }

      this.translate()
    },

    prev() {
      this.state--
      if (this.state < 0) {
        this.state = this.slideItems.length - 1
      }

      this.translate()
    },

    init() {
      this.prevBtn.addEventListener("click", () => {
        this.setAnimation()
        homeHandler.slider.prev()
      })
      this.nextBtn.addEventListener("click", () => {
        this.setAnimation()
        homeHandler.slider.next()
      })

      this.setAnimation()
    }
  },

  chooseBooks: {
    type: undefined,
    chooseItems: document.querySelectorAll(".content__choose .content__choose-item"),

    setType(type) {
      if (this.type === type) return

      this.type = type

      this.chooseItems.forEach((item, i) => {
        if (i === this.type) {
          this.chooseItems[i].classList.add("active")
        } else {
          this.chooseItems[i].classList.contains("active") &&
            this.chooseItems[i].classList.remove("active")
        }
      });
      book.append("#choose-books", this.chooseItems[type].getAttribute("data-type"), { length: 4 })
    },

    init() {
      this.chooseItems.forEach((item, i) => {
        item.addEventListener("click", () => {
          homeHandler.chooseBooks.setType(i)
        })
      })
      this.setType(0)
    }
  },

  init() {
    this.slider.init()
    this.chooseBooks.init()
  }
}

homeHandler.init()

book.append("#best-sale", "sale", { length: 1 })
book.append('#sale-books', 'new', { length: 8 })
book.append('#new-books', 'new', { length: 4 })
