document.addEventListener("DOMContentLoaded", () => {

    /* 第一部分。 */

    const h1 = document.querySelector(".head1"); // h1 标签。
    const h2 = document.querySelector(".head2"); // h2 标签。
    const div = document.querySelector(".top"); // 包含 h1 和 h2 的 div 标签。
    const head = document.querySelector(".head"); // The Play Games 版本标签。
    const functions = document.querySelector(".head3"); // 功能按钮组。

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
            functions.style.animation = "-head3 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            console.warn("-top 动画结束。");
            console.warn("-head 动画结束。");
        }
    });
});

/* 第二部分。 */
function functions() {
    const div = document.querySelector(".head3");
    const info = document.createElement("button");
    info.innerHTML = "info";
    info.className = ".btn1";
    const success = document.createElement("button");
    success.innerHTML = "success";
    success.className = ".btn2";
    const fail = document.createElement("button");
    fail.innerHTML = "fail";
    fail.className = ".btn3";
    const warning = document.createElement("button");
    warning.innerHTML = "warning";
    warning.className = ".btn4";
    const input = document.createElement("button");
    input.innerHTML = "input";
    input.className = ".btn5";
    const transmit = document.createElement("button");
    transmit.innerHTML = "transmit";
    transmit.className = ".btn6";
    const choice = document.createElement("button");
    choice.innerHTML = "choice";
    choice.className = ".btn7";
    const link = document.createElement("button");
    link.innerHTML = "link";
    link.className = ".btn8";
    const command = document.createElement("button");
    command.innerHTML = "command";
    command.className = ".btn9";
    const p = document.createElement("p");
    p.className = ".para";
    p.textContent = "至今为止，The Play Games 将预装以下函数。";

    div.appendChild(p);
    div.appendChild(info);
    div.appendChild(success);
    div.appendChild(fail);
    div.appendChild(warning);
    div.appendChild(input);
    div.appendChild(transmit);
    div.appendChild(choice);
    div.appendChild(link);
    div.appendChild(command);

    div.style.animation = "head3- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
    div.addEventListener("animationend", (e) => {
        if (e.animationName === "head3-") {
            p.style.animation = "head3 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        }
    });
    p.addEventListener("animationend", (e) => {
        if (e.animationName === "head3") {
            info.style.animation = "-btn1 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            success.style.animation = "-btn2 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            fail.style.animation = "-btn3 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            warning.style.animation = "-btn4 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            input.style.animation = "-btn5 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            transmit.style.animation = "-btn6 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            choice.style.animation = "-btn7 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            link.style.animation = "-btn8 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            command.style.animation = "-btn9 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        }
    });

    info.onclick = () => {
        var a = prompt("请输入要显示的文字。")
        info(a);
    }
    success.onclick = () => {
        var a = prompt("请输入要显示的文字。")
        success(a);
    }
    fail.onclick = () => {
        var a = prompt("请输入要显示的文字。")
        fail(a);
    }
    warning.onclick = () => {
        var a = prompt("请输入要显示的文字。")
        warning(a);
    }
    input.onclick = () => {
        var a = prompt("请输入要显示的文字。")
        var b = prompt("请输入提示信息。")
        input(a, b);
    }
    transmit.onclick = () => {
        var a = prompt("请输入要显示的文字。")
        transmit(a);
    }
    choice.onclick = () => {
        var a = prompt("请输入要显示的文字。")
        var b = prompt("请输入选项1。")
        var c = prompt("请输入选项2。")
        choice(a, );
    }
    link.onclick = () => {
        var a = prompt("请输入要显示的文字。")
        var b = prompt("请输入链接地址。")
        link(a, b);
    }
    command.onclick = () => {
        var a = prompt("请输入要显示的文字。")
        command(a);
    }
}
