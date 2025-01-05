//http://26.211.157.182



//install: node js
//install web server package: express >npm install express
// var express = require("express");
// var server = express();
// var bodyParser = require("body-parser");


// //web root
// server.use(express.static(__dirname+"/Web"));
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded());


// //DB
// var DB = require("nedb-promises");
// const path = require("path");
// var ProfolioDB = DB.create(path.join(__dirname, "profolio.db"));

// // 確保資料庫建立成功
// console.log("資料庫路徑: ", path.join(__dirname, "profolio.db"));




// server.listen(80, ()=>{
//     console.log(":DDDDD");
// })




var express = require("express");
var server = express();
var bodyParser = require("body-parser");


// web root
server.use(express.static(__dirname + "/Web"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// DB
var DB = require("nedb-promises");
const path = require("path");
var ProfolioDB = DB.create(path.join(__dirname, "profolio.db"));

// 確保資料庫建立成功
console.log("資料庫路徑: ", path.join(__dirname, "profolio.db"));



// 處理留言的 API
server.post("/api/comments", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    // 將留言存入資料庫
    const comment = await ProfolioDB.insert({ name, email, message, createdAt: new Date() });
    console.log("New comment saved:", comment);
    res.json({ success: true, message: "Comment saved successfully!" });
  } catch (error) {
    console.error("Failed to save comment:", error);
    res.status(500).json({ error: "Failed to save comment." });
  }
});



server.listen(80, () => {
  console.log(":DDDDD");
});
