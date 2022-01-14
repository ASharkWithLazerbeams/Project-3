const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = { 
    async store(req, res){

        try { 
            const {email, password} = req.body;

            if(!email || !password){
                return res.status(200).json({ message: " Required field Missing!"})
            }


            const user = await User.findOnce({email});
            if(!user){
                return res.status(200).json({message: "User Not Found! Do you want to Register?"})
            }

            if(user && await bcrypt.compare(password.user.password)){
                const userResponse = {
                    _id:user._id,
                    email: user.email,
                    firstName: user.firstName, 
                    lastName: user.lastName
                }
            return res.json(userResponse)
        }else{
            return res.status(200).json({ message: "Email or password does not match!" })
        }

        }catch (error) {
            throw Error(`Error while Authenticating a User ${error}`)

        }
    }
}