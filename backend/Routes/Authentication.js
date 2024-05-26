const express = require("express");
const router = express.Router();
const Users = require("../Model/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const verifyToken=require('../VerifyToken')
router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      const email = await Users.findOne({ email: req.body.email });
      if (email) {
        res.json({ success: false, err: "Email already in use" });
        return;
      }
      const phone = await Users.findOne({ phone: req.body.phone });
      if (phone) {
        res.json({ success: false, err: "Phone Number already in use" });
        return;
      }
      await Users.create({
        fname: req.body.fname,
        lname: req.body.lname,
        password: secPassword,
        email: req.body.email,
        phone: req.body.phone,
      });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err: err });
    }
  }
);
router.post(
    '/signin',
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    async (req, res) => {
        console.log("Statrting")
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, err: errors.array() });
    }
  
      try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
          return res.status(404).json({ success: false, err: 'User does not exist' });
        }
  
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (passwordMatch) {
          const token = jwt.sign({ user:user }, 'my-secret', { expiresIn: '24h' });
          return res.json({ success: true, token: token });
        } else {
          return res.status(401).json({ success: false, err: 'Password incorrect' });
        }
      } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, err: err });
      }
    }
  );
router.post('/verifyToken', verifyToken, async(req, res)=>{
    try{
        res.json({ success: true, user: req.user });
    }catch(error){
        
    }
})

router.use((err, req, res, next) => {
    if (res.headersSent) {
        console.log(err)
      return next(err);
    }
    console.log(err.message)
    res.status(500).json({ success: false, message: err.message });
  });
  
module.exports = router;
