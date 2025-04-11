function urcc(f, c) {
    const cz = Array.from(f.children).find((child) =>
        child.className === c.className && // 类名相同。
        child.style.top === c.style.top); // top 值相同。
    if (cz) cz.innerHTML = c.innerHTML;
    else f.appendChild(c);
}

function fn0() {
    if (mode === "Play" && f1 === false) fn1();
    else if (mode === "Preset" && f2 === false) fn2();
}

document.addEventListener(`DOMContentLoaded`, () => {
    const h1 = document.querySelector(`.head1`); // h1 标签。
    const h2 = document.querySelector(`.head2`); // h2 标签。
    const div = document.querySelector(`.top`); // 包含 h1 和 h2 的 div 标签。
    const head = document.querySelector(`.head`); // The Play Games 版本标签。
    const f1 = document.querySelector(`.head3`); // 功能按钮组。
    const f3 = document.querySelector(`.head4`); // 功能按钮组。

    h1.style.display = "block";
    h1.style.animation = `-head1 1.4s forwards cubic-bezier(0.33, 1, 0.68, 1)`;
    h1.addEventListener("animationend", (e) => {
        if (e.animationName === `-head1`) {
            h2.style.display = "block";
            h2.style.animation = `-head2 1.4s forwards cubic-bezier(0.33, 1, 0.68, 1)`;
        }
    });
    h2.addEventListener("animationend", (e) => {
        if (e.animationName === `-head2`) {
            div.style.animation = `-top 550ms forwards cubic-bezier(0.33, 1, 0.68, 1)`;
            head.style.animation = `-head 550ms forwards cubic-bezier(0.33, 1, 0.68, 1)`;
        }
    });
    div.addEventListener("animationend", (e) => {
        if (e.animationName === `-top`) {
            f1.style.animation = `_head3 550ms forwards cubic-bezier(0.33, 1, 0.68, 1)`;
            f3.style.animation = `_head4 550ms forwards cubic-bezier(0.33, 1, 0.68, 1)`;
        }
    });

    const ctrl = document.querySelector(".control-pad");
    let moved = false;
    fn4();

    document.addEventListener("mousemove", function (event) {
        let width = ctrl.getBoundingClientRect().width;
        if (event.clientX <= 50 && event.clientY <= 50 && moved === false) { // 移动到左上角。
            ctrl.style.animation = `ctrl- 550ms forwards ${easing}`;
            moved = true;
        } else if (event.clientX > width && moved === true) {
            ctrl.style.animation = `-ctrl 550ms forwards ${easing}`;
            moved = false;
        }
    });

    const inf = document.querySelector(".information-table");
    let imoved = false;
    fn5();

    document.addEventListener("mousemove", function (event) {
        let rect = inf.getBoundingClientRect().width; // 获取 inf 元素的宽度。

        if (event.clientX >= window.innerWidth - 50 && event.clientY <= 50 && imoved === false) { // 移动到右上角。
            inf.style.animation = `inf- 550ms forwards ${easing}`;
            imoved = true;
        } else if (event.clientX < window.innerWidth - rect && imoved === true) {
            inf.style.animation = `-inf 550ms forwards ${easing}`;
            imoved = false;
        }
    });
});

function fn1() {
    f1 = !f1;

    const div = document.querySelector(`.head3`);
    const dakai = document.getElementById("1");
    dakai.style.transition = `all 550ms ${easing}`;
    const notibtn = document.createElement(`button`);
    notibtn.style.marginTop = `15px`;
    notibtn.innerHTML = `noti`;
    notibtn.className = `btn1`;
    notibtn.onclick = async () => {
        let res = await inp(`输入你想显示在 Noti() 上的信息。`, `在此输入。`);
        if (titleset === "Custom") {
            let t = await inp(`请输入 Noti() 上的标题。`, `在此输入。`);
            noti(res, t);
        } else {
            noti(res, "通知");
        }
    };
    const cgbtn = document.createElement(`button`);
    cgbtn.innerHTML = `cg`;
    cgbtn.className = `btn2`;
    cgbtn.onclick = async () => {
        let res = await inp(`输入你想显示在 Cg() 上的信息。`, `在此输入。`);
        if (titleset === "Custom") {
            let t = await inp(`请输入 Cg() 上的标题。`, `在此输入。`);
            cg(res, t);
        } else {
            cg(res, "完成");
        }
    };
    const failbtn = document.createElement(`button`);
    failbtn.innerHTML = `fail`;
    failbtn.className = `btn3`;
    failbtn.onclick = async () => {
        let res = await inp(`输入你想显示在 fail() 上的信息。`, `在此输入。`);
        if (titleset === "Custom") {
            let t = await inp(`请输入 fail() 上的标题。`, `在此输入。`);
            fail(res, t);
        }
        else {
            fail(res, "错误");
        }
    };
    const warnbtn = document.createElement(`button`);
    warnbtn.innerHTML = `warn`;
    warnbtn.className = `btn4`;
    warnbtn.onclick = async () => {
        let res = await inp(`输入你想显示在 Warn() 上的信息。`, `在此输入。`);
        if (titleset === "Custom") {
            let t = await inp(`请输入 Warn() 上的标题。`, `在此输入。`);
            warn(res, t);
        }
        else {
            warn(res, "注意");
        }
    };
    const xzbtn = document.createElement(`button`);
    xzbtn.innerHTML = `xz`;
    xzbtn.className = `btn7`;
    xzbtn.onclick = async () => {
        let res = await inp(`输入你想显示在 Xz() 上的信息。`, `在此输入。`);
        let n = await inp(`请输入 Xz() 上选项的数量。`, `在此输入。`);
        n = Number(n);
        let array = new Array(n);
        for (let i = 0; i <= n - 1; i++) {
            array[i] = await inp(`请输入 Xz() 上第 ${i + 1} 个选项。`, `在此输入。`);
        }
        if (titleset === "Custom") {
            let t = await inp(`请输入 Xz() 上的标题。`, `在此输入。`);
            xz(res, n, array, t);
        }
        else {
            xz(res, n, array, "选择");
        }
    };
    const ljbtn = document.createElement(`button`);
    ljbtn.innerHTML = `lj`;
    ljbtn.className = `btn8`;
    ljbtn.onclick = async () => {
        let res = await inp(`输入你想显示在 Lj() 上的信息。`, `在此输入。`);
        let url = await inp(`请输入你要链接的地址。`, "在此输入。");
        if (titleset === "Custom") {
            let t = await inp(`请输入 Lj() 上的标题。`, `在此输入。`);
            lj(res, url, t);
        }
        else {
            lj(res, url, "链接");
        }
    };
    const wzbtn = document.createElement(`button`);
    wzbtn.innerHTML = `wz`;
    wzbtn.className = `btn22`;
    wzbtn.onclick = async () => {
        let res = await inp(`输入你想显示在 wz() 上的信息。`, `在此输入。`);
        wz(res);
    };

    const all = [
        notibtn,
        cgbtn,
        failbtn,
        warnbtn,
        xzbtn,
        ljbtn,
        wzbtn
    ];

    all.forEach(btn => {
        btn.style.display = "none";
    });

    if (div.children.length <= 1) {
        all.forEach(btn => {
            div.appendChild(btn);
        });
    }

    div.style.animation = `head3- 550ms forwards cubic-bezier(0.33, 1, 0.68, 1)`;
    dakai.style.backgroundColor = `#001dff99`;
    dakai.style.width = "230px";
    dakai.textContent = "在此处演示函数";

    div.addEventListener("animationend", (e) => {
        if (e.animationName === "head3-") {
            all.forEach(btn => {
                btn.style.display = "block";
                btn.style.color = "#ffffff";
                btn.style.opacity = "0";
                btn.style.transition = "opacity 550ms cubic-bezier(0.33, 1, 0.68, 1)";
            });
            setTimeout(() => {
                all.forEach(btn => {
                    btn.style.opacity = "1";
                });
            }, 0);
        }
    });
}

function fn2() {
    f2 = !f2;

    const div = document.querySelector(".head3");
    const div1 = document.createElement("div");
    div1.className = `div1`;
    div1.textContent = `主函数区`;
    const div2 = document.createElement("div");
    div2.className = `div2`;
    div2.textContent = `副函数区`;
    const div3 = document.createElement("div");
    div3.className = `div3`;
    div3.textContent = `调试区`;
    const dakai = document.getElementById("1");

    const notibtn = document.createElement(`button`);
    notibtn.innerHTML = `noti`;
    notibtn.className = `btn1`;
    notibtn.onclick = () => {
        noti("你好，欢迎使用 The Play Games！");
    };
    const cgbtn = document.createElement(`button`);
    cgbtn.innerHTML = `cg`;
    cgbtn.className = `btn2`;
    cgbtn.onclick = () => {
        cg("当你看到这条信息时，说明你已经成功运行了主函数区的这个函数。");
    };
    const failbtn = document.createElement(`button`);
    failbtn.innerHTML = `fail`;
    failbtn.className = `btn3`;
    failbtn.onclick = () => {
        fail("但有时候可能会报错，比如 NotAllowedError。");
    };
    const warnbtn = document.createElement(`button`);
    warnbtn.innerHTML = `warn`;
    warnbtn.className = `btn4`;
    warnbtn.onclick = () => {
        warn("看到这种信息时，要格外注意了。");
    };
    const inpbtn = document.createElement(`button`);
    inpbtn.innerHTML = `inp`;
    inpbtn.className = `btn5`;
    inpbtn.onclick = async () => {
        let a = await inp("你可以在此输入！");
        noti(`你输入了：“${a}”。`);
    };
    const synchrbtn = document.createElement("button");
    synchrbtn.innerHTML = `synchr`;
    synchrbtn.className = `btn6`;
    synchrbtn.onclick = async () => {
        await synchr("该函数还在开发中。");
    };
    const xzbtn = document.createElement(`button`);
    xzbtn.innerHTML = `xz`;
    xzbtn.className = `btn7`;
    xzbtn.onclick = async () => {
        var res = await xz("你对以上的函数有什么看法？", 4, ["很不错。", "还可以。", "一般。", "有待改进的空间。"]);
        switch (res) {
            case "很不错。":
                noti("非常感谢！你还可以尝试其他的函数。");
                break;
            case "还可以。":
                noti("谢谢你的评价！");
                break;
            case "一般。":
                noti("我们可以做得更好。");
                break;
            case "有待改进的空间。":
                var r = await xz("你是否想向我反馈你的建议？", 2, ["是。", "否。"]);
                if (r === "是。") {
                    await lj("点击以下链接反馈。", "mailto://Feng_14@outlook.com");
                    break;
                } else {
                    noti("好的，我们再见。");
                }
        }
    };
    const ljbtn = document.createElement(`button`);
    ljbtn.innerHTML = `lj`;
    ljbtn.className = `btn8`;
    ljbtn.onclick = () => {
        lj("点击此处浏览 The Play Games 的信息界面！", "https://modificationer-mdf.github.io/tpg_info/");
    };
    const zdbtn = document.createElement(`button`);
    zdbtn.innerHTML = `zd`;
    zdbtn.className = `btn9`;
    zdbtn.onclick = () => {
        zd("在此处输入代码。");
    };
    const nullbtn = document.createElement(`button`);
    nullbtn.innerHTML = `在函数的值中输入 null 值`;
    nullbtn.className = `btn10`;
    nullbtn.onclick = () => {
        wz(null);
    };
    const undefinedbtn = document.createElement(`button`);
    undefinedbtn.innerHTML = `在函数的值中输入 undefined 值`;
    undefinedbtn.className = `btn11`;
    undefinedbtn.onclick = () => {
        wz(undefined);
    };
    const imp = document.createElement(`button`);
    imp.textContent = `wz`;
    imp.className = `btn22`;
    imp.onclick = () => {
        wz("在这里可以显示文字！ <br />（背景使用了亚克力材料。）");
    };

    const all = [
        notibtn,
        cgbtn,
        failbtn,
        warnbtn,
        inpbtn,
        synchrbtn,
        xzbtn,
        ljbtn,
        zdbtn,
        imp,
        nullbtn,
        undefinedbtn,
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
            if (index >= 0 && index < 10) {
                div1.appendChild(btn);
            } else {
                div3.appendChild(btn);
            }
        });
    }

    div.style.animation = "head3- 550ms forwards cubic-bezier(0.33, 1, 0.68, 1)";
    dakai.textContent = "以下是预设内容";
    dakai.style.transition = "all 550ms cubic-bezier(0.33, 1, 0.68, 1)";
    dakai.style.backgroundColor = `#001dff99`;
    dakai.style.width = "230px";

    div.addEventListener("animationend", (e) => {
        if (e.animationName === "head3-") {
            all.forEach(btn => {
                btn.style.display = "block";
                btn.style.color = "#ffffff";
                btn.style.opacity = "0";
                btn.style.transition = "opacity 550ms cubic-bezier(0.33, 1, 0.68, 1)";
            });
            div1.style.display = "block";
            div1.style.opacity = "0";
            div1.style.transition = "opacity 550ms cubic-bezier(0.33, 1, 0.68, 1)";
            div2.style.display = "block";
            div2.style.opacity = "0";
            div2.style.transition = "opacity 550ms cubic-bezier(0.33, 1, 0.68, 1)";
            div3.style.display = "block";
            div3.style.opacity = "0";
            div3.style.transition = "opacity 550ms cubic-bezier(0.33, 1, 0.68, 1)";
            setTimeout(() => {
                all.forEach(btn => {
                    btn.style.opacity = "1";
                });
                div1.style.opacity = "1";
                div2.style.opacity = "1";
                div3.style.opacity = "1";
            }, 0);
        }
    });
}

function fn3() {
    warn("该文件可能会被误判为恶意软件，请注意甄别。");

    const div = document.querySelector(`.head4`);
    div.style.animation = `head4- 550ms forwards ${easing}`;
    const dakai = document.getElementById(`3`);
    dakai.style.transition = `all 550ms ${easing}`;
    dakai.style.backgroundColor = `#001dff99`;
    dakai.style.width = `500px`;
    dakai.textContent = "在此处下载 The Play Games 所有版本。";

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

    const all = [
        btn1,
        btn2,
        btn3,
        a1,
        a2,
        a3
    ];

    all.forEach(btn => {
        btn.style.display = "none";
    });
    if (div.children.length <= 1) {
        all.forEach((btn, index) => {
            if (index >= 0 && index < 3) div.appendChild(btn);
            else if (index === 3) btn1.appendChild(btn);
            else if (index === 4) btn2.appendChild(btn);
            else if (index === 5) btn3.appendChild(btn);
        });
    }

    div.addEventListener("animationend", (e) => {
        if (e.animationName === `head4-`) {
            all.forEach(btn => {
                btn.style.display = "block";
                btn.color = "#ffffff";
                btn.style.opacity = "0";
                btn.style.transition = `opacity 550ms cubic-bezier(0.33, 1, 0.68, 1)`;
            });
            setTimeout(() => {
                all.forEach(btn => {
                    btn.style.opacity = "1";
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

function fn4() { // 选项。
    const ctrl = document.querySelector(".control-pad");
    const title = document.createElement("p");
    title.innerHTML = "选项";
    title.className = "title";
    title.style.right = "25px";

    const ms = document.createElement("p");
    ms.innerHTML = "演示模式";
    ms.className = "lcont";
    const ys = document.createElement("button");
    ys.type = "button";
    ys.innerHTML = "Preset";
    ys.className = "zd1";
    ys.onclick = () => {
        if (mode === "Preset") {
            warn("当前模式已为 Preset。");
        } else {
            mode = "Preset";
            cg("已切换到 Preset 模式。");
        }
    };
    const js = document.createElement("button");
    js.type = "button";
    js.innerHTML = "Play";
    js.className = "zd2";
    js.onclick = () => {
        if (mode === "Play") {
            warn("当前模式已为 Play。");
        } else {
            mode = "Play";
            cg("已切换到 Play 模式。");
        }
    };

    const ts = document.createElement("p");
    ts.innerHTML = "窗口标题";
    ts.className = "lcont";
    const y = document.createElement("button");
    y.type = "button";
    y.innerHTML = "Default";
    y.className = "zd3";
    y.onclick = () => {
        if (titleset === "Default") warn("你已经在使用默认标题。");
        else {
            titleset = "Default";
            cg("已切换到默认标题。");
        }
    };
    const z = document.createElement("button");
    z.type = "button";
    z.innerHTML = "Custom";
    z.className = "zd4";
    z.onclick = () => {
        if (titleset === "Custom") warn("你已经在使用自定义标题。");
        else {
            titleset = "Custom";
            cg("已切换到自定义标题。");
        }
    };

    const eas = document.createElement("p");
    eas.innerHTML = "easing";
    eas.className = "lcont";
    const inp2 = document.createElement("input");
    inp2.type = "text";
    inp2.className = "inpbox";
    inp2.value = easing;
    let f2 = false;
    inp2.onclick = () => {
        if (f2 === false) {
            wz(`cubic-bezier 函数的格式是 cubic-bezier(x1, y1, x2, y2)，其中 x1 和 x2 必须在 0 到 1 之间，y1 和 y2 则可以是任意值；
            其他 easing 还有 ease、linear、ease-in、ease-out、ease-in-out。`);
            f2 = true;
        }
    };
    inp2.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            let arr1 = inp2.value.match(/\d+(\.\d+)?/g).map(Number);
            let iseasing = (inp2.value.startsWith("cubic-bezier(") && inp2.value.endsWith(")")
                && (inp2.value.match(/,/g) || []).length === 3 && arr1.length === 4
                && (arr1[0] >= 0 && arr1[0] <= 1 && arr1[1] >= 0 && arr1[2] >= 0 && arr1[2] <= 1 && arr1[3] >= 0))
                || (inp2.value === "ease" || inp2.value === "linear" || inp2.value === "ease-in"
                || inp2.value === "ease-out" || inp2.value === "ease-in-out");
            if (iseasing === false) fail("请输入一个合法的 easing 。");
            else {
                easing = inp2.value;
                cg(`easing 已被设置为 ${easing}。`);
            }
        }
    });

    const mrms = document.createElement("p");
    mrms.innerHTML = "deftime";
    mrms.className = "lcont";
    const inp3 = document.createElement("input");
    let f3 = false;
    inp3.type = "number";
    inp3.value = deftime;
    inp3.className = "inpbox";
    inp3.onclick = () => {
        if (f3 === false) {
            warn("deftime 只能为正数，且单位为毫秒。");
            f3 = true;
        }
    };
    inp3.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            if (Number(inp3.value) < 750) fail("请输入一个大于等于 750 的数字。");
            else if (Number(inp3.value) >= 750 && Number(inp3.value) < 1000) warn("设置过小的数字不方便于阅读。");
            else if (windows.length > 0) warn(`现在不能更改 deftime 的值。${check()} 正在运行。`);
            else {
                deftime = Number(inp3.value);
                cg(`deftime 已被设置为 ${deftime} 毫秒。`);
            }
        }
    });

    const defw = document.createElement("p");
    defw.innerHTML = "defwid";
    defw.className = "lcont";
    const inp4 = document.createElement("input");
    let f4 = false;
    inp4.type = "number";
    inp4.value = defwid;
    inp4.className = "inpbox";
    inp4.onclick = () => {
        if (f4 === false) {
            warn("该数值只能为正整数。");
            f4 = true;
        }
    };
    inp4.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            if (Number(inp4.value) < 0) fail("请输入一个大于等于 0 的数字。");
            else if (Number(inp4.value) % 1 !== 0) fail("请输入一个整数。");
            else {
                defwid = Number(inp4.value);
                cg(`defwid 已被设置为 ${defwid}。`);
            }
        }
    });

    const defh = document.createElement("p");
    defh.innerHTML = "defhei";
    defh.className = "lcont";
    const inp5 = document.createElement("input");
    let f5 = false;
    inp5.type = "number";
    inp5.value = defhei;
    inp5.className = "inpbox";
    inp5.onclick = () => {
        if (f5 === false) {
            warn("该数值只能为正整数。");
            f5 = true;
        }
    };
    inp5.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            if (Number(inp5.value) < 0) fail("请输入一个大于等于 0 的数字。");
            else if (Number(inp5.value) % 1 !== 0) fail("请输入一个整数。");
            else {
                defhei = Number(inp5.value);
                cg(`defhei 已被设置为 ${defhei}。`);
            }
        }
    });

    const jdt = document.createElement("div");
    jdt.style.left = "25px";
    jdt.style.height = "7px";
    jdt.style.width = "100%";
    jdt.style.backgroundColor = "#ffffff99";

    const all = [
        ms,
        ts,
        eas,
        mrms,
        defw,
        defh,
    ];

    for (var i = 0; i < all.length; i++) {
        all[i].style.top = `${(i + 1) * 10}vh`;
    }

    ctrl.appendChild(title);
    ctrl.appendChild(ms);
    ctrl.appendChild(ts);
    ctrl.appendChild(eas);
    ctrl.appendChild(mrms);
    ctrl.appendChild(defw);
    ctrl.appendChild(defh);
    title.appendChild(jdt);
    ms.appendChild(ys);
    ms.appendChild(js);
    ts.appendChild(y);
    ts.appendChild(z);
    eas.appendChild(inp2);
    mrms.appendChild(inp3);
    defw.appendChild(inp4);
    defh.appendChild(inp5);
}

function fn5() {
    const inf = document.querySelector(".information-table");
    const title = document.createElement("p");
    title.innerHTML = "杂项";
    title.className = "title";
    title.style.right = "25px";
    title.style.textAlign = "right";

    const jdt = document.createElement("div");
    jdt.style.height = "7px";
    jdt.style.width = "100%";
    jdt.style.backgroundColor = "#ffffff99";

    inf.appendChild(title);
    title.appendChild(jdt);
}

function fn6() { // 杂项。
    const inf = document.querySelector(".information-table");
    var v1 = 0;
    var v2 = 0;
    var v3 = 0;
    var v4 = 0;
    var v5 = 0;
    var v6 = 0;
    var v7 = 0;
    var v8 = 0;
    var v9 = 0;
    var v10 = 0;

    for (let i = 0; i <= windows.length - 1; i++) {
        if (windows[i].className === "noti-window") v1++;
        else if (windows[i].className === "cg-window") v2++;
        else if (windows[i].className === "fail-window") v3++;
        else if (windows[i].className === "warn-window") v4++;
        else if (windows[i].className === "inp-window") v5++;
        else if (windows[i].className === "synchr-window") v6++;
        else if (windows[i].className === "xz-window") v7++;
        else if (windows[i].className === "lj-window") v8++;
        else if (windows[i].className === "zd-window") v9++;
        else if (rzwin[i].className === "rz-window") v10++;
    }

    const notic = document.createElement("div");
    notic.innerHTML = `Noti() 数量： ${v1}。`;
    notic.className = "rcont";
    notic.style.color = "#18a689";

    const cgc = document.createElement("div");
    cgc.innerHTML = `Cg() 数量： ${v2}。`;
    cgc.className = "rcont";
    cgc.style.color = "#1d5837";

    const failc = document.createElement("div");
    failc.innerHTML = `fail() 数量： ${v3}。`;
    failc.className = "rcont";
    failc.style.color = "#791e1d";

    const warnc = document.createElement("div");
    warnc.innerHTML = `Warn() 数量： ${v4}。`;
    warnc.className = "rcont";
    warnc.style.color = "#847829";

    const inpc = document.createElement("div");
    inpc.innerHTML = `Inp() 数量： ${v5}。`;
    inpc.className = "rcont";
    inpc.style.color = "#235087";

    const tranc = document.createElement("div");
    tranc.innerHTML = `Synchr() 数量： ${v6}。`;
    tranc.className = "rcont";
    tranc.style.color = "#9e3389";

    const xzc = document.createElement("div");
    xzc.innerHTML = `Xz() 数量： ${v7}。`;
    xzc.className = "rcont";
    xzc.style.color = "#7527a4";

    const ljc = document.createElement("div");
    ljc.innerHTML = `Lj() 数量： ${v8}。`;
    ljc.className = "rcont";
    ljc.style.color = "#a6580d";

    const zdc = document.createElement("div");
    zdc.innerHTML = `Zd() 数量： ${v9}。`;
    zdc.className = "rcont";
    zdc.style.padding = "7px 15px";
    zdc.style.borderRadius = "5px";
    zdc.style.backgroundColor = "#19191879";
    zdc.style.color = "#ffffff";

    const rzc = document.createElement("div");
    rzc.innerHTML = `Rz() 数量： ${v10}。`;
    rzc.className = "rcont";
    rzc.style.padding = "7px 15px";
    rzc.style.borderRadius = "5px";
    rzc.style.backgroundColor = "#19191879";
    rzc.style.color = "#ffffff";

    const all = [
        notic,
        cgc,
        failc,
        warnc,
        inpc,
        tranc,
        xzc,
        ljc,
        zdc,
        rzc,
    ];

    for (var i = 0; i < all.length; i++) {
        all[i].style.top = `${(i + 2) * 7}vh`;
    }

    urcc(inf, notic);
    urcc(inf, cgc);
    urcc(inf, failc);
    urcc(inf, warnc);
    urcc(inf, inpc);
    urcc(inf, tranc);
    urcc(inf, xzc);
    urcc(inf, ljc);
    urcc(inf, zdc);
    urcc(inf, rzc);
}

function pos(p) {
    let total = 3 * window.innerHeight / 100;
    function fn(w) {
        w.forEach((window) => {
            const wh = window.offsetHeight;
            window.style.transition = `top 550ms ${easing}`;
            window.style.top = `${total}px`;
            total += wh + 3;
        });
    }
    if (p) {
        fn(windows);
    } else {
        fn(rzwin);
    }
}

function create(window) {
    if (window.className !== "rz-window") {
        windows.push(window);
        pos(true);
    } else {
        rzwin.push(window);
        pos(false);
    }
}

function close(window) {
    if (window.className !== "rz-window") {
        windows = windows.filter(win => win !== window);
        pos(true);
    } else {
        rzwin = rzwin.filter(win => win !== window);
        pos(false);
    }
}

function check() {
    let string = "";
    for (var i = 0; i <= windows.length - 1; i++) {
        if (windows[i].className === "noti-window") {
            if (!string.includes("Noti()、")) string += "Noti()、";
        } else if (windows[i].className === "cg-window") {
            if (!string.includes("Cg()、")) string += "Cg()、";
        } else if (windows[i].className === "fail-window") {
            if (!string.includes("fail()、")) string += "fail()、";
        } else if (windows[i].className === "warn-window") {
            if (!string.includes("Warn()、")) string += "Warn()、";
        } else if (windows[i].className === "inp-window") {
            if (!string.includes("Inp()、")) string += "Inp()、";
        } else if (windows[i].className === "synchr-window") {
            if (!string.includes("Synchr()、")) string += "Synchr()、";
        } else if (windows[i].className === "xz-window") {
            if (!string.includes("Xz()、")) string += "Xz()、";
        } else if (windows[i].className === "lj-window") {
            if (!string.includes("Lj()、")) string += "Lj()、";
        } else if (windows[i].className === "zd-window") {
            if (!string.includes("Zd()、")) string += "Zd()、";
        }
    }
    if (string[string.length - 1] === "、") string = string.slice(0, -1);
    return string;
}