const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
dotenv.config({ path: ".env" });
const { connectDB } = require("./Database/connection");
const PORT = process.env.PORT || 8080;

//const socketIO = require("socket.io");

// app.use(
//   cors({
//     //origin:"*",
//     origin:"https://bartaloy24.vercel.app/",
//     //origin: "http://localhost:3000",
//     methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
//     credentials: true,
//   })
// );
app.use(cors())
app.use(bodyParser.json());

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

allowCors()



app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 7 days
  })
);

connectDB();
//insertData()
app.use("/", require("./Router/router"));
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/test",(req,res)=>{
  res.send("Hello server bartaloy24")
})

// const io = socketIO(server, {
//   cors: {
//     origin:"https://bartaloy24.vercel.app",
//     //origin: "http://localhost:3000",
//     method: ["GET", "POST"],
//     credentials: true,
//   },
// });

// io.on("connection", async (socket) => {
//   socket.on("liveUpdate", async (data) => {
//     console.log("Live News Received");
//     io.emit("liveNewsUpdate", data);
//   });
// });
