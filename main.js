// const app = Vue.createApp({}) //創建一個 Vue 應用程式實例，{}定義應用的全局屬性

// //將ProjectList的全局元件註冊到應用中，HTML中使用<project-list></project-list>插入元件
// app.component('project-carousel', ProjectCarousel); 

// app.mount('#app')

import { createApp } from 'vue';
import ProjectCarousel from './components/ProjectCarousel';

const app = createApp({});
app.component('project-carousel', ProjectCarousel);
app.mount('#app');

// import ProjectCarousel from './components/ProjectCarousel.js';

// const app = Vue.createApp({});

// app.component('project-carousel', ProjectCarousel);
// app.mount('#app');
