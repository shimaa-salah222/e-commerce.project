const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const __ = require('lodash');
const jwt = require('jsonwebtoken')
const util = require('util')
const asyncsign = util.promisify(jwt.sign)
require('dotenv').config();

const secretkey = process.env.secretkey;
const saltround = process.env.saltround;



const userSchema = new mongoose.Schema({
  
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    address: { type: String },
    isAdmin: { type: Boolean, default: false }
   
},
{
    toJSON: {
        transform: (doc, ret) => {
          const { __v, password, isAdmin, ...rest } = doc.toObject();
          return rest;
        }
      }
}
);


userSchema.pre('save', async function() {
    if (this.isModified('password'));
    const hashedPassword = await bcrypt.hash(this.password, saltround);
    console.log('hashedPassword:', hashedPassword);

    this.password = hashedPassword;
});

userSchema.methods.generateToken = function(){
    const token = asyncsign({
        email:this.email,
        isAdmin:this.isAdmin,

    },secretkey)
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;