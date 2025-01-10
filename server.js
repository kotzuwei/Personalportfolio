//http://26.211.157.182


var express = require("express"); // 引入 Express 套件，幫助建立伺服器
var server = express(); // 建立一個伺服器
var bodyParser = require("body-parser"); // 引入 body-parser，解析傳入的表單資料

// web root: 設定靜態檔案目錄 (Web 資料夾中的 HTML、CSS、JS 可直接使用)
server.use(express.static(__dirname + "/Web"));
server.use(bodyParser.json()); // 解析 JSON 格式的請求
server.use(bodyParser.urlencoded({ extended: true })); // 解析 URL 編碼的表單資料






/*------------------------About.html_Contact-------------------------*/

//1.建立資料庫 → 2.客戶端（HTML 表單）發送留言 → 3.資料完整存入資料庫 → 4. 回傳確認訊息給前端


// DB: 建立資料庫
var DB = require("nedb-promises"); // 引入 nedb-promises 資料庫
const path = require("path"); // 處理檔案路徑
var ProfolioDB = DB.create(path.join(__dirname, "profolio.db")); // 建立資料庫檔案 profolio.db
var CarouselindexDB = DB.create(path.join(__dirname, "Carouselindex.db")); // 建立資料庫檔案 Carouselindex.db
var CarouselindexDB = DB.create(path.join(__dirname, "Carouselindex.db")); // 建立資料庫檔案 Carouselindex.db


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





/*------------------------index.html---------------------------*/

// DB: 建立資料庫
var CarouselindexDB = DB.create(path.join(__dirname, "Carouselindex.db")); // 建立資料庫檔案 Carouselindex.db


// 插入 Vue 組件相關資料到資料庫（這段應執行一次即可）
CarouselindexDB.insert([
  {
    order: 1,
    id: 'carousel-magic',
    title: '魔法三原色! Magic Primary Colors!',
    time: '-2024年_大二下',
    description: '　　《魔法三原色!》為一款聖經故事改編的文字冒險類遊戲，玩家角色進入魔法學園就讀，遇見了以光的三原色為設定的女同學們與她們組隊驅魔尋物，並在最後拯救或是讓世界毀滅。',
    more:'https://reurl.cc/kObXgx',
    slides: [
        { image: 'Images/Magic Primary Colors!1.png', alt: 'MagicPrimaryColors1' },
        { image: 'Images/Magic Primary Colors!2.png', alt: 'MagicPrimaryColors2' },
        { image: 'Images/Magic Primary Colors!3.png', alt: 'MagicPrimaryColors3' },
        { image: 'Images/Magic Primary Colors!4.png', alt: 'MagicPrimaryColors4' },
        { image: 'Images/Magic Primary Colors!5.png', alt: 'MagicPrimaryColors5' }
    ]
  },
  {
    order: 2,
    id: 'carousel-meerkats',
    title: '獴混過關',
    time: '-2024年_大三上',
    description: '　　將遊戲與互動裝置技術（Aduino）結合，開發出此款使用自製搖桿遊玩的遊戲。狐獴需不斷往上跳直到終點，同時躲避敵人及小心從岩石上墜落。',
    more:'https://reurl.cc/EgY0xn',
    slides: [
        { image: 'Images/Get away with Meerkats1.png', alt: 'Get away with Meerkats1' },
        { image: 'Images/Get away with Meerkats2.png', alt: 'Get away with Meerkats2' },
        { image: 'Images/Get away with Meerkats3.png', alt: 'Get away with Meerkats3' },
        { image: 'Images/Get away with Meerkats4.png', alt: 'Get away with Meerkats4' },
        { image: 'Images/Get away with Meerkats5.png', alt: 'Get away with Meerkats5' },
    ]
  },
  {
    order: 3,
    id: 'carousel-candy',
    title: 'Candy Duck',
    time: '-2024年_大二下',
    description: '　　結合手語動畫的寓教於樂小遊戲，玩家須將糖果擊落，讓鴨子吃到，在限時內把糖果全部吃掉即可勝利。',
    slides: [
        { image: 'Images/Candy Duck1.png', alt: 'Candy Duck1' },
        { image: 'Images/Candy Duck2.png', alt: 'Candy Duck2' },
        { image: 'Images/Candy Duck3.png', alt: 'Candy Duck3' },
        { image: 'Images/Candy Duck4.png', alt: 'Candy Duck4' },
        { image: 'Images/Candy Duck5.png', alt: 'Candy Duck5' },
    ]
  }
]).then(() => console.log("Data inserted into Carouselindex.db"));


// 定義 Carouselindex 路徑，取得資料庫中的 Carouselindex 資料
server.get("/Carouselindex", (req, res) => {
  CarouselindexDB.find({})
    .sort({ order: 1 }) // 按 `order` 升序
    .then(results => {
      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).send("No data found");
      }
    })
    .catch(err => {
      console.error("Error fetching data from CarouselindexDB:", err); // 錯誤日誌
      res.status(500).send("Server error: " + err.message);
    });
});





/*------------------------index.html---------------------------*/

// DB: 建立資料庫
var CarouselWorksDB = DB.create(path.join(__dirname, "CarouselWorks.db")); // 建立資料庫檔案 CarouselWorks.db


// 插入 Vue 組件相關資料到資料庫（這段應執行一次即可）
CarouselWorksDB.insert([
  {
    order: 1,
    id: 'carousel-magic',
    title: '魔法三原色! Magic Primary Colors!',
    time: '-2024年_大二下',
    description: '　　《魔法三原色!》為一款聖經故事改編的文字冒險類遊戲，玩家角色進入魔法學園就讀，遇見了以光的三原色為設定的女同學們與她們組隊驅魔尋物，並在最後拯救或是讓世界毀滅。',
    more:'https://reurl.cc/kObXgx',
    slides: [
        { image: 'Images/Magic Primary Colors!1.png', alt: 'MagicPrimaryColors1' },
        { image: 'Images/Magic Primary Colors!2.png', alt: 'MagicPrimaryColors2' },
        { image: 'Images/Magic Primary Colors!3.png', alt: 'MagicPrimaryColors3' },
        { image: 'Images/Magic Primary Colors!4.png', alt: 'MagicPrimaryColors4' },
        { image: 'Images/Magic Primary Colors!5.png', alt: 'MagicPrimaryColors5' }
    ]
  },
  {
    order: 2,
    id: 'carousel-meerkats',
    title: '獴混過關',
    time: '-2024年_大三上',
    description: '　　將遊戲與互動裝置技術（Aduino）結合，開發出此款使用自製搖桿遊玩的遊戲。狐獴需不斷往上跳直到終點，同時躲避敵人及小心從岩石上墜落。',
    more:'https://reurl.cc/EgY0xn',
    slides: [
        { image: 'Images/Get away with Meerkats1.png', alt: 'Get away with Meerkats1' },
        { image: 'Images/Get away with Meerkats2.png', alt: 'Get away with Meerkats2' },
        { image: 'Images/Get away with Meerkats3.png', alt: 'Get away with Meerkats3' },
        { image: 'Images/Get away with Meerkats4.png', alt: 'Get away with Meerkats4' },
        { image: 'Images/Get away with Meerkats5.png', alt: 'Get away with Meerkats5' },
    ]
  },
  {
    order: 3,
    id: 'carousel-candy',
    title: 'Candy Duck',
    time: '-2024年_大二下',
    description: '　　結合手語動畫的寓教於樂小遊戲，玩家須將糖果擊落，讓鴨子吃到，在限時內把糖果全部吃掉即可勝利。',
    slides: [
        { image: 'Images/Candy Duck1.png', alt: 'Candy Duck1' },
        { image: 'Images/Candy Duck2.png', alt: 'Candy Duck2' },
        { image: 'Images/Candy Duck3.png', alt: 'Candy Duck3' },
        { image: 'Images/Candy Duck4.png', alt: 'Candy Duck4' },
        { image: 'Images/Candy Duck5.png', alt: 'Candy Duck5' },
    ]
  },
  {
    order: 4,
    id: 'carousel-heart',
    title: '玉兔抱春',
    time: '-2022年_大一上',
    description: '　　光影立體裝置設計作品，多使用可重複利用之材料製作，用氣球棒作為骨架，外層貼上玻璃紙及反射材料。作品理念：象徵新的一年到來，希望圍繞，微光能夠溫暖人們。',
    more:'https://reurl.cc/xpKqWN',
    slides: [
        { image: 'Images/Heart Light1.png', alt: 'Heart Light1' },
        { image: 'Images/Heart Light2.png', alt: 'Heart Light2' },
        { image: 'Images/Heart Light3.png', alt: 'Heart Light3' },
    ]
  },
  {
    order: 5,
    id: 'carousel-station',
    title: '我們所認識的台中火車站',
    time: '-2022年_大一上',
    description: '　　攝影課之縮時紀錄片，希望透過我們的視角，帶大家認識不一樣的台中車站，發現平時不會注意到的「風景」。台中車站有悠久的歷史，在車站舊址旁現代化的新車站，和化身為景點的舊車站，和周圍車水馬龍的大馬路形成獨特的風景；作為重要的交通樞紐，又位於繁華的市區，絡繹不絕的行人汽車很好的展現了都市的榮景，作為縮時拍攝的題材再好不過。',
    more:'https://reurl.cc/WA89bk',
    slides: [
        { image: 'Images/Taichung Staion1.png', alt: 'Taichung Staion1' },
        { image: 'Images/Taichung Staion2.png', alt: 'Taichung Staion2' },
        { image: 'Images/Taichung Staion3.png', alt: 'Taichung Staion3' },
    ]
  },
  {
    order: 6,
    id: 'carousel-trash',
    title: '情勒垃圾桶',
    time: '-2023年_大一下',
    description: '　　服務與學習課程期末分組作品，本人擔任導演指導，拍攝環境關懷影片。拍攝動機：融入「歸剛欸」迷因和情勒垃圾桶，娛樂同時也教導大眾如何垃圾分類。',
    more:'https://reurl.cc/G5G0G3',
    slides: [
        { image: 'Images/Emotional Blackmail1.png', alt: 'Emotional Blackmail1' },
        { image: 'Images/Emotional Blackmail2.png', alt: 'Emotional Blackmail2' },
        { image: 'Images/Emotional Blackmail3.png', alt: 'Emotional Blackmail3' },
    ]
  },
  {
    order: 7,
    id: 'carousel-qauso',
    title: 'QAUSO',
    time: '-2023年_大一下',
    description: '　　媒體設計基礎課程，製作之手翻書動畫作品。故事內容描述主角（貓貓）今天很想吃可頌，於是牠便去麵包店買可頌，所發生的奇妙冒險。',
    more:'https://reurl.cc/96bjNY',
    slides: [
        { image: 'Images/Qauso1.png', alt: 'Qauso1' },
        { image: 'Images/Qauso2.png', alt: 'Qauso2' },
        { image: 'Images/Qauso3.png', alt: 'Qauso3' },
    ]
  },
  {
    order: 8,
    id: 'carousel-picnic',
    title: '小紅帽野餐趣',
    time: '-2023年_大一下',
    description: '　　媒體設計基礎課程，期末分組偶動畫作品，反轉原作故事，為觀眾帶來「溫腥」的可愛童話故事。故事主角小紅帽要去找奶奶野餐，路上遇到出門帶著小孩小林去覓食的大野狼大林……',
    more:'https://reurl.cc/6jbrLr',
    slides: [
        { image: 'Images/Radhat picnic1.png', alt: 'Radhat picnic1' },
        { image: 'Images/Radhat picnic2.png', alt: 'Radhat picnic2' },
        { image: 'Images/Radhat picnic3.png', alt: 'Radhat picnic3' },
    ]
  },
  {
    order: 9,
    id: 'carousel-notes',
    title: '像素便利貼_個人大頭貼',
    time: '-2023年_大二上',
    description: '　　色彩學課程之作品，利用便利貼創作出像素風格的個人大頭貼。作品總長121.6*121.6公分，共使用了約1024張便利貼，製作時間約10小時。',
    more:'https://reurl.cc/aZMWAX',
    slides: [
        { image: 'Images/Sticky notes1.png', alt: 'Sticky notes1' },
        { image: 'Images/Sticky notes2.png', alt: 'Sticky notes2' },
        { image: 'Images/Sticky notes3.png', alt: 'Sticky notes3' },
    ]
  },
  {
    order: 10,
    id: 'carousel-logo',
    title: '個人Logo',
    time: '-2023年_大二上',
    description: '　　色彩學課程設計之個人Logo作品，以灰藍色為主色調，透過寧靜的氛圍和可愛的貓咪元素，呈現隨和、悠閒的風格。貓咪代表著寧靜和愜意，與柔和的色調相得益彰。頂部的紫色星星代表著紫微星，紫微星（即北極星）在古代是帝星，是吉星高照、好運的象徵。',
    slides: [
        { image: 'Images/Personal LOGO1.png', alt: 'Personal LOGO1' },
        { image: 'Images/Personal LOGO2.png', alt: 'Personal LOGO2' },
        { image: 'Images/Personal LOGO3.png', alt: 'Personal LOGO3' },
    ]
  },
  {
    order: 11,
    id: 'carousel-chicken',
    title: '雞不可失',
    time: '-2023年_大二上',
    description: '　　多媒體系統設計課程，期末分組遊戲作品。本人擔任組長，負責程式撰寫、企畫書撰寫、美術設計等項目，此遊戲是我與組員第一次使用Unity開發之作品，雖然成果有些待加強的地方，但此作品也為我之後開發Unity遊戲奠定了基礎。',
    more:'https://reurl.cc/eGVqdb',
    slides: [
        { image: 'Images/Chicken NO die1.png', alt: 'Chicken NO die1' },
        { image: 'Images/Chicken NO die2.png', alt: 'Chicken NO die2' },
        { image: 'Images/Chicken NO die3.png', alt: 'Chicken NO die3' },
    ]
  }
]).then(() => console.log("Data inserted into CarouselWorks.db"));


// 定義 CarouselWorks 路徑，取得資料庫中的 CarouselWorks 資料
server.get("/CarouselWorks", (req, res) => {
  CarouselWorksDB.find({})
    .sort({ order: 1 }) // 按 `order` 升序
    .then(results => {
      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).send("No data found");
      }
    })
    .catch(err => {
      console.error("Error fetching data from CarouselWorksDB:", err); // 錯誤日誌
      res.status(500).send("Server error: " + err.message);
    });
});





/*-------------------------------------------------------------*/


// 啟動伺服器，監聽 80 埠口
server.listen(80, () => {
  console.log(":DDDDD"); // 成功啟動後印出訊息
});
