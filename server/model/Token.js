class Token {
  constructor(token) {
    this._token = token;
  }
  get() {
    return this._token;
  }
  set(token) {
    this._token = token;
  }
}

module.exports = Token;
