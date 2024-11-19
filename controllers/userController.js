const usermodel = require('../models/usermodel')
const bcrypt = require("bcrypt")
const customError = require('../customError')


const createAcount = async (req, res, next) => {
    console.log(req.body)
    const {
        firstname,
        lastname,
        username,
        password,
        email,
        phonenumber,
        address,
        isAdmin
    } = req.body
    try {
        const user = await usermodel.findOne({
            email
        })
        if (user)
            return next(customError({
                statusCode: 422,
                message: "email is exist enter another email"
            }))

        const newUser = await usermodel.create({
            firstname,
            lastname,
            username,
            password,
            email,
            phonenumber,
            address,
            isAdmin
        })
        res.status(201).send(newUser)
      
  } catch (error) {
      next(customError({
          statusCode: 500,
          message: 'an error occure during signup'
      }))
  }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await usermodel.findOne({ email });
      console.log(user);
      if (!user)
        return next(customError({
          statusCode: 401,
          message: 'Invalid email or password.',
        }));
  
    const token = await user.generateToken();
  
       console.log(password);
       console.log(user.password);
  
       const bc = await bcrypt.compare(password, user.password);
  console.log(bc);
      if (!bc) 
  
        return next(customError({
          statusCode: 401,
          message: 'invalid.',
        }));
        res.send({token});
     
    } catch (error) {
      console.log(error);
      res.status(500).send(customError({
        statusCode: 500,
        message: 'An error occurred during login.',
        
      }));
    }
  };


const updateUser = (req, res) => {
  usermodel.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(user);
    }
  });
};






module.exports= {
    createAcount,
    login,
    updateUser
}