const bookHandler = {
  data: [
    {
      id: 1,
      name: "Bảo vệ trẻ trước chấn thương tâm lý",
      price: 210000,
      sale: 178500,
      time: 1679895338692,
      image: "https://newshop.vn/public/uploads/products/51024/sach-bao-ve-tre-truoc-chan-thuong-tam-ly_L.jpg",
    },
    {
      id: 2,
      name: "Bảo vệ trẻ trước chấn thương tâm lý",
      price: 210000,
      sale: 178500,
      time: 1679895338692,
      image: "https://newshop.vn/public/uploads/products/51024/sach-bao-ve-tre-truoc-chan-thuong-tam-ly_L.jpg",
    },
    {
      id: 3,
      name: "Bảo vệ trẻ trước chấn thương tâm lý",
      price: 210000,
      sale: 178500,
      time: 1679895338692,
      image: "https://newshop.vn/public/uploads/products/51024/sach-bao-ve-tre-truoc-chan-thuong-tam-ly_L.jpg",
    },
    {
      id: 4,
      name: "Bảo vệ trẻ trước chấn thương tâm lý",
      price: 210000,
      sale: 178500,
      time: 1679895338692,
      image: "https://newshop.vn/public/uploads/products/51024/sach-bao-ve-tre-truoc-chan-thuong-tam-ly_L.jpg",
    },
    {
      id: 5,
      name: "Bảo vệ trẻ trước chấn thương tâm lý",
      price: 210000,
      sale: 178500,
      time: 1679895338692,
      image: "https://newshop.vn/public/uploads/products/51024/sach-bao-ve-tre-truoc-chan-thuong-tam-ly_L.jpg",
    },
    {
      id: 6,
      name: "Bảo vệ trẻ trước chấn thương tâm lý",
      price: 210000,
      sale: 178500,
      time: 1679895338692,
      image: "https://newshop.vn/public/uploads/products/51024/sach-bao-ve-tre-truoc-chan-thuong-tam-ly_L.jpg",
    },
    {
      id: 7,
      name: "Bảo vệ trẻ trước chấn thương tâm lý",
      price: 210000,
      sale: 178500,
      time: 1679895338692,
      image: "https://newshop.vn/public/uploads/products/51024/sach-bao-ve-tre-truoc-chan-thuong-tam-ly_L.jpg",
    },
    {
      id: 8,
      name: "Bảo vệ trẻ trước chấn thương tâm lý",
      price: 210000,
      sale: 178500,
      time: 1679895338692,
      image: "https://newshop.vn/public/uploads/products/51024/sach-bao-ve-tre-truoc-chan-thuong-tam-ly_L.jpg",
    },
    {
      id: 9,
      name: "Bảo vệ trẻ trước chấn thương tâm lý",
      price: 210000,
      sale: 178500,
      time: 1679895338692,
      image: "https://newshop.vn/public/uploads/products/51024/sach-bao-ve-tre-truoc-chan-thuong-tam-ly_L.jpg",
    },
    {
      id: 10,
      name: "Bảo vệ trẻ trước chấn thương tâm lý",
      price: 210000,
      sale: 178500,
      time: 1679895338692,
      image: "https://newshop.vn/public/uploads/products/51024/sach-bao-ve-tre-truoc-chan-thuong-tam-ly_L.jpg",
    },
  ],

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

  append(queryString, type, options) {
    const element = document.querySelector(queryString)

    if (element) {
      element.innerHTML = this.render(type, options)
    } else {
      console.error("Element not found!")
    }
  }
}
