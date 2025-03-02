var rznum = 0; // rz() 目前存在的数量。
var nullcount = 0; // 连续输入 null 或 undefined 的次数。
var windows = []; // 信息数组。
let rzwin = []; // rz() 信息数组。
let totalHeight = 0; // rz() 的总高度。
let urlEndings = [
    `.com`, `.net`, `.cn`, `.org`, `.edu`, `.gov`, `.mil`,
    `.biz`, `.info`, `.name`, `.pro`, `.aero`, `.coop`,
    `.museum`, `.jobs`, `.travel`, `.xxx`, `.top`, `.site`,
    `.wiki`, `.cc`, `.tv`, `.mobi`, `.me`, `.bid`, `.club`,
    `.online`, `.store`, `.work`, `.tech`
]; // 常见的 URL 后缀。

// 更新窗口位置的函数。

function pos() {
    let total = 7 * window.innerHeight / 100;
    windows.forEach((window) => {
        const wh = window.offsetHeight;
        window.style.transition = `top 0.5s ${easing}`;
        window.style.top = `${total}px`;
        total += wh + 7;
    });
}

function create(window) {
    windows.push(window);
    pos(); // 更新所有窗口位置。
}

function close(window) {
    windows = windows.filter(win => win !== window);
    pos(); // 更新所有窗口位置。
}

function monitor() {
    if (nullcount >= 3 && nullcount < 7) {
        warn(`你已连续 ${nullcount} 次输入 null 或 undefined。请检查你所输入的内容。`)
    } else if (nullcount >= 7 && nullcount < 14) {
        warn(`再次警告！你已连续输入 null 或 undefined ${nullcount} 次。请检查你所输入的内容。`)
    } else if (nullcount >= 14 && nullcount < 25) {
        info(`null 和 undefined 是指，变量的值为 null 或 undefined，即你在 prompt 输入框中点击了取消或者在函数的参数中传入了 null 或 undefined。请检查你所输入的内容。`);
    } else if (nullcount >= 25 && nullcount < 30) {
        fail(`你已被禁止调用任何函数。`);
        console.warn(`你已被禁止调用任何函数。`);
        warn(`请查看控制台。`);
    }
}

// rz 函数。

function rz(string, time) {
    rznum++;
    function re() {
        totalHeight = rzwin.reduce((acc, w) => acc + w.offsetHeight, 0);
    }

    if (time == null || time == undefined) {
        time = 3000;
    } else if (string.includes("\n")) {
        string = string.replace(/\n/g, `<br />`);
    }

    const window = document.createElement(`div`);
    window.className = `rz-window`;
    window.style.opacity = 0;
    const content = document.createElement(`div`);
    content.className = `rz-content`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    content.style.height = `calc(${line * 20}px)`;

    document.body.appendChild(window);
    window.appendChild(content);

    window.style.top = `calc(${totalHeight}px + ${rznum}vh)`;
    totalHeight += window.offsetHeight;
    rzwin.push(window);

    requestAnimationFrame(() => {
        window.style.animation = `-rz 0.5s forwards ${easing}`;
    });

    setTimeout(() => {
        window.style.animation = `rz- 0.5s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            rzwin = rzwin.filter(w => w !== window);
            re();
            rznum--;
        }, 500);
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
    } else if (ms === undefined || ms === null || Number.isNaN(ms) || Number(ms) < 500) {
        fail(`请指定正确的显示时间。`, 3000);
        return 0;
    } else if (style === undefined || style === null) {
        style = theme;
    }
    if (nullcount > 26) {
        rz(`你已被禁止调用函数。`);
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

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    window.appendChild(bar);
    square.appendChild(icon);

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
            rz(`你有 1 条未读完的 info() 信息。
            <button type="button" class="btn28" onclick="totop()">
            回到网页顶部
            </button>`);
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
        window.style.animation = `info- 0.5s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window);
        }, 500);
    }, ms);
    setTimeout(visible, ms);
    return window;
}

// cg 函数。

function cg(string, ms, style) {
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
        rz(`你已被禁止调用函数。`);
    }

    const window = document.createElement(`div`);
    window.className = `cg-window`;
    const square = document.createElement(`div`);
    square.className = `cg-square`;
    const icon = document.createElement(`img`);
    icon.src = `images/Suc.png`;
    const content = document.createElement(`div`);
    content.className = `cg-content`;
    const bar = document.createElement(`div`);
    bar.className = `cg-progressbar`;
    if (theme === `Neon`) {
        window.style.backdropFilter = `blur(14px) saturate(250%)`;
        square.style.backdropFilter = `blur(14px) saturate(250%)`;
    }

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    window.appendChild(bar);
    square.appendChild(icon);

    // icon.innerHTML = `第 ${cgNum} 条成功消息`;
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
            rz(`你有 1 条未读完的 cg() 信息。 
            <button type="button" class="btn28" onclick="totop()">
            回到网页顶部
            </button>`);
        }
    };

    setTimeout(() => {
        window.style.animation = `cg- 0.5s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window)
        }, 500);
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
        rz(`你已被禁止调用函数。`);
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

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    window.appendChild(bar);
    square.appendChild(icon);

    icon.src = `images/Err.png`;
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
            rz(`你有 1 条未读完的 fail() 信息。 
            <button type="button" class="btn28" onclick="totop()">
            回到网页顶部
            </button>`);
        }
    };

    setTimeout(() => {
        window.style.animation = `fail- 0.5s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window)
        }, 500);
    }, ms);
    setTimeout(visible, ms);
    return window;
}

// warn 函数。

function warn(string, ms, style) {
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
        rz(`你已被禁止调用函数。`);
    }

    const window = document.createElement(`div`);
    window.className = `warn-window`;
    const square = document.createElement(`div`);
    square.className = `warn-square`;
    const icon = document.createElement(`img`);
    icon.className = `warn-icon`;
    const content = document.createElement(`div`);
    content.className = `warn-content`;
    const bar = document.createElement(`div`);
    bar.className = `warn-progressbar`;
    if (theme === `Neon`) {
        window.style.backdropFilter = `blur(14px) saturate(250%)`;
        square.style.backdropFilter = `blur(14px) saturate(250%)`;
    }

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    window.appendChild(bar);
    square.appendChild(icon);

    icon.src = `images/Exc.png`;
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
            rz(`你有 1 条未读完的 warn() 信息。 
            <button type="button" class="btn28" onclick="totop()">
            回到网页顶部
            </button>`);
        }
    };

    setTimeout(() => {
        window.style.animation = `warn- 0.5s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window)
        }, 500);
    }, ms);
    setTimeout(visible, ms);
    return window;
}

// inp 函数。

async function inp(string, holder, style) {
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
            rz(`你已被禁止调用函数。`);
        }

        const window = document.createElement(`div`);
        window.className = `inp-window`;
        const square = document.createElement(`div`);
        square.className = `inp-square`;
        const icon = document.createElement(`img`);
        icon.className = `inp-icon`;
        const content = document.createElement(`div`);
        content.className = `inp-content`;

        const box = document.createElement(`input`);
        box.type = `text`;
        box.className = `inp-box`;
        box.placeholder = holder;
        if (theme === `Neon`) {
            window.style.backdropFilter = `blur(14px) saturate(250%)`;
            square.style.backdropFilter = `blur(14px) saturate(250%)`;
            box.style.backgroundFilter = `blur(14px) saturate(250%)`;
        }

        document.body.appendChild(window);
        window.appendChild(square);
        window.appendChild(content);
        window.appendChild(box);
        square.appendChild(icon);
        create(window);
        
        icon.src = `images/Inp.png`;
        content.innerHTML = string;

        const line = Math.ceil(string.length / 14);
        var lineHeight = parseInt(window.style.lineHeight);
        content.style.height = `${line * lineHeight}px`;

        box.focus();
        box.addEventListener(`keypress`, (event) => {
            if (event.key === `Enter`) {
                const value = box.value;
                window.style.animation = `inp- 0.5s forwards ${easing}`;
                setTimeout(() => {
                    if (document.body.contains(window)) {
                        document.body.removeChild(window);
                        resolve(value);
                        close();
                    }
                }, 500);
            }
        });
    });
}

// xz 函数。

async function xz(string, n, names, style) {
    return new Promise((resolve) => {
        if (n === null || n === undefined) n = 2;
        else if (isNaN(n)) fail("所输入的选项数量必须为数字。", 3000);
        n = Math.ceil(Number(n));
        const array = Array.from(names);
        array.reverse();

        const window = document.createElement(`div`);
        window.className = `xz-window`;
        const square = document.createElement(`div`);
        square.className = `xz-square`;
        const icon = document.createElement(`img`);
        icon.className = `xz-icon`;
        const content = document.createElement(`div`);
        content.className = `xz-content`;

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
            rz(`你已被禁止调用函数。`);
        }
        if (theme === `Neon`) {
            window.style.backdropFilter = `blur(14px) saturate(250%)`;
            square.style.backdropFilter = `blur(14px) saturate(250%)`;
        }

        create(window);
        document.body.appendChild(window);
        window.appendChild(square);
        window.appendChild(content);
        square.appendChild(icon);

        icon.src = `images/Sel.png`;
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
            window.style.animation = `xz- 0.5s forwards ${easing}`; // 播放出场动画
            setTimeout(() => {
                document.body.removeChild(window);
                close(window)
            }, 500);
        }
    });
}

// tran 函数。

async function tran(string, style) {
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
        rz(`你已被禁止调用函数。`);
    }

    const window = document.createElement(`div`);
    window.className = `tran-window`;
    const square = document.createElement(`div`);
    square.className = `tran-square`;
    const icon = document.createElement(`img`);
    icon.className = `tran-icon`;
    const content = document.createElement(`div`);
    content.className = `tran-content`;
    const bar = document.createElement(`div`);
    bar.className = `tran-progressbar`;
    if (theme === `Neon`) {
        window.style.backdropFilter = `blur(14px) saturate(250%)`;
        square.style.backdropFilter = `blur(14px) saturate(250%)`;
    }

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    window.appendChild(bar);
    square.appendChild(icon);

    icon.src = `images/Tran.png`;
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
            rz(`你有 1 条未读完的 tran() 信息。 
            <button type="button" class="btn28" onclick="totop()">
            回到网页顶部
            </button>`);
        }
    };
    
    setTimeout(() => {
        window.style.animation = `tran- 0.5s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window)
        }, 500);
    }, 3000);
    setTimeout(visible, 3000);
}

// lj 函数。

async function lj(string, url, ignore, style) {
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
    if (replaced2.startsWith(`https`) !== true && ignore !== true) {
        url = `https://` + replaced2;
    } else if (urlEndings.some(ending => url.endsWith(ending)) === false) {
        warn(`请检查你所输入的网址是否正确！`, 3000);
    }
    if (replaced1 === `` || replaced2 === ``) {
        fail(`所输入内容不能为空字符串。`, 3000);
        return -39;
    } else if (style === undefined || style === null) style = theme;
    if (nullcount > 26) {
        rz(`你已被禁止调用函数。`);
    }

    const window = document.createElement(`div`);
    window.className = `lj-window`;
    const square = document.createElement(`div`);
    square.className = `lj-square`;
    const icon = document.createElement(`img`);
    icon.className = `lj-icon`;
    const content = document.createElement(`div`);
    content.className = `lj-content`;
    const btn = document.createElement(`button`);
    btn.className = `lj-btn`;
    var line_ = Math.ceil(url.size / 14);
    content.style.marginBottom = `calc(70px + ${line_ * lineHeight}vh)`;
    if (theme === `Neon`) {
        window.style.backdropFilter = `blur(14px) saturate(250%)`;
        square.style.backdropFilter = `blur(14px) saturate(250%)`;
    }

    create(window);
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
        open(url, `_blank`, `width=${defwid}, height=${defhei}`)
        window.style.animation = `lj- 0.5s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window)
        }, 500);
    }
    return window;
}

// zd 函数。

async function zd(string, style) {
    return new Promise((resolve) => {
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
            rz(`你已被禁止调用函数。`);
            return 0;
        }

        const window = document.createElement(`div`);
        window.className = `zd-window`;
        const square = document.createElement(`div`);
        square.className = `zd-square`;
        const icon = document.createElement(`img`);
        icon.className = `zd-icon`;
        const content = document.createElement(`div`);
        content.className = `zd-content`;
        const box = document.createElement(`textarea`);
        box.className = `zd-box`;
        box.placeholder = `请输入命令……`;
        box.style.resize = `none`;
        const btn = document.createElement(`button`);
        btn.className = `btn26`;
        btn.textContent = "确定";
        btn.onclick = async () => {
            const value = box.value.trim();
            if (value === "") {
                fail(`所输入内容不能为空字符串。`, 3000);
                return;
            }
            try {
                resolve(rz(eval(value)));
            }
            catch (error) {
                fail(`来自控制台的错误：${error.message}。`, 4000);
                resolve();
            }
            window.style.animation = `zd- 0.5s forwards ${easing}`;
            setTimeout(() => {
                if (document.body.contains(window)) {
                    document.body.removeChild(window);
                    close();
                }
            }, 500);
        };

        if (theme === `Neon`) {
            window.style.backdropFilter = `blur(14px) saturate(250%)`;
            square.style.backdropFilter = `blur(14px) saturate(250%)`;
        }

        create(window);
        document.body.appendChild(window);
        window.appendChild(square);
        window.appendChild(content);
        window.appendChild(btn);
        window.appendChild(box);
        square.appendChild(icon);

        icon.src = `images/Com.png`;
        content.innerHTML = string;

        const line = Math.ceil(string.length / 14);
        var lineHeight = parseInt(window.style.lineHeight);
        content.style.height = `${line * lineHeight}px`;

        box.focus();
    });
}

// wz 函数。

async function wz(string) {
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
            rz(`你已被禁止调用函数。`);
            return 0;
        }

        const window = document.createElement(`div`);
        window.className = `wz-window`;
        const txt = document.createElement(`pre`);
        txt.className = `wz-content`;
        txt.innerHTML = string;
        const btn = document.createElement("div");
        btn.className = `wz-confirm`;
        btn.textContent = "确定";
        const left = document.createElement(`div`);
        left.className = `wz-left`;
        const right = document.createElement(`div`);
        right.className = `wz-right`;

        document.body.appendChild(window);
        window.appendChild(left);
        window.appendChild(right);
        window.appendChild(txt);
        window.appendChild(btn);

        window.style.animation = `--wz 0.5s forwards ${easing}`;
        left.style.animation = `__solid 0.5s forwards ${easing}`;
        right.style.animation = `__solid 0.5s forwards ${easing}`;
        window.addEventListener(`animationend`, (e) => {
            if (e.animationName === "--wz") {
                window.style.animation = `-wz 0.5s forwards ${easing}`;
                right.style.animation = `_right forwards 0.5s ${easing}`;
                window.addEventListener(`animationend`, (f) => {
                    if (f.animationName === "-wz") {
                        txt.style.animation = `_txt forwards 0.5s ${easing}`;
                        btn.style.animation = `_btn forwards 0.5s ${easing}`;
                    }
                });
            }

            btn.onclick = () => {
                if (clicked) {
                    warn(`请勿多次点击。`, 2000);
                    return;
                }
                txt.style.animation = `txt_ 0.5s forwards ${easing}`;
                btn.style.animation = `btn_ 0.5s forwards ${easing}`;
                txt.addEventListener(`animationend`, (g) => {
                    if (g.animationName === "txt_") {
                        window.style.animation = `wz- 0.5s forwards ${easing}`;
                        left.style.animation = `left_ 0.5s forwards ${easing}`;
                        window.addEventListener(`animationend`, (h) => {
                            if (h.animationName === "wz-") {
                                window.style.animation = `wz-- 0.5s forwards ${easing}`;
                                left.style.animation = `solid__ 0.5s forwards ${easing}`;
                                right.style.animation = `solid__ 0.5s forwards ${easing}`;
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