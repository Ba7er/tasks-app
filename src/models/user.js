// below we are using mongoose middelware to customize the save method to be able to hash the password 

const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        trim: true
    } ,
    email :{
        type: String,
        required: true,
        trim: true,
        lowercase : true,   
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is Invalid')
            }
        }
    },  
    age:{
        type: Number,
        default : 0,
        validate (value){
            if(value < 0){
                throw new Error('Age must be postive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true , 
        minlength : 7,
        validate(value){
            if (value.toLowerCase().includes('password')){
                throw new Error(`Password can't contain 'password'`)
            }
        }
    },
    tokens: [{
        token:{
            type : String,
            required: true
        }
    }]
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField : 'owner'
})

userSchema.methods.generateAuthtoken = async function(){
    const user = this 
    const token = jwt.sign({_id: user._id.toString()},'abdelellahdandashi')
    // to add many tokens 
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token

}
// to return specific details when sending resposnes back to clients , like we dont want the password to be sent back in the response 
userSchema.methods.toJSON =  function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})
    console.log('this is the user from login ',user)

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

// hash the plain password before saving 
userSchema.pre('save',async function(next){
    const user = this 
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()

})

//delete user's task when user is removed 
userSchema.pre('remove', async function(next){
    const user = this 
    await Task.deleteMany({owner : user._id})
    next()
} )

const User =  mongoose.model('User',userSchema)

module.exports = User