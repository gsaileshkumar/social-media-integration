class InstagramStore {
  constructor(token) {
    this._token = token;
  }
  getToken() {
    return this._token;
  }
  setToken(token) {
    this._token = token;
  }
}

module.exports = new InstagramStore("");
