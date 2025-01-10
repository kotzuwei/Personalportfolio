// 引入 Vue 組件
import ProjectCarousel from './components/ProjectCarousel.js';
import WorksCarousel from './components/WorksCarousel.js';

// 創建 Vue 應用
if (document.getElementById("carousels")) {
  // 如果有 ID 為 carousels 的元素，掛載 ProjectCarousel 的邏輯
  Vue.createApp(ProjectCarousel).mount("#carousels");
} else if (document.getElementById("works-app")) {
  // 如果有 ID 為 works-app 的元素，掛載 WorksCarousel 的邏輯
  Vue.createApp(WorksCarousel).mount("#works-app");
}
