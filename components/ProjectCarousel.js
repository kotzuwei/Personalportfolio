const ProjectCarousel = {
    template: `
        <div>
            <div v-for="(carousel, index) in carousels" :key="index" class="carousel-container">
                <h3 class="carousel-title" >➤ {{ carousel.title }}</h3>
                <p>{{ carousel.description }}</p>
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
                    description: '《魔法三原色!》為一款聖經故事改編的文字冒險類遊戲，玩家角色進入魔法學園就讀，遇見了以光的三原色為設定的女同學們與她們組隊驅魔尋物，並在最後拯救或是讓世界毀滅。',
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
                    description: '將遊戲與互動裝置技術結合，開發出此款可用自製搖桿遊玩的遊戲。狐獴需不斷往上跳直到終點，同時躲避敵人及小心從岩石上墜落。',
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
                    description: '結合手語動畫的寓教於樂小遊戲，玩家須將糖果擊落，讓鴨子吃到，在限時內把糖果全部吃掉即可勝利。',
                    slides: [
                        { image: 'images/Candy Duck1.png', alt: 'Candy Duck1' },
                        { image: 'images/Candy Duck2.png', alt: 'Candy Duck2' },
                        { image: 'images/Candy Duck3.png', alt: 'Candy Duck3' },
                        { image: 'images/Candy Duck4.png', alt: 'Candy Duck4' },
                        { image: 'images/Candy Duck5.png', alt: 'Candy Duck5' },
                    ]
                }
            ]
        }
    },
    mounted() {
        this.$nextTick(() => {
            // 1. 初始化 GSAP 動畫
            this.initAnimations();
            
            // 2. 初始化 Bootstrap Collapse
            const collapsibleNavbar = document.getElementById('collapsibleNavbar');
            if (collapsibleNavbar) {
                new Collapse(collapsibleNavbar);
            }
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
