//http://26.211.157.182


var express = require("express"); // 引入 Express 套件，幫助建立伺服器
var server = express(); // 建立一個伺服器
var bodyParser = require("body-parser"); // 引入 body-parser，解析傳入的表單資料

// web root: 設定靜態檔案目錄 (Web 資料夾中的 HTML、CSS、JS 可直接使用)
server.use(express.static(__dirname + "/Web"));
server.use(bodyParser.json()); // 解析 JSON 格式的請求
server.use(bodyParser.urlencoded({ extended: true })); // 解析 URL 編碼的表單資料





/*---------------------About_Contact----------------------*/

//1.建立資料庫 → 2.客戶端（HTML 表單）發送留言 → 3.資料完整存入資料庫 → 4. 回傳確認訊息給前端



// DB: 建立資料庫
var DB = require("nedb-promises"); // 引入 nedb-promises 資料庫
const path = require("path"); // 處理檔案路徑
var ProfolioDB = DB.create(path.join(__dirname, "profolio.db")); // 建立資料庫檔案 profolio.db


// 確保資料庫建立成功 (印出資料庫路徑確認)
console.log("資料庫路徑: ", path.join(__dirname, "profolio.db"));





// 定義 API 路徑，處理訪客留言資料，客戶端（HTML 表單）發送留言到伺服器 /api/comments 路徑
server.post("/api/comments", async (req, res) => {
  const { name, email, message } = req.body; // 從請求中取得 name、email 和 message 資料


  // 如果任何欄位未填，回傳錯誤訊息
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required!" });
  }


  try {
    // 將留言資料存入資料庫，並加上時間戳記
    const comment = await ProfolioDB.insert({ name, email, message, createdAt: new Date() });
    console.log("New comment saved:", comment); // 在伺服器上顯示存入的資料
    res.json({ success: true, message: "Comment saved successfully!" }); // 回傳成功訊息給前端
  } catch (error) {
    console.error("Failed to save comment:", error); // 如果出現錯誤，印出錯誤訊息
    res.status(500).json({ error: "Failed to save comment." }); // 回傳錯誤訊息給前端
  }
});




// 啟動伺服器，監聽 80 埠口
server.listen(80, () => {
  console.log(":DDDDD"); // 成功啟動後印出訊息
});
