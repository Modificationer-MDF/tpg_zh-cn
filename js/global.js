document.addEventListener("DOMContentLoaded", function () {
    const ctrl = document.querySelector(".control-pad");
    function width(name) {
        const el = document.querySelector(name);
        el.style.width = window.innerWidth + "px";
    }
    setInterval(() => {
        width(".top");
        fn5();
        document.addEventListener("keydown", (event) => {
            if (event.ctrlKey) ctrl.style.animation = `ctrl- 0.7s forwards ${easing}`;
            else if (event.shiftKey) ctrl.style.animation = `-ctrl 0.7s forwards ${easing}`;
        });
    }, 140);
});