const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    var testJWT;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
      let user = await User.findOne({email});

      if (!user) {
        return res.status(400).json({msg: 'Invalid Credentials'});
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({msg: 'Invalid Credentials'});
      }

      
      const header = { "alg": "HS256", "typ": "JWT" }
      const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64')

      const payload = {
        user: {
          name: user.email,
          password: password
        },
      };

      const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
      const crypto = require('crypto')
      const jwtSecret = 'secret'
      const signature = crypto.createHmac('sha256', jwtSecret,{expiresIn: 360000}).update(encodedHeader + '.' + encodedPayload).digest('base64') 

      const jwtManually = `${encodedHeader}.${encodedPayload}.${signature}`

      console.log("Manually Created JWT: ")
      console.log(jwtManually);


      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
           console.log("Login token")
           console.log(token)
           console.log("Token verification")
           jwt.verify(token, 'secret', (err, verifiedJwt) => {
            if(err){
              console.log("Inside Error")
              console.log(err.message)
              //res.send(err.message)
            }else{
              console.log("Inside Verified")
              console.log(verifiedJwt)
              //res.send(verifiedJwt)
            }
          })
           
           console.log("Verify");
           console.log(testJWT);
          res.json({token});
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
