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
        if (event.altKey) info("将鼠标移动至左上角以打开选项。")
    });
});