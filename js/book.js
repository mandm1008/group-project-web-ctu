/**
 * Phần xử lý cho book:
 * Từ nạp data đến tạo html cho book
 * YÊU CẦU: Có link file book.css trên head trang
 */
const bookHandler = {
  // Mảng dữ liệu sách được nạp từ file books.json -> Phần nạp ở cuối file
  data: [],

  // Trả về dữ liệu sách dự trên "id": bookHandler.find(<id sách>)
  find(id) {
    return this.data.find((value) => value.id === id)
  },

  price(money = 0) {
    let str = money.toString()
    let result = ''
    for (; str.length > 0; str = str.substring(0, str.length - 3)) {
      result = '.' + str.substring(str.length - 3) + result
    }

    return result.substring(1) + "đ"
  },

  html(bookData) {
    return `
      <div class="book">
        <img src="${bookData.image}"
          alt="${bookData.name}">
        <h4>${bookData.name}</h4>
        <span class="book__price-sale">${this.price(bookData.sale)}</span>
        <span class="book__price">${this.price(bookData.price)}</span>
        <button class="book__add-cart" onClick="cartHandler.addItem(${bookData.id})">
          <i class="fa-solid fa-bag-shopping"></i>
          Thêm vào giỏ
        </button>
      </div>
    `
  },

  getListNew(length = this.data.length) {
    const result = Array.from(this.data)

    for (let i = 0; i < result.length - 1; i++) {
      for (let j = i + 1; j < result.length; j++) {
        if (result[i].time < result[j].time) {
          const t = result[i]
          result[i] = result[j]
          result[j] = t
        }
      }
    }

    return result.slice(0, length)
  },

  getListSale(length = this.data.length) {
    const result = Array.from(this.data)

    for (let i = 0; i < result.length - 1; i++) {
      for (let j = i + 1; j < result.length; j++) {
        if (!result[i].sale || (result[i].sale > result[j].sale)) {
          const t = result[i]
          result[i] = result[j]
          result[j] = t
        }
      }
    }

    return result.slice(0, length)
  },

  /*
    ** type: new, sale
    ** options: { q?: string, length?: number }
  */
  render(type = undefined, { q, length } = { length: this.data.length }) {
    switch (type) {
      case "new":
        return this.getListNew(length).reduce((prev, curr) => prev + '\n' + this.html(curr), '')

      case "sale":
        return this.getListSale(length).reduce((prev, curr) => prev + '\n' + this.html(curr), '')

      default:
        return Array.from(this.data).slice(0, length).reduce((prev, curr) => prev + '\n' + this.html(curr), '')
    }
  },

  /**
   * Sử dụng khi muốn tạo html sau khi load trang. Đối số:
   * 1. Chuỗi selector css của phần tử
   * 2, 3. như 1, 2 của render phía trên
   */
  append(queryString, type, options) {
    const element = document.querySelector(queryString)

    if (element) {
      element.innerHTML = this.render(type, options)
    } else {
      console.error("Element not found!")
    }
  },

  /**
   * Sử dụng khi muốn tạo html ngay lần load trang đầu
   */
  appendFirst(...rest) {
    const handler = (() => {
      this.append(...rest)

      window.removeEventListener("finish-load-books", handler)
    }).bind(this)

    window.addEventListener("finish-load-books", handler)
  }
}

/**
 * Nạp dữ liệu từ file books.json
 */
fetch("./js/books.json")
  .then((value) => value.json())
  .then((value) => {
    bookHandler.data = value
    window.dispatchEvent(new Event("finish-load-books"))
  })
