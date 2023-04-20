const wrapperElement = document.querySelector("#content")
const totalElement = document.querySelector("#total")

if (userHandler.getCrrUser() === null) window.location.href = "./DangNhap.html"

render()
window.addEventListener(cartHandler.changeEvent, render)

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

function render() {
  const books = cartHandler.getCart().map(value => ({ ...value, ...bookHandler.find(value.id) }))

  wrapperElement.innerHTML = books.length > 0 ?
    books.map(book => html(book)).join('\n') :
    `<tr><td colspan="5">Không có sản phẩm nào trong giỏ. <a href="./SanPham.html">Xem thêm</a></td></tr>`

  totalElement.innerHTML = bookHandler.price(books.reduce((prev, curr) => prev + (curr.sale * curr.quantity), 0))
}

function changeQuantityEvent(id, inputElement) {
  cartHandler.setQuantity(id, parseInt(inputElement.value, 10))
}
