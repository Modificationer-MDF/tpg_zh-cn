document.addEventListener("DOMContentLoaded", function () {
    const ctrl = document.querySelector(".control-pad");
    ctrl.style.animationName = "-ctrl";
    function width(name) {
        const el = document.querySelector(name);
        el.style.width = window.innerWidth + "px";
    }
    setInterval(() => {
        width(".top");
        fn5();
    }, 140);
    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey) ctrl.style.animation = `ctrl- 0.7s forwards ${easing}`;
        else if (event.shiftKey) ctrl.style.animation = `-ctrl 0.7s forwards ${easing}`;
        else if (event.altKey) {
            if (ctrl.style.animationName === "-ctrl") info("按下 Ctrl 键打开控制台。");
            else if (ctrl.style.animationName === "ctrl-") info("按下 Shift 键关闭控制台。");
        }
    });
});