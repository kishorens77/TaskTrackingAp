const registerModel = require('../models/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const health = async (req, res, next) => {
  res.json("OK")
}

const register = async (req, res, next) => {
    try {
        let body = req.body;

        console.log("REGISTER DETAILS => ",body)
        const password = body.password
        const salt = await bcrypt.hash(body.userName,10)
        const hashed_password = await bcrypt.hash(password,salt);
        body.password = hashed_password;

        const registeredUser = new registerModel(body);
        const result = await registeredUser.save();
        res.json(result);

      } catch (err) {
        next(err);
      }
    };

const login  = async (req, res, next) => {
    try {
        const body = req.body;
        const username = body.userName;
        const password = body.password;


        (async () => {
            const user = await registerModel.findOne({ userName: username });
            console.log(user)
          
            if (!user) {
              return res.status(401).json({status: 401, message: 'Invalid username' });
            }
          
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log("entered password = ",password);
            console.log("stored password =",user.password);
          
            if (!isPasswordValid) {
              return res.status(401).json({status: 401, message: 'Incorrect password' });
            }
          
            console.log("is valid??", isPasswordValid);

            let token;
            const key = process.env.TOKEN_KEY;
            token = jwt.sign({user_id: user._id}, key ,{expiresIn:'1h'});

            return res.status(200).json({status: 200, message: 'Correct password and Username',id: user._id, token:token});
          })();
      } catch (err) {
        next(err);
      }
    };

module.exports = {register,login,health};