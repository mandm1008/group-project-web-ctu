/**
 * Phần xử lý cho đầu trang và chân trang
 */
const headerHandler = {
  /**
   * Xử lý khung tìm kiếm
   */
  search: {
    inputElement: () => document.querySelector(".header__search-box input"),
    iconElement: () => document.querySelector(".header__search-icon"),

    getQuery() {
      return location.search.substring(1).split("&")
        .map(item => ({
          [decodeURIComponent(item.substring(0, item.indexOf("=")))]:
            decodeURIComponent(item.substring(item.indexOf("=") + 1))
        }))
        .reduce((prev, curr) => ({ ...prev, ...curr }), {})
    },

    search() {
      if (this.inputElement().value) window.location.href = `./TimKiem.html?q=${encodeURIComponent(this.inputElement().value)}`
    },

    init() {
      this.inputElement().addEventListener("keyup", (e) => {
        if (e.keyCode === 13) {
          this.search()
        }
      })

      this.iconElement().addEventListener("click", () => this.search())
    }
  },

  /**
   * Xủ lý tạo html cho giỏ hàng tại đầu trang
   */
  cart: {
    cartElement: () => document.querySelector(".header__cart"),
    wrapperElement: () => document.querySelector("#cart-wrapper"),

    html(itemData) {
      return `
        <div class="header__cart-item">
          <img src="${itemData.image}" alt="${itemData.name}" />
          <div class="header__cart-content">
            <h4>${itemData.name}</h4>

            <p>SL: ${itemData.quantity}</p>
          </div>
          <span onclick="cartHandler.removeItem(${itemData.id}); headerHandler.cart.render()">
            <i class="fa-solid fa-xmark"></i>
          </span>
        </div>
      `
    },

    render() {
      const user = userHandler.getCrrUser()
      let data = cartHandler.getCart()

      if (user === null) {
        this.wrapperElement().innerHTML = 'Vui lòng <a href="./DangNhap.html" style="text-decoration: underline; color: blue;">đăng nhập</a>'
        return
      }

      if (data.length === 0) {
        this.wrapperElement().innerHTML = "Không có sản phẩm nào trong giỏ"
        return
      }

      data = data.map((value) => ({
        ...value,
        ...bookHandler.find(value.id)
      }))

      this.wrapperElement().innerHTML = data.map((item) => this.html(item)).join("")
    },

    renderQuantity() {
      const spanElement = this.cartElement().querySelector("span")
      spanElement.innerText = `${cartHandler.getCart().length} SẢN PHẨM`
    },

    init() {
      this.cartElement().addEventListener("click", (e) => {
        e.stopPropagation()
        if (!this.cartElement().classList.contains("visible-tippy")) {
          this.render()
          this.cartElement().classList.add("visible-tippy")

          const setEvents = (function () {
            this.cartElement().classList.remove("visible-tippy")

            window.removeEventListener("click", setEvents)
          }).bind(this)

          window.addEventListener("click", setEvents)
        } else {
          this.cartElement().classList.remove("visible-tippy")
        }
      })

      this.wrapperElement().addEventListener("click", (e) => e.stopPropagation())

      window.addEventListener(cartHandler.changeEvent, this.renderQuantity.bind(this))
      window.addEventListener(userHandler.changeUser, this.renderQuantity.bind(this))
      this.renderQuantity()
    }
  },

  user: {
    headerTopElement: () => document.querySelector(".header__top"),

    html(user) {
      if (user === null) {
        return `
          <span>
            <a href="./DangNhap.html"><i class="fa-solid fa-lock"></i>Đăng nhập</a>
          </span>
          <span>
            <a href="./DangKy.html"><i class="fa-solid fa-right-to-bracket"></i>Đăng ký</a>
          </span>
          <span>
            <a href="./GioHang.html"><i class="fa-solid fa-square-check"></i>Thanh toán</a>
          </span>
        `
      } else {
        return `
          <span class="header__user">
            <i class="fa-solid fa-lock"></i>${user.name}

            <ul class="header__top-user">
              <li><a href="./GioHang.html"><i class="fa-solid fa-bag-shopping"></i>Giỏ hàng</a></li>
              <li onclick="userHandler.logout()"><i class="fa-solid fa-arrow-right-from-bracket"></i>Đăng xuất</li>
            </ul>
          </span>
          <span>
            <a href="./GioHang.html"><i class="fa-solid fa-square-check"></i>Thanh toán</a>
          </span>
        `
      }
    },

    render() {
      const user = userHandler.getCrrUser()

      this.headerTopElement().innerHTML = this.html(user)
    },

    init() {
      this.render()

      window.addEventListener(userHandler.changeUser, this.render.bind(this))
    }
  },

  init() {
    this.user.init()
    this.search.init()
    this.cart.init()
  }
}

headerHandler.init()