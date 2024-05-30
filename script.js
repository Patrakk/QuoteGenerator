const actionsBtn = document.querySelectorAll('.action-btn');

actionsBtn.forEach(function (actionBtn) {
    actionBtn.addEventListener("mouseenter", () => {
        gsap.to(actionBtn, {
            scale: 1.1,
            rotate: -15,
            duration: 0.2,
        });
    });
    // Revert animation when user leave button
    actionBtn.addEventListener("mouseleave", () => {
        gsap.to(actionBtn, {
            scale: 1,
            rotate: 0,
            duration: 0.2,
        });
    });
});

gsap.from(actionsBtn, {
    opacity: 0,
    scale: 0,
    ease: "elastic.out",
    duration: 1.5,
    stagger: 0.1
});