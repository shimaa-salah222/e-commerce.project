const customError = require('./customError')
const express = require('express');

const app = express();
const dotenv = require('dotenv');

dotenv.config();

const secretkey = process.env.secretkey

const authorized = async (req, res, next) => {
  const { authorization: token } = req.headers.authorization ?? {};
  if (!token) {
    next(customError({ statusCode: 401, message: "You are not authorized" }));
  } else {
    try {
      const decoded = await asyncVerify(token, secretKey);
      if (decoded.id !== req.params.id) {
        next(customError({ statusCode: 401, message: "You are not authorized" }));
      }
    } catch (error) {
      next(customError({ statusCode: 401, message: "You are not authorized" }));
    }
    next();
  }
};

const adminAuthorized = async (req, res, next) => {
    const { authorization: token } = req.headers.authorization;
    try {
      const decoded = await jwt.verify(token, secretkey);
      if (!decoded.isAdmin) {
        next(customError({
          statusCode: 403,
          message: 'You are not authorized to access this resource.'
        }));
      }
      next();
    } catch (error) {
      next(customError({
        statusCode: 401,
        message: 'You are not authorized to access this resource.'
      }));
    }
  };
module.exports ={ authorized,
              adminAuthorized
};