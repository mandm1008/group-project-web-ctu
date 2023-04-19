const searchHandler = {
  getQuery() {
    return location.search.substring(1).split("&")
      .map(item => ({
        [decodeURIComponent(item.substring(0, item.indexOf("=")))]:
          decodeURIComponent(item.substring(item.indexOf("=") + 1))
      }))
      .reduce((prev, curr) => ({ ...prev, ...curr }), {})
  },

  init() {
    const q = this.getQuery().q

    headerHandler.search.inputElement.value = q
    bookHandler.append("#search-book", undefined, { q: this.getQuery().q })
  }
}

searchHandler.init()
