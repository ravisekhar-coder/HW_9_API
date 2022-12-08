const { getConnection } = require("./connection");
const jwt = require('jsonwebtoken');

const secretKey = 'asjdgfjhdgjkadgkdgjdf';

 const loginHandler =  async (req, res)=> {
    try {
      const { email, password } = req.body;
      if(email && password){

        const getConn = await getConnection();
        const result = await getConn.query(
          `select top 1 * from Login where email = '${email}' and password = '${password}'`
        );
    console.log(email,password,result, `select top 1 * from Login where email = '${email}' and password = '${password}'`)
const user = result.recordsets[0][0];


       const jwtToken=  jwt.sign(user, secretKey, { expiresIn: '1h' });

        res.cookie('token', jwtToken, { maxAge: 900000, httpOnly: true , Path:'/'});
        res.status(200).send({ user, token: jwtToken});

      }else{
        res.status(500).json({error:'ot email and password'});
      }
  

    } catch (err) {
      console.log(err.message);
      res.send("");
    }
  }

  module.exports ={
    loginHandler
  }