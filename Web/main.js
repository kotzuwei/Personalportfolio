// 引入 Vue 組件，渲染到頁面
import ProjectCarousel from './components/ProjectCarousel.js';
import WorksCarousel from './components/WorksCarousel.js';


// 創建 Vue 應用
const app = Vue.createApp({});


// 註冊 Vue 組件，使用<project-carousel>、<works-carousel>標籤
app.component("project-carousel", ProjectCarousel);
app.component("works-carousel", WorksCarousel);


// index.html、Works.html ㄉcarousel分別是精選作品與全部作品
// 檢查是否有 id 為 "app" 或 "works-app" 的元素，並將 Vue 應用掛載到相應的元素上
if (document.getElementById("app")) {
    // 如果在 index.html 中有 id 為 "app" 的元素，將 Vue 應用掛載到該元素
    app.mount("#app");
} else if (document.getElementById("works-app")) {
    // 如果在 Works.html 中有 id 為 "works-app" 的元素，將 Vue 應用掛載到該元素
    app.mount("#works-app");
}
