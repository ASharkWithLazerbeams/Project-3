const bcrypt = require('bcrypt');
const User = require("../models/User");

module.exports = {
  async creatUser (req, res) {
    try {
      const { email, firstName, lastName, password } = req.body
      const exsistentUser = await User.findOne({ email })

      if(!exsistentUser) {
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
          email,
          firstName,
          lastName,
          password: hashPassword,
        })
        return res.json(user)
      }
      res.status(400).json({
        message: 'email already exists! Do you want to login instead?'
      })
    } catch (err) {
      throw Error(`Error while registering new user : ${err}`)
    }
  },

  async getUserById(req, res) {
    const { userId } = req.params
    try {
      const user = await User.findById(userId);
      return res.json(user)
    } catch (error) {
      return res.status(400).json({
        message: 'User ID does not exist, do you want to register instead?'
      })
    }
  }
}
