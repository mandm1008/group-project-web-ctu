/**
 * typeof user {
 *   name: string,
 *   email: string,
 *   password: string,
 *   cart: CartItem[]
 * }
 */

const userHandler = {
  listUser: "list-user",
  currUser: "current-user",
  changeUser: "change-user",

  getListUsers() {
    const str = localStorage.getItem(this.listUser)

    if (str === null) {
      return []
    } else {
      return JSON.parse(str)
    }
  },

  setListUser(list) {
    localStorage.setItem(this.listUser, JSON.stringify(list))
  },

  getNextID() {
    const list = this.getListUsers()

    if (list.length === 0) {
      return 0;
    }

    return list[list.length - 1].id + 1
  },

  addUser(user) {
    const oldList = this.getListUsers()

    if (oldList.findIndex((value) => value.email === user.email) !== -1) {
      return false
    }

    oldList.push({
      ...user,
      id: this.getNextID()
    })

    this.setListUser(oldList)

    return true
  },

  getCrrUser() {
    const str = localStorage.getItem(this.currUser)

    if (str !== null) {
      return JSON.parse(str)
    }

    return null
  },

  register(name, email, password, realName, phone, birthDay, locate) {
    if (this.addUser({ name, email, password, realName, phone, birthDay, locate })) {
      return true
    } else {
      console.error("Email đã đăng ký!!!");
      return false
    }
  },

  login(email, password) {
    const list = this.getListUsers()
    const userLogin = list.find((value) => value.email === email) ||
      list.find((value) => value.name === email)

    if (userLogin) {
      if (userLogin.password === password) {
        localStorage.setItem(this.currUser, JSON.stringify(userLogin))

        window.dispatchEvent(new Event(this.changeUser))
      } else {
        return "Mật khẩu không đúng!!!"
      }
    } else {
      return "Người dùng chưa đăng ký!!!"
    }
  },

  logout() {
    localStorage.removeItem(this.currUser)

    window.dispatchEvent(new Event(this.changeUser))
  },

  setCart(id, cartItems) {
    const list = this.getListUsers()
    const index = list.findIndex((value) => value.id === id)

    list[index].cart = cartItems

    this.setListUser(list)

    localStorage.setItem(this.currUser, JSON.stringify(list[index]))
  }
}
