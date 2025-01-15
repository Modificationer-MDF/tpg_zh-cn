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
            div.style.animation = `-top 0.7s forwards ${easing}`;
            head.style.animation = `-head 0.7s forwards ${easing}`;
        }
    });
    div.addEventListener(`animationend`, (e) => {
        if (e.animationName === `-top`) {
            f1.style.animation = `_head3 0.7s forwards ${easing}`;
            f2.style.animation = `_head4 0.7s forwards ${easing}`;
            f3.style.animation = `_head5 0.7s forwards ${easing}`;
        }
    });
});

/* 第二部分。 */
function fn1() {
    const div = document.querySelector(`.head3`);
    const dakai = document.getElementById(`1`);
    dakai.style.transition = `all 0.7s ${easing}`;
    const xinxiBtn = document.createElement(`button`);
    xinxiBtn.style.marginTop = `15px`;
    xinxiBtn.innerHTML = `xinxi`;
    xinxiBtn.className = `btn1`;
    xinxiBtn.onclick = async () => {
        let res = await shuru(`输入你想显示在 xinxi 窗口上的信息。`, `在此输入。`);
        let time = await shuru(`输入你想显示 xinxi 窗口的持续时间。（单位：毫秒。输入的值必须大于等于 700。）`, `在此输入。`);
        let sty = await shuru(`输入你想使用的主题。`, `在此输入。`);
        xinxi(res, Number(time), sty);
    };
    const chenggongBtn = document.createElement(`button`);
    chenggongBtn.innerHTML = `chenggong`;
    chenggongBtn.className = `btn2`;
    chenggongBtn.onclick = async () => {
        let res = await shuru(`输入你想显示在 chenggong 窗口上的信息。`, `在此输入。`);
        let time = await shuru(`输入你想显示 chenggong 窗口的持续时间。（单位：毫秒。输入的值必须大于等于 700。）`, `在此输入。`);
        let sty = await shuru(`输入你想使用的主题。`, `在此输入。`);
        chenggong(res, Number(time), sty);
    };
    const cuowuBtn = document.createElement(`button`);
    cuowuBtn.innerHTML = `cuowu`;
    cuowuBtn.className = `btn3`;
    cuowuBtn.onclick = async () => {
        let res = await shuru(`输入你想显示在 cuowu 窗口上的信息。`, `在此输入。`);
        let time = await shuru(`输入你想显示 cuowu 窗口的持续时间。（单位：毫秒。输入的值必须大于等于 700。）`, `在此输入。`);
        let sty = await shuru(`输入你想使用的主题。`, `在此输入。`);
        cuowu(res, Number(time), sty);
    };
    const jinggaoBtn = document.createElement(`button`);
    jinggaoBtn.innerHTML = `jinggao`;
    jinggaoBtn.className = `btn4`;
    jinggaoBtn.onclick = async () => {
        let res = await shuru(`输入你想显示在 jinggao 窗口上的信息。`, `在此输入。`);
        let time = await shuru(`输入你想显示 jinggao 窗口的持续时间。（单位：毫秒。输入的值必须大于等于 700。）`, `在此输入。`);
        let sty = await shuru(`输入你想使用的主题。`, `在此输入。`);
        jinggao(res, Number(time), sty);
    };
    const shuruBtn = document.createElement(`button`);
    shuruBtn.innerHTML = `shuru`;
    shuruBtn.className = `btn5`;
    shuruBtn.onclick = async () => {
        await shuru(`这就是 shuru 窗口。`, `可以在这里输入一些文字。`);
    };
    const chuanshuBtn = document.createElement(`button`);
    chuanshuBtn.innerHTML = `chuanshu`;
    chuanshuBtn.className = `btn6`;
    chuanshuBtn.onclick = async () => {
        let res = await shuru(`输入你想显示在 chuanshu 窗口上的信息。`, `在此输入。`);
        let sty = await shuru(`输入你想使用的主题。`, `在此输入。`);
        chuanshu(res, sty);
    };
    const xuanzeBtn = document.createElement(`button`);
    xuanzeBtn.innerHTML = `xuanze`;
    xuanzeBtn.className = `btn7`;
    xuanzeBtn.onclick = async () => {
        let res = await shuru(`输入你想显示在 xuanze 窗口上的信息。`, `在此输入。`);
        let n = await shuru(`请输入 xuanze 窗口上选项的数量。`, `在此输入。`);
        n = Number(n);
        let array = new Array(n);
        for (let i = 0; i <= n - 1; i++) {
            array[i] = await shuru(`请输入 xuanze 窗口上第 ${i + 1} 个选项。`, `在此输入。`);
        }
        let sty = await shuru(`输入你想使用的主题。`, `在此输入。`);
        xuanze(res, n, array, sty);
    };
    const lianjieBtn = document.createElement(`button`);
    lianjieBtn.innerHTML = `lianjie`;
    lianjieBtn.className = `btn8`;
    lianjieBtn.onclick = async () => {
        let res = await shuru(`输入你想显示在 lianjie 窗口上的信息。`, `在此输入。`);
        let url = await shuru(`请输入你要链接的地址。`);
        let sty = await shuru(`输入你想使用的主题。`, `在此输入。`);
        lianjie(res, url, false, sty);
    };
    const zhongduanBtn = document.createElement(`button`);
    zhongduanBtn.innerHTML = `zhongduan`;
    zhongduanBtn.className = `btn9`;
    zhongduanBtn.onclick = async () => {
        let res = await shuru(`输入你想显示在 zhongduan 窗口上的信息。`, `在此输入。`);
        let sty = await shuru(`输入你想使用的主题。`, `在此输入。`);
        zhongduan(res, sty);
    };
    const wenziBtn = document.createElement(`button`);
    wenziBtn.innerHTML = `wenzi`;
    wenziBtn.className = `btn22`;
    wenziBtn.onclick = async () => {
        let res = await shuru(`输入你想显示在 wenzi 窗口上的信息。`, `在此输入。`);
        wenzi(res);
    };
    const rizhiBtn = document.createElement(`button`);
    rizhiBtn.innerHTML = `日志`;
    rizhiBtn.className = `btn25`;
    rizhiBtn.onclick = async () => {
        let date = new Date();
        const day = String(date.getDate()).padStart(2, `0`);
        const month = String(date.getMonth() + 1).padStart(2, `0`);
        const year = date.getFullYear();
        date = `${year} 年 ${month} 月 ${day} 日`;
        await wenzi(`
        我在这里写一下我开发该网页的日志吧。
        <br /> （按 [确定] 继续。）`);
        await wenzi(`
        创建日期：2024 年（几月我忘了）；
        <br /> 版本号：0.9 。
        <br /> 你正在查看的是 ${date} 的版本。
        <br /> （按 [确定] 继续。）`);
        await wenzi(`
        在开发过程中我遇到了很多困难，开发速度也非常缓慢。
        <br /> 一周更新 1 次，只有周五（也许）、周六、周日有时间更新。（甚至微机课上都在检查网页）
        <br /> 这些函数也可能会存在较多的 bug，但我会努力修复它们。`);
        await wenzi(`
        也不知道为什么，但我还是很开心。我的编程水平也得到了进步。
        <br /> （按 [确定] 继续。）`);
        await wenzi(`
        我将会继续维护 The Play Games 的网页。但与此同时，主程序的下一次更新可能需要等到 2025 年。
        <br /> （按 [确定] 继续。）`);
        await wenzi(`
        最后，感谢你使用 The Play Games！
        <br /> （按 [确定] 继续。）`);
        await xinxi(`你可以在 [函数展示 -> 设置] 中应用更现代化的 Neon 主题！当前主题：${theme}。`, 4000);
        let w = await xinxi("点击该窗口跳转到设置界面。（该窗口将显示 5 秒）", 5000);
        w.onclick = () => {
            set()
        };
    };

    const all = [
        rizhiBtn,
        xinxiBtn,
        chenggongBtn,
        cuowuBtn,
        jinggaoBtn,
        shuruBtn,
        chuanshuBtn,
        xuanzeBtn,
        lianjieBtn,
        zhongduanBtn,
        wenziBtn
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
    const xinxiBtn = document.createElement(`button`);
    xinxiBtn.innerHTML = `xinxi`;
    xinxiBtn.className = `btn1`;
    xinxiBtn.onclick = () => {
        xinxi("你好，欢迎使用 The Play Games！", 3000);
    };
    const chenggongBtn = document.createElement(`button`);
    chenggongBtn.innerHTML = `chenggong`;
    chenggongBtn.className = `btn2`;
    chenggongBtn.onclick = () => {
        chenggong("当你看到这条信息时，说明你已经成功运行了主函数区的这个函数。", 3000);
    };
    const cuowuBtn = document.createElement(`button`);
    cuowuBtn.innerHTML = `cuowu`;
    cuowuBtn.className = `btn3`;
    cuowuBtn.onclick = () => {
        cuowu("但有时候可能会报错，比如 NotAllowedError。", 3000);
    };
    const jinggaoBtn = document.createElement(`button`);
    jinggaoBtn.innerHTML = `jinggao`;
    jinggaoBtn.className = `btn4`;
    jinggaoBtn.onclick = () => {
        jinggao("看到这种信息时，要格外注意了。", 3000);
    };
    const shuruBtn = document.createElement(`button`);
    shuruBtn.innerHTML = `shuru`;
    shuruBtn.className = `btn5`;
    shuruBtn.onclick = () => {
        shuru("我很想听到你的想法。", "在此输入……");
    };
    const chuanshuBtn = document.createElement(`button`);
    chuanshuBtn.innerHTML = `chuanshu`;
    chuanshuBtn.className = `btn6`;
    chuanshuBtn.onclick = () => {
        chuanshu("目前，还没有开发传输文件的功能。");
    };
    const xuanzeBtn = document.createElement(`button`);
    xuanzeBtn.innerHTML = `xuanze`;
    xuanzeBtn.className = `btn7`;
    xuanzeBtn.onclick = async () => {
        var res = await xuanze("你对以上的函数有什么看法？", 4, ["很不错。", "还可以。", "一般。", "有待改进的空间。"]);
        switch (res) {
            case "很不错。":
                await xinxi("非常感谢！你还可以尝试其他的函数。");
                break;
            case "还可以。":
                await xinxi("谢谢你的评价！");
                break;
            case "一般。":
                await xinxi("我们可以做得更好。");
                break;
            case "有待改进的空间。":
                var r = await xuanze("你是否想向我反馈你的建议？", 2, ["是。", "否。"]);
                if (r) {
                    await lianjie("点击以下链接反馈。", "mailto://Feng_14@outlook.com", true);
                    break;
                } else {
                    await xinxi("好的，我们再见。");
                }
        }
    };
    const lianjieBtn = document.createElement(`button`);
    lianjieBtn.innerHTML = `lianjie`;
    lianjieBtn.className = `btn8`;
    lianjieBtn.onclick = () => {
        lianjie("点击此处浏览 The Play Games 的信息界面！", `https://modificationer-mdf.github.io/tpg_info/`);
    };
    const zhongduanBtn = document.createElement(`button`);
    zhongduanBtn.innerHTML = `zhongduan`;
    zhongduanBtn.className = `btn9`;
    zhongduanBtn.onclick = () => {
        zhongduan("在此处输入代码。");
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
        wenzi(null);
    };
    const undefinedBtn = document.createElement(`button`);
    undefinedBtn.innerHTML = `在函数的值中输入 undefined 值`;
    undefinedBtn.className = `btn11`;
    undefinedBtn.onclick = () => {
        wenzi(undefined);
    };
    const settings = document.createElement(`button`);
    settings.innerHTML = `设置`;
    settings.className = `btn24`;
    settings.onclick = async () => { set() };
    const imp = document.createElement(`button`);
    imp.textContent = `wenzi`;
    imp.className = `btn22`;
    imp.onclick = () => {
        wenzi("在这里可以显示文字！ <br />（背景使用了亚克力材料。）");
    };

    const all = [
        xinxiBtn,
        chenggongBtn,
        cuowuBtn,
        jinggaoBtn,
        shuruBtn,
        chuanshuBtn,
        xuanzeBtn,
        lianjieBtn,
        zhongduanBtn,
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

    div.style.animation = `head4- 0.7s forwards ${easing}`;
    dakai.textContent = `我们在以下的函数中增加了预设内容。`;
    dakai.style.transition = `all 0.7s ${easing}`;
    dakai.style.backgroundColor = `#001dff99`;
    dakai.style.width = `580px`;

    div.addEventListener(`animationend`, (e) => {
        if (e.animationName === `head4-`) {
            all.forEach(btn => {
                btn.style.display = `block`;
                btn.style.color = "#ffffff";
                btn.style.opacity = `0`; // 初始化为 0 。
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
        await jinggao(`从 0.7 版本开始，如果电脑装有 360 杀毒软件，可能会提示你下载的文件可能有病毒。但是，这是误判。`, 5000);
        let a = await xuanze(`你确定要下载吗？`, 2, [`是。`, `否。`]);
        if (a == "是。") {
            await chenggong(`已打开。`, 2000);
            flag = true;
        } else {
            await cuowu(`你终止了下载操作。`, 3000);
            return -39;
        }
    }
    const div = document.querySelector(`.head5`);
    div.style.animation = `head5- 0.7s forwards ${easing}`;
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
        rizhi(`2024 年 5 月 1 日发布。`);
    };
    a1.onclick = async () => {
        await chuanshu(`下载 Version_Collecting_1.zip。`);
    };
    const btn2 = document.createElement(`button`);
    btn2.className = `btn12`;
    btn2.type = `button`;
    const a2 = document.createElement(`a`);
    a2.href = `projects/Version_0.7.zip`;
    a2.download = `Version_0.7.zip`;
    a2.textContent = `下载 The Play Games 0.7`;
    a2.onmouseover = () => {
        rizhi(`2024 年 8 月 22 日发布。`);
    };
    const btn3 = document.createElement(`button`);
    btn3.className = `btn13`;
    btn3.type = `button`;
    const a3 = document.createElement(`a`);
    a3.href = `projects/Version_0.8.zip`;
    a3.download = `Version_0.8.zip`;
    a3.textContent = `下载 The Play Games 0.8`;
    a3.onmouseover = () => {
        rizhi(`2024 年 8 月 27 日发布。`);
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

async function set() {
    let arr = await xuanze(`你要修改哪些设置？`, 2, [`重新设置主题。`, `修改特殊变量的值。`]);
    if (arr === `重新设置主题。`) {
        let set = await xuanze(`请选择以下函数使用的主题。`, 2, [`Aero`, `Neon`]);
        if (set === `Aero`) {
            if (theme === `Aero`) {
                jinggao(`你已经在使用 Aero 主题。`, 3000);
                return 0;
            }
            theme = `Aero`;
            xinxi(`已切换到 Aero 主题。`, 2000);
        } else {
            if (theme === `Neon`) {
                jinggao(`你已经在使用 Neon 主题。`, 3000);
                return 0;
            }
            theme = `Neon`;
            xinxi(`已切换到 Neon 主题。`, 2000);
        }
    } else if (arr === `修改特殊变量的值。`) {
        let set = await xuanze(`请选择以下特殊变量。`, 3, [`nullcount`, `rizhinum`, `easing`]);
        if (set === `nullcount`) {
            let count = await shuru(`请输入 nullcount 的值。`, `在此输入。`);
            count = Number(count);
            if (count.isNaN) {
                cuowu(`请输入一个 number 类型的数字。而非 ${typeof count} 类型。`, 3000);
                return 0;
            }
            nullcount = count;
            xinxi(`nullcount 已被设置为 ${count}。`, 2000);
        } else if (set === `rizhinum`) {
            let count = await shuru(`请输入 rizhinum 的值。`, `在此输入。`);
            count = Number(count);
            if (count.isNaN) {
                cuowu(`请输入一个数字。而非 ${typeof count} 类型。`, 3000);
                return 0;
            }
            rizhinum = count;
            xinxi(`rizhinum 已被设置为 ${count}。`, 2000);
        } else if (set === `easing`) {
            let ease = await shuru(`请输入 easing 的值。`, `在此输入。`);
            const components = ease.split(",");
            let check = ease.startsWith("cubic-bezier(") &&
                ease.endsWith(")") &&
                components.length === 4;
            if (!check) {
                cuowu(`请输入一个合法的 cubic-bezier 函数。例如：cubic-bezier(0.33, 1, 0.68, 1)。`, 3000);
                return 0;
            }
            easing = ease;
            xinxi(`easing 已被设置为 ${ease}。`, 2000);
        }
    }
}

function totop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}