const ProjectCarousel = {
  
  data() {
      return {
          carousels: [
              
          ]
      }
  },
  mounted() {
      fetch("/Carouselindex")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.carousels = data;
        })
        .catch((error) => {
          console.error("Error fetching components:", error);
        });

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
export default ProjectCarousel;