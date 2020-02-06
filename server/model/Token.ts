export default class Token {
  token: string = "";
  constructor(token) {
    this.token = token;
  }
  get() {
    return this.token;
  }
  set(token) {
    this.token = token;
  }
}
