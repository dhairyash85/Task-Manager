const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });
  
    try {
      const verified = jwt.verify(token, 'my-secret');
      console.log("verified", verified)
      res.json({success:true, user:verified})
      next();
    } catch (err) {
        console.log(err)
      res.status(400).json({success:false,  message: 'Invalid Token' });
    }
  };

module.exports=verifyToken