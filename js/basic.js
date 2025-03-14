function urcc(f, c) {
    const cz = Array.from(f.children).find((child) =>
        child.className === c.className && // 类名相同。
        child.style.top === c.style.top); // top 值相同。
    if (cz) cz.innerHTML = c.innerHTML;
    else f.appendChild(c);
}

function fn0() {
    if (mode === "Play") fn1();
    else fn2();
}

document.addEventListener(`DOMContentLoaded`, () => {
    const h1 = document.querySelector(`.head1`); // h1 标签。
    const h2 = document.querySelector(`.head2`); // h2 标签。
    const div = document.querySelector(`.top`); // 包含 h1 和 h2 的 div 标签。
    const head = document.querySelector(`.head`); // The Play Games 版本标签。
    const f1 = document.querySelector(`.head3`); // 功能按钮组。
    const f3 = document.querySelector(`.head4`); // 功能按钮组。

    h1.style.display = "block";
    h1.style.animation = `-head1 1.4s forwards ${easing}`;
    h1.addEventListener(`animationend`, (e) => {
        if (e.animationName === `-head1`) {
            h2.style.display = `block`;
            h2.style.animation = `-head2 1.4s forwards ${easing}`;
        }
    });
    h2.addEventListener(`animationend`, (e) => {
        if (e.animationName === `-head2`) {
            div.style.animation = `-top 0.7s forwards ${easing}`;
            head.style.animation = `-head 0.7s forwards ${easing}`;
        }
    });
    div.addEventListener(`animationend`, (e) => {
        if (e.animationName === `-top`) {
            f1.style.animation = `_head3 0.7s forwards ${easing}`;
            f3.style.animation = `_head4 0.7s forwards ${easing}`;
        }
    });
    fn4();
});

/* 第二部分。 */
function fn1() {
    const div = document.querySelector(`.head3`);
    const dakai = document.getElementById(`1`);
    dakai.style.transition = `all 0.7s ${easing}`;
    const infoBtn = document.createElement(`button`);
    infoBtn.style.marginTop = `15px`;
    infoBtn.innerHTML = `info`;
    infoBtn.className = `btn1`;
    infoBtn.onclick = async () => {
        let res = await inp(`输入你想显示在 info() 上的信息。`, `在此输入。`);
        info(res);
    };
    const cgBtn = document.createElement(`button`);
    cgBtn.innerHTML = `cg`;
    cgBtn.className = `btn2`;
    cgBtn.onclick = async () => {
        let res = await inp(`输入你想显示在 cg() 上的信息。`, `在此输入。`);
        cg(res);
    };
    const failBtn = document.createElement(`button`);
    failBtn.innerHTML = `fail`;
    failBtn.className = `btn3`;
    failBtn.onclick = async () => {
        let res = await inp(`输入你想显示在 fail() 上的信息。`, `在此输入。`);
        fail(res);
    };
    const warnBtn = document.createElement(`button`);
    warnBtn.innerHTML = `warn`;
    warnBtn.className = `btn4`;
    warnBtn.onclick = async () => {
        let res = await inp(`输入你想显示在 warn() 上的信息。`, `在此输入。`);
        warn(res);
    };
    const inpBtn = document.createElement(`button`);
    inpBtn.innerHTML = `inp`;
    inpBtn.className = `btn5`;
    inpBtn.onclick = async () => {
        let res = await inp(`这就是 inp() 。`, `可以在这里输入一些文字。`);
        info(`你输入了：“${res}”。`);
    };
    const tranBtn = document.createElement(`button`);
    tranBtn.innerHTML = `tran`;
    tranBtn.className = `btn6`;
    tranBtn.onclick = async () => {
        let res = await inp(`输入你想显示在 tran() 上的信息。`, `在此输入。`);
        tran(res);
    };
    const xzBtn = document.createElement(`button`);
    xzBtn.innerHTML = `xz`;
    xzBtn.className = `btn7`;
    xzBtn.onclick = async () => {
        let res = await inp(`输入你想显示在 xz() 上的信息。`, `在此输入。`);
        let n = await inp(`请输入 xz() 上选项的数量。`, `在此输入。`);
        n = Number(n);
        let array = new Array(n);
        for (let i = 0; i <= n - 1; i++) {
            array[i] = await inp(`请输入 xz() 上第 ${i + 1} 个选项。`, `在此输入。`);
        }
        xz(res, n, array);
    };
    const ljBtn = document.createElement(`button`);
    ljBtn.innerHTML = `lj`;
    ljBtn.className = `btn8`;
    ljBtn.onclick = async () => {
        let res = await inp(`输入你想显示在 lj() 上的信息。`, `在此输入。`);
        let url = await inp(`请输入你要链接的地址。`, "在此输入。");
        lj(res, url, false);
    };
    const wzBtn = document.createElement(`button`);
    wzBtn.innerHTML = `wz`;
    wzBtn.className = `btn22`;
    wzBtn.onclick = async () => {
        let res = await inp(`输入你想显示在 wz() 上的信息。`, `在此输入。`);
        wz(res);
    };

    const all = [
        infoBtn,
        cgBtn,
        failBtn,
        warnBtn,
        inpBtn,
        tranBtn,
        xzBtn,
        ljBtn,
        wzBtn
    ];

    all.forEach(btn => {
        btn.style.display = `none`;
    });

    if (div.children.length <= 1) { // 若 div 标签下没有子元素，则创建子元素。
        all.forEach(btn => {
            div.appendChild(btn);
        });
    }

    div.style.animation = `head3- 0.7s forwards ${easing}`;
    dakai.style.backgroundColor = `#001dff99`;
    dakai.style.width = `540px`;
    dakai.textContent = `你可以在此设置和演示这些新函数。`;

    div.addEventListener(`animationend`, (e) => {
        if (e.animationName === `head3-`) {
            all.forEach(btn => {
                btn.style.display = `block`;
                btn.style.color = "#ffffff";
                btn.style.opacity = `0`; // 初始化为 0 。
                btn.style.transition = `opacity 0.7s ${easing}`;
            });
            setTimeout(() => {
                all.forEach(btn => {
                    btn.style.opacity = `1`; // 显示。
                });
            }, 0);
        }
    });
}

function fn2() {
    const div = document.querySelector(".head3");
    const div1 = document.createElement(`div`);
    div1.className = `div1`;
    div1.textContent = `主函数区`;
    const div2 = document.createElement(`div`);
    div2.className = `div2`;
    div2.textContent = `副函数区`;
    const div3 = document.createElement(`div`);
    div3.className = `div3`;
    div3.textContent = `调试区`;
    const dakai = document.getElementById("1");
    const infoBtn = document.createElement(`button`);
    infoBtn.innerHTML = `info`;
    infoBtn.className = `btn1`;
    infoBtn.onclick = () => {
        info("你好，欢迎使用 The Play Games！", deftime);
    };
    const cgBtn = document.createElement(`button`);
    cgBtn.innerHTML = `cg`;
    cgBtn.className = `btn2`;
    cgBtn.onclick = () => {
        cg("当你看到这条信息时，说明你已经成功运行了主函数区的这个函数。", deftime);
    };
    const failBtn = document.createElement(`button`);
    failBtn.innerHTML = `fail`;
    failBtn.className = `btn3`;
    failBtn.onclick = () => {
        fail("但有时候可能会报错，比如 NotAllowedError。", deftime);
    };
    const warnBtn = document.createElement(`button`);
    warnBtn.innerHTML = `warn`;
    warnBtn.className = `btn4`;
    warnBtn.onclick = () => {
        warn("看到这种信息时，要格外注意了。", deftime);
    };
    const inpBtn = document.createElement(`button`);
    inpBtn.innerHTML = `inp`;
    inpBtn.className = `btn5`;
    inpBtn.onclick = () => {
        inp("我很想听到你的想法。", "在此输入……");
    };
    const tranBtn = document.createElement(`button`);
    tranBtn.innerHTML = `tran`;
    tranBtn.className = `btn6`;
    tranBtn.onclick = () => {
        tran("目前，还没有开发传输文件的功能。");
    };
    const xzBtn = document.createElement(`button`);
    xzBtn.innerHTML = `xz`;
    xzBtn.className = `btn7`;
    xzBtn.onclick = async () => {
        var res = await xz("你对以上的函数有什么看法？", 4, ["很不错。", "还可以。", "一般。", "有待改进的空间。"]);
        switch (res) {
            case "很不错。":
                info("非常感谢！你还可以尝试其他的函数。", deftime);
                break;
            case "还可以。":
                info("谢谢你的评价！", deftime);
                break;
            case "一般。":
                info("我们可以做得更好。", deftime);
                break;
            case "有待改进的空间。":
                var r = await xz("你是否想向我反馈你的建议？", 2, ["是。", "否。"]);
                if (r) {
                    await lj("点击以下链接反馈。", "mailto://Feng_14@outlook.com", true);
                    break;
                } else {
                    info("好的，我们再见。", deftime);
                }
        }
    };
    const ljBtn = document.createElement(`button`);
    ljBtn.innerHTML = `lj`;
    ljBtn.className = `btn8`;
    ljBtn.onclick = () => {
        lj("点击此处浏览 The Play Games 的信息界面！", "https://modificationer-mdf.github.io/tpg_info/", true);
    };
    const zdBtn = document.createElement(`button`);
    zdBtn.innerHTML = `zd`;
    zdBtn.className = `btn9`;
    zdBtn.onclick = () => {
        zd("在此处输入代码。");
    };
    const nullBtn = document.createElement(`button`);
    nullBtn.innerHTML = `在函数的值中输入 null 值`;
    nullBtn.className = `btn10`;
    nullBtn.onclick = () => {
        wz(null);
    };
    const undefinedBtn = document.createElement(`button`);
    undefinedBtn.innerHTML = `在函数的值中输入 undefined 值`;
    undefinedBtn.className = `btn11`;
    undefinedBtn.onclick = () => {
        wz(undefined);
    };
    const imp = document.createElement(`button`);
    imp.textContent = `wz`;
    imp.className = `btn22`;
    imp.onclick = () => {
        wz("在这里可以显示文字！ <br />（背景使用了亚克力材料。）");
    };

    const all = [
        infoBtn,
        cgBtn,
        failBtn,
        warnBtn,
        inpBtn,
        tranBtn,
        xzBtn,
        ljBtn,
        zdBtn,
        imp,
        nullBtn,
        undefinedBtn,
    ];

    div1.style.display = `none`;
    div2.style.display = `none`;
    div3.style.display = `none`;
    all.forEach(btn => {
        btn.type = "button";
        btn.style.display = "none";
    });

    if (div.children.length <= 1) {
        div.appendChild(div1);
        div.appendChild(div2);
        div.appendChild(div3);
        all.forEach((btn, index) => {
            if (index >= 0 && index < 10) {
                div1.appendChild(btn);
            } else {
                div3.appendChild(btn);
            }
        });
    }

    div.style.animation = `head3- 0.7s forwards ${easing}`;
    dakai.textContent = `我们在以下的函数中增加了预设内容。`;
    dakai.style.transition = `all 0.7s ${easing}`;
    dakai.style.backgroundColor = `#001dff99`;
    dakai.style.width = `580px`;

    div.addEventListener(`animationend`, (e) => {
        if (e.animationName === `head3-`) {
            all.forEach(btn => {
                btn.style.display = `block`;
                btn.style.color = "#ffffff";
                btn.style.opacity = "0";
                btn.style.transition = `opacity 0.7s ${easing}`;
            });
            div1.style.display = `block`;
            div1.style.opacity = `0`;
            div1.style.transition = `opacity 0.7s ${easing}`;
            div2.style.display = `block`;
            div2.style.opacity = `0`;
            div2.style.transition = `opacity 0.7s ${easing}`;
            div3.style.display = `block`;
            div3.style.opacity = `0`;
            div3.style.transition = `opacity 0.7s ${easing}`;
            setTimeout(() => {
                all.forEach(btn => {
                    btn.style.opacity = `1`;
                });
                div1.style.opacity = `1`;
                div2.style.opacity = `1`;
                div3.style.opacity = `1`;
            }, 0);
        }
    });
}

let flag = false;
async function fn3() {
    if (!flag) {
        warn(`从 0.7 版本开始，如果电脑装有 360 杀毒软件，可能会提示你下载的文件可能有病毒。但是，这是误判。`, 7000);
        let a = await xz(`你确定要下载吗？`, 2, [`是。`, `否。`]);
        if (a == "是。") {
            cg(`已打开。`, deftime);
            flag = true;
        } else {
            fail(`你终止了下载操作。`, deftime);
            return -39;
        }
    }
    const div = document.querySelector(`.head4`);
    div.style.animation = `head4- 0.7s forwards ${easing}`;
    const dakai = document.getElementById(`3`);
    dakai.style.transition = `all 0.7s ${easing}`;
    dakai.style.backgroundColor = `#001dff99`;
    dakai.style.width = `700px`;
    dakai.textContent = `你可以在此处下载 The Play Games 所有版本。`;
    const btn1 = document.createElement(`button`);
    btn1.className = `btn11`;
    btn1.style.marginTop = `20px`;
    btn1.type = `button`;
    const a1 = document.createElement(`a`);
    a1.href = `projects/Version_Collecting_1.zip`;
    a1.download = `Version_Collecting_1.zip`;
    a1.textContent = `下载 VC_Time 1（包含 The Play Games 0.1 ~ 0.6）`;
    a1.onmouseover = () => {
        rz(`2024 年 5 月 1 日发布。`);
    };
    a1.onclick = async () => {
        await tran("下载 Version_Collecting_1.zip。<br />（391 KiB）");
    };
    const btn2 = document.createElement(`button`);
    btn2.className = `btn12`;
    btn2.type = `button`;
    const a2 = document.createElement(`a`);
    a2.href = `projects/Version_0.7.zip`;
    a2.download = `Version_0.7.zip`;
    a2.textContent = `下载 The Play Games 0.7`;
    a2.onmouseover = () => {
        rz(`2024 年 8 月 22 日发布。`);
    };
    a2.onclick = async () => {
        await tran("下载 Version_0.7.zip。<br />（26653 KiB）");
    };
    const btn3 = document.createElement(`button`);
    btn3.className = `btn13`;
    btn3.type = `button`;
    const a3 = document.createElement(`a`);
    a3.href = `projects/Version_0.8.zip`;
    a3.download = `Version_0.8.zip`;
    a3.textContent = `下载 The Play Games 0.8`;
    a3.onmouseover = () => {
        rz(`2024 年 8 月 27 日发布。`);
    };
    a3.onclick = async () => {
        await tran("下载 Version_0.8.zip。<br />（27496 KiB）");
    };
    const all = [
        btn1,
        btn2,
        btn3,
        a1,
        a2,
        a3
    ];
    all.forEach(btn => {
        btn.style.display = `none`;
    });
    if (div.children.length <= 1) {
        all.forEach((btn, index) => {
            if (index >= 0 && index < 3) div.appendChild(btn);
            else if (index === 3) btn1.appendChild(btn);
            else if (index === 4) btn2.appendChild(btn);
            else if (index === 5) btn3.appendChild(btn);
        });
    }
    div.addEventListener(`animationend`, (e) => {
        if (e.animationName === `head4-`) {
            all.forEach(btn => {
                btn.style.display = `block`;
                btn.color = "#ffffff";
                btn.style.opacity = `0`; // 初始化为 0 。
                btn.style.transition = `opacity 0.7s ${easing}`;
            });
            setTimeout(() => {
                all.forEach(btn => {
                    btn.style.opacity = `1`; // 显示。
                });
            }, 0);
        }
    });
}

function totop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

function zhan(s) {
    const t = s.pop();
    s.push(t);
    return t;
}

function fn4() {
    const ctrl = document.querySelector(".control-pad");
    const title = document.createElement("p");
    title.innerHTML = "控制台";
    title.className = "title";

    const ms = document.createElement("p");
    ms.innerHTML = "模式";
    ms.className = "cont";
    const ys = document.createElement("button");
    ys.type = "button";
    ys.innerHTML = "Demo";
    ys.className = "zd1";
    ys.onclick = () => {
        if (mode === "Demo") {
            warn("当前模式已为 Demo。", deftime);
        } else {
            mode = "Demo";
            info("已切换到 Demo 模式。", deftime);
        }
    };
    const js = document.createElement("button");
    js.type = "button";
    js.innerHTML = "Play";
    js.className = "zd2";
    js.onclick = () => {
        if (mode === "Play") {
            warn("当前模式已为 Play。", deftime);
        } else {
            mode = "Play";
            info("已切换到 Play 模式。", deftime);
        }
    };

    const zt = document.createElement("p");
    zt.innerHTML = `主题`;
    zt.className = "cont";
    zt.style.top = "20vh";
    const a = document.createElement("button");
    a.type = "button";
    a.innerHTML = "Aero";
    a.className = "zd3";
    a.onclick = () => {
        if (theme === "Aero") {
            warn("你已经在使用 Aero 主题。", deftime);
        } else {
            theme = "Aero";
            info("已切换到 Aero 主题。", deftime);
        }
    };
    const n = document.createElement("button");
    n.type = "button";
    n.innerHTML = "Neon";
    n.className = "zd4";
    n.onclick = () => {
        if (theme === "Neon") {
            warn("你已经在使用 Neon 主题。", deftime);
        } else {
            theme = "Neon";
            info("已切换到 Neon 主题。", deftime);
        }
    };

    const nullc = document.createElement("p");
    nullc.innerHTML = `nullcount`;
    nullc.className = "cont";
    nullc.style.top = "30vh";
    const inp1 = document.createElement("input");
    let f1 = false;
    inp1.type = "number";
    inp1.value = nullcount;
    inp1.className = "inpbox";
    inp1.onclick = () => {
        if (f1 === false) {
            warn("nullcount 只能为正整数。", deftime);
            f1 = true;
        }
    };
    inp1.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            if (Number(inp1.value) < 0) fail("请输入一个大于等于 0 的数字。", deftime);
            else if (Number(inp1.value) % 1 !== 0) fail("请输入一个整数。", deftime);
            else {
                nullcount = Number(inp1.value);
                info(`nullcount 已被设置为 ${nullcount}。`, deftime);
            }
        }
    });

    const eas = document.createElement("p");
    eas.innerHTML = "easing";
    eas.className = "cont";
    eas.style.top = "40vh";
    const inp2 = document.createElement("input");
    let f2 = false;
    inp2.type = "text";
    inp2.className = "inpbox";
    inp2.value = easing;
    inp2.onclick = () => {
        if (f2 === false) {
            warn("cubic-bezier 函数的格式是 cubic-bezier(x1, y1, x2, y2)。", 6000);
            f2 = true;
        }
    };
    inp2.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            if (!(inp2.value.startsWith("cubic-bezier(") && inp2.value.endsWith(")"))) {
                fail("请输入一个合法的 cubic-bezier 函数。", deftime);
            } else {
                easing = inp2.value;
                info(`easing 已被设置为 ${easing}。`, deftime);
            }
        }
    });

    const mrms = document.createElement("p");
    mrms.innerHTML = "deftime";
    mrms.className = "cont";
    mrms.style.top = "50vh";
    const inp3 = document.createElement("input");
    let f3 = false;
    inp3.type = "number";
    inp3.value = deftime;
    inp3.className = "inpbox";
    inp3.onclick = () => {
        if (f3 === false) {
            warn("deftime 只能为正数，且单位为毫秒。", deftime);
            f3 = true;
        }
    };
    inp3.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            if (Number(inp3.value) < 700) fail("请输入一个大于等于 700 的数字。", deftime);
            else {
                deftime = Number(inp3.value);
                info(`deftime 已被设置为 ${deftime} 毫秒。`, deftime);
            }
        }
    });

    const defw = document.createElement("p");
    defw.innerHTML = "defwid";
    defw.className = "cont";
    defw.style.top = "60vh";
    const inp4 = document.createElement("input");
    let f4 = false;
    inp4.type = "number";
    inp4.value = defwid;
    inp4.className = "inpbox";
    inp4.onclick = () => {
        if (f4 === false) {
            warn("该数值只能为正整数。", deftime);
            f4 = true;
        }
    };
    inp4.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            if (Number(inp4.value) < 0) fail("请输入一个大于等于 0 的数字。", deftime);
            else if (Number(inp4.value) % 1 !== 0) fail("请输入一个整数。", deftime);
            else {
                defwid = Number(inp4.value);
                info(`defwid 已被设置为 ${defwid}。`, deftime);
            }
        }
    });

    const defh = document.createElement("p");
    defh.innerHTML = "defhei";
    defh.className = "cont";
    defh.style.top = "70vh";
    const inp5 = document.createElement("input");
    let f5 = false;
    inp5.type = "number";
    inp5.value = defhei;
    inp5.className = "inpbox";
    inp5.onclick = () => {
        if (f5 === false) {
            warn("该数值只能为正整数。", deftime);
            f5 = true;
        }
    };
    inp5.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            if (Number(inp5.value) < 0) fail("请输入一个大于等于 0 的数字。", deftime);
            else if (Number(inp5.value) % 1 !== 0) fail("请输入一个整数。", deftime);
            else {
                defhei = Number(inp5.value);
                info(`defhei 已被设置为 ${defhei}。`, deftime);
            }
        }
    });

    const jdt = document.createElement("div");
    jdt.style.left = "0px";
    jdt.style.height = "5px";
    jdt.style.width = "100%";
    jdt.style.backgroundColor = "#ffffff";

    ctrl.appendChild(title);
    title.appendChild(jdt);
    ctrl.appendChild(ms);
    ctrl.appendChild(zt);
    ctrl.appendChild(eas);
    ctrl.appendChild(nullc);
    ctrl.appendChild(mrms);
    ctrl.appendChild(defw);
    ctrl.appendChild(defh);
    ms.appendChild(ys);
    ms.appendChild(js);
    zt.appendChild(a);
    zt.appendChild(n);
    nullc.appendChild(inp1);
    eas.appendChild(inp2);
    mrms.appendChild(inp3);
    defw.appendChild(inp4);
    defh.appendChild(inp5);
}

function fn5() {
    const ctrl = document.querySelector(".control-pad");
    var v1 = 0;
    var v2 = 0;
    var v3 = 0;
    var v4 = 0;
    var v5 = 0;
    var v6 = 0;
    var v7 = 0;
    var v8 = 0;
    var v9 = 0;

    // 计算各个窗口的数量
    for (let i = 0; i <= windows.length - 1; i++) {
        if (windows[i].className === "info-window") v1++;
        else if (windows[i].className === "cg-window") v2++;
        else if (windows[i].className === "fail-window") v3++;
        else if (windows[i].className === "warn-window") v4++;
        else if (windows[i].className === "inp-window") v5++;
        else if (windows[i].className === "tran-window") v6++;
        else if (windows[i].className === "xz-window") v7++;
        else if (windows[i].className === "lj-window") v8++;
        else if (windows[i].className === "zd-window") v9++;
    }

    const infoc = document.createElement("div");
    infoc.innerHTML = `Info() 数量： ${v1}。`;
    infoc.className = "cont";
    infoc.style.top = "85vh";
    infoc.style.color = "#18a689";

    const cgc = document.createElement("div");
    cgc.innerHTML = `Cg() 数量： ${v2}。`;
    cgc.className = "cont";
    cgc.style.top = "90vh";
    cgc.style.color = "#1d5837";

    const failc = document.createElement("div");
    failc.innerHTML = `Fail() 数量： ${v3}。`;
    failc.className = "cont";
    failc.style.top = "95vh";
    failc.style.color = "#791e1d";

    const warnc = document.createElement("div");
    warnc.innerHTML = `Warn() 数量： ${v4}。`;
    warnc.className = "cont";
    warnc.style.top = "100vh";
    warnc.style.color = "#847829";

    const inpc = document.createElement("div");
    inpc.innerHTML = `Inp() 数量： ${v5}。`;
    inpc.className = "cont";
    inpc.style.top = "105vh";
    inpc.style.color = "#235087";

    const tranc = document.createElement("div");
    tranc.innerHTML = `Tran() 数量： ${v6}。`;
    tranc.className = "cont";
    tranc.style.top = "110vh";
    tranc.style.color = "#9e3389";

    const xzc = document.createElement("div");
    xzc.innerHTML = `Xz() 数量： ${v7}。`;
    xzc.className = "cont";
    xzc.style.top = "115vh";
    xzc.style.color = "#7527a4";

    const ljc = document.createElement("div");
    ljc.innerHTML = `Lj() 数量： ${v8}。`;
    ljc.className = "cont";
    ljc.style.top = "120vh";
    ljc.style.color = "#a6580d";

    const zdc = document.createElement("div");
    zdc.innerHTML = `Zd() 数量： ${v9}。`;
    zdc.className = "cont";
    zdc.style.top = "125vh";
    zdc.style.padding = "7px 15px";
    zdc.style.borderRadius = "5px";
    zdc.style.backgroundColor = "#19191879";
    zdc.style.color = "#ffffff";

    urcc(ctrl, infoc);
    urcc(ctrl, cgc);
    urcc(ctrl, failc);
    urcc(ctrl, warnc);
    urcc(ctrl, inpc);
    urcc(ctrl, tranc);
    urcc(ctrl, xzc);
    urcc(ctrl, ljc);
    urcc(ctrl, zdc);
}