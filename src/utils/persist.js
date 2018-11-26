const persist = {
  auth: 'authority',
  user: 'user',
  storeToken: function(token) {
    if(token)
      window.localStorage[this.auth] = 'Bearer '+token
    else
      window.localStorage.removeItem(this.auth)
  },
  storeUser: function(user) {
    if(user)
      window.localStorage[this.user] = user
    else
      window.localStorage.removeItem(this.user)
  },
  getToken: function() {
    return window.localStorage[this.auth]
  },
  getUser: function() {
    return window.localStorage[this.user]
  },
  logout: function() {
    window.localStorage.removeItem(this.auth)
    window.localStorage.removeItem(this.user)
  }
}

export default persist;

