const express = require("express");
const app = express();
const cors = require("cors");
const { getConnection } = require("./connection");
const bodyParser = require("body-parser");
const { loginHandler } = require('./handler')
const cookieParser = require('cookie-parser')
const { cookieWithJwt } = require('./middleware')
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3003",
    credentials: true

  })
);

app.use(cookieParser())

//crud

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get("/test", function (req, res) {
  res.send("testing application");
});

app.post("/api/login", loginHandler);

app.get("/api/usersList", cookieWithJwt ,async function (req, res) {
  const getConn = await getConnection();
  console.log(getConn, "getconnection");
  const result = await getConn.query("select * from Users");
  res.send(result.recordsets[0]);
});

app.get("/api/usersList/:userId",cookieWithJwt, async function (req, res) {
  try {
    const { userId } = req.params;
    const getConn = await getConnection();
    const result = await getConn.query(
      `select * from users where userId = ${userId}`
    );
    res.send(result.recordsets[0]);
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/api/deleteUser/:userId", cookieWithJwt ,async function (req, res) {
  try {
    const { userId } = req.params;
    const getConn = await getConnection();
    const result = await getConn.query(
      `delete from users where userId = ${userId}`
    );
    res.send("success");
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/api/updateUser", cookieWithJwt ,async function (req, res) {
  try {
    const { userId, animalName, fullName } = req.body;
  
    const getConn = await getConnection();
    const result = await getConn.query(
      `UPDATE users
      SET animalName = '${animalName}', animalDescription= '${animalDescription}'
      WHERE animalId = ${animalId};`
    );

    res.send("success");
  } catch (err) {
    console.log(err.message);
    res.send("");
  }
});

app.post("/api/createUser",cookieWithJwt, async function (req, res) {
  try {
    const { animalName, animalDescription } = req.body;

    const getConn = await getConnection();
    const result = await getConn.query(
      `INSERT INTO Users
        VALUES ('${animalName}','${animalDescription}' )`
    );

    console.log("success 1");
    res.send(result.recordsets[0]);
  } catch (err) {
    console.log(err.message);
    res.send("");
  }
});

app.listen(4000, () => {
  console.log(`node is running on ${4000}`);
});
