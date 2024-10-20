document.addEventListener("DOMContentLoaded", () => {
/* 第一部分。 */

    function getHeight(element) {
        return element.clientHeight;
    }

    const h1 = document.querySelector(".head1"); // h1 标签。
    const h2 = document.querySelector(".head2"); // h2 标签。
    const div = document.querySelector(".top"); // 包含 h1 和 h2 的 div 标签。
    const head = document.querySelector(".head"); // The Play Games 版本标签。
    const btn1 = document.querySelector(".btn1"); // 第一个按钮。
    const btn2 = document.querySelector(".btn2"); // 第二个按钮。
    const btn3 = document.querySelector(".btn3"); // 第三个按钮。

    h1.addEventListener("animationend", (e) => {
        if (e.animationName === "-head1") {
            console.warn("-head1 动画结束。");
            h2.style.display = "block";
            h2.style.animation = "-head2 1.4s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        }
    });
    h2.addEventListener("animationend", (e) => {
        if (e.animationName === "-head2") {
            console.warn("-head2 动画结束。");
            div.style.animation = "-top 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            head.style.animation = "-head 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        }
    });
    div.addEventListener("animationend", (e) => {
        if (e.animationName === "-top") {
            console.warn("-top 动画结束。");
            console.warn("-head 动画结束。");
            btn1.style.animation = "-btn1 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            btn2.style.animation = "-btn2 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            btn3.style.animation = "-btn3 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            btn2.style.opacity = 1;
            btn3.style.opacity = 1;
        }
    });
});