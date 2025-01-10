//http://26.211.157.182


var express = require("express"); // 引入 Express 套件，幫助建立伺服器
var server = express(); // 建立一個伺服器
var bodyParser = require("body-parser"); // 引入 body-parser，解析傳入的表單資料

// web root: 設定靜態檔案目錄 (Web 資料夾中的 HTML、CSS、JS 可直接使用)
server.use(express.static(__dirname + "/Web"));
server.use(bodyParser.json()); // 解析 JSON 格式的請求
server.use(bodyParser.urlencoded({ extended: true })); // 解析 URL 編碼的表單資料





/*---------------------About.html_Contact----------------------*/

//1.建立資料庫 → 2.客戶端（HTML 表單）發送留言 → 3.資料完整存入資料庫 → 4. 回傳確認訊息給前端



// DB: 建立資料庫
var DB = require("nedb-promises"); // 引入 nedb-promises 資料庫
const path = require("path"); // 處理檔案路徑
var ProfolioDB = DB.create(path.join(__dirname, "profolio.db")); // 建立資料庫檔案 profolio.db
var CarouselindexDB = DB.create(path.join(__dirname, "Carouselindex.db")); // 建立資料庫檔案 profolio.db

// 確保資料庫建立成功 (印出資料庫路徑確認)
console.log("資料庫路徑: ", path.join(__dirname, "profolio.db"));



// 插入 Vue 組件相關資料到資料庫（這段應執行一次即可）
// CarouselindexDB.insert([
//   {
//     id: 'carousel-magic',
//     title: '魔法三原色! Magic Primary Colors!',
//     description: '　　《魔法三原色!》為一款聖經故事改編的文字冒險類遊戲，玩家角色進入魔法學園就讀，遇見了以光的三原色為設定的女同學們與她們組隊驅魔尋物，並在最後拯救或是讓世界毀滅。',
//     slides: [
//         { image: 'Images/Magic Primary Colors!1.png', alt: 'MagicPrimaryColors1' },
//         { image: 'Images/Magic Primary Colors!2.png', alt: 'MagicPrimaryColors2' },
//         { image: 'Images/Magic Primary Colors!3.png', alt: 'MagicPrimaryColors3' },
//         { image: 'Images/Magic Primary Colors!4.png', alt: 'MagicPrimaryColors4' },
//         { image: 'Images/Magic Primary Colors!5.png', alt: 'MagicPrimaryColors5' }
//     ]
// },
// {
//     id: 'carousel-meerkats',
//     title: '獴混過關(製作中)',
//     description: '　　將遊戲與互動裝置技術（Aduino）結合，開發出此款使用自製搖桿遊玩的遊戲。狐獴需不斷往上跳直到終點，同時躲避敵人及小心從岩石上墜落。',
//     slides: [
//         { image: 'Images/Get away with Meerkats1.png', alt: 'Get away with Meerkats1' },
//         { image: 'Images/Get away with Meerkats2.png', alt: 'Get away with Meerkats2' },
//         { image: 'Images/Get away with Meerkats3.png', alt: 'Get away with Meerkats3' },
//         { image: 'Images/Get away with Meerkats4.png', alt: 'Get away with Meerkats4' },
//         { image: 'Images/Get away with Meerkats5.png', alt: 'Get away with Meerkats5' },
//     ]
// },
// {
//     id: 'carousel-candy',
//     title: 'Candy Duck',
//     description: '　　結合手語動畫的寓教於樂小遊戲，玩家須將糖果擊落，讓鴨子吃到，在限時內把糖果全部吃掉即可勝利。',
//     slides: [
//         { image: 'Images/Candy Duck1.png', alt: 'Candy Duck1' },
//         { image: 'Images/Candy Duck2.png', alt: 'Candy Duck2' },
//         { image: 'Images/Candy Duck3.png', alt: 'Candy Duck3' },
//         { image: 'Images/Candy Duck4.png', alt: 'Candy Duck4' },
//         { image: 'Images/Candy Duck5.png', alt: 'Candy Duck5' },
//     ]
// }
// ]).then(() => console.log("Data inserted into Carouselindex.db"));

server.get("/Carouselindex", (req, res) => {
  CarouselindexDB.find({})
    .then(results => {
      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).send("No data found");
      }
    })
    .catch(err => {
      console.error("Error fetching data from ComponentsDB:", err); // 錯誤日誌
      res.status(500).send("Server error: " + err.message);
    });
});



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
