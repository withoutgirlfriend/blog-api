class User {
  async addUser(req, res) {
    res.send('添加用户');
  }
}

module.exports = new User()
