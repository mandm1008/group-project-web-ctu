/**
 * Phần xử lý cho giỏ hàng
 * 
 * typeof cartItem {
 *  id: string,
 *  quantity: number
 * }
 */
const cartHandler = {
  key: 'cart-items',
  changeEvent: "change-cart",

  setCart(dataItems) {
    const user = userHandler.getCrrUser()

    if (user === null) {
      window.location.href = "./DangNhap.html"
      return false
    }

    userHandler.setCart(user.id, dataItems)
    window.dispatchEvent(new Event(this.changeEvent))
  },

  getCart() {
    const user = userHandler.getCrrUser()

    if (user !== null) {
      return user.cart || []
    } else {
      return []
    }
  },

  // item: { id, quantity }
  /**
   * Thêm 1 sản phẩm vào giỏ
   */
  addItem(id) {
    const oldData = this.getCart()
    const index = oldData.findIndex((item) => item.id === id)

    if (index === -1) {
      oldData.push({
        id,
        quantity: 1
      })
    } else {
      oldData[index].quantity++
    }

    this.setCart(oldData)
  },

  /**
   * Xoá 1 sp ra khỏi giỏ
   */
  removeItem(id) {
    const oldData = this.getCart()
    const index = oldData.findIndex((item) => item.id === id)

    if (index === -1) {
      return false
    } else {
      oldData.splice(index, 1)
      this.setCart(oldData)
      return true
    }
  },

  /**
   * Chỉnh lại số lượng của 1 sản phẩm trong giỏ
   */
  setQuantity(id, number) {
    const oldData = this.getCart()
    const index = oldData.findIndex((item) => item.id === id)

    oldData[index].quantity += number
    if (oldData[index].quantity < 1) {
      oldData[index].quantity = 1
    }

    this.setCart(oldData)
  }
}