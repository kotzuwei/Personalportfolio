// const app = Vue.createApp({}) //創建一個 Vue 應用程式實例，{}定義應用的全局屬性

// //將ProjectList的全局元件註冊到應用中，HTML中使用<project-list></project-list>插入元件
// app.component('project-carousel', ProjectCarousel);
// // app.component('works-carousel', WorksCarousel);

// app.mount('#app')




// main.js
// import { createApp } from "vue";
// import ProjectCarousel from "./components/ProjectCarousel.js"; // 原有的元件
// import WorksCarousel from "./components/WorksCarousel.js"; // 新增的元件

// const app = createApp({});
// app.component("project-carousel", ProjectCarousel);
// app.component("works-carousel", WorksCarousel); // 註冊新元件
// app.mount("#app");




import ProjectCarousel from './components/ProjectCarousel.js';
import WorksCarousel from './components/WorksCarousel.js';

const app = Vue.createApp({});

app.component("project-carousel", ProjectCarousel);
app.component("works-carousel", WorksCarousel);


if (document.getElementById("app")) {
    app.mount("#app");  // 如果在 index.html 中掛載
} else if (document.getElementById("works-app")) {
app.mount("#works-app");  // 如果在 Works.html 中掛載
}







