<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<!-- ScrollSmoother requires ScrollTrigger -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollSmoother.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script> 
 
 
 window.Webflow ||= [];
  window.Webflow.push(function () {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
    
    ScrollSmoother.create({
      wrapper: ".smooth-wrapper",
      content: ".smooth-content",
      smooth: 1,
      effects: true
    });

    // === Utility: SplitText animation ===
    function animateSplitText(target, timeline, delay = 0) {
      const split = SplitText.create(target, {
        type: "words, lines",
        mask: "lines",
        autoSplit: true,
      });

      timeline.from(split.lines, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
      }, delay);
    }

    // === Animate Hero Heading ===
    const heroHeading = document.querySelectorAll(".main-hero-heading");
    const tlHero = gsap.timeline();
    if (heroHeading) {
      animateSplitText(heroHeading, tlHero, 0);

      tlHero.from(".cta-button", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, 0);
    }
		
    const ctaButton = document.querySelector(".cta-button");
    const tlCta = gsap.timeline({paused: true })
    .to(ctaButton, {
    	backgroundColor: "#C64B06",
      scale: .98,
      ease: "power1.out",
      duration: .3,
    });
 
    ctaButton.addEventListener("mouseenter", () => tlCta.play());
		ctaButton.addEventListener("mouseleave", () => tlCta.reverse());


    // === Hover animation for self-port ===
    const heroContainer = document.querySelector(".main-heading-container");
    const selfPort = document.querySelector(".self-port");

    if (heroContainer && selfPort) {
      heroContainer.addEventListener("mouseenter", () => {
        gsap.to(selfPort, {
          opacity: 1,
          xPercent: 100,
          duration: 1,
          ease: "power2.out"
        });
      });

      heroContainer.addEventListener("mouseleave", () => {
        gsap.to(selfPort, {
          opacity: 0,
          xPercent: 0,
          duration: 1,
          ease: "power2.out"
        });
      });
    }

    // === Sticky hero scroll animation ===
    gsap.to(".main-hero", {
      scrollTrigger: {
        trigger: ".main-hero",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: 1
      }
    });

    // === Portfolio cover hover animation ===
    const portCovers = document.querySelectorAll(".portfolio-cover");

    portCovers.forEach((thumbnail) => {
      thumbnail.addEventListener("mouseenter", () => {
        gsap.to(thumbnail, {
          opacity: 1,
          scale: 0.98,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      thumbnail.addEventListener("mouseleave", () => {
        gsap.to(thumbnail, {
          opacity: 0.7,
          scale: 1,
          duration: 0.3,
          ease: "power2.in"
        });
      });
    });

    // Mouse hover portfolio title
    const webHead = document.querySelectorAll(".web-info-header");

    webHead.forEach((header) => {
      const tlWeb = gsap.timeline({ paused: true })
        .to(header, {
          color: "#C64B06", // color value must be in quotes
          scale: 0.98,
          duration: 0.3,
          ease: "power1.out"
        });

      header.addEventListener("mouseenter", () => tlWeb.play());
      header.addEventListener("mouseleave", () => tlWeb.reverse());
    });



    // === Value paragraph split text on scroll ===
    const valueParagraph = document.querySelector(".value-paragraph");

    if (valueParagraph) {
      const split2 = SplitText.create(valueParagraph, {
        type: "words, lines",
        mask: "lines",
        autoSplit: true
      });

      gsap.from(split2.lines, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".value-paragraph",
          start: "top 48%",
          end: "bottom 48%",
          scrub: 0.8,
        }
      });
    }
    
    if (window.matchMedia("(min-width: 992px)").matches) {
    // === Simulated sticky behavior for .process-header ===
    ScrollTrigger.create({
      trigger: ".process-grid", // The full 2-column container
      start: "top top",
      end: "bottom 60%",
      pin: ".accordion-header-container", // Only pin the left side
      pinSpacing: false,
    });

    gsap.from(".process-header", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".process-grid", // Right column content
        start: "top center",
        toggleActions: "play none none reverse",
        
      }
    });
    }
    
    //highlight featured-process
    document.querySelectorAll(".accordion-item").forEach((accordion) => {
  gsap.to(accordion, {
    opacity: 1,
    duration: 0.3,
    ease: "power2.out",
    scrollTrigger: {
      trigger: accordion,
      start: "10% 30%",
      end: "50% 40%%",
      toggleActions: "play none none none",
      scrub: true,
    }
  });
});


// Animate cards with smoother flow
const tlService = gsap.timeline({
  scrollTrigger: {
    trigger: ".services-section",
    start: "top 10%",
    bottom: "bottom bottom",
    toggleActions: "play none none none",

  }
});

tlService.to(
  [".service-card-target1", ".service-card-target3", ".service-card-target2"],
  {
    yPercent: -180,
    autoAlpha: 1,
    duration: 0.8,
    ease: "back(.5)",
    stagger: 0.2, // smooth stagger for natural entrance
  }
);



  });    