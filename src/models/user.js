const mongoose = require('mongoose');
require('../mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        required: true,
    },
    email:{
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email');
            }
        },
        required: true,
        // validate:{
        //     validator: async function(email){
        //         const user = await User.findOne({email});
        //         if(user){
        //             if(this.user === user.id) return true;
        //             return false;
        //         }
        //         return true;
        //     },
        //     message: props => 'This email is already in use'
        // },
        unique: true,
    },
    password:{
        type:String,
        validate(value){
            if(value.length < 6){
                throw new Error('Password cant be less than 6 characters');
            }
            if(value.includes('password')){
                throw new Error('Password cant contain password')
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('Age cant be negative')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required: true
        }
    }],
}, {
    timestamps: true
})

userSchema.methods.generateAuthtoken = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id.toString()}, 'catsanddogsmynewproject');
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.pre('save', async function(next) {
    const user = this;
    console.log('just before saving')
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

const User = mongoose.model('Users', userSchema);

module.exports = User;