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
];

function pos(p) {
    let total = 7 * window.innerHeight / 100;
    function fn(w) {
        w.forEach((window) => {
            const wh = window.offsetHeight;
            window.style.transition = `top 0.7s ${easing}`;
            window.style.top = `${total}px`;
            total += wh + 7;
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

function monitor() {
    if (nullcount >= 3 && nullcount < 7) {
        warn(`你已连续 ${nullcount} 次输入 null 或 undefined。请检查你所输入的内容。`)
    } else if (nullcount >= 7 && nullcount < 25) {
        warn(`再次警告！你已连续输入 null 或 undefined ${nullcount} 次。请检查你所输入的内容。`)
    } else if (nullcount >= 25 && nullcount < 30) {
        fail(`你已被禁止调用任何函数。`);
    }
}

// rz 函数。

function rz(string, time) {
    if (string == null) {
        warn("这个值为 null。");
        return;
    } else if (string == undefined) {
        warn("这个值为 undefined。");
        return;
    }
    if (time == null || time == undefined) time = deftime;

    const window = document.createElement(`div`);
    window.className = `rz-window`;
    window.style.opacity = 0;
    const content = document.createElement(`div`);
    content.className = `rz-content`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    content.style.height = `calc(${line * 20}px)`;

    create(window);
    document.body.appendChild(window);
    window.appendChild(content);

    requestAnimationFrame(() => {
        window.style.animation = `-rz 0.7s forwards ${easing}`;
    });

    setTimeout(() => {
        window.style.animation = `rz- 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window);
        }, 700);
    }, time);
}

// info 函数。

function info(string, ms) {
    if (string == null || string == undefined) {
        nullcount++;
        fail("所输入内容不能为 null 或 undefined。", deftime);
        monitor();
        return 39;
    } else {
        string = string.toString();
    }
    let replaced = string.replace(/\s+/g, "");
    if (replaced === "") {
        fail("所输入内容不能为空字符串。", deftime);
        return -39;
    } else if (ms === undefined || ms === null || Number.isNaN(ms) || Number(ms) < 700) {
        ms = deftime;
    }
    if (nullcount > 26) {
        rz("你已被禁止调用函数。");
    }

    const window = document.createElement(`div`);
    window.className = `info-window`;
    const square = document.createElement(`div`);
    square.className = `info-square`;
    const icon = document.createElement(`img`);
    icon.src = `images/Inf.png`;
    const content = document.createElement(`div`);
    content.className = `fn-content`;
    const bar = document.createElement(`div`);
    bar.className = `info-progressbar`;

    if (theme === "Neon") {
        window.style.backdropFilter = `blur(14px) saturate(250%)`;
        square.style.backdropFilter = `blur(14px) saturate(250%)`;
    }

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    window.appendChild(bar);
    square.appendChild(icon);

    window.style.animation = `zyfn- 0.7s forwards ${easing}`;
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
            rz("有 1 条未读完的 info() 信息。");
        }
    };

    const line = Math.ceil(string.length / 14);
    const lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    let pro = 0;
    const interval = setInterval(() => {
        pro += 10 / (ms / 100);
        bar.style.width = `${pro}%`;
        if (pro >= 100) {
            clearInterval(interval);
        }
    }, 10);

    setTimeout(() => {
        window.style.animation = `-zyfn 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window, windows);
        }, 700);
    }, ms);
    setTimeout(visible, ms);
}

// cg 函数。

function cg(string, ms) {
    if (string == null || string == undefined) {
        nullcount++;
        fail("所输入内容不能为 null 或 undefined。", deftime);
        monitor();
        return 39;
    } else {
        string = string.toString();
    }
    let replaced = string.replace(/\s+/g, "");
    if (replaced === "") {
        fail("所输入内容不能为空字符串。", deftime);
        return -39;
    } else if (ms === undefined || ms === null || Number.isNaN(ms) || Number(ms) <= 0) {
        ms = deftime;
    }
    if (nullcount > 26) {
        rz("你已被禁止调用函数。");
    }

    const window = document.createElement(`div`);
    window.className = `cg-window`;
    const square = document.createElement(`div`);
    square.className = `cg-square`;
    const icon = document.createElement(`img`);
    icon.src = `images/Suc.png`;
    const content = document.createElement(`div`);
    content.className = `fn-content`;
    const bar = document.createElement(`div`);
    bar.className = `cg-progressbar`;
    if (theme === "Neon") {
        window.style.backdropFilter = `blur(14px) saturate(250%)`;
        square.style.backdropFilter = `blur(14px) saturate(250%)`;
    }

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    window.appendChild(bar);
    square.appendChild(icon);

    window.style.animation = `zyfn- 0.7s forwards ${easing}`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    let pro = 0;
    const interval = setInterval(() => {
        pro += 10 / (ms / 100);
        bar.style.width = `${pro}%`;
        if (pro >= 100) {
            clearInterval(interval);
        }
    }, 10);

    const visible = () => {
        const rect = window.getBoundingClientRect();
        const viewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        if (viewport === false) {
            rz("有 1 条未读完的 cg() 信息。");
        }
    };

    setTimeout(() => {
        window.style.animation = `-zyfn 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window, windows)
        }, 700);
    }, ms);
    setTimeout(visible, ms);
}

// fail 函数。

function fail(string, ms) {
    if (string == null || string == undefined) {
        nullcount++;
        fail("所输入内容不能为 null 或 undefined。", deftime);
        monitor();
        return 39;
    } else {
        string = string.toString();
    }
    let replaced = string.replace(/\s+/g, "");
    if (replaced === "") {
        fail("所输入内容不能为空字符串。", deftime);
        return -39;
    } else if (ms === undefined || ms === null || Number.isNaN(ms) || Number(ms) <= 0) {
        ms = deftime;
    }
    if (nullcount > 26) {
        rz("你已被禁止调用函数。");
    }

    const window = document.createElement(`div`);
    window.className = `fail-window`;
    const square = document.createElement(`div`);
    square.className = `fail-square`;
    const icon = document.createElement(`img`);
    icon.className = `fail-icon`;
    const content = document.createElement(`div`);
    content.className = `fn-content`;
    const bar = document.createElement(`div`);
    bar.className = `fail-progressbar`;
    if (theme === "Neon") {
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
    window.style.animation = `zyfn- 0.7s forwards ${easing}`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    let pro = 0;
    const interval = setInterval(() => {
        pro += 10 / (ms / 100);
        bar.style.width = `${pro}%`;
        if (pro >= 100) {
            clearInterval(interval);
        }
    }, 10);

    const visible = () => {
        const rect = window.getBoundingClientRect();
        const viewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        if (viewport === false) {
            rz("有 1 条未读完的 fail() 信息。 ");
        }
    };

    setTimeout(() => {
        window.style.animation = `-zyfn 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window, windows)
        }, 700);
    }, ms);
    setTimeout(visible, ms);
}

// warn 函数。

function warn(string, ms) {
    if (string == null || string == undefined) {
        nullcount++;
        fail("所输入内容不能为 null 或 undefined。", deftime);
        monitor();
        return 39;
    } else {
        string = string.toString();
    }
    let replaced = string.replace(/\s+/g, "");
    if (replaced === "") {
        fail("所输入内容不能为空字符串。", deftime);
        return -39;
    } else if (ms === undefined || ms === null || Number.isNaN(ms) || Number(ms) <= 0) {
        ms = deftime;
    }
    if (nullcount > 26) {
        rz("你已被禁止调用函数。");
    }

    const window = document.createElement(`div`);
    window.className = `warn-window`;
    const square = document.createElement(`div`);
    square.className = `warn-square`;
    const icon = document.createElement(`img`);
    icon.className = `warn-icon`;
    const content = document.createElement(`div`);
    content.className = `fn-content`;
    const bar = document.createElement(`div`);
    bar.className = `warn-progressbar`;
    if (theme === "Neon") {
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
    window.style.animation = `zyfn- 0.7s forwards ${easing}`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    let pro = 0;
    const interval = setInterval(() => {
        pro += 10 / (ms / 100);
        bar.style.width = `${pro}%`;
        if (pro >= 100) {
            clearInterval(interval);
        }
    }, 10);

    const visible = () => {
        const rect = window.getBoundingClientRect();
        const viewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        if (viewport === false) {
            rz("有 1 条未读完的 warn() 信息。 ");
        }
    };

    setTimeout(() => {
        window.style.animation = `-zyfn 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window, windows)
        }, 700);
    }, ms);
    setTimeout(visible, ms);
}

// inp 函数。

async function inp(string, holder) {
    return new Promise((resolve) => {
        if (string === null || string === undefined || holder === undefined || holder === null) {
            nullcount++;
            fail("所输入内容不能为 null 或 undefined。", deftime);
            monitor();
            return 39;
        } else {
            string = string.toString();
            holder = holder.toString();
        }
        let replaced1 = string.replace(/\s+/g, "");
        let replaced2 = holder.replace(/\s+/g, "");
        if (replaced1 === "" || replaced2 === "") {
            fail("所输入内容不能为空字符串。", deftime);
            return -39;
        }
        if (nullcount > 26) {
            rz("你已被禁止调用函数。");
        }

        const window = document.createElement(`div`);
        window.className = `inp-window`;
        const square = document.createElement(`div`);
        square.className = `inp-square`;
        const icon = document.createElement(`img`);
        icon.className = `inp-icon`;
        const content = document.createElement(`div`);
        content.className = `fn-content`;

        const box = document.createElement(`input`);
        box.type = `text`;
        box.className = `inp-box`;
        box.placeholder = holder;
        if (theme === "Neon") {
            window.style.backdropFilter = `blur(14px) saturate(250%)`;
            square.style.backdropFilter = `blur(14px) saturate(250%)`;
            box.style.backgroundFilter = `blur(14px) saturate(250%)`;
        }

        create(window);
        document.body.appendChild(window);
        window.appendChild(square);
        window.appendChild(content);
        window.appendChild(box);
        square.appendChild(icon);
        
        icon.src = `images/Inp.png`;
        window.style.animation = `sxfn- 0.7s forwards ${easing}`;
        content.innerHTML = string;

        const line = Math.ceil(string.length / 14);
        var lineHeight = parseInt(window.style.lineHeight);
        content.style.height = `${line * lineHeight}px`;

        box.focus();
        box.addEventListener(`keypress`, (event) => {
            if (event.key === `Enter`) {
                const value = box.value;
                window.style.animation = `-sxfn 0.7s forwards ${easing}`;
                setTimeout(() => {
                    if (document.body.contains(window)) {
                        document.body.removeChild(window);
                        resolve(value);
                        close(window, windows);
                    }
                }, 700);
            }
        });
    });
}

// xz 函数。

async function xz(string, n, names) {
    return new Promise((resolve) => {
        if (n === null || n === undefined) fail("所输入的选项数量必须为数字。");
        else if (isNaN(n)) fail("所输入的选项数量必须为数字。");
        else if (n <= 0) fail("请输入一个正整数。")
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
        content.className = `fn-content`;

        if (string == null || string == undefined) {
            nullcount++;
            fail("所输入内容不能为 null 或 undefined。", deftime);
            monitor();
            return 39;
        } else {
            string = string.toString();
        }
        let replaced1 = string.replace(/\s+/g, "");
        if (replaced1 === "") {
            fail("所输入内容不能为空字符串。", deftime);
            return -39;
        }
        if (nullcount > 26) {
            rz("你已被禁止调用函数。");
        }
        if (theme === "Neon") {
            window.style.backdropFilter = `blur(14px) saturate(250%)`;
            square.style.backdropFilter = `blur(14px) saturate(250%)`;
        }

        create(window);
        document.body.appendChild(window);
        window.appendChild(square);
        window.appendChild(content);
        square.appendChild(icon);

        icon.src = `images/Sel.png`;
        window.style.animation = `zyfn- 0.7s forwards ${easing}`;
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
            btn.style.fontSize = "25px";
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
            window.style.animation = `-zyfn 0.7s forwards ${easing}`;
            setTimeout(() => {
                document.body.removeChild(window);
                close(window, windows)
            }, 700);
        }
    });
}

// tran 函数。

async function tran(string) {
    if (string == null || string == undefined) {
        nullcount++;
        fail("所输入内容不能为 null 或 undefined。", deftime);
        monitor();
        return 39;
    } else {
        string = string.toString();
    }
    let replaced = string.replace(/\s+/g, "");
    if (replaced === "") {
        fail("所输入内容不能为空字符串。", deftime);
        return -39;
    }
    if (nullcount > 26) {
        rz("你已被禁止调用函数。");
    }

    const window = document.createElement(`div`);
    window.className = `tran-window`;
    const square = document.createElement(`div`);
    square.className = `tran-square`;
    const icon = document.createElement(`img`);
    icon.className = `tran-icon`;
    const content = document.createElement(`div`);
    content.className = `fn-content`;
    const bar = document.createElement(`div`);
    bar.className = `tran-progressbar`;
    if (theme === "Neon") {
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
    window.style.animation = `zyfn- 0.7s forwards ${easing}`;
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
            rz("有 1 条未读完的 tran() 信息。");
        }
    };
    
    setTimeout(() => {
        window.style.animation = `-zyfn 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window, windows)
        }, 700);
    }, deftime);
    setTimeout(visible, deftime);
}

// lj 函数。

async function lj(string, url, ignore) {
    if (string == null || string == undefined || url == null || url == undefined) {
        nullcount++;
        fail("所输入内容不能为 null 或 undefined。", deftime);
        monitor();
        return 39;
    } else {
        string = string.toString();
        url = url.toString();
    }
    let replaced1 = string.replace(/\s+/g, "");
    let replaced2 = url.replace(/\s+/g, "");
    if (replaced2.startsWith(`https`) !== true && ignore !== true) {
        url = `https://` + replaced2;
    } else if (urlEndings.some(ending => url.endsWith(ending)) === false && ignore !== true) {
        warn(`请检查你所输入的网址是否正确！`, deftime);
    }
    if (replaced1 === "" || replaced2 === "") {
        fail("所输入内容不能为空字符串。", deftime);
        return -39;
    }
    if (nullcount > 26) {
        rz("你已被禁止调用函数。");
    }

    const window = document.createElement(`div`);
    window.className = `lj-window`;
    const square = document.createElement(`div`);
    square.className = `lj-square`;
    const icon = document.createElement(`img`);
    icon.className = `lj-icon`;
    const content = document.createElement(`div`);
    content.className = `fn-content`;
    const btn = document.createElement(`button`);

    btn.style.backgroundColor = "#715213b0";
    btn.style.border = `none`;
    btn.style.fontSize = "25px";
    btn.style.padding = `14px 25px`;
    btn.style.textAlign = `center`;
    btn.style.cursor = `pointer`;
    btn.style.color = `white`;
    btn.style.position = "relative";
    btn.style.flex = `1`;

    if (theme === "Neon") {
        window.style.backdropFilter = `blur(14px) saturate(250%)`;
        square.style.backdropFilter = `blur(14px) saturate(250%)`;
    }

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.src = `images/Link.png`;
    window.style.animation = `zyfn- 0.7s forwards ${easing}`;
    content.innerHTML = string;
    btn.innerHTML = url;
    content.appendChild(btn);

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    btn.onclick = () => {
        if (!open(url, `_blank`, `width=${defwid}, height=${defhei}`)) warn("弹出的窗口被阻止。", deftime);
        window.style.animation = `-zyfn 0.7s forwards ${easing}`;
        setTimeout(() => {
            document.body.removeChild(window);
            close(window, windows)
        }, 700);
    }
}

// zd 函数。

async function zd(string) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            nullcount++;
            fail("所输入内容不能为 null 或 undefined。", deftime);
            monitor();
            return 39;
        } else {
            string = string.toString();
        }
        let replaced = string.replace(/\s+/g, "");
        if (replaced === "") {
            fail("所输入内容不能为空字符串。", deftime);
            return -39;
        }
        if (nullcount > 26) {
            rz("你已被禁止调用函数。");
            return 0;
        }

        const window = document.createElement(`div`);
        window.className = `zd-window`;
        const square = document.createElement(`div`);
        square.className = `zd-square`;
        const icon = document.createElement(`img`);
        icon.className = `zd-icon`;
        const content = document.createElement(`div`);
        content.className = `fn-content`;
        const box = document.createElement(`textarea`);
        box.className = `zd-box`;
        box.placeholder = `请输入命令。`;
        box.style.resize = `none`;
        const btn = document.createElement(`button`);
        btn.className = `btn26`;
        btn.textContent = "确定";
        btn.onclick = async () => {
            const value = box.value.trim();
            if (value === "") {
                fail("所输入内容不能为空字符串。", deftime);
                return;
            }
            try {
                resolve(eval(value));
            }
            catch (error) {
                fail(error.message);
                resolve();
            }
            window.style.animation = `-sxfn 0.7s forwards ${easing}`;
            setTimeout(() => {
                if (document.body.contains(window)) {
                    document.body.removeChild(window);
                    close(window, windows);
                }
            }, 700);
        };

        if (theme === "Neon") {
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
        window.style.animation = `sxfn- 0.7s forwards ${easing}`;
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
            fail("所输入内容不能为 null 或 undefined。", deftime);
            monitor();
            resolve(39);
            return;
        }
        if (nullcount > 26) {
            rz("你已被禁止调用函数。");
            return 0;
        }

        const window = document.createElement(`div`);
        window.className = `wz-window`;
        const txt = document.createElement(`pre`);
        txt.className = `wz-content`;
        txt.innerHTML = string;
        const btn = document.createElement("img");
        btn.className = "wz-icon";
        btn.src = "images/Next.png";
        const left = document.createElement(`div`);
        left.className = `wz-left`;
        const right = document.createElement(`div`);
        right.className = `wz-right`;

        document.body.appendChild(window);
        window.appendChild(left);
        window.appendChild(right);
        window.appendChild(txt);
        window.appendChild(btn);

        window.style.animation = `--wz 0.7s forwards ${easing}`;
        left.style.animation = `__solid 0.7s forwards ${easing}`;
        right.style.animation = `__solid 0.7s forwards ${easing}`;
        window.addEventListener("animationend", (e) => {
            if (e.animationName === "--wz") {
                window.style.animation = `-wz 0.7s forwards ${easing}`;
                right.style.animation = `_right forwards 0.7s ${easing}`;
                window.addEventListener("animationend", (f) => {
                    if (f.animationName === "-wz") {
                        txt.style.animation = `_txt forwards 0.7s ${easing}`;
                        btn.style.animation = `_btn forwards 0.7s ${easing}`;
                    }
                });
            }

            btn.onclick = () => {
                if (clicked) {
                    warn(`请勿多次点击。`, 2000);
                    return;
                }
                txt.style.animation = `txt_ 0.7s forwards ${easing}`;
                btn.style.animation = `btn_ 0.7s forwards ${easing}`;
                txt.addEventListener("animationend", (g) => {
                    if (g.animationName === "txt_") {
                        window.style.animation = `wz- 0.7s forwards ${easing}`;
                        left.style.animation = `left_ 0.7s forwards ${easing}`;
                        window.addEventListener("animationend", (h) => {
                            if (h.animationName === "wz-") {
                                window.style.animation = `wz-- 0.7s forwards ${easing}`;
                                left.style.animation = `solid__ 0.7s forwards ${easing}`;
                                right.style.animation = `solid__ 0.7s forwards ${easing}`;
                            }
                        });
                    }
                });
                clicked = true;
                const ani_end = () => {
                    window.removeEventListener("animationend", ani_end);
                };
                window.addEventListener("animationend", ani_end);
                resolve();
                setTimeout(() => {
                    document.body.removeChild(window);
                }, 2100);
            };
        });
    });
}