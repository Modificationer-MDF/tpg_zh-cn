document.addEventListener("DOMContentLoaded", function() {
    function width(name) {
        const el = document.querySelector(name);
        el.style.width = window.innerWidth + "px";
    }

    setInterval(() => {
        width(".top");
    }, 300);
});