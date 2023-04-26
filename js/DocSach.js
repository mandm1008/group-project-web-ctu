const query = headerHandler.search.getQuery()
console.log(query)

if (checkAccess()) {
  const bookData = bookHandler.find(parseInt(query.id, 10))

  renderBook(bookData)
}

function checkAccess() {
  if (userHandler.getCrrUser() === null) {
    window.location.href = './DangNhap.html'
    return false
  }

  if (!query.id) {
    window.location.href = "./index.html"
    return false
  }

  if (!userHandler.hasBook(parseInt(query.id, 10))) {
    window.location.href = "./index.html"
    return false
  }

  return true
}

function renderBook(bookData, selector = ".main") {
  const html = `
    <h1>${bookData.name}</h1>
    <div>
      <h2>I. Tóm tắt</h2>
      <p>Tác giả: ${bookData.author}</p>
      <p>Thể loại: ${bookData.author}</p>
      ${bookData.description.map(value => `
        <p>${value}</p>
      `).join("\n")}
    </div>
    <div>
      <h2>I. Nội dung</h2>
      ${bookData.content.map(value => value.includes('“') ? `
        <p><i>${value}</i></p>
      `: `
        <p>${value}</p>
      `).join("\n")}
    </div>
    <h1>~~ Còn tiếp ~~</h1>
  `

  document.querySelector(selector).innerHTML = html
}