/* 第一部分。 */
document.addEventListener("DOMContentLoaded", () => {
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
            f1.style.animation = "_head3 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            f2.style.animation = "_head4 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        }
    });
});

/* 第二部分。 */
function fn1() {
    const div = document.querySelector(".head3");
    const dakai = document.getElementById("1");
    dakai.style.transition = "all 0.7s cubic-bezier(0.33, 1, 0.68, 1)"
    const infoBtn = document.createElement("button");
    infoBtn.style.marginTop = "15px";
    infoBtn.innerHTML = "info";
    infoBtn.className = "btn1";
    infoBtn.onclick = async () => {
        var res = await keyin("输入你想显示在 info 窗口上的信息。", "");
        // log(res);
        info(res);
    };
    const successBtn = document.createElement("button");
    successBtn.innerHTML = "success";
    successBtn.className = "btn2";
    successBtn.onclick = async () => {
        var res = await keyin("输入你想显示在 success 窗口上的信息。", "");
        success(res);
    };
    const failBtn = document.createElement("button");
    failBtn.innerHTML = "fail";
    failBtn.className = "btn3";
    failBtn.onclick = async () => {
        var res = await keyin("输入你想显示在 fail 窗口上的信息。", "");
        fail(res);
    };
    const warningBtn = document.createElement("button");
    warningBtn.innerHTML = "warning";
    warningBtn.className = "btn4";
    warningBtn.onclick = async () => {
        var res = await keyin("输入你想显示在 warning 窗口上的信息。", "");
        warning(res);
    };
    const inputBtn = document.createElement("button");
    inputBtn.innerHTML = "input";
    inputBtn.className = "btn5";
    inputBtn.onclick = async () => {
        var res = await keyin("输入你想显示在 input 窗口上的信息。", "");
        var ult = await keyin("请输入 input 窗口上 placeholder 的文字。");
        input(res, ult);
    };
    const transmitBtn = document.createElement("button");
    transmitBtn.innerHTML = "transmit";
    transmitBtn.className = "btn6";
    transmitBtn.onclick = async () => {
        var res = await keyin("输入你想显示在 transmit 窗口上的信息。", "");
        transmit(res);
    };
    const choiceBtn = document.createElement("button");
    choiceBtn.innerHTML = "choice";
    choiceBtn.className = "btn7";
    choiceBtn.onclick = async () => {
        var res = await keyin("输入你想显示在 choice 窗口上的信息。", "");
        var choice1 = await keyin("请输入第一个选项。");
        var choice2 = await keyin("请输入第二个选项。");
        choice(res, choice1, choice2);
    };
    const linkBtn = document.createElement("button");
    linkBtn.innerHTML = "link";
    linkBtn.className = "btn8";
    linkBtn.onclick = async () => {
        var res = await keyin("输入你想显示在 link 窗口上的信息。", "");
        var url = await keyin("请输入你要链接的地址。");
        link(res, url);
    };
    const commandBtn = document.createElement("button");
    commandBtn.innerHTML = "command";
    commandBtn.className = "btn9";
    commandBtn.onclick = async () => {
        var res = await keyin("输入你想显示在 command 窗口上的信息。", "");
        command(res);
    };
    const importantBtn = document.createElement("button");
    importantBtn.innerHTML = "important";
    importantBtn.className = "btn22";
    importantBtn.onclick = async () => {
        var res = await keyin("输入你想显示在 important 窗口上的信息。", "");
        important(res);
    };
    const settings = document.createElement("button");
    settings.innerHTML = "设置";
    settings.className = "btn24";
    settings.onclick = async () => {
        var set = await choice("请选择以下函数使用的主题。", "Aero", "Neon");
        if (set) {
            theme = "Aero";
        } else {
            theme = "Neon";
        }
    };
    const logBtn = document.createElement("button");
    logBtn.innerHTML = "日志";
    logBtn.className = "btn25";
    logBtn.onclick = async () => {
        let date = new Date();
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        date = `${year} 年 ${month} 月 ${day} 日`;
        await important(`
        我在这里写一下我开发该网页的日志吧。
        <br /> （按 [确定] 继续。）`);
        await important(`
        创建日期：2024 年（几月我忘了）；
        <br /> 版本号：0.9 。
        <br /> 你正在查看的是 ${date} 的版本。
        <br /> （按 [确定] 继续。）`);
        await important(`
        在开发过程中我遇到了很多困难，开发速度也非常缓慢。
        <br /> 一周更新 1 次，只有周五（也许）、周六、周日有时间更新。（甚至微机课上都在检查网页）
        <br /> 这些函数也可能会存在较多的 bug，但我会努力修复它们。`);
        await important(`
        也不知道为什么，但我还是很开心。我的编程水平也得到了进步。
        <br /> （按 [确定] 继续。）`);
        await important(`
        我将会继续维护 The Play Games 的网页。但与此同时，主程序的下一次更新可能需要等到 2025 年。
        <br /> （按 [确定] 继续。）`);
        await important(`
        最后，感谢你使用 The Play Games！
        <br /> （按 [确定] 继续。）`);
        await info(`你可以在 [设置] 中应用更现代化的 Neon 主题！当前主题：${theme}。`);
    };

    const all = [
        settings,
        logBtn,
        infoBtn,
        successBtn,
        failBtn,
        warningBtn,
        inputBtn,
        transmitBtn,
        choiceBtn,
        linkBtn,
        commandBtn,
        importantBtn
    ];

    all.forEach(btn => {
        btn.style.display = "none";
    });

    if (div.children.length <= 1) { // 若 div 标签下没有子元素，则创建子元素。
        all.forEach(btn => {
            div.appendChild(btn);
        });
    }

    div.style.animation = "head3- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
    dakai.style.backgroundColor = "#001dff99";
    dakai.style.width = "540px";
    dakai.textContent = "The Play Games 将预装以下函数。";

    div.addEventListener("animationend", (e) => {
        if (e.animationName === "head3-") {
            all.forEach(btn => {
                btn.style.display = "block";
                btn.style.opacity = "0"; // 初始化为 0 。
                btn.style.transition = "opacity 0.7s cubic-bezier(0.33, 1, 0.68, 1)";
            });
            setTimeout(() => {
                all.forEach(btn => {
                    btn.style.opacity = "1"; // 显示。
                });
            }, 0);
        }
    });
}

function fn2() {
    const div = document.querySelector(".head4");
    const div1 = document.createElement("div");
    div1.className = "div1";
    div1.textContent = "主函数区";
    const div2 = document.createElement("div");
    div2.className = "div2";
    div2.textContent = "副函数区";
    const div3 = document.createElement("div");
    div3.className = "div3";
    div3.textContent = "调试区";
    const dakai = document.getElementById("2");
    dakai.textContent = "查看。";
    dakai.style.width = "140px";
    const infoBtn = document.createElement("button");
    infoBtn.innerHTML = "info";
    infoBtn.className = "btn1";
    infoBtn.onclick = () => {
        info("Hello, The Play Games!");
    };
    const successBtn = document.createElement("button");
    successBtn.innerHTML = "success";
    successBtn.className = "btn2";
    successBtn.onclick = () => {
        success("Very nice to meet you!");
    };
    const failBtn = document.createElement("button");
    failBtn.innerHTML = "fail";
    failBtn.className = "btn3";
    failBtn.onclick = () => {
        fail("Sorry, sometimes this may not be able to work.");
    };
    const warningBtn = document.createElement("button");
    warningBtn.innerHTML = "warning";
    warningBtn.className = "btn4";
    warningBtn.onclick = () => {
        warning("But you can still continue to use it.");
    };
    const inputBtn = document.createElement("button");
    inputBtn.innerHTML = "input";
    inputBtn.className = "btn5";
    inputBtn.onclick = () => {
        input("I am quite glad to hear your opinions.", "Enter your sentences here:");
    };
    const transmitBtn = document.createElement("button");
    transmitBtn.innerHTML = "transmit";
    transmitBtn.className = "btn6";
    transmitBtn.onclick = () => {
        transmit("I cannot transmit files at this time, I feel sorry for you.");
    };
    const choiceBtn = document.createElement("button");
    choiceBtn.innerHTML = "choice";
    choiceBtn.className = "btn7";
    choiceBtn.onclick = () => {
        choice("How do you like The functions above?", "Excellent", "Terrible");
    };
    const linkBtn = document.createElement("button");
    linkBtn.innerHTML = "link";
    linkBtn.className = "btn8";
    linkBtn.onclick = () => {
        link("Click here to visit our information website!", "https://modificationer-mdf.github.io/tpg_info/");
    };
    const commandBtn = document.createElement("button");
    commandBtn.innerHTML = "command";
    commandBtn.className = "btn9";
    commandBtn.onclick = () => {
        command("This function is still developing......");
    };
    const Fn_1 = document.createElement("button");
    Fn_1.innerHTML = "fn_1";
    Fn_1.className = "fn-1";
    Fn_1.onclick = () => {
        fn_1();
    };
    const Fn_2 = document.createElement("button");
    Fn_2.innerHTML = "fn_2";
    Fn_2.className = "fn-2";
    Fn_2.onclick = () => {
        fn_2();
    };
    const nullBtn = document.createElement("button");
    nullBtn.innerHTML = "在函数的值中输入 null 值";
    nullBtn.className = "btn10";
    nullBtn.onclick = () => {
        info(null);
    };
    const undefinedBtn = document.createElement("button");
    undefinedBtn.innerHTML = "在函数的值中输入 undefined 值";
    undefinedBtn.className = "btn11";
    undefinedBtn.onclick = () => {
        info(undefined);
    };
    const numBtn = document.createElement("button");
    numBtn.innerHTML = "重置 nullCount 的值";
    numBtn.className = "btn12";
    numBtn.onclick = () => {
        nullCount = 0;
    };
    const infoNumBtn = document.createElement("button");
    infoNumBtn.innerHTML = "重置 infoNum 的值";
    infoNumBtn.className = "btn13";
    infoNumBtn.onclick = () => {
        infoNum = 0;
    };
    const successNumBtn = document.createElement("button");
    successNumBtn.innerHTML = "重置 successNum 的值";
    successNumBtn.className = "btn14";
    successNumBtn.onclick = () => {
        successNum = 0;
    };
    const failNumBtn = document.createElement("button");
    failNumBtn.innerHTML = "重置 failNum 的值";
    failNumBtn.className = "btn15";
    failNumBtn.onclick = () => {
        failNum = 0;
    };
    const warningNumBtn = document.createElement("button");
    warningNumBtn.innerHTML = "重置 warningNum 的值";
    warningNumBtn.className = "btn16";
    warningNumBtn.onclick = () => {
        warningNum = 0;
    };
    const inputNumBtn = document.createElement("button");
    inputNumBtn.innerHTML = "重置 inputNum 的值";
    inputNumBtn.className = "btn17";
    inputNumBtn.onclick = () => {
        inputNum = 0;
    };
    const transmitNumBtn = document.createElement("button");
    transmitNumBtn.innerHTML = "重置 transmitNum 的值";
    transmitNumBtn.className = "btn18";
    transmitNumBtn.onclick = () => {
        transmitNum = 0;
    };
    const choiceNumBtn = document.createElement("button");
    choiceNumBtn.innerHTML = "重置 choiceNum 的值";
    choiceNumBtn.className = "btn19";
    choiceNumBtn.onclick = () => {
        choiceNum = 0;
    };
    const linkNumBtn = document.createElement("button");
    linkNumBtn.innerHTML = "重置 linkNum 的值";
    linkNumBtn.className = "btn20";
    linkNumBtn.onclick = () => {
        linkNum = 0;
    };
    const commandNumBtn = document.createElement("button");
    commandNumBtn.innerHTML = "重置 commandNum 的值";
    commandNumBtn.className = "btn21";
    commandNumBtn.onclick = () => {
        commandNum = 0;
    };
    const imp = document.createElement("button");
    imp.textContent = "important";
    imp.className = "btn22";
    imp.onclick = () => {
        important("This is an important message! <br /> (Background covered with acrylic material.)");
    };
    const key = document.createElement("button");
    key.textContent = "keyin";
    key.className = "btn23";
    key.onclick = () => {
        keyin("Keyin() is a function that can be used to input keys like input().");
    };

    const all = [
        infoBtn,
        successBtn,
        failBtn,
        warningBtn,
        inputBtn,
        transmitBtn,
        choiceBtn,
        linkBtn,
        commandBtn,
        imp,
        key,
        Fn_1,
        Fn_2,
        nullBtn,
        undefinedBtn,
        numBtn,
        infoNumBtn,
        successNumBtn,
        failNumBtn,
        warningNumBtn,
        inputNumBtn,
        transmitNumBtn,
        choiceNumBtn,
        linkNumBtn,
        commandNumBtn,
    ];

    div1.style.display = "none";
    div2.style.display = "none";
    div3.style.display = "none";
    all.forEach(btn => {
        btn.type = "button";
        btn.style.display = "none";
    });

    if (div.children.length <= 1) {
        div.appendChild(div1);
        div.appendChild(div2);
        div.appendChild(div3);
        all.forEach((btn, index) => {
            if (index >= 0 && index < 11) {
                div1.appendChild(btn);
            } else if (index >= 11 && index < 13) {
                div2.appendChild(btn);
            } else {
                div3.appendChild(btn);
            }
        });
    }

    div.style.animation = "head4- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
    dakai.textContent = "我们在以下的函数中增加了预设内容。";
    dakai.style.transition = "all 0.7s cubic-bezier(0.33, 1, 0.68, 1)";
    dakai.style.backgroundColor = "#001dff99";
    dakai.style.width = "580px";

    div.addEventListener("animationend", (e) => {
        if (e.animationName === "head4-") {
            all.forEach(btn => {
                btn.style.display = "block";
                btn.style.opacity = "0"; // 初始化为 0 。
                btn.style.transition = "opacity 0.7s cubic-bezier(0.33, 1, 0.68, 1)";
            });
            div1.style.display = "block";
            div1.style.opacity = "0";
            div1.style.transition = "opacity 0.7s cubic-bezier(0.33, 1, 0.68, 1)";
            div2.style.display = "block";
            div2.style.opacity = "0";
            div2.style.transition = "opacity 0.7s cubic-bezier(0.33, 1, 0.68, 1)";
            div3.style.display = "block";
            div3.style.opacity = "0";
            div3.style.transition = "opacity 0.7s cubic-bezier(0.33, 1, 0.68, 1)";
            setTimeout(() => {
                all.forEach(btn => {
                    btn.style.opacity = "1"; // 改变为 1，触发过渡。
                });
                div1.style.opacity = "1";
                div2.style.opacity = "1";
                div3.style.opacity = "1";
            }, 0);
        }
    });
}
