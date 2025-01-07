const WorksCarousel = {
  template: `
      <div>
          <div v-for="(carousel, index) in carousels" :key="index">

            <h3>➤ {{ carousel.title }}</h3>
            <h4>{{ carousel.time }}</h4>
            <p>{{ carousel.description }}</p>
            <p>{{ carousel.more }}
            <a :href="carousel.more" target="_blank">......</a>
            </p>

            <div class="Carousel">
                <div :id="carousel.id" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button v-for="(_, slideIndex) in carousel.slides" 
                            :key="slideIndex"
                            type="button"
                            :data-bs-target="'#' + carousel.id"
                            :data-bs-slide-to="slideIndex"
                            :class="{ active: slideIndex === 0 }">
                        </button>
                    </div>
                    
                    <div class="carousel-inner">
                        <div v-for="(slide, slideIndex) in carousel.slides" 
                            :key="slideIndex"
                            :class="['carousel-item', { active: slideIndex === 0 }]">
                            <img :src="slide.image" :alt="slide.alt" class="d-block" style="width:100%">
                        </div>
                    </div>
                    
                    <button class="carousel-control-prev" type="button" :data-bs-target="'#' + carousel.id" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </button>
                    <button class="carousel-control-next" type="button" :data-bs-target="'#' + carousel.id" data-bs-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </button>
                </div>
            </div>
          </div>
        </div>
  `,
  
  data() {
      return {
          carousels: [
              {
                  id: 'carousel-magic',
                  title: '魔法三原色! Magic Primary Colors!',
                  time: '-2024年_大二下',
                  description: '　　《魔法三原色!》為一款聖經故事改編的文字冒險類遊戲，玩家角色進入魔法學園就讀，遇見了以光的三原色為設定的女同學們與她們組隊驅魔尋物，並在最後拯救或是讓世界毀滅。',
                  more:'https://reurl.cc/kObXgx',
                  slides: [
                      { image: 'images/Magic Primary Colors!1.png', alt: 'MagicPrimaryColors1' },
                      { image: 'images/Magic Primary Colors!2.png', alt: 'MagicPrimaryColors2' },
                      { image: 'images/Magic Primary Colors!3.png', alt: 'MagicPrimaryColors3' },
                      { image: 'images/Magic Primary Colors!4.png', alt: 'MagicPrimaryColors4' },
                      { image: 'images/Magic Primary Colors!5.png', alt: 'MagicPrimaryColors5' }
                  ]
              },
              {
                  id: 'carousel-meerkats',
                  title: '獴混過關(製作中)',
                  time: '-2024年_大三上',
                  description: '　　將遊戲與互動裝置技術（Aduino）結合，開發出此款使用自製搖桿遊玩的遊戲。狐獴需不斷往上跳直到終點，同時躲避敵人及小心從岩石上墜落。',
                  slides: [
                      { image: 'images/Get away with Meerkats1.png', alt: 'Get away with Meerkats1' },
                      { image: 'images/Get away with Meerkats2.png', alt: 'Get away with Meerkats2' },
                      { image: 'images/Get away with Meerkats3.png', alt: 'Get away with Meerkats3' },
                      { image: 'images/Get away with Meerkats4.png', alt: 'Get away with Meerkats4' },
                      { image: 'images/Get away with Meerkats5.png', alt: 'Get away with Meerkats5' },
                  ]
              },
              {
                  id: 'carousel-candy',
                  title: 'Candy Duck',
                  time: '-2024年_大二下',
                  description: '　　結合手語動畫的寓教於樂小遊戲，玩家須將糖果擊落，讓鴨子吃到，在限時內把糖果全部吃掉即可勝利。',
                  slides: [
                      { image: 'images/Candy Duck1.png', alt: 'Candy Duck1' },
                      { image: 'images/Candy Duck2.png', alt: 'Candy Duck2' },
                      { image: 'images/Candy Duck3.png', alt: 'Candy Duck3' },
                      { image: 'images/Candy Duck4.png', alt: 'Candy Duck4' },
                      { image: 'images/Candy Duck5.png', alt: 'Candy Duck5' },
                  ]
              },
              {
                  id: 'carousel-heart',
                  title: '玉兔抱春',
                  time: '-2022年_大一上',
                  description: '　　光影立體裝置設計作品，多使用可重複利用之材料製作，用氣球棒作為骨架，外層貼上玻璃紙及反射材料。作品理念：象徵新的一年到來，希望圍繞，微光能夠溫暖人們。',
                  more:'https://reurl.cc/xpKqWN',
                  slides: [
                      { image: 'images/Heart Light1.png', alt: 'Heart Light1' },
                      { image: 'images/Heart Light2.png', alt: 'Heart Light2' },
                      { image: 'images/Heart Light3.png', alt: 'Heart Light3' },
                  ]
              },
              {
                  id: 'carousel-station',
                  title: '我們所認識的台中火車站',
                  time: '-2022年_大一上',
                  description: '　　攝影課之縮時紀錄片，希望透過我們的視角，帶大家認識不一樣的台中車站，發現平時不會注意到的「風景」。台中車站有悠久的歷史，在車站舊址旁現代化的新車站，和化身為景點的舊車站，和周圍車水馬龍的大馬路形成獨特的風景；作為重要的交通樞紐，又位於繁華的市區，絡繹不絕的行人汽車很好的展現了都市的榮景，作為縮時拍攝的題材再好不過。',
                  more:'https://reurl.cc/WA89bk',
                  slides: [
                      { image: 'images/Taichung Staion1.png', alt: 'Taichung Staion1' },
                      { image: 'images/Taichung Staion2.png', alt: 'Taichung Staion2' },
                      { image: 'images/Taichung Staion3.png', alt: 'Taichung Staion3' },
                  ]
              },
              {
                  id: 'carousel-trash',
                  title: '情勒垃圾桶',
                  time: '-2023年_大一下',
                  description: '　　服務與學習課程期末分組作品，本人擔任導演指導，拍攝環境關懷影片。拍攝動機：融入「歸剛欸」迷因和情勒垃圾桶，娛樂同時也教導大眾如何垃圾分類。',
                  more:'https://reurl.cc/G5G0G3',
                  slides: [
                      { image: 'images/Emotional Blackmail1.png', alt: 'Emotional Blackmail1' },
                      { image: 'images/Emotional Blackmail2.png', alt: 'Emotional Blackmail2' },
                      { image: 'images/Emotional Blackmail3.png', alt: 'Emotional Blackmail3' },
                  ]
              },
              {
                  id: 'carousel-qauso',
                  title: 'QAUSO',
                  time: '-2023年_大一下',
                  description: '　　媒體設計基礎課程，製作之手翻書動畫作品。故事內容描述主角（貓貓）今天很想吃可頌，於是牠便去麵包店買可頌，所發生的奇妙冒險。',
                  more:'https://reurl.cc/96bjNY',
                  slides: [
                      { image: 'images/Qauso1.png', alt: 'Qauso1' },
                      { image: 'images/Qauso2.png', alt: 'Qauso2' },
                      { image: 'images/Qauso3.png', alt: 'Qauso3' },
                  ]
              },
              {
                  id: 'carousel-picnic',
                  title: '小紅帽野餐趣',
                  time: '-2023年_大一下',
                  description: '　　媒體設計基礎課程，期末分組偶動畫作品，反轉原作故事，為觀眾帶來「溫腥」的可愛童話故事。故事主角小紅帽要去找奶奶野餐，路上遇到出門帶著小孩小林去覓食的大野狼大林……',
                  more:'https://reurl.cc/6jbrLr',
                  slides: [
                      { image: 'images/Radhat picnic1.png', alt: 'Radhat picnic1' },
                      { image: 'images/Radhat picnic2.png', alt: 'Radhat picnic2' },
                      { image: 'images/Radhat picnic3.png', alt: 'Radhat picnic3' },
                  ]
              },
              {
                  id: 'carousel-notes',
                  title: '像素便利貼_個人大頭貼',
                  time: '-2023年_大二上',
                  description: '　　色彩學課程之作品，利用便利貼創作出像素風格的個人大頭貼。作品總長121.6*121.6公分，共使用了約1024張便利貼，製作時間約10小時。',
                  more:'https://reurl.cc/aZMWAX',
                  slides: [
                      { image: 'images/Sticky notes1.png', alt: 'Sticky notes1' },
                      { image: 'images/Sticky notes2.png', alt: 'Sticky notes2' },
                      { image: 'images/Sticky notes3.png', alt: 'Sticky notes3' },
                  ]
              },
              {
                  id: 'carousel-logo',
                  title: '個人Logo',
                  time: '-2023年_大二上',
                  description: '　　色彩學課程設計之個人Logo作品，以灰藍色為主色調，透過寧靜的氛圍和可愛的貓咪元素，呈現隨和、悠閒的風格。貓咪代表著寧靜和愜意，與柔和的色調相得益彰。頂部的紫色星星代表著紫微星，紫微星（即北極星）在古代是帝星，是吉星高照、好運的象徵。',
                  slides: [
                      { image: 'images/Personal LOGO1.png', alt: 'Personal LOGO1' },
                      { image: 'images/Personal LOGO2.png', alt: 'Personal LOGO2' },
                      { image: 'images/Personal LOGO3.png', alt: 'Personal LOGO3' },
                  ]
              },
              {
                  id: 'carousel-chicken',
                  title: '雞不可失',
                  time: '-2023年_大二上',
                  description: '　　多媒體系統設計課程，期末分組遊戲作品。本人擔任組長，負責程式撰寫、企畫書撰寫、美術設計等項目，此遊戲是我與組員第一次使用Unity開發之作品，雖然成果有些待加強的地方，但此作品也為我之後開發Unity遊戲奠定了基礎。',
                  more:'https://reurl.cc/eGVqdb',
                  slides: [
                      { image: 'images/Chicken NO die1.png', alt: 'Chicken NO die1' },
                      { image: 'images/Chicken NO die2.png', alt: 'Chicken NO die2' },
                      { image: 'images/Chicken NO die3.png', alt: 'Chicken NO die3' },
                  ]
              }
          ]
      }
  },
  mounted() {
      this.$nextTick(() => {
          // 1. 初始化 GSAP 動畫
          this.initAnimations();
          
          // // 2. 初始化 Bootstrap Collapse
          // const collapsibleNavbar = document.getElementById('collapsibleNavbar');
          // if (collapsibleNavbar) {
          //     new Collapse(collapsibleNavbar);
          // }
      });
  },
  methods: {
      initAnimations() {
        // 1. 淡入標題動畫
        gsap.fromTo(
          "#title",
          { opacity: 0 },
          { opacity: 1, duration: 3, ease: "none" }
        );
  
        // 2. 滾動觸發動畫
        this.initScrollAnimations();
  
        // 3. 重複閃爍動畫
        gsap.to("#kirakira_R", {
          opacity: 0,
          repeat: -1,
          yoyo: true,
          duration: 1,
        });
        gsap.to("#kirakira_L", {
          opacity: 0,
          repeat: -1,
          yoyo: true,
          duration: 1,
        });
  
        // 4. Hello World! 閃爍動畫
        gsap.to(".content_Hello h2", {
          opacity: 0,
          repeat: -1,
          duration: 5,
        });
  
        // 5. Carousel 滾動淡入動畫
        gsap.utils.toArray(".Carousel").forEach((carousel) => {
          gsap.fromTo(
            carousel,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: carousel,
                start: "top 60%",
                end: "top 50%",
                toggleActions: "restart none reverse reverse",
              },
            }
          );
        });
      },
      initScrollAnimations() {
        // 6. 滾動觸發淡出動畫
        gsap.to("#line_R", {
          scrollTrigger: {
            trigger: "#line_R",
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
          opacity: 0,
          duration: 3,
        });
  
        gsap.to("#line_L", {
          scrollTrigger: {
            trigger: "#line_L",
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
          opacity: 0,
          duration: 3,
        });
  
        // 7. Ripple 動畫
        gsap.to("#ripple_L", {
          x: -600,
          scrollTrigger: {
            trigger: "#ripple_L",
            start: "top 250px",
            end: "bottom 100px",
            toggleActions: "restart restart pause pause",
            scrub: 1,
          },
        });
  
        gsap.to("#ripple_R", {
          x: 600,
          scrollTrigger: {
            trigger: "#ripple_R",
            start: "top 250px",
            end: "bottom 100px",
            toggleActions: "restart restart pause pause",
            scrub: 1,
          },
        });
      },
    },
  
};

export default WorksCarousel;