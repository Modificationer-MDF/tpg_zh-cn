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
    const time = `${y}.${m}/${d} ${h}:${mi >= 10 ? mi : "0" + String(mi)}:${s >= 10 ? s : "0" + String(s)}`;
    return time;
}

function fhsj(time) { // 返回带正确单位的时间。
    units = ["秒", "分钟", "小时", "天", "周", "年"];
    if (time < 6e4) {
        unit = units[0];
        transfer = 1000;
    } else if (time >= 6e4 && time < 3.6e6) {
        unit = units[1];
        transfer = 6e4;
    } else if (time >= 3.6e6 && time < 8.64e7) {
        unit = units[2];
        transfer = 3.6e6;
    } else if (time >= 8.64e7 && time < 6.048e8) {
        unit = units[3];
        transfer = 8.64e7;
    } else if (time >= 6.048e8 && time < 3.15576e10) {
        unit = units[4];
        transfer = 6.048e8;
    } else if (time >= 3.15576e10) {
        unit = units[5];
        transfer = 3.15576e10;
    }
    return `${(time / transfer).toFixed(2)} ${unit}`;
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
    let al = 0; // 字符数。
    let ma = 0; // 标点符号数。（包括全角符号和半角符号）
    for (var i = 0; i <= str.length - 1; i++) {
        if (alphabets.includes(str[i])) {
            al++;
        } else if (marks.includes(str[i])) {
            ma++;
        } else {
            zh++;
        }
    }
    return [zh, al, ma];
}

function smarttime(str) {
    str = String(str);
    str = str.replace(/\s+/g, "");

    if (deftime === "Smart") {
        let [zh, al, ma] = chara_sort(str);
        let time = zh * 165 + al * 95 + ma * 50;
        return (time > 1250 ? time : 1250);
    } else {
        return deftime;
    }
}

function openctrl() {
    const ctrl = document.querySelector(".control-pad");
    ctrl.style.animation = `jr_ctrl 0.55s forwards ${easing}`;
    control_block = true;
    noti("已打开并自动锁定 “选项”。");
}

function openinf() {
    const inf = document.querySelector(".information-table");
    inf.style.animation = `jr_inf 0.55s forwards ${easing}`;
    inf_block = true;
    noti("已打开并自动锁定 “未读信息”。");
}

function closectrl() {
    const ctrl = document.querySelector(".control-pad");
    ctrl.style.animation = `cc_ctrl 0.55s forwards ${easing}`;
    control_block = false;
    noti("已关闭并自动解锁 “选项”。");
}

function closeinf() {
    const inf = document.querySelector(".information-table");
    inf.style.animation = `cc_inf 0.55s forwards ${easing}`;
    inf_block = false;
    noti("已关闭并自动解锁 “未读信息”。");
}

function fn0() {
    if (mode === "Preset" && f2 === false) fn1();
    else if (mode === "Play" && f1 === false) fn2();
}

document.addEventListener("DOMContentLoaded", () => {
    const h1 = document.querySelector(".head1"); // h1 标签。
    const h2 = document.querySelector(".head2"); // h2 标签。
    const div = document.querySelector(".top"); // 包含 h1 和 h2 的 div 标签。
    const ps1 = document.getElementById("ps1");
    const ps2 = document.getElementById("ps2");
    const f1 = document.querySelector(".fn1"); // “函数展示”。
    const f3 = document.querySelector(".fn3"); // “版本列表”。

    h1.style.display = "block";
    h1.style.animation = "jr_head1 1.4s forwards cubic-bezier(0.33, 1, 0.68, 1)";
    h1.addEventListener("animationend", (e) => { // The Play Games
        if (e.animationName === "jr_head1") {
            h2.style.display = "block";
            h2.style.animation = "jr_head2 1.4s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        }
    });
    h2.addEventListener("animationend", (e) => { // Let the game-playing easier.
        if (e.animationName === "jr_head2") {
            div.style.animation = "jr_top 0.55s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            ps1.style.animation = "jr_head 0.55s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            ps2.style.animation = "jr_head 0.55s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        }
    });
    div.addEventListener("animationend", (e) => {
        if (e.animationName === "jr_top") {
            f1.style.animation = "jr1_fn1 0.55s forwards cubic-bezier(0.33, 1, 0.68, 1)"; // “函数展示” 进入动画。
            f3.style.animation = "jr1_fn3 0.55s forwards cubic-bezier(0.33, 1, 0.68, 1)"; // “版本列表” 进入动画。
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

function fn1() { // “函数演示” “预设” 模式。
    f1 = true; // 打开了 “预设”。

    const div = document.querySelector(".fn1");
    const dakai = document.getElementById("1");
    const div1 = document.createElement("div");
    div1.className = "div1";
    div1.textContent = "主函数区";
    const div2 = document.createElement("div");
    div2.className = "div2";
    div2.textContent = "副函数区";
    const div3 = document.createElement("div");
    div3.className = "div3";
    div3.textContent = "调试区";

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
        var res = await xz("你对以上的函数有什么看法？", 1, ["很不错。", "还可以。", "一般。", "有待改进的空间。"]);
        res = res.join("");
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
                var r = await xz("你是否想向我反馈你的建议？", 1, ["是。", "否。"]);
                r = r.join("");
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
            rz("计时结束。");
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
    div1.style.opacity = "0";
    div2.style.opacity = "0";
    div3.style.opacity = "0";

    all.forEach(btn => {
        btn.type = "button";
        btn.style.display = "none";
        btn.style.color = "#ffffff";
        btn.style.opacity = "0";
        btn.style.transition = "opacity 0.55s cubic-bezier(0.33, 1, 0.68, 1)";
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

    div.style.animation = `jr2_fn1 0.55s forwards ${easing}`;
    dakai.textContent = "以下是预设内容。";
    dakai.style.transition = `all 0.55s ${easing}`;
    dakai.style.backgroundColor = "#001dff99";
    dakai.style.width = hqkd("以下是预设内容。", "dakai", "button");

    div.addEventListener("animationend", (e) => {
        if (e.animationName === "jr2_fn1") {
            div1.style.display = "block";
            div1.style.transition = "opacity 0.55s cubic-bezier(0.33, 1, 0.68, 1)";
            div2.style.display = "block";
            div2.style.transition = "opacity 0.55s cubic-bezier(0.33, 1, 0.68, 1)";
            div3.style.display = "block";
            div3.style.transition = "opacity 0.55s cubic-bezier(0.33, 1, 0.68, 1)";
            setTimeout(() => {
                all.forEach(btn => {
                    btn.style.display = "block";
                    btn.style.opacity = "1";
                });
                div1.style.opacity = "1";
                div2.style.opacity = "1";
                div3.style.opacity = "1";
            }, 0);
        }
    });
}

function fn2() { // “函数演示” “演示” 模式。
    f2 = true; // 打开了 “演示”。

    const div = document.querySelector(".fn1");
    const dakai = document.getElementById("1");
    dakai.style.transition = `all 0.55s ${easing}`;
    const container = document.createElement("div");
    container.id = "fn2_cont";
    container.transition = `all 0.55s ${easing}`;

    const notibtn = document.createElement("button");
    notibtn.style.marginTop = "15px";
    notibtn.innerHTML = "noti";
    notibtn.className = "btn1";
    notibtn.onclick = async () => {
        let res = await inp("你想在 Noti() 上显示什么内容？");
        if (titleset === "Custom") {
            let t = await inp("本 Noti() 的标题是什么？");
            noti(res, t);
        } else {
            noti(res, "通知");
        }
    };
    const cgbtn = document.createElement("button");
    cgbtn.innerHTML = "cg";
    cgbtn.className = "btn2";
    cgbtn.onclick = async () => {
        let res = await inp("你想在 Cg() 上显示什么内容？");
        if (titleset === "Custom") {
            let t = await inp("本 Cg() 的标题是什么？");
            cg(res, t);
        } else {
            cg(res, "完成");
        }
    };
    const failbtn = document.createElement("button");
    failbtn.innerHTML = "fail";
    failbtn.className = "btn3";
    failbtn.onclick = async () => {
        let res = await inp("你想在 Fail() 上显示什么内容？");
        if (titleset === "Custom") {
            let t = await inp("本 Fail() 的标题是什么？");
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
        let res = await inp("你想在 Warn() 上显示什么内容？");
        if (titleset === "Custom") {
            let t = await inp("本 Warn() 的标题是什么？");
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
        let res = await inp("你想在 Xz() 上显示什么内容？");
        let n = await inp("本 Xz() 窗口一共有多少个选项？");
        n = Number(n);
        let ns = await inp("最多可以选择多少个选项？");
        ns = Number(ns);
        let array = new Array(n);
        for (let i = 0; i <= n - 1; i++) {
            array[i] = await inp(`第 ${i + 1} 个选项是什么？`);
        }
        if (titleset === "Custom") {
            let t = await inp("本 Xz() 的标题是什么？");
            let ls_res = await xz(res, ns, array, t);
            noti(`你选择了：“${ls_res.join("，")}”。`);
        } else {
            let ls_res = await xz(res, ns, array, "选择");
            noti(`你选择了：“${ls_res.join("，")}”。`);
        }
    };
    const ljbtn = document.createElement("button");
    ljbtn.innerHTML = "lj";
    ljbtn.className = "btn8";
    ljbtn.onclick = async () => {
        let res = await inp("你想在 Lj() 上显示什么内容？");
        let url = await inp("本 Lj() 上的链接是什么？");
        if (titleset === "Custom") {
            let t = await inp("本 Lj() 的标题是什么？");
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
        let res = await inp("你想在 Timer() 上显示什么内容？");
        let t = await inp("这次计时多久？（单位：毫秒）");
        t = Number(t);
        if (titleset === "Custom") {
            let t1 = await inp("本 Timer() 的标题是什么？");
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
        let res = await inp("你想在 Wz() 上显示什么内容？");
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

    div.appendChild(container);
    if (div.children.length <= 2) {
        all.forEach(btn => {
            container.appendChild(btn);
        });
    }

    div.style.animation = `jr2_fn2 0.55s forwards ${easing}`;
    dakai.style.backgroundColor = "#001dff99";
    dakai.style.width = hqkd("在此处演示函数。", "dakai", "button");
    dakai.textContent = "在此处演示函数。";

    div.addEventListener("animationend", (e) => {
        if (e.animationName === "jr2_fn2") {
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

function opendiv_permission(div) {
    let ls_visibility = getComputedStyle(div).visibility;
    let ls_opacity = getComputedStyle(div).opacity;
    if (ls_visibility === "visible" || ls_opacity === "1") {
        return true;
    }
    else if (ls_visibility === "hidden" || ls_opacity === "0") {
        return false;
    } 
}

function closefn0() {
    const div = document.querySelector(".fn1");
    const dakai = document.getElementById("1");
    dakai.style.backgroundColor = "#ffe20099";
    dakai.innerHTML = "打开";
    dakai.style.width = "600px";

    if (f1 === true) { // 打开了 “预设”。
        const div1 = document.querySelector(".div1");
        const div2 = document.querySelector(".div2");
        const div3 = document.querySelector(".div3");

        div1.style.opacity = "0";
        div2.style.opacity = "0";
        div3.style.opacity = "0";

        div3.addEventListener("transitionend", () => {
            div.removeChild(div1);
            div.removeChild(div2);
            div.removeChild(div3);
            div.style.animation = `cc2_fn1 0.55s forwards ${easing}`;
        });
        f1 = false;
    }
    if (f2 === true) { // 打开了 “演示”。
        const container = document.getElementById("fn2_cont");
        container.style.transition = `all 0.55s ${easing}`;
        container.style.opacity = 0;
        container.addEventListener("transitionend", () => {
            div.removeChild(container);
            div.style.animation = `cc2_fn2 0.55s forwards ${easing}`;
        });
        f2 = false;
    }
}

function fn3() {
    f3 = true;
    warn("该文件可能会被误判为恶意软件，请注意甄别。");

    const div = document.querySelector(".fn3");
    div.style.animation = `jr2_fn3 0.55s forwards ${easing}`;
    const dakai = document.getElementById("3");
    dakai.style.transition = `all 0.55s ${easing}`;
    dakai.style.backgroundColor = "#001dff99";
    dakai.style.width = hqkd("在此处下载 The Play Games 所有版本。", "dakai", "button");
    dakai.textContent = "在此处下载 The Play Games 所有版本。";
    const container = document.createElement("div");
    container.id = "fn3_cont";

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
    div.appendChild(container);
    if (div.children.length <= 2) {
        all.forEach((btn, index) => {
            if (index >= 0 && index < 3) container.appendChild(btn);
            else if (index === 3) btn1.appendChild(btn);
            else if (index === 4) btn2.appendChild(btn);
            else if (index === 5) btn3.appendChild(btn);
        });
    }

    div.addEventListener("animationend", (e) => {
        if (e.animationName === "jr2_fn3") {
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

function closefn3() {
    if (f3 === true) {
        const div = document.querySelector(".fn3");
        const dakai = document.getElementById("3");
        dakai.style.transition = `all 0.55s ${easing}`;
        dakai.style.backgroundColor = "#ffe20099";
        dakai.innerHTML = "打开";
        dakai.style.width = "600px";

        const container = document.getElementById("fn3_cont");
        container.style.transition = `all 0.55s ${easing}`;
        container.style.opacity = 0;
        container.addEventListener("transitionend", () => {
            div.removeChild(container);
            div.style.animation = `cc2_fn3 0.55s forwards ${easing}`;
        });
        f3 = false;
    } else {
        fail("“版本列表” 未打开。")
    }
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
    const title = document.createElement("div");
    title.innerHTML = "选项";
    title.className = "title";
    title.style.right = "25px";
    const icon = document.createElement("img");
    icon.style.position = "absolute";
    icon.alt = "";
    icon.style.right = "0px";
    icon.src = "images/Options.png";

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

    const rightmenu = document.createElement("p");
    rightmenu.innerHTML = "右键菜单设置";
    rightmenu.className = "lcont";
    const m1 = document.createElement("button");
    m1.type = "button";
    m1.innerHTML = "跟随该网站的设置";
    m1.className = "control9";
    m1.onclick = () => {
        if (rightset === "跟随该网站的设置") warn("右键菜单已为该值。");
        else {
            rightset = "跟随该网站的设置";
            cg("重新设置了右键菜单的属性。");
        }
    };
    const m2 = document.createElement("button");
    m2.type = "button";
    m2.innerHTML = "跟随浏览器的设置";
    m2.className = "control10";
    m2.onclick = () => {
        fail("该功能暂未实现。");
    };

    const c_block = document.createElement("p");
    c_block.innerHTML = "设置 “选项” 状态";
    c_block.className = "lcont";
    const y1 = document.createElement("button");
    y1.innerHTML = "锁定";
    y1.type = "button";
    y1.className = "control5";
    y1.onclick = () => {
        if (control_block === true) warn("“选项” 已锁定。");
        else {
            control_block = true;
            cg("“选项” 已锁定。");
        }
    };
    const img1 = document.createElement("img");
    img1.src = "images/Lock.png";
    img1.alt = ""
    img1.style.position = "relative";
    img1.style.left = "10px";

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
    const img2 = document.createElement("img");
    img2.src = "images/Unlock.png";
    img2.alt = ""
    img2.style.position = "relative";
    img2.style.left = "10px";

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
    const img3 = document.createElement("img");
    img3.src = "images/Lock.png";
    img3.alt = ""
    img3.style.position = "relative";
    img3.style.left = "10px";

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
    const img4 = document.createElement("img");
    img4.src = "images/Unlock.png";
    img4.alt = ""
    img4.style.position = "relative";
    img4.style.left = "10px";

    const eas = document.createElement("div");
    eas.innerHTML = "缓动函数（easing）";
    eas.className = "lcont";
    eas.onclick = () => {
        wz("cubic-bezier 函数的格式是 cubic-bezier(x1, y1, x2, y2)，其中 x1 和 x2 必须在 0 到 1 之间，y1 和 y2 则可以是任意值；其他 easing 还有 ease、linear、ease-in、ease-out、ease-in-out、step、step-start、step-end。");
    };
    const img5 = document.createElement("img");
    img5.src = "images/Easing.png";
    img5.alt = ""
    img5.style.position = "relative";
    img5.style.left = "10px";
    const inp1 = document.createElement("input");
    inp1.type = "text";
    inp1.id = "easing";
    inp1.className = "inpbox";
    inp1.value = easing;
    inp1.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            easing = inp1.value;
        }
    });

    const mrms = document.createElement("p");
    mrms.innerHTML = "窗口停留时间（deftime）";
    mrms.className = "lcont";
    mrms.onclick = () => {
        noti("deftime 的取值既可以为大于等于 1250 的整数，也可以为 Smart。");
    };
    const img6 = document.createElement("img");
    img6.src = "images/Deftime.png";
    img6.alt = ""
    img6.style.position = "relative";
    img6.style.left = "10px";
    const inp2 = document.createElement("input");
    inp2.type = "text";
    inp2.id = "deftime";
    inp2.value = deftime;
    inp2.className = "inpbox";
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
    defw.innerHTML = "Lj() 打开的窗口默认宽度（defwid）";
    defw.className = "lcont";
    defw.onclick = () => {
        warn("defwid 只能为正整数。");
    };
    const img7 = document.createElement("img");
    img7.src = "images/Defwid.png";
    img7.alt = ""
    img7.style.position = "relative";
    img7.style.left = "10px";
    const inp3 = document.createElement("input");
    inp3.type = "number";
    inp3.id = "defwid";
    inp3.value = defwid;
    inp3.className = "inpbox";
    inp3.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            defwid = Number(inp3.value);
        }
    });

    const defh = document.createElement("p");
    defh.innerHTML = "Lj() 打开的窗口默认高度（defhei）";
    defh.className = "lcont";
    defh.onclick = () => {
        warn("defhei 只能为正整数。");
    };
    const img8 = document.createElement("img");
    img8.src = "images/Defhei.png";
    img8.alt = ""
    img8.style.position = "relative";
    img8.style.left = "10px";
    const inp4 = document.createElement("input");
    inp4.type = "number";
    inp4.id = "defhei";
    inp4.value = defhei;
    inp4.className = "inpbox";
    inp4.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            defhei = Number(inp4.value);
        }
    });

    const jssd = document.createElement("p");
    jssd.innerHTML = "Timer() 正计时速度（timer_speed）";
    jssd.className = "lcont";
    jssd.onclick = () => {
        noti("timer_speed 的数值只能为正数。");
    };
    const img9 = document.createElement("img");
    img9.src = "images/Timingspeed.png";
    img9.alt = ""
    img9.style.position = "relative";
    img9.style.left = "10px";
    const inp5 = document.createElement("input");
    inp5.type = "number";
    inp5.id = "timingspeed";
    inp5.value = timer_speed;
    inp5.className = "inpbox";
    inp5.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            timer_speed = Number(inp5.value);
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
        rightmenu,
        c_block,
        i_block,
        eas,
        mrms,
        defw,
        defh,
        jssd,
    ];

    ctrl.appendChild(title);

    for (var i = 0; i < all.length; i++) {
        all[i].style.position = "relative";
        ms.style.marginTop = "100px";
        all[i].style.marginTop = `${(i + 1) * 10}px`;
        ctrl.appendChild(all[i]);
    }

    title.appendChild(icon);
    title.appendChild(jdt);

    ms.appendChild(ys);
    ms.appendChild(js);

    ts.appendChild(y);
    ts.appendChild(z);

    rightmenu.appendChild(m1);
    rightmenu.appendChild(m2);

    c_block.appendChild(y1);
    y1.appendChild(img1);
    c_block.appendChild(n1);
    n1.appendChild(img2);

    i_block.appendChild(y2);
    y2.appendChild(img3);
    i_block.appendChild(n2);
    n2.appendChild(img4);

    eas.appendChild(img5);
    eas.appendChild(inp1);

    mrms.appendChild(img6);
    mrms.appendChild(inp2);

    defw.appendChild(img7);
    defw.appendChild(inp3);

    defh.appendChild(img8);
    defh.appendChild(inp4);

    jssd.appendChild(img9);
    jssd.appendChild(inp5);
}

function inf_ui() {
    const inf = document.querySelector(".information-table");
    const title = document.createElement("div");
    title.innerHTML = "未读信息";
    title.className = "title";
    title.style.right = "0px";
    const icon = document.createElement("img");
    icon.style.position = "absolute";
    icon.alt = "";
    icon.style.right = "0px";
    icon.src = "images/Unread Messages.png";
    const jdt = document.createElement("div");
    jdt.style.height = "7px";
    jdt.style.width = "350px";
    jdt.style.backgroundColor = "#ffffff99";

    const counts = document.createElement("div");
    counts.style.transition = `all 0.3s ${easing}`;
    counts.style.width = "100%";
    counts.id = "counts";
    counts.style.textAlign = "center";
    counts.style.position = "absolute";
    counts.style.top = "50%";
    counts.style.fontSize = "20px";
    counts.style.color = "#ffffff";

    const clear = document.createElement("button");
    clear.style.visibility = "hidden";
    clear.style.opacity = 0;
    clear.style.transition = `all 0.3s ${easing}`;
    clear.type = "button";
    clear.id = "clear-all";
    clear.innerHTML = "清空信息。";
    clear.style.width = "15ch";
    clear.className = "inf1";
    clear.style.position = "absolute";
    clear.style.top = "90px";
    clear.style.left = "0%";
    clear.style.backgroundColor = "#00000099";
    clear.style.color = "#ffffff";

    const container = document.createElement("div");
    container.id = "inf_container";
    container.style.position = "relative";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.top = "180px";

    inf.appendChild(title);
    title.appendChild(icon);
    title.appendChild(jdt);
    inf.appendChild(counts);
    inf.appendChild(clear);
    inf.appendChild(container);
}

async function inf_cont() { // 更新未读信息。
    const inf = document.querySelector(".information-table");
    const counts = document.getElementById("counts");
    const clear = document.getElementById("clear-all");
    const container = document.getElementById("inf_container");
    let qj_count = noti_unv.length + cg_unv.length + fail_unv.length + warn_unv.length + synchr_unv.length;

    function 懒得起名(函数, 数组, 变量) {
        for (let i = 变量; i < 数组.length; i++) {
            const 元素 = document.createElement("div");
            元素.className = `${函数}c`;
            元素.id = `${函数}c-${i}`;
            元素.style.position = "position";
            元素.style.transition = `opacity 0.3s, transform 0.3s, top 0.3s, margin-bottom 0.3s ${easing}`;
            元素.style.opacity = 0;
            元素.style.transform = "translateY(100%)";
            const 元素_sq = document.createElement("div");
            元素_sq.className = `${函数}-square`;
            元素_sq.style.fontSize = "20px";
            元素_sq.style.textAlign = "center";
            const 元素_msg = document.createElement("div");
            元素_msg.className = "rcont";
            元素_msg.style.transition = `all 0.2s ${easing}`;
            元素_msg.style.marginTop = "25px";
            元素_msg.innerHTML = 数组[i];
            元素_sq.innerHTML = `${xzsj()} ${函数[0].toUpperCase() + 函数.slice(1)}()`;
            container.appendChild(元素);
            元素.appendChild(元素_sq);
            元素.appendChild(元素_msg);

            setTimeout(() => {
                元素.style.transform = "translateY(0)";
                元素.style.visibility = "visible";
                元素.style.opacity = 1;
            }, 14);
        }
    }

    if (noti_unv.length > ls_notiunv) {
        懒得起名("noti", noti_unv, ls_notiunv);
        ls_notiunv = noti_unv.length;
    } else if (noti_unv.length < ls_notiunv) {
        if (unv_warned === false) {
            warn("请不要另辟蹊径地修改 noti_unv。该网站将在 7 秒后刷新。");
            unv_warned = true;
            let a = await timer("计时 7 秒。", 7000);
            if (a) location.reload();
        }
    }

    if (cg_unv.length > ls_cgunv) {
        懒得起名("cg", cg_unv, ls_cgunv);
        ls_cgunv = cg_unv.length;
    } else if (cg_unv.length < ls_cgunv) {
        if (unv_warned === false) {
            warn("请不要另辟蹊径地修改 cg_unv。该网站将在 7 秒后刷新。");
            unv_warned = true;
            let a = await timer("计时 7 秒。", 7000);
            if (a) location.reload();
        }
    }

    if (fail_unv.length > ls_failunv) {
        懒得起名("fail", fail_unv, ls_failunv);
        ls_failunv = fail_unv.length;
    } else if (fail_unv.length < ls_failunv) {
        if (unv_warned === false) {
            warn("请不要另辟蹊径地修改 fail_unv。该网站将在 7 秒后刷新。");
            unv_warned = true;
            let a = await timer("计时 7 秒。", 7000);
            if (a) location.reload();
        }
    }

    if (warn_unv.length > ls_warnunv) {
        懒得起名("warn", warn_unv, ls_warnunv);
        ls_warnunv = warn_unv.length;
    } else if (warn_unv.length < ls_warnunv) {
        if (unv_warned === false) {
            warn("请不要另辟蹊径地修改 warn_unv。该网站将在 7 秒后刷新。");
            unv_warned = true;
            let a = await timer("计时 7 秒。", 7000);
            if (a) location.reload();
        }
    }

    if (synchr_unv.length > ls_synchrunv) {
        懒得起名("synchr", synchr_unv, ls_synchrunv);
        ls_synchrunv = synchr_unv.length;
    } else if (synchr_unv.length < ls_synchrunv) {
        if (unv_warned === false) {
            warn("请不要另辟蹊径地修改 synchr_unv。该网站将在 7 秒后刷新。");
            unv_warned = true;
            let a = await timer("计时 7 秒。", 7000);
            if (a) location.reload();
        }
    }

    if (qj_count === 0) {
        counts.style.top = "50%";
        counts.innerHTML = "没有未读信息。";

        clear.style.visibility = "hidden";
        clear.style.opacity = 0;
        clear.style.left = "0%";
    } else {
        counts.style.top = "140px";
        counts.innerHTML = `有 ${qj_count} 条未读信息。`;

        clear.style.visibility = "visible";
        clear.style.opacity = 1;
        clear.style.left = "50%";

        clear.onclick = async () => {
            inf_block = true;

            let ls_str = "";
            let q = await xz("清空哪些信息？", 5, ["Noti()", "Cg()", "Fail()", "Warn()", "Synchr()"]);
            if (q.includes("Noti()")) {
                if (noti_unv.length > 0) ls_str += "[id^='notic-'],";
                else rz("Noti() 没有未读信息。");
            } if (q.includes("Cg()")) {
                if (cg_unv.length > 0) ls_str += "[id^='cgc-'],";
                else rz("Cg() 没有未读信息。");
            } if (q.includes("Fail()")) {
                if (fail_unv.length > 0) ls_str += "[id^='failc-'],";
                else rz("Fail() 没有未读信息。");
            } if (q.includes("Warn()")) {
                if (warn_unv.length > 0) ls_str += "[id^='warnc-'],";
                else rz("Warn() 没有未读信息。");
            } if (q.includes("Synchr()")) {
                if (synchr_unv.length > 0) ls_str += "[id^='synchrc-'],";
                else rz("Synchr() 没有未读信息。");
            }
            if (ls_str === "") rz("你没有选择任何信息。");
            else {
                ls_str = ls_str.slice(0, -1);
                const qj_elements = inf.querySelectorAll(ls_str);
                qj_elements.forEach((el, index) => {
                    el.style.opacity = 0;
                    el.style.transform = "translateX(300px)";
                    el.style.marginBottom = `-${el.offsetHeight}px`

                    el.addEventListener("transitionend", () => {
                        container.removeChild(el);
                    }, { once: true });

                    if (index === qj_elements.length - 1) {
                        setTimeout(() => {
                            if (q.includes("Noti()")) {
                                noti_unv = [];
                                ls_notiunv = 0;
                            } if (q.includes("Cg()")) {
                                cg_unv = [];
                                ls_cgunv = 0;
                            } if (q.includes("Fail()")) {
                                fail_unv = [];
                                ls_failunv = 0;
                            } if (q.includes("Warn()")) {
                                warn_unv = [];
                                ls_warnunv = 0;
                            } if (q.includes("Synchr()")) {
                                synchr_unv = [];
                                ls_synchrunv = 0;
                            }
                        }, 300);
                    }
                });
            }
        };
    }
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

function create(window) { // 创建窗口。
    if (window.className !== "rz-window") {
        windows.push(window);
        pos(true);
    } else {
        rzwin.push(window);
        pos(false);
    }
}

function close(window) { // 关闭窗口。
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
    if (during_fn7) {
        warn("不可同时运行多个介绍程序！");
        return;
    } else {
        during_fn7 = true;
    }

    let j1 = false; // 移动至 “选项”。
    let j2 = false; // 移动至 “未读信息”。
    let j3 = false; // 调出 “右键菜单”。
    let ls_j2 = false;
    let ls_j3 = false;
    let w1 = false; // 完成 “选项” 介绍。
    let w2 = false; // 完成 “未读信息” 介绍。
    let w3 = false; // 完成 “右键菜单” 介绍。
    let w4 = false; // 完成所有介绍。

    const ctrl = document.querySelector(".control-pad");
    const inf = document.querySelector(".information-table");
    const rmenu = document.querySelector(".rightclick-menu");
    const main = document.getElementById("main");
    const ebox = document.getElementById("easing");
    const tbox = document.getElementById("deftime");
    const wbox = document.getElementById("defwid");
    const hbox = document.getElementById("defhei");
    const tsbox = document.getElementById("timingspeed");

    await wz("欢迎来到 The Play Games 官方网站！是时候带你熟悉一下了。");
    noti("请将鼠标移动至左上角。");
    control_block = true;

    const i1 = setInterval(async () => {
        if (getComputedStyle(ctrl).animationName === "jr_ctrl" && j1 === false) {
            ld(main, "75%");
            j1 = true;
            await wz("正如你所见，这里是该网站的 “选项” 界面！你可以在此处更改网站的各项特殊参数。");
            let q1 = await xz("是否需要演示如何更改？", 1, ["是。", "否。"]);
            q1 = q1.join("");
            if (q1 === "是。") {
                await wz("你可以直接点击相应的按钮便捷更改变量值，也可以通过输入来更改。");
                let q2 = await xz("选择哪个变量演示呢？", 1, ["easing", "deftime", "defwid", "defhei", "timer_speed"]);
                q2 = q2.join("");
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
                    case "timer_speed":
                        tsbox.focus();
                        tsbox.addEventListener("keypress", (event) => {
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
            ld(main, "100%");
        }
    }, 250);

    const i2 = setInterval(async () => {
        if (w1 === true && ls_j2 === false) {
            ls_j2 = true;
            await wz("接下来介绍的是 “未读信息” 界面。");
            noti("请将鼠标移动至右上角。");
            inf_block = true;
            const i3 = setInterval(async () => {
                if (getComputedStyle(inf).animationName === "jr_inf" && j2 === false) {
                    ld(main, "75%");
                    j2 = true;
                    await wz("在 “未读信息” 界面，你可以看到因窗口大小限制而没有看到的内容。");
                    inf_block = false;
                    inf_moved = true;
                    w2 = true;
                    clearInterval(i3);
                }
            }, 250);
            clearInterval(i2);
            ld(main, "100%");
        }
    }, 250);

    const i4 = setInterval(async () => {
        if (w2 === true && ls_j3 === false) {
            ls_j3 = true;
            await wz("然后，我将为你介绍该网站最近更新的 “右键菜单”。");
            noti("请单击鼠标右键。（可能需要按 2 次）");
            const i5 = setInterval(async () => {
                if (rmenu.style.opacity === "1" && j3 === false) {
                    ld(main, "75%");
                    j3 = true;
                    await wz("通过右键菜单，你可以快速完成一些常见操作。");
                    noti("注：若要打开控制台，请按 F12。");
                    w3 = true;
                    clearInterval(i5);
                }
            }, 250);
            clearInterval(i4);
            ld(main, "100%");
        }
    }, 250);

    const i6 = setInterval(async () => {
        if (w1 === true && w2 === true && w3 === true && w4 === false) {
            w4 = true;
            await wz("恭喜，你已经熟悉了该网站的大多功能。感谢你对 The Play Games 的支持！");
            during_fn7 = false;
            clearInterval(i6);
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
                noti_unv.push(e.innerHTML);
                break;
            case "Cg":
                cg_unv.push(e.innerHTML);
                break;
            case "Fail":
                fail_unv.push(e.innerHTML);
                break;
            case "Warn":
                warn_unv.push(e.innerHTML);
                break;
            case "Synchr":
                synchr_unv.push(e.innerHTML);
                break;
        }
    }
}