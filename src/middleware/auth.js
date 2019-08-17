const jwt = require('jsonwebtoken')
const User = require('../models/user')



const auth = async (req, res, next) =>{
    try{
        // get the token from the http req and remove the 'Bearer' string
        const token = req.header('Authorization').replace('Bearer ', '')
        // validate that token based on the secrete key used in models
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // get the user data from DB based on the user ID extracted from the json token 
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token })

        if(!user){
            throw new Error()
        }
        // pass the user data in the req so it can be used in router handler
        req.token = token
        req.user = user
        // console.log(req.user)
        next()
    }catch(e){
        res.status(401).send({error: 'please authenticate'})
    }
    
}

module.exports = auth