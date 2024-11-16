document.addEventListener("DOMContentLoaded", () => {

    /* 第一部分。 */

    const h1 = document.querySelector(".head1"); // h1 标签。
    const h2 = document.querySelector(".head2"); // h2 标签。
    const div = document.querySelector(".top"); // 包含 h1 和 h2 的 div 标签。
    const head = document.querySelector(".head"); // The Play Games 版本标签。
    const f1 = document.querySelector(".head3"); // 功能按钮组。
    const f2 = document.querySelector(".head4"); // 功能按钮组。

    h1.addEventListener("animationend", (e) => {
        if (e.animationName === "-head1") {
            h2.style.display = "block";
            h2.style.animation = "-head2 1.4s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        }
    });
    h2.addEventListener("animationend", (e) => {
        if (e.animationName === "-head2") {
            div.style.animation = "-top 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            head.style.animation = "-head 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        }
    });
    div.addEventListener("animationend", (e) => {
        if (e.animationName === "-top") {
            f1.style.animation = "-head3 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            f2.style.animation = "-head4 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        }
    });
});

/* 第二部分。 */
function fn1() {
    const div = document.querySelector(".head3");
    const infoBtn = document.createElement("button");
    infoBtn.innerHTML = "info";
    infoBtn.className = ".btn1";
    const successBtn = document.createElement("button");
    successBtn.innerHTML = "success";
    successBtn.className = ".btn2";
    const failBtn = document.createElement("button");
    failBtn.innerHTML = "fail";
    failBtn.className = ".btn3";
    const warningBtn = document.createElement("button");
    warningBtn.innerHTML = "warning";
    warningBtn.className = ".btn4";
    const inputBtn = document.createElement("button");
    inputBtn.innerHTML = "input";
    inputBtn.className = ".btn5";
    const transmitBtn = document.createElement("button");
    transmitBtn.innerHTML = "transmit";
    transmitBtn.className = ".btn6";
    const choiceBtn = document.createElement("button");
    choiceBtn.innerHTML = "choice";
    choiceBtn.className = ".btn7";
    const linkBtn = document.createElement("button");
    linkBtn.innerHTML = "link";
    linkBtn.className = ".btn8";
    const commandBtn = document.createElement("button");
    commandBtn.innerHTML = "command";
    commandBtn.className = ".btn9";
    const p = document.createElement("p");
    p.className = ".para";
    p.textContent = "至今为止，The Play Games 将预装以下函数。";

    if (div.children.length <= 1) { // 若 div 标签下没有子元素，则创建子元素。
        div.appendChild(p);
        div.appendChild(infoBtn);
        div.appendChild(successBtn);
        div.appendChild(failBtn);
        div.appendChild(warningBtn);
        div.appendChild(inputBtn);
        div.appendChild(transmitBtn);
        div.appendChild(choiceBtn);
        div.appendChild(linkBtn);
        div.appendChild(commandBtn);
    }

    div.style.animation = "head3- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";

    infoBtn.onclick = () => {
        var a = prompt("请输入要显示的文字。")
        info(a);
    }
    successBtn.onclick = () => {
        var a = prompt("请输入要显示的文字。")
        success(a);
    }
    failBtn.onclick = () => {
        var a = prompt("请输入要显示的文字。")
        fail(a);
    }
    warningBtn.onclick = () => {
        var a = prompt("请输入要显示的文字。")
        warning(a);
    }
    inputBtn.onclick = () => {
        var a = prompt("请输入要显示的文字。")
        var b = prompt("请输入提示语。");
        var c = input(a, b);
    }
    transmitBtn.onclick = () => {
        var a = prompt("请输入要显示的文字。")
        transmit(a);
    }
    choiceBtn.onclick = () => {
        var a = prompt("请输入要显示的文字。")
        var b = prompt("请输入选项1。")
        var c = prompt("请输入选项2。")
        var d = choice(a, b, c);
    }
    linkBtn.onclick = () => {
        var a = prompt("请输入要显示的文字。")
        var b = prompt("请输入链接地址。")
        link(a, b);
    }
    commandBtn.onclick = () => {
        var a = prompt("请输入要显示的文字。")
        command(a);
    }
}

function fn2() {
    const div = document.querySelector(".head4");
    div.style.marginR
    const infoBtn = document.createElement("button");
    infoBtn.innerHTML = "info";
    infoBtn.className = ".btn1";
    infoBtn.onclick = () => {
        info("Hello, The Play Games!");
    }
    const successBtn = document.createElement("button");
    successBtn.innerHTML = "success";
    successBtn.className = ".btn2";
    successBtn.onclick = () => {
        success("Very nice to meet you!");
    }
    const failBtn = document.createElement("button");
    failBtn.innerHTML = "fail";
    failBtn.className = ".btn3";
    failBtn.onclick = () => {
        fail("Sorry, sometimes this may not be able to work.");
    }
    const warningBtn = document.createElement("button");
    warningBtn.innerHTML = "warning";
    warningBtn.className = ".btn4";
    warningBtn.onclick = () => {
        warning("But you can still continue to use it.");
    }
    const inputBtn = document.createElement("button");
    inputBtn.innerHTML = "input";
    inputBtn.className = ".btn5";
    inputBtn.onclick = () => {
        input("I am quite glad to hear your opinions.", "Enter your sentenses here:");
    }
    const transmitBtn = document.createElement("button");
    transmitBtn.innerHTML = "transmit";
    transmitBtn.className = ".btn6";
    transmitBtn.onclick = () => {
        transmit("I cannot transmit files at this time, I feel sorry for you.");
    }
    const choiceBtn = document.createElement("button");
    choiceBtn.innerHTML = "choice";
    choiceBtn.className = ".btn7";
    choiceBtn.onclick = () => {
        choice("How do you like The functions above?", "Excellent", "Terrible");
    }
    const linkBtn = document.createElement("button");
    linkBtn.innerHTML = "link";
    linkBtn.className = ".btn8";
    linkBtn.onclick = () => {
        link("Click here to visit our information website!", "https://modificationer-mdf.github.io/tpg_info/");
    }
    const commandBtn = document.createElement("button");
    commandBtn.innerHTML = "command";
    commandBtn.className = ".btn9";
    commandBtn.onclick = () => {
        command("This function is still developing......");
    }
    const Fn_1 = document.createElement("button");
    Fn_1.innerHTML = "fn_1";
    Fn_1.onclick = () => {
        fn_1();
    }
    const Fn_2 = document.createElement("button");
    Fn_2.innerHTML = "fn_2";
    Fn_2.onclick = () => {
        fn_2();
    }
    const nullBtn = document.createElement("button");
    nullBtn.innerHTML = "在函数的值中输入 null 值";
    nullBtn.onclick = () => {
        info(null);
    }
    const undefinedBtn = document.createElement("button");
    undefinedBtn.innerHTML = "在函数的值中输入 undefined 值";
    undefinedBtn.onclick = () => {
        info(undefined);
    }
    const numBtn = document.createElement("button");
    numBtn.innerHTML = "重置 nullCount 的值";
    numBtn.onclick = () => {
        nullCount = 0;
    }
    const infoNumBtn = document.createElement("button");
    infoNumBtn.innerHTML = "重置 infoNum 的值";
    infoNumBtn.onclick = () => {
        infoNum = 0;
    }
    const successNumBtn = document.createElement("button");
    successNumBtn.innerHTML = "重置 successNum 的值";
    successNumBtn.onclick = () => {
        successNum = 0;
    }
    const failNumBtn = document.createElement("button");
    failNumBtn.innerHTML = "重置 failNum 的值";
    failNumBtn.onclick = () => {
        failNum = 0;
    }
    const warningNumBtn = document.createElement("button");
    warningNumBtn.innerHTML = "重置 warningNum 的值";
    warningNumBtn.onclick = () => {
        warningNum = 0;
    }
    const inputNumBtn = document.createElement("button");
    inputNumBtn.innerHTML = "重置 inputNum 的值";
    inputNumBtn.onclick = () => {
        inputNum = 0;
    }
    const transmitNumBtn = document.createElement("button");
    transmitNumBtn.innerHTML = "重置 transmitNum 的值";
    transmitNumBtn.onclick = () => {
        transmitNum = 0;
    }
    const choiceNumBtn = document.createElement("button");
    choiceNumBtn.innerHTML = "重置 choiceNum 的值";
    choiceNumBtn.onclick = () => {
        choiceNum = 0;
    }
    const linkNumBtn = document.createElement("button");
    linkNumBtn.innerHTML = "重置 linkNum 的值";
    linkNumBtn.onclick = () => {
        linkNum = 0;
    }
    const commandNumBtn = document.createElement("button");
    commandNumBtn.innerHTML = "重置 commandNum 的值";
    commandNumBtn.onclick = () => {
        commandNum = 0;
    }
    const p = document.createElement("p");
    p.className = ".para";
    p.textContent = "以下的这些函数已经提前预装好，可供演示。";

    if (div.children.length <= 1) {
        div.appendChild(p);
        div.appendChild(infoBtn);
        div.appendChild(successBtn);
        div.appendChild(failBtn);
        div.appendChild(warningBtn);
        div.appendChild(inputBtn);
        div.appendChild(transmitBtn);
        div.appendChild(choiceBtn);
        div.appendChild(linkBtn);
        div.appendChild(commandBtn);
        div.appendChild(Fn_1);
        div.appendChild(Fn_2);
        div.appendChild(nullBtn);
        div.appendChild(undefinedBtn);
        div.appendChild(numBtn);
        div.appendChild(infoNumBtn);
        div.appendChild(successNumBtn);
        div.appendChild(failNumBtn);
        div.appendChild(warningNumBtn);
        div.appendChild(inputNumBtn);
        div.appendChild(transmitNumBtn);
        div.appendChild(choiceNumBtn);
        div.appendChild(linkNumBtn);
        div.appendChild(commandNumBtn);
    }

    div.style.animation = "head4- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
}