const wrapperElement = document.querySelector("#content")
const totalElement = document.querySelector("#total")
const wapperBooksElement = document.querySelector("#content-books")

if (userHandler.getCrrUser() === null) window.location.href = "./DangNhap.html"

render()
window.addEventListener(cartHandler.changeEvent, render)

function buyAll() {
  const cart = cartHandler.getCart()

  if (cart.length > 0) {
    userHandler.buyBooks(cart.map(item => item.id))
    cartHandler.clearCart()
  }
}

function html(book) {
  return `
    <tr>
      <td>${book.id}</td>
      <td class="name">${book.name}</td>
      <td class="price">
        <span class="book__price-sale">${bookHandler.price(book.sale)}</span>
        <span class="book__price">${bookHandler.price(book.price)}</span>
      </td>
      <td>
        <input
          type="number"
          min="1"
          value="${book.quantity}"
          onchange="changeQuantityEvent(${book.id}, this)"
        >
      </td>
      <td class="price">${bookHandler.price(book.sale * book.quantity)}</td>
      <td>
        <button onclick="cartHandler.removeItem(${book.id})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `
}

function buyHTML(book) {
  return `
    <tr>
      <td>${book.id}</td>
      <td class="name">${book.name}</td>
      <td>
        <button onclick="cartHandler.removeItem(${book.id})">
          <a href="./DocSach.html?id=${book.id}"><i class="fa-brands fa-readme"></i></a>
        </button>
      </td>
    </tr>
  `
}

function render() {
  const books = cartHandler.getCart().map(value => ({ ...value, ...bookHandler.find(value.id) }))
  const buyBooks = userHandler.getBooks().map(id => bookHandler.find(id))
  console.log(books, buyBooks)

  wrapperElement.innerHTML = books.length > 0 ?
    books.map(book => html(book)).join('\n') :
    `<tr><td colspan="5">Không có sản phẩm nào trong giỏ. <a href="./SanPham.html">Xem thêm</a></td></tr>`

  wapperBooksElement.innerHTML = buyBooks.length > 0 ?
    buyBooks.map(book => buyHTML(book)).join('\n') :
    `<tr><td colspan="3">Không có sản phẩm nào đã mua. <a href="./SanPham.html">Mua thêm</a></td></tr>`

  totalElement.innerHTML = bookHandler.price(books.reduce((prev, curr) => prev + (curr.sale * curr.quantity), 0))
}

function changeQuantityEvent(id, inputElement) {
  cartHandler.setQuantity(id, parseInt(inputElement.value, 10))
}
