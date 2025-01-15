var rizhinum = 0; // rizhi() 目前存在的数量。
var nullcount = 0; // 连续输入 null 或 undefined 的次数。
var windows = []; // 信息数组。
let rizhiwin = []; // rizhi() 信息数组。
let totalHeight = 0; // rizhi() 的总高度。
let urlEndings = [
    `.com`, `.net`, `.cn`, `.org`, `.edu`, `.gov`, `.mil`,
    `.biz`, `.info`, `.name`, `.pro`, `.aero`, `.coop`,
    `.museum`, `.jobs`, `.travel`, `.xxx`, `.top`, `.site`,
    `.wiki`, `.cc`, `.tv`, `.mobi`, `.me`, `.bid`, `.club`,
    `.online`, `.store`, `.work`, `.tech`
]; // 常见的 URL 后缀。

// 更新窗口位置的函数。

function updateSelectedWindowPos() {
    let total = 7 * window.innerHeight / 100;
    windows.forEach((window) => {
        const wh = window.offsetHeight;
        window.style.transition = `top 0.3s ${easing}`;
        window.style.top = `${total}px`;
        total += wh + 7;
    });
}

// 创建窗口函数和关闭窗口函数。

function create(window) {
    windows.push(window);
    updateSelectedWindowPos(); // 更新所有窗口位置。
}

function close(window) {
    windows = windows.filter(win => win !== window);
    updateSelectedWindowPos(); // 更新所有窗口位置。
}

function monitor() {
    if (nullcount >= 3 && nullcount < 7) {
        jinggao(`你已连续 ${nullcount} 次输入 null 或 undefined。请检查你所输入的内容。`)
    } else if (nullcount >= 7 && nullcount < 14) {
        jinggao(`再次警告！你已连续输入 null 或 undefined ${nullcount} 次。请检查你所输入的内容。`)
    } else if (nullcount >= 14 && nullcount < 25) {
        xinxi(`null 和 undefined 是指，变量的值为 null 或 undefined，即你在 prompt 输入框中点击了取消或者在函数的参数中传入了 null 或 undefined。请检查你所输入的内容。`);
    } else if (nullcount >= 25 && nullcount < 30) {
        cuowu(`你已被禁止调用任何函数。`);
        console.warn(`你已被禁止调用任何函数。`);
        jinggao(`请查看控制台。`);
    }
}

// rizhi 函数。

function rizhi(string, time) {
    rizhinum++;
    function re() {
        totalHeight = rizhiwin.reduce((acc, w) => acc + w.offsetHeight, 0);
    }

    if (time == null || time == undefined) {
        time = 3000;
    } else if (string.includes("\n")) {
        string = string.replace(/\n/g, `<br />`);
    }

    const window = document.createElement(`div`);
    window.className = `rizhi-window`;
    window.style.opacity = 0;
    const content = document.createElement(`div`);
    content.className = `rizhi-content`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    content.style.height = `calc(${line * 20}px)`;

    document.body.appendChild(window);
    window.appendChild(content);

    window.style.top = `calc(${totalHeight}px + ${rizhinum}vh)`;
    totalHeight += window.offsetHeight;
    rizhiwin.push(window);

    requestAnimationFrame(() => {
        window.style.animation = `-rizhi 0.7s forwards ${easing}`;
    });

    setTimeout(() => {
        window.style.animation = `rizhi- 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            rizhiwin = rizhiwin.filter(w => w !== window);
            re();
            rizhinum--;
        }, 700);
    }, time);
}

// xinxi 函数。

function xinxi(string, ms, style) {
    if (string == null || string == undefined) {
        nullcount++;
        cuowu(`所输入内容不能为 null 或 undefined。`, 3000);
        monitor();
        return 39;
    } else if (string.includes("\n")) {
        string = string.replace(/\n/g, `<br />`);
    } else {
        string = string.toString();
    }
    let replaced = string.replace(/\s+/g, ``);
    if (replaced === ``) {
        cuowu(`所输入内容不能为空字符串。`, 3000);
        return -39;
    } else if (ms === undefined || ms === null || Number.isNaN(ms) || Number(ms) < 700) {
        cuowu(`请指定正确的显示时间。`, 3000);
        return 0;
    } else if (style === undefined || style === null) {
        style = theme;
    }
    if (nullcount > 26) {
        rizhi(`你已被禁止调用函数。`);
    }

    const window = document.createElement(`div`);
    window.className = `xinxi-window`;
    const square = document.createElement(`div`);
    square.className = `xinxi-square`;
    const icon = document.createElement(`img`);
    icon.src = `images/Xinxi.png`;
    const content = document.createElement(`div`);
    content.className = `xinxi-content`;
    const bar = document.createElement(`div`);
    bar.className = `xinxi-progressbar`;

    if (style === `Neon`) {
        window.style.backdropFilter = `blur(14px) saturate(250%)`;
        square.style.backdropFilter = `blur(14px) saturate(250%)`;
    }

    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    window.appendChild(bar);
    square.appendChild(icon);
    create(window);

    // icon.innerHTML = `第 ${xinxiNum} 条信息`;
    content.innerHTML = string;

    const visible = () => {
        const rect = window.getBoundingClientRect();
        const viewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        if (viewport === false) {
            rizhi(`你有 1 条未读完的 xinxi() 信息。 <button type="button" class="btn28" onclick="totop()">回到网页顶部</button>`);
        }
    };

    const line = Math.ceil(string.length / 14);
    const lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    let pro = 0; // 进度条进度。 
    const interval = setInterval(() => {
        pro += 16 / (ms / 100);
        bar.style.width = `${pro}%`;
        if (pro >= 100) {
            clearInterval(interval);
        }
    }, 16);

    setTimeout(() => {
        window.style.animation = `xinxi- 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window);
        }, 700);
    }, ms);
    setTimeout(visible, ms);
    return window;
}

// chenggong 函数。

function chenggong(string, ms, style) {
    if (string == null || string == undefined) {
        nullcount++;
        cuowu(`所输入内容不能为 null 或 undefined。`, 3000);
        monitor();
        return 39;
    } else if (string.includes("\n")) {
        string = string.replace(/\n/g, `<br />`);
    } else {
        string = string.toString();
    }
    let replaced = string.replace(/\s+/g, ``);
    if (replaced === ``) {
        cuowu(`所输入内容不能为空字符串。`, 3000);
        return -39;
    } else if (ms === undefined || ms === null || Number.isNaN(ms) || Number(ms) <= 0) {
        cuowu(`请指定正确的显示时间。`, 3000);
        return 0;
    } else if (style === undefined || style === null) {
        style = theme;
    }
    if (nullcount > 26) {
        rizhi(`你已被禁止调用函数。`);
    }

    const window = document.createElement(`div`);
    window.className = `chenggong-window`;
    const square = document.createElement(`div`);
    square.className = `chenggong-square`;
    const icon = document.createElement(`img`);
    icon.src = `images/Tongguo.png`;
    const content = document.createElement(`div`);
    content.className = `chenggong-content`;
    const bar = document.createElement(`div`);
    bar.className = `chenggong-progressbar`;
    if (theme === `Neon`) {
        window.style.backdropFilter = `blur(14px) saturate(250%)`;
        square.style.backdropFilter = `blur(14px) saturate(250%)`;
    }

    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    window.appendChild(bar);
    square.appendChild(icon);
    create(window); 

    // icon.innerHTML = `第 ${chenggongNum} 条成功消息`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    let pro = 0;
    const interval = setInterval(() => {
        pro += 16 / (ms / 100);
        bar.style.width = `${pro}%`;
        if (pro >= 100) {
            clearInterval(interval);
        }
    }, 16);

    const visible = () => {
        const rect = window.getBoundingClientRect();
        const viewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        if (viewport === false) {
            rizhi(`你有 1 条未读完的 chenggong() 信息。 <button type="button" class="btn28" onclick="totop()">回到网页顶部</button>`);
        }
    };

    setTimeout(() => {
        window.style.animation = `chenggong- 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }, ms);
    setTimeout(visible, ms);
    return window;
}

// cuowu 函数。

function cuowu(string, ms, style) {
    if (string == null || string == undefined) {
        nullcount++;
        cuowu(`所输入内容不能为 null 或 undefined。`, 3000);
        monitor();
        return 39;
    } else if (string.includes("\n")) {
        string = string.replace(/\n/g, `<br />`);
    } else {
        string = string.toString();
    }
    let replaced = string.replace(/\s+/g, ``);
    if (replaced === ``) {
        cuowu(`所输入内容不能为空字符串。`, 3000);
        return -39;
    } else if (ms === undefined || ms === null || Number.isNaN(ms) || Number(ms) <= 0) {
        cuowu(`请指定正确的显示时间。`, 3000);
        return 0;
    } else if (style === undefined || style === null) {
        style = theme;
    }
    if (nullcount > 26) {
        rizhi(`你已被禁止调用函数。`);
    }

    const window = document.createElement(`div`);
    window.className = `cuowu-window`;
    const square = document.createElement(`div`);
    square.className = `cuowu-square`;
    const icon = document.createElement(`img`);
    icon.className = `cuowu-icon`;
    const content = document.createElement(`div`);
    content.className = `cuowu-content`;
    const bar = document.createElement(`div`);
    bar.className = `cuowu-progressbar`;
    if (theme === `Neon`) {
        window.style.backdropFilter = `blur(14px) saturate(250%)`;
        square.style.backdropFilter = `blur(14px) saturate(250%)`;
    }

    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    window.appendChild(bar);
    square.appendChild(icon);
    create(window); // 添加窗口。

    icon.src = `images/Shibai.png`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    let pro = 0;
    const interval = setInterval(() => {
        pro += 16 / (ms / 100);
        bar.style.width = `${pro}%`;
        if (pro >= 100) {
            clearInterval(interval);
        }
    }, 16);

    const visible = () => {
        const rect = window.getBoundingClientRect();
        const viewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        if (viewport === false) {
            rizhi(`你有 1 条未读完的 cuowu() 信息。 <button type="button" class="btn28" onclick="totop()">回到网页顶部</button>`);
        }
    };

    setTimeout(() => {
        window.style.animation = `cuowu- 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }, ms);
    setTimeout(visible, ms);
    return window;
}

// jinggao 函数。

function jinggao(string, ms, style) {
    if (string == null || string == undefined) {
        nullcount++;
        cuowu(`所输入内容不能为 null 或 undefined。`, 3000);
        monitor();
        return 39;
    } else if (string.includes("\n")) {
        string = string.replace(/\n/g, `<br />`);
    } else {
        string = string.toString();
    }
    let replaced = string.replace(/\s+/g, ``);
    if (replaced === ``) {
        cuowu(`所输入内容不能为空字符串。`, 3000);
        return -39;
    } else if (ms === undefined || ms === null || Number.isNaN(ms) || Number(ms) <= 0) {
        cuowu(`请指定正确的显示时间。`, 3000);
        return 0;
    } else if (style === undefined || style === null) {
        style = theme;
    }
    if (nullcount > 26) {
        rizhi(`你已被禁止调用函数。`);
    }

    const window = document.createElement(`div`);
    window.className = `jinggao-window`;
    const square = document.createElement(`div`);
    square.className = `jinggao-square`;
    const icon = document.createElement(`img`);
    icon.className = `jinggao-icon`;
    const content = document.createElement(`div`);
    content.className = `jinggao-content`;
    const bar = document.createElement(`div`);
    bar.className = `jinggao-progressbar`;
    if (theme === `Neon`) {
        window.style.backdropFilter = `blur(14px) saturate(250%)`;
        square.style.backdropFilter = `blur(14px) saturate(250%)`;
    }

    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    window.appendChild(bar);
    square.appendChild(icon);
    create(window); // 添加窗口。

    icon.src = `images/Zhuyi.png`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    let pro = 0;
    const interval = setInterval(() => {
        pro += 16 / (ms / 100);
        bar.style.width = `${pro}%`;
        if (pro >= 100) {
            clearInterval(interval);
        }
    }, 16);

    const visible = () => {
        const rect = window.getBoundingClientRect();
        const viewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        if (viewport === false) {
            rizhi(`你有 1 条未读完的 jinggao() 信息。 <button type="button" class="btn28" onclick="totop()">回到网页顶部</button>`);
        }
    };

    setTimeout(() => {
        window.style.animation = `jinggao- 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }, ms);
    setTimeout(visible, ms);
    return window;
}

// shuru 函数。

async function shuru(string, holder, style) {
    return new Promise((resolve) => {
        if (string === null || string === undefined || holder === undefined || holder === null) {
            nullcount++;
            cuowu(`所输入内容不能为 null 或 undefined。`, 3000);
            monitor();
            return 39;
        } else if (string.includes("\n")) {
            string = string.replace(/\n/g, `<br />`);
        } else {
            string = string.toString();
            holder = holder.toString();
        }
        let replaced1 = string.replace(/\s+/g, ``);
        let replaced2 = holder.replace(/\s+/g, ``);
        if (replaced1 === `` || replaced2 === ``) {
            cuowu(`所输入内容不能为空字符串。`, 3000);
            return -39;
        } else if (style === undefined || style === null) style = theme;
        if (nullcount > 26) {
            rizhi(`你已被禁止调用函数。`);
        }

        const window = document.createElement(`div`);
        window.className = `shuru-window`;
        const square = document.createElement(`div`);
        square.className = `shuru-square`;
        const icon = document.createElement(`img`);
        icon.className = `shuru-icon`;
        const content = document.createElement(`div`);
        content.className = `shuru-content`;

        const box = document.createElement(`input`);
        box.type = `text`;
        box.className = `shuru-box`;
        box.placeholder = holder;
        if (theme === `Neon`) {
            window.style.backdropFilter = `blur(14px) saturate(250%)`;
            square.style.backdropFilter = `blur(14px) saturate(250%)`;
            box.style.backgroundFilter = `blur(14px) saturate(250%)`;
        }

        create(window); // 添加窗口。
        document.body.appendChild(window);
        window.appendChild(square);
        window.appendChild(content);
        window.appendChild(box);
        square.appendChild(icon);
        
        icon.src = `images/Shuruchuangkou.png`;
        content.innerHTML = string;

        const line = Math.ceil(string.length / 14);
        var lineHeight = parseInt(window.style.lineHeight);
        content.style.height = `${line * lineHeight}px`;

        box.focus();
        box.addEventListener(`keypress`, (event) => {
            if (event.key === `Enter`) {
                const value = box.value;
                window.style.animation = `shuru- 0.7s forwards ${easing}`;
                setTimeout(() => {
                    if (document.body.contains(window)) {
                        document.body.removeChild(window);
                        resolve(value);
                        close(); // 移除窗口。
                    }
                }, 700);
            }
        });
    });
}

// xuanze 函数。

async function xuanze(string, n, names, style) {
    return new Promise((resolve) => {
        if (n === null || n === undefined) n = 2;
        else if (isNaN(n)) cuowu("所输入的选项数量必须为数字。", 3000);
        n = Math.ceil(Number(n));
        const array = Array.from(names);
        array.reverse();

        const window = document.createElement(`div`);
        window.className = `xuanze-window`;
        const square = document.createElement(`div`);
        square.className = `xuanze-square`;
        const icon = document.createElement(`img`);
        icon.className = `xuanze-icon`;
        const content = document.createElement(`div`);
        content.className = `xuanze-content`;

        if (string == null || string == undefined) {
            nullcount++;
            cuowu(`所输入内容不能为 null 或 undefined。`, 3000);
            monitor();
            return 39;
        } else if (string.includes("\n")) {
            string = string.replace(/\n/g, `<br />`);
        } else {
            string = string.toString();
        }
        let replaced1 = string.replace(/\s+/g, ``);
        if (replaced1 === ``) {
            cuowu(`所输入内容不能为空字符串。`, 3000);
            return -39;
        } else if (style === undefined || style === null) style = theme;
        if (nullcount > 26) {
            rizhi(`你已被禁止调用函数。`);
        }
        if (theme === `Neon`) {
            window.style.backdropFilter = `blur(14px) saturate(250%)`;
            square.style.backdropFilter = `blur(14px) saturate(250%)`;
        }

        create(window); // 添加窗口。
        document.body.appendChild(window);
        window.appendChild(square);
        window.appendChild(content);
        square.appendChild(icon);

        icon.src = `images/Xuanxiang.png`;
        content.innerHTML = string;

        const line = Math.ceil(string.length / 14);
        var lineHeight = parseInt(window.style.lineHeight);
        content.style.height = `${line * lineHeight}px`;

        const tohex = (r, g, b) => {
            const tohex_ = (value) => {
                const hex = value.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            };
            return `#${tohex_(r)}${tohex_(g)}${tohex_(b)}`;
        };

        const color = () => {
            const r = Math.floor(Math.random() * 128);
            const g = Math.floor(Math.random() * 64);
            const b = Math.floor(Math.random() * 255);
            return tohex(r, g, b);
        }

        for (let i = 1; i <= n; i++) {
            const btn = document.createElement(`button`);
            array[i - 1] = String(array[i - 1]);
            btn.id = `btn${i}`;
            btn.innerHTML = array[i - 1];
            btn.focus();

            btn.style.backgroundColor =`${color()}b0`;
            btn.style.border = `none`;
            btn.style.padding = `14px 25px`;
            btn.style.textAlign = `center`;
            btn.style.cursor = `pointer`;
            btn.style.color = `white`;
            btn.style.position = `absolute`;
            btn.style.flex = `1`;
            btn.style.bottom = `${20 + (i - 1) * 70}px`;
            content.style.marginBottom = `calc(${20 + i * 70}px)`;
            btn.style.left = `120px`;

            btn.onclick = () => {
                resolve(array[i - 1]);
                rm();
            };
    
            content.appendChild(btn); 
        }

        function rm() {
            window.style.animation = `xuanze- 0.7s forwards ${easing}`; // 播放出场动画
            setTimeout(() => {
                document.body.removeChild(window);
                close(window) // 移除窗口。
            }, 700);
        }
    });
}

// chuanshu 函数。

async function chuanshu(string, style) {
    if (string == null || string == undefined) {
        nullcount++;
        cuowu(`所输入内容不能为 null 或 undefined。`, 3000);
        monitor();
        return 39;
    } else if (string.includes("\n")) {
        string = string.replace(/\n/g, `<br />`);
    } else {
        string = string.toString();
    }
    let replaced = string.replace(/\s+/g, ``);
    if (replaced === ``) {
        cuowu(`所输入内容不能为空字符串。`, 3000);
        return -39;
    } else if (style === undefined || style === null) style = theme;
    if (nullcount > 26) {
        rizhi(`你已被禁止调用函数。`);
    }

    const window = document.createElement(`div`);
    window.className = `chuanshu-window`;
    const square = document.createElement(`div`);
    square.className = `chuanshu-square`;
    const icon = document.createElement(`img`);
    icon.className = `chuanshu-icon`;
    const content = document.createElement(`div`);
    content.className = `chuanshu-content`;
    const bar = document.createElement(`div`);
    bar.className = `chuanshu-progressbar`;
    if (theme === `Neon`) {
        window.style.backdropFilter = `blur(14px) saturate(250%)`;
        square.style.backdropFilter = `blur(14px) saturate(250%)`;
    }

    create(window); // 添加窗口。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    window.appendChild(bar);
    square.appendChild(icon);

    icon.src = `images/Chuansong.png`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    const visible = () => {
        const rect = window.getBoundingClientRect();
        const viewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        if (viewport === false) {
            rizhi(`你有 1 条未读完的 chuanshu() 信息。 <button type="button" class="btn28" onclick="totop()">回到网页顶部</button>`);
        }
    };
    
    setTimeout(() => {
        window.style.animation = `chuanshu- 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }, 3000);
    setTimeout(visible, 3000);
}

// lianjie 函数。

async function lianjie(string, url, style) {
    if (string == null || string == undefined || url == null || url == undefined) {
        nullcount++;
        cuowu(`所输入内容不能为 null 或 undefined。`, 3000);
        monitor();
        return 39;
    } else if (string.includes("\n")) {
        string = string.replace(/\n/g, `<br />`);
    } else {
        string = string.toString();
        url = url.toString();
    }
    let replaced1 = string.replace(/\s+/g, ``);
    let replaced2 = url.replace(/\s+/g, ``);
    if (replaced2.startsWith(`https`) !== true) {
        url = `https://` + replaced2;
    } else if (urlEndings.some(ending => url.endsWith(ending)) === false) {
        jinggao(`请检查你所输入的网址是否正确！`, 3000);
    }
    if (replaced1 === `` || replaced2 === ``) {
        cuowu(`所输入内容不能为空字符串。`, 3000);
        return -39;
    } else if (style === undefined || style === null) style = theme;
    if (nullcount > 26) {
        rizhi(`你已被禁止调用函数。`);
    }

    const window = document.createElement(`div`);
    window.className = `lianjie-window`;
    const square = document.createElement(`div`);
    square.className = `lianjie-square`;
    const icon = document.createElement(`img`);
    icon.className = `lianjie-icon`;
    const content = document.createElement(`div`);
    content.className = `lianjie-content`;
    const btn = document.createElement(`button`);
    btn.className = `lianjie-btn`;
    var line_ = Math.ceil(url.size / 14);
    content.style.marginBottom = `calc(70px + ${line_ * lineHeight}vh)`;
    if (theme === `Neon`) {
        window.style.backdropFilter = `blur(14px) saturate(250%)`;
        square.style.backdropFilter = `blur(14px) saturate(250%)`;
    }

    create(window); // 添加窗口。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.src = `images/Tiaozhuan.png`;
    content.innerHTML = string;
    btn.innerHTML = `跳转至 ${url}`;
    content.appendChild(btn);

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    btn.onclick = () => {
        open(url, `_blank`, `width=1024, height=768`)
        window.style.animation = `lianjie- 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }
    return window;
}

// zhongduan 函数。

async function zhongduan(string, style) {
    return new Promise(() => {
        if (string == null || string == undefined) {
            nullcount++;
            cuowu(`所输入内容不能为 null 或 undefined。`, 3000);
            monitor();
            return 39;
        } else if (string.includes("\n")) {
            string = string.replace(/\n/g, `<br />`);
        } else {
            string = string.toString();
        }
        let replaced = string.replace(/\s+/g, ``);
        if (replaced === "") {
            cuowu(`所输入内容不能为空字符串。`, 3000);
            return -39;
        } else if (style === undefined || style === null) style = theme;
        if (nullcount > 26) {
            rizhi(`你已被禁止调用函数。`);
            return 0;
        }

        const window = document.createElement(`div`);
        window.className = `zhongduan-window`;
        const square = document.createElement(`div`);
        square.className = `zhongduan-square`;
        const icon = document.createElement(`img`);
        icon.className = `zhongduan-icon`;
        const content = document.createElement(`div`);
        content.className = `zhongduan-content`;
        const box = document.createElement(`textarea`);
        box.className = `zhongduan-box`;
        box.placeholder = `请输入命令……`;
        box.style.resize = `none`;
        const btn = document.createElement(`button`);
        btn.className = `btn26`;
        btn.textContent = "功能";
        btn.onclick = async () => {
            let res = await xuanze("请选择功能。", 6, ["查看内容", "换行", "清空", "添加制表符", "复制", "粘贴"]);
            if (res === "查看内容") {
                wenzi(box.value);
            } else if (res === "换行") {
                box.value += "\n";
            } else if (res === "清空") {
                box.value = "";
            } else if (res === "添加制表符") {
                box.value += "\t";
            } else if (res === "复制") {
                try {
                    await navigator.clipboard.writeText(box.value);
                    chenggong("已复制到剪贴板。", 2000);
                } catch (error) {
                    cuowu(`复制失败。<br />${error}。`, 4000);
                }
            } else if (res === "粘贴") {
                try {
                    const text = await navigator.clipboard.readText();
                    box.value += text;
                } catch (error) {
                    if (error.name === "NotAllowedError") {
                        cuowu("请先允许浏览器访问剪贴板。", 4000);
                    } else {
                        cuowu(`粘贴失败。<br />${error}。`, 4000);
                    }
                }
            }
        };

        if (theme === `Neon`) {
            window.style.backdropFilter = `blur(14px) saturate(250%)`;
            square.style.backdropFilter = `blur(14px) saturate(250%)`;
        }

        create(window); // 添加窗口。
        document.body.appendChild(window);
        window.appendChild(square);
        window.appendChild(content);
        window.appendChild(btn);
        window.appendChild(box);
        square.appendChild(icon);

        icon.src = `images/Zhongduan.png`;
        content.innerHTML = string;

        const line = Math.ceil(string.length / 14);
        var lineHeight = parseInt(window.style.lineHeight);
        content.style.height = `${line * lineHeight}px`;

        box.focus();
        box.addEventListener(`keypress`, (event) => {
            if (event.key === `Enter`) {
                const value = box.value.trim();
                if (value === "") {
                    cuowu(`所输入内容不能为空字符串。`, 3000);
                    return;
                }
                try { rizhi(eval(value)); }
                catch (error) {
                    cuowu(`命令执行失败。<br />${error}。`, 4000);
                }
                window.style.animation = `zhongduan- 0.7s forwards ${easing}`;
                setTimeout(() => {
                    if (document.body.contains(window)) {
                        document.body.removeChild(window);
                        close(); // 移除窗口。
                    }
                }, 700);
            }
        });
    });
}

// wenzi 函数。

async function wenzi(string) {
    return new Promise((resolve) => {
        let clicked = false;
        if (string == null || string == undefined) {
            nullcount++;
            cuowu(`所输入内容不能为 null 或 undefined。`, 3000);
            monitor();
            resolve(39);
            return;
        } else if (string.includes("\n")) {
            string = string.replace(/\n/g, `<br />`);
        }
        if (nullcount > 26) {
            rizhi(`你已被禁止调用函数。`);
            return 0;
        }

        const window = document.createElement(`div`);
        window.className = `wenzi-window`;
        const txt = document.createElement(`pre`);
        txt.className = `wenzi-content`;
        txt.innerHTML = string;
        const btn = document.createElement("div");
        btn.className = `wenzi-confirm`;
        btn.textContent = "确定";
        const left = document.createElement(`div`);
        left.className = `wenzi-left`;
        const right = document.createElement(`div`);
        right.className = `wenzi-right`;

        document.body.appendChild(window);
        window.appendChild(left);
        window.appendChild(right);
        window.appendChild(txt);
        window.appendChild(btn);

        window.style.animation = `--wenzi 0.7s forwards ${easing}`;
        left.style.animation = `__solid 0.7s forwards ${easing}`;
        right.style.animation = `__solid 0.7s forwards ${easing}`;
        window.addEventListener(`animationend`, (e) => {
            if (e.animationName === "--wenzi") {
                window.style.animation = `-wenzi 0.7s forwards ${easing}`;
                right.style.animation = `_right forwards 0.7s ${easing}`;
                window.addEventListener(`animationend`, (f) => {
                    if (f.animationName === "-wenzi") {
                        txt.style.animation = `_txt forwards 0.7s ${easing}`;
                        btn.style.animation = `_btn forwards 0.7s ${easing}`;
                    }
                });
            }

            btn.onclick = () => {
                if (clicked) {
                    jinggao(`请勿多次点击。`, 2000);
                    return;
                }
                txt.style.animation = `txt_ 0.7s forwards ${easing}`;
                btn.style.animation = `btn_ 0.7s forwards ${easing}`;
                txt.addEventListener(`animationend`, (g) => {
                    if (g.animationName === "txt_") {
                        window.style.animation = `wenzi- 0.7s forwards ${easing}`;
                        left.style.animation = `left_ 0.7s forwards ${easing}`;
                        window.addEventListener(`animationend`, (h) => {
                            if (h.animationName === "wenzi-") {
                                window.style.animation = `wenzi-- 0.7s forwards ${easing}`;
                                left.style.animation = `solid__ 0.7s forwards ${easing}`;
                                right.style.animation = `solid__ 0.7s forwards ${easing}`;
                            }
                        });
                    }
                });
                clicked = true;
                const ani_end = () => {
                    window.removeEventListener(`animationend`, ani_end);
                };
                window.addEventListener(`animationend`, ani_end);
                resolve();
                setTimeout(() => {
                    document.body.removeChild(window);
                }, 2100);
            };
        });
    });
}