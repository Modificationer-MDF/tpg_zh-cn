var lognum = 0; // log() 目前存在的数量。
var nullcount = 0; // 连续输入 null 或 undefined 的次数。
var windows = []; // 信息数组。
let logwin = []; // log() 信息数组。
let totalHeight = 0; // log() 的总高度。
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
        warning(`你已连续 ${nullcount} 次输入 null 或 undefined。请检查你所输入的内容。`)
    } else if (nullcount >= 7 && nullcount < 14) {
        warning(`再次警告！你已连续输入 null 或 undefined ${nullcount} 次。请检查你所输入的内容。`)
    } else if (nullcount >= 14 && nullcount < 25) {
        info(`null 和 undefined 是指，变量的值为 null 或 undefined，即你在 prompt 输入框中点击了取消或者在函数的参数中传入了 null 或 undefined。请检查你所输入的内容。`);
    } else if (nullcount >= 25 && nullcount < 30) {
        fail(`你已被禁止调用任何函数。`);
        console.warn(`你已被禁止调用任何函数。`);
        warning(`请查看控制台。`);
    }
}

// log 函数。

function log(string, time) {
    lognum++;
    function re() {
        totalHeight = logwin.reduce((acc, w) => acc + w.offsetHeight, 0);
    }

    if (time == null || time == undefined) {
        time = 3000;
    } else if (string.includes("\n")) {
        string = string.replace(/\n/g, `<br />`);
    }

    const window = document.createElement(`div`);
    window.className = `log-window`;
    window.style.opacity = 0;
    const content = document.createElement(`div`);
    content.className = `log-content`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    content.style.height = `calc(${line * 20}px)`;

    document.body.appendChild(window);
    window.appendChild(content);

    window.style.top = `calc(${totalHeight}px + ${lognum}vh)`;
    totalHeight += window.offsetHeight;
    logwin.push(window);

    requestAnimationFrame(() => {
        window.style.animation = `-log 0.7s forwards ${easing}`;
    });

    setTimeout(() => {
        window.style.animation = `log- 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            logwin = logwin.filter(w => w !== window);
            re();
            lognum--;
        }, 700);
    }, time);
}

// info 函数。

function info(string, ms, style) {
    if (string == null || string == undefined) {
        nullcount++;
        fail(`所输入内容不能为 null 或 undefined。`, 3000);
        monitor();
        return 39;
    } else if (string.includes("\n")) {
        string = string.replace(/\n/g, `<br />`);
    } else {
        string = string.toString();
    }
    let replaced = string.replace(/\s+/g, ``);
    if (replaced === ``) {
        fail(`所输入内容不能为空字符串。`, 3000);
        return -39;
    } else if (ms === undefined || ms === null || Number.isNaN(ms) || Number(ms) < 700) {
        fail(`请指定正确的显示时间。`, 3000);
        return 0;
    } else if (style === undefined || style === null) {
        style = theme;
    }
    if (nullcount > 26) {
        log(`你已被禁止调用函数。`);
    }

    const window = document.createElement(`div`);
    window.className = `info-window`;
    const square = document.createElement(`div`);
    square.className = `info-square`;
    const icon = document.createElement(`img`);
    icon.src = `images/Inf.png`;
    const content = document.createElement(`div`);
    content.className = `info-content`;
    const bar = document.createElement(`div`);
    bar.className = `info-progressbar`;

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

    // icon.innerHTML = `第 ${infoNum} 条信息`;
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
            log(`你有 1 条未读完的 info() 信息。 <button type="button" class="btn28" onclick="totop()">回到网页顶部</button>`);
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
        window.style.animation = `info- 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window);
        }, 700);
    }, ms);
    setTimeout(visible, ms);
    return window;
}

// success 函数。

function success(string, ms, style) {
    if (string == null || string == undefined) {
        nullcount++;
        fail(`所输入内容不能为 null 或 undefined。`, 3000);
        monitor();
        return 39;
    } else if (string.includes("\n")) {
        string = string.replace(/\n/g, `<br />`);
    } else {
        string = string.toString();
    }
    let replaced = string.replace(/\s+/g, ``);
    if (replaced === ``) {
        fail(`所输入内容不能为空字符串。`, 3000);
        return -39;
    } else if (ms === undefined || ms === null || Number.isNaN(ms) || Number(ms) <= 0) {
        fail(`请指定正确的显示时间。`, 3000);
        return 0;
    } else if (style === undefined || style === null) {
        style = theme;
    }
    if (nullcount > 26) {
        log(`你已被禁止调用函数。`);
    }

    const window = document.createElement(`div`);
    window.className = `success-window`;
    const square = document.createElement(`div`);
    square.className = `success-square`;
    const icon = document.createElement(`img`);
    icon.src = `images/Pass.png`;
    const content = document.createElement(`div`);
    content.className = `success-content`;
    const bar = document.createElement(`div`);
    bar.className = `success-progressbar`;
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

    // icon.innerHTML = `第 ${successNum} 条成功消息`;
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
            log(`你有 1 条未读完的 success() 信息。 <button type="button" class="btn28" onclick="totop()">回到网页顶部</button>`);
        }
    };

    setTimeout(() => {
        window.style.animation = `success- 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }, ms);
    setTimeout(visible, ms);
    return window;
}

// fail 函数。

function fail(string, ms, style) {
    if (string == null || string == undefined) {
        nullcount++;
        fail(`所输入内容不能为 null 或 undefined。`, 3000);
        monitor();
        return 39;
    } else if (string.includes("\n")) {
        string = string.replace(/\n/g, `<br />`);
    } else {
        string = string.toString();
    }
    let replaced = string.replace(/\s+/g, ``);
    if (replaced === ``) {
        fail(`所输入内容不能为空字符串。`, 3000);
        return -39;
    } else if (ms === undefined || ms === null || Number.isNaN(ms) || Number(ms) <= 0) {
        fail(`请指定正确的显示时间。`, 3000);
        return 0;
    } else if (style === undefined || style === null) {
        style = theme;
    }
    if (nullcount > 26) {
        log(`你已被禁止调用函数。`);
    }

    const window = document.createElement(`div`);
    window.className = `fail-window`;
    const square = document.createElement(`div`);
    square.className = `fail-square`;
    const icon = document.createElement(`img`);
    icon.className = `fail-icon`;
    const content = document.createElement(`div`);
    content.className = `fail-content`;
    const bar = document.createElement(`div`);
    bar.className = `fail-progressbar`;
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

    icon.src = `images/Error.png`;
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
            log(`你有 1 条未读完的 fail() 信息。 <button type="button" class="btn28" onclick="totop()">回到网页顶部</button>`);
        }
    };

    setTimeout(() => {
        window.style.animation = `fail- 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }, ms);
    setTimeout(visible, ms);
    return window;
}

// warning 函数。

function warning(string, ms, style) {
    if (string == null || string == undefined) {
        nullcount++;
        fail(`所输入内容不能为 null 或 undefined。`, 3000);
        monitor();
        return 39;
    } else if (string.includes("\n")) {
        string = string.replace(/\n/g, `<br />`);
    } else {
        string = string.toString();
    }
    let replaced = string.replace(/\s+/g, ``);
    if (replaced === ``) {
        fail(`所输入内容不能为空字符串。`, 3000);
        return -39;
    } else if (ms === undefined || ms === null || Number.isNaN(ms) || Number(ms) <= 0) {
        fail(`请指定正确的显示时间。`, 3000);
        return 0;
    } else if (style === undefined || style === null) {
        style = theme;
    }
    if (nullcount > 26) {
        log(`你已被禁止调用函数。`);
    }

    const window = document.createElement(`div`);
    window.className = `warning-window`;
    const square = document.createElement(`div`);
    square.className = `warning-square`;
    const icon = document.createElement(`img`);
    icon.className = `warning-icon`;
    const content = document.createElement(`div`);
    content.className = `warning-content`;
    const bar = document.createElement(`div`);
    bar.className = `warning-progressbar`;
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

    icon.src = `images/Exclamation Mark.png`;
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
            log(`你有 1 条未读完的 warning() 信息。 <button type="button" class="btn28" onclick="totop()">回到网页顶部</button>`);
        }
    };

    setTimeout(() => {
        window.style.animation = `warning- 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }, ms);
    setTimeout(visible, ms);
    return window;
}

// input 函数。

async function input(string, holder, style) {
    return new Promise((resolve) => {
        if (string === null || string === undefined || holder === undefined || holder === null) {
            nullcount++;
            fail(`所输入内容不能为 null 或 undefined。`, 3000);
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
            fail(`所输入内容不能为空字符串。`, 3000);
            return -39;
        } else if (style === undefined || style === null) style = theme;
        if (nullcount > 26) {
            log(`你已被禁止调用函数。`);
        }

        const window = document.createElement(`div`);
        window.className = `input-window`;
        const square = document.createElement(`div`);
        square.className = `input-square`;
        const icon = document.createElement(`img`);
        icon.className = `input-icon`;
        const content = document.createElement(`div`);
        content.className = `input-content`;

        const box = document.createElement(`input`);
        box.type = `text`;
        box.className = `input-box`;
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
        
        icon.src = `images/Inp.png`;
        content.innerHTML = string;

        const line = Math.ceil(string.length / 14);
        var lineHeight = parseInt(window.style.lineHeight);
        content.style.height = `${line * lineHeight}px`;

        box.focus();
        box.addEventListener(`keypress`, (event) => {
            if (event.key === `Enter`) {
                const value = box.value;
                window.style.animation = `input- 0.7s forwards ${easing}`;
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

// choice 函数。

async function choice(string, n, names, style) {
    return new Promise((resolve) => {
        if (n === null || n === undefined) n = 2;
        else if (isNaN(n)) fail("所输入的选项数量必须为数字。", 3000);
        n = Math.ceil(Number(n));
        const array = Array.from(names);
        array.reverse();

        const window = document.createElement(`div`);
        window.className = `choice-window`;
        const square = document.createElement(`div`);
        square.className = `choice-square`;
        const icon = document.createElement(`img`);
        icon.className = `choice-icon`;
        const content = document.createElement(`div`);
        content.className = `choice-content`;

        if (string == null || string == undefined) {
            nullcount++;
            fail(`所输入内容不能为 null 或 undefined。`, 3000);
            monitor();
            return 39;
        } else if (string.includes("\n")) {
            string = string.replace(/\n/g, `<br />`);
        } else {
            string = string.toString();
        }
        let replaced1 = string.replace(/\s+/g, ``);
        if (replaced1 === ``) {
            fail(`所输入内容不能为空字符串。`, 3000);
            return -39;
        } else if (style === undefined || style === null) style = theme;
        if (nullcount > 26) {
            log(`你已被禁止调用函数。`);
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

        icon.src = `images/Choose.png`;
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
            window.style.animation = `choice- 0.7s forwards ${easing}`; // 播放出场动画
            setTimeout(() => {
                document.body.removeChild(window);
                close(window) // 移除窗口。
            }, 700);
        }
    });
}

// transmit 函数。

async function transmit(string, style) {
    if (string == null || string == undefined) {
        nullcount++;
        fail(`所输入内容不能为 null 或 undefined。`, 3000);
        monitor();
        return 39;
    } else if (string.includes("\n")) {
        string = string.replace(/\n/g, `<br />`);
    } else {
        string = string.toString();
    }
    let replaced = string.replace(/\s+/g, ``);
    if (replaced === ``) {
        fail(`所输入内容不能为空字符串。`, 3000);
        return -39;
    } else if (style === undefined || style === null) style = theme;
    if (nullcount > 26) {
        log(`你已被禁止调用函数。`);
    }

    const window = document.createElement(`div`);
    window.className = `transmit-window`;
    const square = document.createElement(`div`);
    square.className = `transmit-square`;
    const icon = document.createElement(`img`);
    icon.className = `transmit-icon`;
    const content = document.createElement(`div`);
    content.className = `transmit-content`;
    const bar = document.createElement(`div`);
    bar.className = `transmit-progressbar`;
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

    icon.src = `images/Trans.png`;
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
            log(`你有 1 条未读完的 transmit() 信息。 <button type="button" class="btn28" onclick="totop()">回到网页顶部</button>`);
        }
    };
    
    setTimeout(() => {
        window.style.animation = `transmit- 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }, 3000);
    setTimeout(visible, 3000);
}

// link 函数。

async function link(string, url, style) {
    if (string == null || string == undefined || url == null || url == undefined) {
        nullcount++;
        fail(`所输入内容不能为 null 或 undefined。`, 3000);
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
        warning(`请检查你所输入的网址是否正确！`, 3000);
    }
    if (replaced1 === `` || replaced2 === ``) {
        fail(`所输入内容不能为空字符串。`, 3000);
        return -39;
    } else if (style === undefined || style === null) style = theme;
    if (nullcount > 26) {
        log(`你已被禁止调用函数。`);
    }

    const window = document.createElement(`div`);
    window.className = `link-window`;
    const square = document.createElement(`div`);
    square.className = `link-square`;
    const icon = document.createElement(`img`);
    icon.className = `link-icon`;
    const content = document.createElement(`div`);
    content.className = `link-content`;
    const btn = document.createElement(`button`);
    btn.className = `link-btn`;
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

    icon.src = `images/Link.png`;
    content.innerHTML = string;
    btn.innerHTML = `跳转至 ${url}`;
    content.appendChild(btn);

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    btn.onclick = () => {
        open(url, `_blank`, `width=1024, height=768`)
        window.style.animation = `link- 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }
    return window;
}

// command 函数。

async function command(string, style) {
    return new Promise(() => {
        if (string == null || string == undefined) {
            nullcount++;
            fail(`所输入内容不能为 null 或 undefined。`, 3000);
            monitor();
            return 39;
        } else if (string.includes("\n")) {
            string = string.replace(/\n/g, `<br />`);
        } else {
            string = string.toString();
        }
        let replaced = string.replace(/\s+/g, ``);
        if (replaced === "") {
            fail(`所输入内容不能为空字符串。`, 3000);
            return -39;
        } else if (style === undefined || style === null) style = theme;
        if (nullcount > 26) {
            log(`你已被禁止调用函数。`);
            return 0;
        }

        const window = document.createElement(`div`);
        window.className = `command-window`;
        const square = document.createElement(`div`);
        square.className = `command-square`;
        const icon = document.createElement(`img`);
        icon.className = `command-icon`;
        const content = document.createElement(`div`);
        content.className = `command-content`;
        const box = document.createElement(`textarea`);
        box.className = `command-box`;
        box.placeholder = `请输入命令……`;
        box.style.resize = `none`;
        const btn = document.createElement(`button`);
        btn.className = `btn26`;
        btn.textContent = "功能";
        btn.onclick = async () => {
            let res = await choice("请选择功能。", 6, ["查看内容", "换行", "清空", "添加制表符", "复制", "粘贴"]);
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
                    success("已复制到剪贴板。", 2000);
                } catch (error) {
                    fail(`复制失败。<br />${error}。`, 4000);
                }
            } else if (res === "粘贴") {
                try {
                    const text = await navigator.clipboard.readText();
                    box.value += text;
                } catch (error) {
                    if (error.name === "NotAllowedError") {
                        fail("请先允许浏览器访问剪贴板。", 4000);
                    } else {
                        fail(`粘贴失败。<br />${error}。`, 4000);
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

        icon.src = `images/Command.png`;
        content.innerHTML = string;

        const line = Math.ceil(string.length / 14);
        var lineHeight = parseInt(window.style.lineHeight);
        content.style.height = `${line * lineHeight}px`;

        box.focus();
        box.addEventListener(`keypress`, (event) => {
            if (event.key === `Enter`) {
                const value = box.value.trim();
                if (value === "") {
                    fail(`所输入内容不能为空字符串。`, 3000);
                    return;
                }
                try { log(eval(value)); }
                catch (error) {
                    fail(`命令执行失败。<br />${error}。`, 4000);
                }
                window.style.animation = `command- 0.7s forwards ${easing}`;
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
            fail(`所输入内容不能为 null 或 undefined。`, 3000);
            monitor();
            resolve(39);
            return;
        } else if (string.includes("\n")) {
            string = string.replace(/\n/g, `<br />`);
        }
        if (nullcount > 26) {
            log(`你已被禁止调用函数。`);
            return 0;
        }

        const window = document.createElement(`div`);
        window.className = `wenzi-window`;
        const txt = document.createElement(`pre`);
        txt.className = `wenzi-content`;
        txt.innerHTML = string;
        const btn = document.createElement(`button`);
        btn.type = `button`;
        btn.className = `wenzi-confirm`;
        btn.textContent = `确定`;
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
                    warning(`请勿多次点击。`, 2000);
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