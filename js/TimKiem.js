const searchHandler = {
  init() {
    const q = headerHandler.search.getQuery().q

    headerHandler.search.inputElement().value = q
    bookHandler.append("#search-book", undefined, { q: headerHandler.search.getQuery().q })
  }
}

searchHandler.init()
