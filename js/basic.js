function ld(el, percent) { // 控制亮度。
    el.style.transition = "filter 0.2s ease-in-out";
    el.style.filter = `brightness(${percent})`;
}

function xzsj() { // 现在时间。
    const t = new Date();
    const y = t.getFullYear();
    const m = t.getMonth() + 1;
    const d = t.getDate();
    const h = t.getHours();
    const mi = t.getMinutes();
    const s = t.getSeconds();
    const time = `${y}.${m}/${d} ${h}:${mi}:${s}`;
    return time;
}

function width(name) {
    const el = document.querySelector(name);
    el.style.width = window.innerWidth + "px";
}

function hqgd(str, cl, kind) { // 获取元素高度。
    let el1 = document.createElement(kind);
    el1.className = cl;
    el1.innerHTML = str;
    el1.style.position = "absolute";
    el1.style.transform = "translate(9999px, 9999px)";
    el1.style.visibility = "hidden";
    document.body.appendChild(el1);
    let ls_gd = el1.offsetHeight;
    document.body.removeChild(el1);
    return ls_gd + "px";
}

function hqkd(str, cl, kind) { // 获取元素宽度。
    let el2 = document.createElement(kind);
    el2.className = cl;
    el2.innerHTML = str;
    el2.style.position = "absolute";
    el2.style.transform = "translate(-9999px, -9999px)";
    el2.style.visibility = "hidden";
    document.body.appendChild(el2);
    let ls_kd = el2.offsetWidth;
    document.body.removeChild(el2);
    return ls_kd + "px";
}

function chara_sort(str) {
    let zh = 0; // 中文字符数。
    let en = 0; // 英文字符数。
    let ma = 0; // 标点符号数。（包括全角符号和半角符号）
    for (var i = 0; i <= str.length - 1; i++) {
        if (alphabets.includes(str[i])) {
            en++;
        } else if (marks.includes(str[i])) {
            ma++;
        } else {
            zh++;
        }
    }
    return [zh, en, ma];
}

function smarttime(str) {
    str = String(str);
    str = str.replace(/\s+/g, "");

    if (deftime === "Smart") {
        let [zh, en, ma] = chara_sort(str);
        let time = zh * 165 + en * 95 + ma * 50;
        return (time > 1250 ? time : 1250);
    } else {
        return deftime;
    }
}

function fn0() {
    if (mode === "Play" && f1 === false) fn1();
    else if (mode === "Preset" && f2 === false) fn2();
}

document.addEventListener("DOMContentLoaded", () => {
    const h1 = document.querySelector(".head1"); // h1 标签。
    const h2 = document.querySelector(".head2"); // h2 标签。
    const div = document.querySelector(".top"); // 包含 h1 和 h2 的 div 标签。
    const head = document.querySelector(".head"); // The Play Games 版本标签。
    const f1 = document.querySelector(".head3"); // 功能按钮组。
    const f3 = document.querySelector(".head4"); // 功能按钮组。

    h1.style.display = "block";
    h1.style.animation = "jr_head1 1.4s forwards cubic-bezier(0.33, 1, 0.68, 1)";
    h1.addEventListener("animationend", (e) => {
        if (e.animationName === "jr_head1") {
            h2.style.display = "block";
            h2.style.animation = "jr_head2 1.4s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        }
    });
    h2.addEventListener("animationend", (e) => {
        if (e.animationName === "jr_head2") {
            div.style.animation = "jr_top 0.55s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            head.style.animation = "jr_0head 0.55s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        }
    });
    div.addEventListener("animationend", (e) => {
        if (e.animationName === "jr_top") {
            f1.style.animation = "jr1_head3 0.55s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            f3.style.animation = "jr1_head5 0.55s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        }
    });

    const ctrl = document.querySelector(".control-pad");
    control();

    document.addEventListener("mousemove", function (event) {
        let width = ctrl.getBoundingClientRect().width;
        if (event.clientX <= 50 && event.clientY <= 50 && control_moved === false) { // 移动到左上角。
            ctrl.style.animation = `jr_ctrl 0.55s forwards ${easing}`;
            if (control_block === false) control_moved = true;
        } else if (event.clientX > width && control_moved === true) {
            ctrl.style.animation = `cc_ctrl 0.55s forwards ${easing}`;
            control_moved = false;
        }
    });

    const inf = document.querySelector(".information-table");
    inf_ui();

    document.addEventListener("mousemove", function (event) {
        let rect = inf.getBoundingClientRect().width; // 获取 inf 元素的宽度。

        if (event.clientX >= window.innerWidth - 50 && event.clientY <= 50 && inf_moved === false) { // 移动到右上角。
            inf.style.animation = `jr_inf 0.55s forwards ${easing}`;
            if (inf_block === false) inf_moved = true;
        } else if (event.clientX < window.innerWidth - rect && inf_moved === true) {
            inf.style.animation = `cc_inf 0.55s forwards ${easing}`;
            inf_moved = false;
        }
    });
});

function fn1() {
    f1 = !f1;

    const div = document.querySelector(".head3");
    const dakai = document.getElementById("1");
    dakai.style.transition = `all 0.55s ${easing}`;
    const notibtn = document.createElement("button");
    notibtn.style.marginTop = "15px";
    notibtn.innerHTML = "noti";
    notibtn.className = "btn1";
    notibtn.onclick = async () => {
        let res = await inp("输入你想显示在 Noti() 上的信息。", "在此输入。");
        if (titleset === "Custom") {
            let t = await inp("请输入 Noti() 上的标题。", "在此输入。");
            noti(res, t);
        } else {
            noti(res, "通知");
        }
    };
    const cgbtn = document.createElement("button");
    cgbtn.innerHTML = "cg";
    cgbtn.className = "btn2";
    cgbtn.onclick = async () => {
        let res = await inp("输入你想显示在 Cg() 上的信息。", "在此输入。");
        if (titleset === "Custom") {
            let t = await inp("请输入 Cg() 上的标题。", "在此输入。");
            cg(res, t);
        } else {
            cg(res, "完成");
        }
    };
    const failbtn = document.createElement("button");
    failbtn.innerHTML = "fail";
    failbtn.className = "btn3";
    failbtn.onclick = async () => {
        let res = await inp("输入你想显示在 fail() 上的信息。", "在此输入。");
        if (titleset === "Custom") {
            let t = await inp("请输入 fail() 上的标题。", "在此输入。");
            fail(res, t);
        }
        else {
            fail(res, "错误");
        }
    };
    const warnbtn = document.createElement("button");
    warnbtn.innerHTML = "warn";
    warnbtn.className = "btn4";
    warnbtn.onclick = async () => {
        let res = await inp("输入你想显示在 Warn() 上的信息。", "在此输入。");
        if (titleset === "Custom") {
            let t = await inp("请输入 Warn() 上的标题。", "在此输入。");
            warn(res, t);
        }
        else {
            warn(res, "注意");
        }
    };
    const xzbtn = document.createElement("button");
    xzbtn.innerHTML = "xz";
    xzbtn.className = "btn7";
    xzbtn.onclick = async () => {
        let res = await inp("输入你想显示在 Xz() 上的信息。", "在此输入。");
        let n = await inp("请输入 Xz() 上选项的数量。", "在此输入。");
        n = Number(n);
        let array = new Array(n);
        for (let i = 0; i <= n - 1; i++) {
            array[i] = await inp(`请输入 Xz() 上第 ${i + 1} 个选项。`, "在此输入。");
        }
        if (titleset === "Custom") {
            let t = await inp("请输入 Xz() 上的标题。", "在此输入。");
            xz(res, n, array, t);
        }
        else {
            xz(res, n, array, "选择");
        }
    };
    const ljbtn = document.createElement("button");
    ljbtn.innerHTML = "lj";
    ljbtn.className = "btn8";
    ljbtn.onclick = async () => {
        let res = await inp("输入你想显示在 Lj() 上的信息。", "在此输入。");
        let url = await inp("请输入你要链接的地址。", "在此输入。");
        if (titleset === "Custom") {
            let t = await inp("请输入 Lj() 上的标题。", "在此输入。");
            lj(res, url, t);
        }
        else {
            lj(res, url, "链接");
        }
    };
    const timerbtn = document.createElement("button");
    timerbtn.innerHTML = "timer";
    timerbtn.className = "btn29";
    timerbtn.onclick = async () => {
        let res = await inp("输入你想显示在 Timer() 上的信息。", "在此输入。");
        let t = await inp("请输入 Timer() 上的计时时间。（单位：毫秒）", "在此输入。");
        t = Number(t);
        if (titleset === "Custom") {
            let t1 = await inp("请输入 Timer() 上的标题。", "在此输入。");
            timer(res, t, t1);
        }
        else {
            timer(res, t, "计时");
        }
    };
    const wzbtn = document.createElement("button");
    wzbtn.innerHTML = "wz";
    wzbtn.className = "btn22";
    wzbtn.onclick = async () => {
        let res = await inp("输入你想显示在 Wz() 上的信息。", "在此输入。");
        wz(res);
    };

    const all = [
        notibtn,
        cgbtn,
        failbtn,
        warnbtn,
        xzbtn,
        ljbtn,
        timerbtn,
        wzbtn,
    ];

    all.forEach(btn => {
        btn.style.display = "none";
    });

    if (div.children.length <= 1) {
        all.forEach(btn => {
            div.appendChild(btn);
        });
    }

    div.style.animation = "cc1_head4 0.55s forwards cubic-bezier(0.33, 1, 0.68, 1)";
    dakai.style.backgroundColor = "#001dff99";
    dakai.style.width = hqkd("在此处演示函数。", "dakai", "button");
    dakai.textContent = "在此处演示函数。";

    div.addEventListener("animationend", (e) => {
        if (e.animationName === "cc1_head4") {
            all.forEach(btn => {
                btn.style.display = "block";
                btn.style.color = "#ffffff";
                btn.style.opacity = "0";
                btn.style.transition = "opacity 0.55s cubic-bezier(0.33, 1, 0.68, 1)";
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
    div1.className = "div1";
    div1.textContent = "主函数区";
    const div2 = document.createElement("div");
    div2.className = "div2";
    div2.textContent = "副函数区";
    const div3 = document.createElement("div");
    div3.className = "div3";
    div3.textContent = "调试区";
    const dakai = document.getElementById("1");

    const notibtn = document.createElement("button");
    notibtn.innerHTML = "noti";
    notibtn.className = "btn1";
    notibtn.onclick = () => {
        noti("你好，欢迎使用 The Play Games！");
    };
    const cgbtn = document.createElement("button");
    cgbtn.innerHTML = "cg";
    cgbtn.className = "btn2";
    cgbtn.onclick = () => {
        cg("当你看到这条信息时，说明你已经成功运行了主函数区的这个函数。");
    };
    const failbtn = document.createElement("button");
    failbtn.innerHTML = "fail";
    failbtn.className = "btn3";
    failbtn.onclick = () => {
        fail("但有时候可能会报错，比如 NotAllowedError。");
    };
    const warnbtn = document.createElement("button");
    warnbtn.innerHTML = "warn";
    warnbtn.className = "btn4";
    warnbtn.onclick = () => {
        warn("看到这种信息时，要格外注意了。");
    };
    const inpbtn = document.createElement("button");
    inpbtn.innerHTML = "inp";
    inpbtn.className = "btn5";
    inpbtn.onclick = async () => {
        let a = await inp("你可以在此输入！");
        noti(`你输入了：“${a}”。`);
    };
    const synchrbtn = document.createElement("button");
    synchrbtn.innerHTML = "synchr";
    synchrbtn.className = "btn6";
    synchrbtn.onclick = async () => {
        await synchr("该函数还在开发中。");
    };
    const xzbtn = document.createElement("button");
    xzbtn.innerHTML = "xz";
    xzbtn.className = "btn7";
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
    const ljbtn = document.createElement("button");
    ljbtn.innerHTML = "lj";
    ljbtn.className = "btn8";
    ljbtn.onclick = async () => {
        await lj("点击此处浏览 The Play Games 的信息界面！", "https://modificationer-mdf.github.io/tpg_info/");
    };
    const zdbtn = document.createElement("button");
    zdbtn.innerHTML = "zd";
    zdbtn.className = "btn9";
    zdbtn.onclick = async () => {
        await zd("在此处输入代码。");
    };
    const timerbtn = document.createElement("button");
    timerbtn.innerHTML = "timer";
    timerbtn.className = "btn29";
    timerbtn.onclick = async () => {
        let b = await timer("计时 5 秒。", 5000);
        if (b) {
            noti("计时结束。");
        }
    };
    const nullbtn = document.createElement("button");
    nullbtn.innerHTML = "在函数的值中输入 null 值。";
    nullbtn.className = "btn10";
    nullbtn.onclick = () => {
        wz(null);
    };
    const undefinedbtn = document.createElement("button");
    undefinedbtn.innerHTML = "在函数的值中输入 undefined 值。";
    undefinedbtn.className = "btn11";
    undefinedbtn.onclick = () => {
        wz(undefined);
    };
    const imp = document.createElement("button");
    imp.textContent = "wz";
    imp.className = "btn22";
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
        timerbtn,
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
            if (index >= 0 && index < 11) {
                div1.appendChild(btn);
            } else {
                div3.appendChild(btn);
            }
        });
    }

    div.style.animation = "cc1_head3 0.55s forwards cubic-bezier(0.33, 1, 0.68, 1)";
    dakai.textContent = "以下是预设内容。";
    dakai.style.transition = `all 0.55s ${easing}`;
    dakai.style.backgroundColor = "#001dff99";
    dakai.style.width = hqkd("以下是预设内容。", "dakai", "button");

    div.addEventListener("animationend", (e) => {
        if (e.animationName === "cc1_head3") {
            all.forEach(btn => {
                btn.style.display = "block";
                btn.style.color = "#ffffff";
                btn.style.opacity = "0";
                btn.style.transition = "opacity 0.55s cubic-bezier(0.33, 1, 0.68, 1)";
            });
            div1.style.display = "block";
            div1.style.opacity = "0";
            div1.style.transition = "opacity 0.55s cubic-bezier(0.33, 1, 0.68, 1)";
            div2.style.display = "block";
            div2.style.opacity = "0";
            div2.style.transition = "opacity 0.55s cubic-bezier(0.33, 1, 0.68, 1)";
            div3.style.display = "block";
            div3.style.opacity = "0";
            div3.style.transition = "opacity 0.55s cubic-bezier(0.33, 1, 0.68, 1)";
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

    const div = document.querySelector(".head4");
    div.style.animation = `cc1_head5 0.55s forwards ${easing}`;
    const dakai = document.getElementById("3");
    dakai.style.transition = `all 0.55s ${easing}`;
    dakai.style.backgroundColor = "#001dff99";
    dakai.style.width = hqkd("在此处下载 The Play Games 所有版本。", "dakai", "button");
    dakai.textContent = "在此处下载 The Play Games 所有版本。";

    const btn1 = document.createElement("button");
    btn1.className = "btn11";
    btn1.style.marginTop = "20px";
    btn1.type = "button";
    const a1 = document.createElement("a");
    a1.href = "projects/Version_Collecting_1.zip";
    a1.download = "Version_Collecting_1.zip";
    a1.textContent = "下载 VC_Time 1（包含 The Play Games 0.1 ~ 0.6）";
    a1.onmouseover = () => {
        rz("2024 年 5 月 1 日发布。");
    };

    const btn2 = document.createElement("button");
    btn2.className = "btn12";
    btn2.type = "button";
    const a2 = document.createElement("a");
    a2.href = "projects/Version_0.7.zip";
    a2.download = "Version_0.7.zip";
    a2.textContent = "下载 The Play Games 0.7";
    a2.onmouseover = () => {
        rz("2024 年 8 月 22 日发布。");
    };

    const btn3 = document.createElement("button");
    btn3.className = "btn13";
    btn3.type = "button";
    const a3 = document.createElement("a");
    a3.href = "projects/Version_0.8.zip";
    a3.download = "Version_0.8.zip";
    a3.textContent = "下载 The Play Games 0.8";
    a3.onmouseover = () => {
        rz("2024 年 8 月 27 日发布。");
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
        if (e.animationName === "cc1_head5") {
            all.forEach(btn => {
                btn.style.display = "block";
                btn.color = "#ffffff";
                btn.style.opacity = "0";
                btn.style.transition = "opacity 0.55s cubic-bezier(0.33, 1, 0.68, 1)";
            });
            setTimeout(() => {
                all.forEach(btn => {
                    btn.style.opacity = "1";
                });
            }, 0);
        }
    });
}

function totop() { // 返回顶部。
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

function hqzd(s) { // 获取栈顶元素。
    const t = s.pop();
    s.push(t);
    return t;
}

function control() { // 选项。
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
    ys.className = "control1";
    ys.onclick = () => {
        if (mode === "Preset") warn("当前模式已为 Preset。");
        else {
            mode = "Preset";
            cg("已切换到 Preset 模式。");
        }
    };
    const js = document.createElement("button");
    js.type = "button";
    js.innerHTML = "Play";
    js.className = "control2";
    js.onclick = () => {
        if (mode === "Play") warn("当前模式已为 Play。");
        else {
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
    y.className = "control3";
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
    z.className = "control4";
    z.onclick = () => {
        if (titleset === "Custom") warn("你已经在使用自定义标题。");
        else {
            titleset = "Custom";
            cg("已切换到自定义标题。");
        }
    };

    const c_block = document.createElement("p");
    c_block.innerHTML = "设置 “选项” 状态";
    c_block.className = "lcont";
    const y1 = document.createElement("button");
    y1.type = "button";
    y1.innerHTML = "锁定";
    y1.className = "control5";
    y1.onclick = () => {
        if (control_block === true) warn("“选项” 已锁定。");
        else {
            control_block = true;
            cg("“选项” 已锁定。");
        }
    };
    const n1 = document.createElement("button");
    n1.type = "button";
    n1.innerHTML = "解锁";
    n1.className = "control6";
    n1.onclick = () => {
        if (control_block === false) warn("“选项” 已解锁。");
        else {
            control_block = false;
            cg("“选项” 已解锁。");
        }
    };

    const i_block = document.createElement("p");
    i_block.innerHTML = "设置 “未读信息” 状态";
    i_block.className = "lcont";
    const y2 = document.createElement("button");
    y2.type = "button";
    y2.innerHTML = "锁定";
    y2.className = "control7";
    y2.onclick = () => {
        if (inf_block === true) warn("“未读信息” 已锁定。");
        else {
            inf_block = true;
            cg("“未读信息” 已锁定。");
        }
    };
    const n2 = document.createElement("button");
    n2.type = "button";
    n2.innerHTML = "解锁";
    n2.className = "control8";
    n2.onclick = () => {
        if (inf_block === false) warn("“未读信息” 已解锁。");
        else {
            inf_block = false;
            cg("“未读信息” 已解锁。");
        }
    };

    const eas = document.createElement("p");
    eas.innerHTML = "easing";
    eas.className = "lcont";
    const inp1 = document.createElement("input");
    inp1.type = "text";
    inp1.id = "easing";
    inp1.className = "inpbox";
    inp1.value = easing;
    let t1 = false;
    inp1.onclick = () => {
        if (t1 === false) {
            noti("cubic-bezier 函数的格式是 cubic-bezier(x1, y1, x2, y2)，其中 x1 和 x2 必须在 0 到 1 之间，y1 和 y2 则可以是任意值；其他 easing 还有 ease、linear、ease-in、ease-out、ease-in-out、step、step-start、step-end。");
            t1 = true;
        }
    };
    inp1.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            easing = inp1.value;
        }
    });

    const mrms = document.createElement("p");
    mrms.innerHTML = "deftime";
    mrms.className = "lcont";
    const inp2 = document.createElement("input");
    let t2 = false;
    inp2.type = "text";
    inp2.id = "deftime";
    inp2.value = deftime;
    inp2.className = "inpbox";
    inp2.onclick = () => {
        if (t2 === false) {
            noti("deftime 的取值既可以为大于等于 1250 的整数，也可以为 Smart。");
            t2 = true;
        }
    };
    inp2.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            if (windows.length > 0) {
                warn(`现在不能设置 deftime 的值。${check()} 正在运行。`)
            } else {
                if (!isNaN(Number(inp2.value))) deftime = Number(inp2.value);
                else deftime = inp2.value;
            }
        }
    });

    const defw = document.createElement("p");
    defw.innerHTML = "defwid";
    defw.className = "lcont";
    const inp3 = document.createElement("input");
    let t3 = false;
    inp3.type = "number";
    inp3.id = "defwid";
    inp3.value = defwid;
    inp3.className = "inpbox";
    inp3.onclick = () => {
        if (t3 === false) {
            warn("defwid 只能为正整数。");
            t3 = true;
        }
    };
    inp3.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            defwid = Number(inp3.value);
        }
    });

    const defh = document.createElement("p");
    defh.innerHTML = "defhei";
    defh.className = "lcont";
    const inp4 = document.createElement("input");
    let t4 = false;
    inp4.type = "number";
    inp4.id = "defhei";
    inp4.value = defhei;
    inp4.className = "inpbox";
    inp4.onclick = () => {
        if (t4 === false) {
            warn("defhei 只能为正整数。");
            t4 = true;
        }
    };
    inp4.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            defhei = Number(inp4.value);
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
        c_block,
        i_block,
        eas,
        mrms,
        defw,
        defh,
    ];

    for (var i = 0; i < all.length; i++) {
        all[i].style.marginTop = `${(i + 1) * 90}px`;
    }

    ctrl.appendChild(title);
    ctrl.appendChild(ms);
    ctrl.appendChild(ts);
    ctrl.appendChild(c_block);
    ctrl.appendChild(i_block);
    ctrl.appendChild(eas);
    ctrl.appendChild(mrms);
    ctrl.appendChild(defw);
    ctrl.appendChild(defh);
    title.appendChild(jdt);
    ms.appendChild(ys);
    ms.appendChild(js);
    ts.appendChild(y);
    ts.appendChild(z);
    c_block.appendChild(y1);
    c_block.appendChild(n1);
    i_block.appendChild(y2);
    i_block.appendChild(n2);
    eas.appendChild(inp1);
    mrms.appendChild(inp2);
    defw.appendChild(inp3);
    defh.appendChild(inp4);
}

function inf_ui() {
    const inf = document.querySelector(".information-table");
    const title = document.createElement("p");
    title.innerHTML = "未读信息";
    title.className = "title";
    title.style.right = "25px";
    title.style.textAlign = "right";

    const jdt = document.createElement("div");
    jdt.style.height = "7px";
    jdt.style.width = "100%";
    jdt.style.backgroundColor = "#ffffff99";

    const notic = document.createElement("div");
    notic.innerHTML = "Noti()";
    notic.className = "rcont";
    notic.id = "notic";
    const noti_msg = document.createElement("p");
    noti_msg.className = "rtxt";
    noti_msg.id = "noti_msg";
    const noti_read = document.createElement("button");
    noti_read.type = "button";
    noti_read.className = "inf1";
    noti_read.onclick = () => {
        if (noti_unv.length > 0) {
            noti_unv = [];
            rz("已清空 Noti() 的未读信息。");
        }
    };

    const cgc = document.createElement("div");
    cgc.innerHTML = "Cg()";
    cgc.className = "rcont";
    cgc.id = "cgc";
    const cg_msg = document.createElement("p");
    cg_msg.className = "rtxt";
    cg_msg.id = "cg_msg";
    const cg_read = document.createElement("button");
    cg_read.type = "button";
    cg_read.className = "inf2";
    cg_read.onclick = () => {
        if (cg_unv.length > 0) {
            cg_unv = [];
            rz("已清空 Cg() 的未读信息。");
        }
    };

    const failc = document.createElement("div");
    failc.innerHTML = "Fail()";
    failc.className = "rcont";
    failc.id = "failc";
    const fail_msg = document.createElement("p");
    fail_msg.className = "rtxt";
    fail_msg.id = "fail_msg";
    const fail_read = document.createElement("button");
    fail_read.type = "button";
    fail_read.className = "inf3";
    fail_read.onclick = () => {
        if (fail_unv.length > 0) {
            fail_unv = [];
            rz("已清空 Fail() 的未读信息。");
        }
    };

    const warnc = document.createElement("div");
    warnc.innerHTML = "Warn()";
    warnc.className = "rcont";
    warnc.id = "warnc";
    const warn_msg = document.createElement("p");
    warn_msg.className = "rtxt";
    warn_msg.id = "warn_msg";
    const warn_read = document.createElement("button");
    warn_read.type = "button";
    warn_read.className = "inf4";
    warn_read.onclick = () => {
        if (warn_unv.length > 0) {
            warn_unv = [];
            rz("已清空 Warn() 的未读信息。");
        }
    };

    const synchrc = document.createElement("div");
    synchrc.innerHTML = "Synchr()";
    synchrc.className = "rcont";
    synchrc.id = "synchrc";
    const synchr_msg = document.createElement("p");
    synchr_msg.className = "rtxt";
    synchr_msg.id = "synchr_msg";
    const synchr_read = document.createElement("button");
    synchr_read.type = "button";
    synchr_read.className = "inf5";
    synchr_read.onclick = () => {
        if (synchr_unv.length > 0) {
            synchr_unv = [];
            rz("已清空 Synchr() 的未读信息。");
        }
    };

    const all = [
        notic,
        cgc,
        failc,
        warnc,
        synchrc,
    ];

    for (var i = 0; i < all.length; i++) {
        all[i].style.top = `calc(${i * 3}vh + 90px)`;
    }

    inf.appendChild(title);
    title.appendChild(jdt);
    inf.appendChild(notic);
    inf.appendChild(cgc);
    inf.appendChild(failc);
    inf.appendChild(warnc);
    inf.appendChild(synchrc);
    notic.appendChild(noti_msg);
    notic.appendChild(noti_read);
    cgc.appendChild(cg_msg);
    cgc.appendChild(cg_read);
    failc.appendChild(fail_msg);
    failc.appendChild(fail_read);
    warnc.appendChild(warn_msg);
    warnc.appendChild(warn_read);
    synchrc.appendChild(synchr_msg);
    synchrc.appendChild(synchr_read);
}

function inf_cont() { // 更新未读信息。
    const notic = document.getElementById("notic");
    const noti_msg = notic.querySelector(".rtxt");
    noti_msg.innerHTML = (noti_unv.length === 0 ? "空。" : noti_unv.join("<br />"));
    notic.style.height = hqgd(notic.innerHTML, "notic", "div");
    const noti_btn = notic.querySelector(".inf1");
    noti_btn.style.width = "170px";
    noti_btn.innerHTML = (noti_unv.length > 0 ? `清空 ${noti_unv.length} 条信息。` : "没有未读信息。");
    noti_btn.style.width = hqkd(noti_btn.innerHTML, "inf1", "button");

    const cgc = document.getElementById("cgc");
    const cg_msg = cgc.querySelector(".rtxt");
    cg_msg.innerHTML = (cg_unv.length === 0 ? "空。" : cg_unv.join("<br />"));
    cgc.style.height = hqgd(cgc.innerHTML, "cgc", "div");
    const cg_btn = cgc.querySelector(".inf2");
    cg_btn.style.width = "170px";
    cg_btn.innerHTML = (cg_unv.length > 0 ? `清空 ${cg_unv.length} 条信息。` : "没有未读信息。");
    cg_btn.style.width = hqkd(cg_btn.innerHTML, "inf2", "button");

    const failc = document.getElementById("failc");
    const fail_msg = failc.querySelector(".rtxt");
    fail_msg.innerHTML = (fail_unv.length === 0 ? "空。" : fail_unv.join("<br />"));
    failc.style.height = hqgd(failc.innerHTML, "failc", "div");
    const fail_btn = failc.querySelector(".inf3");
    fail_btn.style.width = "170px";
    fail_btn.innerHTML = (fail_unv.length > 0 ? `清空 ${fail_unv.length} 条信息。` : "没有未读信息。");
    fail_btn.style.width = hqkd(fail_btn.innerHTML, "inf3", "button");

    const warnc = document.getElementById("warnc");
    const warn_msg = warnc.querySelector(".rtxt");
    warn_msg.innerHTML = (warn_unv.length === 0 ? "空。" : warn_unv.join("<br />"));
    warnc.style.height = hqgd(warnc.innerHTML, "warnc", "div");
    const warn_btn = warnc.querySelector(".inf4");
    warn_btn.style.width = "170px";
    warn_btn.innerHTML = (warn_unv.length > 0 ? `清空 ${warn_unv.length} 条信息。` : "没有未读信息。");
    warn_btn.style.width = hqkd(warn_btn.innerHTML, "inf4", "button");

    const synchrc = document.getElementById("synchrc");
    const synchr_msg = synchrc.querySelector(".rtxt");
    synchr_msg.innerHTML = (synchr_unv.length === 0 ? "空。" : synchr_unv.join("<br />"));
    synchrc.style.height = hqgd(synchrc.innerHTML, "synchrc", "div");
    const synchr_btn = synchrc.querySelector(".inf5");
    synchr_btn.style.width = "170px";
    synchr_btn.innerHTML = (synchr_unv.length > 0 ? `清空 ${synchr_unv.length} 条信息。` : "没有未读信息。");
    synchr_btn.style.width = hqkd(synchr_btn.innerHTML, "inf5", "button");
}

function pos(p) {
    let total = 3 * window.innerHeight / 100;
    function fn(w) {
        w.forEach((window) => {
            const wh = window.offsetHeight;
            window.style.transition = `top 0.55s ${easing}`;
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

async function fn7() { // 网站介绍。
    let j1 = false; // 移动至 “选项”。
    let j2 = false;
    let j3 = false; // 移动至 “未读信息”。
    let w1 = false; // 完成 “选项” 介绍。
    let w2 = false; // 完成 “未读信息” 介绍。
    let w3 = false; // 完成所有介绍。

    const ctrl = document.querySelector(".control-pad");
    const inf = document.querySelector(".information-table");
    const ebox = document.getElementById("easing");
    const tbox = document.getElementById("deftime");
    const wbox = document.getElementById("defwid");
    const hbox = document.getElementById("defhei");

    await wz("欢迎来到 The Play Games 官方网站！是时候带你熟悉一下了。");
    noti("请将鼠标移动至左上角。");
    control_block = true;

    const i1 = setInterval(async () => {
        if (getComputedStyle(ctrl).animationName === "jr_ctrl" && j1 === false) {
            j1 = true;
            await wz("正如你所见，这里是该网站的 “选项” 界面！你可以在此处更改网站的各项特殊参数。");
            let q1 = await xz("是否需要演示如何更改？", 2, ["是。", "否。"]);
            if (q1 === "是。") {
                await wz("你可以直接点击相应的按钮便捷更改变量值，也可以通过输入来更改。");
                let q2 = await xz("选择哪个变量演示呢？", 4, ["easing", "deftime", "defwid", "defhei"]);
                noti("请修改该值。");
                switch (q2) {
                    case "easing":
                        ebox.focus();
                        ebox.addEventListener("keypress", (event) => {
                            if (event.key === "Enter") {
                                w1 = true;
                                control_block = false;
                                control_moved = true;
                            }
                        });
                        break;
                    case "deftime":
                        tbox.focus();
                        tbox.addEventListener("keypress", (event) => {
                            if (event.key === "Enter") {
                                w1 = true;
                                control_block = false;
                                control_moved = true;
                            }
                        });
                        break;
                    case "defwid":
                        wbox.focus();
                        wbox.addEventListener("keypress", (event) => {
                            if (event.key === "Enter") {
                                w1 = true;
                                control_block = false;
                                control_moved = true;
                            }
                        });
                        break;
                    case "defhei":
                        hbox.focus();
                        hbox.addEventListener("keypress", (event) => {
                            if (event.key === "Enter") {
                                w1 = true;
                                control_block = false;
                                control_moved = true;
                            }
                        });
                        break;
                }
            } else {
                await wz("好的，那我们继续。");
                control_block = false;
                control_moved = true;
                w1 = true;
            }
            clearInterval(i1);
        }
    }, 250);

    const i2 = setInterval(async () => {
        if (w1 === true && j2 === false) {
            j2 = true;
            await wz("接下来介绍的是 “未读信息” 界面。");
            noti("请将鼠标移动至右上角。");
            inf_block = true;
            const i3 = setInterval(async () => {
                if (getComputedStyle(inf).animationName === "jr_inf" && j3 === false) {
                    j3 = true;
                    await wz("在 “未读信息” 界面，你可以看到因窗口大小限制而没有看到的内容。");
                    inf_block = false;
                    inf_moved = true;
                    w2 = true;
                    clearInterval(i3);
                }
            }, 250);
            clearInterval(i2);
        }
    }, 250);

    const i3 = setInterval(async () => {
        if (w2 === true && w3 === false) {
            w3 = true;
            await wz("恭喜，你已经看完了网站的介绍！感谢你对 The Play Games 的支持。");
            control_block = false;
            control_moved = true;
            clearInterval(i3);
        }
    }, 250);
}

function visible(e, fn_name) {
    const rect = e.getBoundingClientRect();
    const viewport = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    if (viewport === false) {
        rz(`请注意，你有一条未读完的 ${fn_name}() 信息。`);
        switch (fn_name) {
            case "Noti":
                noti_unv.push(`${xzsj()} - ${e.innerHTML}`);
                break;
            case "Cg":
                cg_unv.push(`${xzsj()} - ${e.innerHTML}`);
                break;
            case "Fail":
                fail_unv.push(`${xzsj()} - ${e.innerHTML}`);
                break;
            case "Warn":
                warn_unv.push(`${xzsj()} - ${e.innerHTML}`);
                break;
            case "Synchr":
                synchr_unv.push(`${xzsj()} - ${e.innerHTML}`);
                break;
        }
    }
}