gsap.registerPlugin(ScrollTrigger);

// Pin the left panel for the full scroll length of the right content
ScrollTrigger.create({
    trigger: ".sticky-panel",
    start: "top top",
    end: () => "+=" + document.querySelector(".scroll-content").scrollHeight,
    pin: true,
    pinSpacing: false
});

// Parallax effect on each panel image
document.querySelectorAll(".panel img").forEach((img) => {
    gsap.to(img, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});
