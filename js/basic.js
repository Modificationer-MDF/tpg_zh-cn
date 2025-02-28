let flag = false;
/* 第一部分。 */
document.addEventListener(`DOMContentLoaded`, () => {
    const h1 = document.querySelector(`.head1`); // h1 标签。
    const h2 = document.querySelector(`.head2`); // h2 标签。
    const div = document.querySelector(`.top`); // 包含 h1 和 h2 的 div 标签。
    const head = document.querySelector(`.head`); // The Play Games 版本标签。
    const f1 = document.querySelector(`.head3`); // 功能按钮组。
    const f2 = document.querySelector(`.head4`); // 功能按钮组。
    const f3 = document.querySelector(`.head5`); // 功能按钮组。

    h1.addEventListener(`animationend`, (e) => {
        if (e.animationName === `-head1`) {
            h2.style.display = `block`;
            h2.style.animation = `-head2 1.4s forwards ${easing}`;
        }
    });
    h2.addEventListener(`animationend`, (e) => {
        if (e.animationName === `-head2`) {
            div.style.animation = `-top 0.5s forwards ${easing}`;
            head.style.animation = `-head 0.5s forwards ${easing}`;
        }
    });
    div.addEventListener(`animationend`, (e) => {
        if (e.animationName === `-top`) {
            f1.style.animation = `_head3 0.5s forwards ${easing}`;
            f2.style.animation = `_head4 0.5s forwards ${easing}`;
            f3.style.animation = `_head5 0.5s forwards ${easing}`;
        }
    });
    const ctrl = document.getElementById("ctrl");
    let moved = false;

    document.addEventListener("mousemove", function (event) {
        let width = ctrl.getBoundingClientRect().width;
        if (event.clientX <= 25 && event.clientY <= 25 && moved === false) {
            ctrl.style.animation = `ctrl- 0.5s forwards ${easing}`;
            moved = true;
        } else if (event.clientX >= width && moved === true) {
            ctrl.style.animation = `-ctrl 0.5s forwards ${easing}`;
            moved = false;
        }
    });
});

/* 第二部分。 */
function fn1() {
    const div = document.querySelector(`.head3`);
    const dakai = document.getElementById(`1`);
    dakai.style.transition = `all 0.5s ${easing}`;
    const infoBtn = document.createElement(`button`);
    infoBtn.style.marginTop = `15px`;
    infoBtn.innerHTML = `info`;
    infoBtn.className = `btn1`;
    infoBtn.onclick = async () => {
        let res = await inp(`输入你想显示在 info 窗口上的信息。`, `在此输入。`);
        let time = await inp(`输入你想显示 info 窗口的持续时间。（单位：毫秒。输入的值必须大于等于 500。）`, `在此输入。`);
        let sty = await inp(`输入你想使用的主题。`, `在此输入。`);
        info(res, Number(time), sty);
    };
    const cgBtn = document.createElement(`button`);
    cgBtn.innerHTML = `cg`;
    cgBtn.className = `btn2`;
    cgBtn.onclick = async () => {
        let res = await inp(`输入你想显示在 cg 窗口上的信息。`, `在此输入。`);
        let time = await inp(`输入你想显示 cg 窗口的持续时间。（单位：毫秒。输入的值必须大于等于 500。）`, `在此输入。`);
        let sty = await inp(`输入你想使用的主题。`, `在此输入。`);
        cg(res, Number(time), sty);
    };
    const failBtn = document.createElement(`button`);
    failBtn.innerHTML = `fail`;
    failBtn.className = `btn3`;
    failBtn.onclick = async () => {
        let res = await inp(`输入你想显示在 fail 窗口上的信息。`, `在此输入。`);
        let time = await inp(`输入你想显示 fail 窗口的持续时间。（单位：毫秒。输入的值必须大于等于 500。）`, `在此输入。`);
        let sty = await inp(`输入你想使用的主题。`, `在此输入。`);
        fail(res, Number(time), sty);
    };
    const warnBtn = document.createElement(`button`);
    warnBtn.innerHTML = `warn`;
    warnBtn.className = `btn4`;
    warnBtn.onclick = async () => {
        let res = await inp(`输入你想显示在 warn 窗口上的信息。`, `在此输入。`);
        let time = await inp(`输入你想显示 warn 窗口的持续时间。（单位：毫秒。输入的值必须大于等于 500。）`, `在此输入。`);
        let sty = await inp(`输入你想使用的主题。`, `在此输入。`);
        warn(res, Number(time), sty);
    };
    const inpBtn = document.createElement(`button`);
    inpBtn.innerHTML = `inp`;
    inpBtn.className = `btn5`;
    inpBtn.onclick = async () => {
        await inp(`这就是 inp 窗口。`, `可以在这里输入一些文字。`);
    };
    const tranBtn = document.createElement(`button`);
    tranBtn.innerHTML = `tran`;
    tranBtn.className = `btn6`;
    tranBtn.onclick = async () => {
        let res = await inp(`输入你想显示在 tran 窗口上的信息。`, `在此输入。`);
        let sty = await inp(`输入你想使用的主题。`, `在此输入。`);
        tran(res, sty);
    };
    const xzBtn = document.createElement(`button`);
    xzBtn.innerHTML = `xz`;
    xzBtn.className = `btn7`;
    xzBtn.onclick = async () => {
        let res = await inp(`输入你想显示在 xz 窗口上的信息。`, `在此输入。`);
        let n = await inp(`请输入 xz 窗口上选项的数量。`, `在此输入。`);
        n = Number(n);
        let array = new Array(n);
        for (let i = 0; i <= n - 1; i++) {
            array[i] = await inp(`请输入 xz 窗口上第 ${i + 1} 个选项。`, `在此输入。`);
        }
        let sty = await inp(`输入你想使用的主题。`, `在此输入。`);
        xz(res, n, array, sty);
    };
    const ljBtn = document.createElement(`button`);
    ljBtn.innerHTML = `lj`;
    ljBtn.className = `btn8`;
    ljBtn.onclick = async () => {
        let res = await inp(`输入你想显示在 lj 窗口上的信息。`, `在此输入。`);
        let url = await inp(`请输入你要链接的地址。`);
        let sty = await inp(`输入你想使用的主题。`, `在此输入。`);
        lj(res, url, false, sty);
    };
    const wzBtn = document.createElement(`button`);
    wzBtn.innerHTML = `wz`;
    wzBtn.className = `btn22`;
    wzBtn.onclick = async () => {
        let res = await inp(`输入你想显示在 wz 窗口上的信息。`, `在此输入。`);
        wz(res);
    };
    const rzBtn = document.createElement(`button`);
    rzBtn.innerHTML = `日志`;
    rzBtn.className = `btn25`;
    rzBtn.onclick = async () => {
        let date = new Date();
        const day = String(date.getDate()).padStart(2, `0`);
        const month = String(date.getMonth() + 1).padStart(2, `0`);
        const year = date.getFullYear();
        date = `${year} 年 ${month} 月 ${day} 日`;
        await wz(`
        我在这里写一下我开发该网页的日志吧。
        <br /> （按 [确定] 继续。）`);
        await wz(`
        创建日期：2024 年（几月我忘了）；
        <br /> 版本号：0.9 。
        <br /> 你正在查看的是 ${date} 的版本。
        <br /> （按 [确定] 继续。）`);
        await wz(`
        在开发过程中我遇到了很多困难，开发速度也非常缓慢。
        <br /> 一周更新 1 次，只有周五（也许）、周六、周日有时间更新。（甚至微机课上都在检查网页）
        <br /> 这些函数也可能会存在较多的 bug，但我会努力修复它们。`);
        await wz(`
        也不知道为什么，但我还是很开心。我的编程水平也得到了进步。
        <br /> （按 [确定] 继续。）`);
        await wz(`
        我将会继续维护 The Play Games 的网页。但与此同时，主程序的下一次更新可能需要等到 2025 年。
        <br /> （按 [确定] 继续。）`);
        await wz(`
        最后，感谢你使用 The Play Games！
        <br /> （按 [确定] 继续。）`);
        await info(`你可以在 [函数展示 -> 设置] 中应用更现代化的 Neon 主题！当前主题：${theme}。`, 4000);
        let w = await info("点击该窗口跳转到设置界面。（该窗口将显示 5 秒）", 5000);
        w.onclick = () => {
            set()
        };
    };

    const all = [
        rzBtn,
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

    div.style.animation = `head3- 0.5s forwards ${easing}`;
    dakai.style.backgroundColor = `#001dff99`;
    dakai.style.width = `540px`;
    dakai.textContent = `你可以在此设置和演示这些新函数。`;

    div.addEventListener(`animationend`, (e) => {
        if (e.animationName === `head3-`) {
            all.forEach(btn => {
                btn.style.display = `block`;
                btn.style.color = "#ffffff";
                btn.style.opacity = `0`; // 初始化为 0 。
                btn.style.transition = `opacity 0.5s ${easing}`;
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
    const div = document.querySelector(`.head4`);
    const div1 = document.createElement(`div`);
    div1.className = `div1`;
    div1.textContent = `主函数区`;
    const div2 = document.createElement(`div`);
    div2.className = `div2`;
    div2.textContent = `副函数区`;
    const div3 = document.createElement(`div`);
    div3.className = `div3`;
    div3.textContent = `调试区`;
    const dakai = document.getElementById(`2`);
    dakai.textContent = `查看。`;
    dakai.style.width = `140px`;
    const infoBtn = document.createElement(`button`);
    infoBtn.innerHTML = `info`;
    infoBtn.className = `btn1`;
    infoBtn.onclick = () => {
        info("你好，欢迎使用 The Play Games！", 3000);
    };
    const cgBtn = document.createElement(`button`);
    cgBtn.innerHTML = `cg`;
    cgBtn.className = `btn2`;
    cgBtn.onclick = () => {
        cg("当你看到这条信息时，说明你已经成功运行了主函数区的这个函数。", 3000);
    };
    const failBtn = document.createElement(`button`);
    failBtn.innerHTML = `fail`;
    failBtn.className = `btn3`;
    failBtn.onclick = () => {
        fail("但有时候可能会报错，比如 NotAllowedError。", 3000);
    };
    const warnBtn = document.createElement(`button`);
    warnBtn.innerHTML = `warn`;
    warnBtn.className = `btn4`;
    warnBtn.onclick = () => {
        warn("看到这种信息时，要格外注意了。", 3000);
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
                await info("非常感谢！你还可以尝试其他的函数。");
                break;
            case "还可以。":
                await info("谢谢你的评价！");
                break;
            case "一般。":
                await info("我们可以做得更好。");
                break;
            case "有待改进的空间。":
                var r = await xz("你是否想向我反馈你的建议？", 2, ["是。", "否。"]);
                if (r) {
                    await lj("点击以下链接反馈。", "mailto://Feng_14@outlook.com", true);
                    break;
                } else {
                    await info("好的，我们再见。");
                }
        }
    };
    const ljBtn = document.createElement(`button`);
    ljBtn.innerHTML = `lj`;
    ljBtn.className = `btn8`;
    ljBtn.onclick = () => {
        lj("点击此处浏览 The Play Games 的信息界面！", `https://modificationer-mdf.github.io/tpg_info/`);
    };
    const zdBtn = document.createElement(`button`);
    zdBtn.innerHTML = `zd`;
    zdBtn.className = `btn9`;
    zdBtn.onclick = () => {
        zd("在此处输入代码。");
    };
    const Fn_1 = document.createElement(`button`);
    Fn_1.innerHTML = `fn_1`;
    Fn_1.className = `fn-1`;
    Fn_1.onclick = () => {
        fn_1();
    };
    const Fn_2 = document.createElement(`button`);
    Fn_2.innerHTML = `fn_2`;
    Fn_2.className = `fn-2`;
    Fn_2.onclick = () => {
        fn_2();
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
    const settings = document.createElement(`button`);
    settings.innerHTML = `设置`;
    settings.className = `btn24`;
    settings.onclick = async () => { set() };
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
        Fn_1,
        Fn_2,
        settings,
        nullBtn,
        undefinedBtn,
    ];

    div1.style.display = `none`;
    div2.style.display = `none`;
    div3.style.display = `none`;
    all.forEach(btn => {
        btn.type = `button`;
        btn.style.display = `none`;
    });

    if (div.children.length <= 1) {
        div.appendChild(div1);
        div.appendChild(div2);
        div.appendChild(div3);
        all.forEach((btn, index) => {
            if (index >= 0 && index < 10) {
                div1.appendChild(btn);
            } else if (index >= 10 && index < 12) {
                div2.appendChild(btn);
            } else {
                div3.appendChild(btn);
            }
        });
    }

    div.style.animation = `head4- 0.5s forwards ${easing}`;
    dakai.textContent = `我们在以下的函数中增加了预设内容。`;
    dakai.style.transition = `all 0.5s ${easing}`;
    dakai.style.backgroundColor = `#001dff99`;
    dakai.style.width = `580px`;

    div.addEventListener(`animationend`, (e) => {
        if (e.animationName === `head4-`) {
            all.forEach(btn => {
                btn.style.display = `block`;
                btn.style.color = "#ffffff";
                btn.style.opacity = `0`; // 初始化为 0 。
                btn.style.transition = `opacity 0.5s ${easing}`;
            });
            div1.style.display = `block`;
            div1.style.opacity = `0`;
            div1.style.transition = `opacity 0.5s ${easing}`;
            div2.style.display = `block`;
            div2.style.opacity = `0`;
            div2.style.transition = `opacity 0.5s ${easing}`;
            div3.style.display = `block`;
            div3.style.opacity = `0`;
            div3.style.transition = `opacity 0.5s ${easing}`;
            setTimeout(() => {
                all.forEach(btn => {
                    btn.style.opacity = `1`; // 改变为 1，触发过渡。
                });
                div1.style.opacity = `1`;
                div2.style.opacity = `1`;
                div3.style.opacity = `1`;
            }, 0);
        }
    });
}

async function fn3() {
    if (!flag) {
        await warn(`从 0.7 版本开始，如果电脑装有 360 杀毒软件，可能会提示你下载的文件可能有病毒。但是，这是误判。`, 5000);
        let a = await xz(`你确定要下载吗？`, 2, [`是。`, `否。`]);
        if (a == "是。") {
            await cg(`已打开。`, 2000);
            flag = true;
        } else {
            await fail(`你终止了下载操作。`, 3000);
            return -39;
        }
    }
    const div = document.querySelector(`.head5`);
    div.style.animation = `head5- 0.5s forwards ${easing}`;
    const dakai = document.getElementById(`3`);
    dakai.style.transition = `all 0.5s ${easing}`;
    dakai.style.backgroundColor = `#001dff99`;
    dakai.style.width = `500px`;
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
        await tran(`下载 Version_Collecting_1.zip。`);
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
        if (e.animationName === `head5-`) {
            all.forEach(btn => {
                btn.style.display = `block`;
                btn.color = "#ffffff";
                btn.style.opacity = `0`; // 初始化为 0 。
                btn.style.transition = `opacity 0.5s ${easing}`;
            });
            setTimeout(() => {
                all.forEach(btn => {
                    btn.style.opacity = `1`; // 显示。
                });
            }, 0);
        }
    });
}

async function set() {
    let arr = await xz(`你要修改哪些设置？`, 2, [`重新设置主题。`, `修改特殊变量的值。`]);
    if (arr === `重新设置主题。`) {
        let set = await xz(`请选择以下函数使用的主题。`, 2, [`Aero`, `Neon`]);
        if (set === `Aero`) {
            if (theme === `Aero`) {
                warn(`你已经在使用 Aero 主题。`, 3000);
                return 0;
            }
            theme = `Aero`;
            info(`已切换到 Aero 主题。`, 2000);
        } else {
            if (theme === `Neon`) {
                warn(`你已经在使用 Neon 主题。`, 3000);
                return 0;
            }
            theme = `Neon`;
            info(`已切换到 Neon 主题。`, 2000);
        }
    } else if (arr === `修改特殊变量的值。`) {
        let set = await xz(`请选择以下特殊变量。`, 3, [`nullcount`, `rznum`, `easing`]);
        if (set === `nullcount`) {
            let count = await inp(`请输入 nullcount 的值。`, `在此输入。`);
            count = Number(count);
            if (count.isNaN) {
                fail(`请输入一个 number 类型的数字。而非 ${typeof count} 类型。`, 3000);
                return 0;
            }
            nullcount = count;
            info(`nullcount 已被设置为 ${count}。`, 2000);
        } else if (set === `rznum`) {
            let count = await inp(`请输入 rznum 的值。`, `在此输入。`);
            count = Number(count);
            if (count.isNaN) {
                fail(`请输入一个数字。而非 ${typeof count} 类型。`, 3000);
                return 0;
            }
            rznum = count;
            info(`rznum 已被设置为 ${count}。`, 2000);
        } else if (set === `easing`) {
            let ease = await inp(`请输入 easing 的值。`, `在此输入。`);
            const components = ease.split(",");
            let check = ease.startsWith("cubic-bezier(") &&
                ease.endsWith(")") &&
                components.length === 4;
            if (!check) {
                fail(`请输入一个合法的 cubic-bezier 函数。例如：cubic-bezier(0.33, 1, 0.68, 1)。`, 3000);
                return 0;
            }
            easing = ease;
            info(`easing 已被设置为 ${ease}。`, 2000);
        }
    }
}

function totop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function zd(s) {
    const t = s.pop();
    s.push(t);
    return t;
}

function fn4() {
    let stack = [];
    stack.push(0);
    const ctrl = document.getElementById("ctrl");
    const oc1 = document.getElementById("oc1");
    const oc2 = document.getElementById("oc2");

    const img = document.createElement("img");
    img.src = "images/Next.png"
    img.className = "img1";

    const content1 = document.createElement("div");
    content1.className = "zhedie0";
    content1.innerHTML = "调用函数。";
    const btn1 = document.createElement("button");
    btn1.className = "zhedie1";
    btn1.onclick = () => {
        stack.push(1);
    }

    const content2 = document.createElement("div");
    content2.className = "zhedie0-1";
    content2.innerHTML = "演示函数。";
    const btn2 = document.createElement("button");
    btn2.className = "zhedie1";
    btn2.onclick = () => {
        stack.push(2);
    }

    const content3 = document.createElement("div");
    content3.className = "zhedie0-1";
    content3.style.top = "25vh";
    content3.innerHTML = "查看函数使用情况";
    const btn3 = document.createElement("button");
    btn3.className = "zhedie1";
    btn3.onclick = () => {
        stack.push(3);
    }

    if (zd(stack) == 1) {
        // 懒了。
    }
    else if (zd(stack) == 2) {
        // 懒了。
    } else if (zd(stack) == 3) {
        // 懒了。
    }
}