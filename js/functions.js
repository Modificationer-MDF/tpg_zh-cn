var nullcount = 0; // 连续输入 null 或 undefined 的次数。
var windows = []; // 信息数组。
let rzwin = []; // rz() 信息数组。
let totalHeight = 0; // rz() 的总高度。
let urlEndings = [
    `.com`, `.net`, `.cn`, `.org`, `.edu`, `.gov`, `.mil`,
    `.biz`, `.noti`, `.name`, `.pro`, ".aero", `.coop`,
    `.museum`, `.jobs`, `.travel`, `.xxx`, `.top`, `.site`,
    `.wiki`, `.cc`, `.tv`, `.mobi`, `.me`, `.bid`, `.club`,
    `.online`, `.store`, `.work`, `.tech`
];

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

    const window = document.createElement("div");
    window.className = `rz-window`;
    window.style.opacity = 0;
    const content = document.createElement("div");
    content.className = `rz-content`;
    content.innerHTML = string;

    const l = Math.ceil(string.length / 14);
    content.style.height = `calc(${l * 20}px)`;

    create(window);
    document.body.appendChild(window);
    window.appendChild(content);

    requestAnimationFrame(() => {
        window.style.animation = `-rz 550ms forwards ${easing}`;
    });

    setTimeout(() => {
        window.style.animation = `rz- 550ms forwards ${easing}`;
        setTimeout(() => {
            if (document.body.contains(window)) document.body.removeChild(window);
            close(window);
        }, 550);
    }, time);
}

// noti 函数。

function noti(string, title) {
    if (string == null || string == undefined) {
        nullcount++;
        fail("不能输入 null 或 undefined！");
        monitor();
        return 39;
    } else if (title == null || title == undefined || title === "") title = "通知";
    else string = string.toString();
    let replaced = string.replace(/\s+/g, "");
    if (replaced === "") {
        warn("不能输入空字符串。");
        return -39;
    }
    if (nullcount > 26) {
        rz("你已被禁止调用函数。");
    }

    const window = document.createElement("div");
    window.className = `noti-window`;
    const square = document.createElement("div");
    square.className = `noti-square`;
    const icon = document.createElement("img");
    icon.src = `images/Inf.png`;
    icon.style.opacity = 0;
    icon.style.transistion = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const txt = document.createElement("div");
    txt.className = "fn-title";
    txt.style.opacity = 0;
    txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const content = document.createElement("div");
    content.className = "fn-content";
    content.style.opacity = 0;
    content.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const bar = document.createElement("div");
    bar.className = `noti-progressbar`;

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    square.appendChild(icon);
    square.appendChild(txt);
    window.appendChild(content);
    window.appendChild(bar);

    window.style.animation = `fn- 550ms forwards ${easing}`;
    square.style.animation = `title- 550ms forwards ${easing}`;
    content.innerHTML = string;
    txt.innerHTML = title;

    window.addEventListener("animationend", () => {
        content.style.transform = "translateY(0%)";
        content.style.opacity = 1;
        icon.style.opacity = 1;
        txt.style.opacity = 1;
    });

    const visible = () => {
        const rect = window.getBoundingClientRect();
        const viewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        if (viewport === false) {
            rz("你有 1 个未阅览完的 noti() 窗口。");
        }
    };

    const l1 = Math.ceil(string.length / 14);
    const lh1 = parseInt(window.style.lineHeight);
    content.style.height = `${l1 * lh1}px`;

    const l2 = Math.ceil(title.length / 14);
    content.style.marginTop = `${20 * (l2 + 1)}px`;

    let pro = 0;
    const interval = setInterval(() => {
        pro += 10 / (deftime / 100);
        bar.style.width = `${pro}%`;
        if (pro >= 100) {
            clearInterval(interval);
        }
    }, 10);

    setTimeout(() => {
        content.style.opacity = 0;
        content.style.transform = "translateY(-10%)";
        icon.style.opacity = 0;
        txt.style.opacity = 0;
        content.addEventListener("transitionend", () => {
            window.style.animation = `-fn 550ms forwards ${easing}`;
            square.style.animation = `-title 550ms forwards ${easing}`;
            setTimeout(() => {
                if (document.body.contains(window)) document.body.removeChild(window);
                close(window, windows);
            }, 550);
        });
    }, deftime);
    setTimeout(visible);
}

// cg 函数。

function cg(string, title) {
    if (string == null || string == undefined) {
        nullcount++;
        fail("不能输入 null 或 undefined！");
        monitor();
        return 39;
    } else if (title == null || title == undefined || title === "") title = "完成";
    else string = string.toString();
    let replaced = string.replace(/\s+/g, "");
    if (replaced === "") {
        warn("不能输入空字符串。");
        return -39;
    }
    if (nullcount > 26) {
        rz("你已被禁止调用函数。");
    }

    const window = document.createElement("div");
    window.className = `cg-window`;
    const square = document.createElement("div");
    square.className = `cg-square`;
    const txt = document.createElement("div");
    txt.className = "fn-title";
    txt.style.opacity = 0;
    txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const icon = document.createElement("img");
    icon.src = `images/Suc.png`;
    icon.style.opacity = 0;
    icon.style.transistion = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const content = document.createElement("div");
    content.className = "fn-content";
    content.style.opacity = 0;
    content.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const bar = document.createElement("div");
    bar.className = `cg-progressbar`;

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    square.appendChild(icon);
    square.appendChild(txt);
    window.appendChild(content);
    window.appendChild(bar);

    window.style.animation = `fn- 550ms forwards ${easing}`;
    content.innerHTML = string;
    txt.innerHTML = title;

    window.addEventListener("animationend", () => {
        content.style.transform = "translateY(0%)";
        content.style.opacity = 1;
        txt.style.opacity = 1;
        icon.style.opacity = 1;
    });``

    const l1 = Math.ceil(string.length / 14);
    var lh1 = parseInt(window.style.lineHeight);
    content.style.height = `${l1 * lh1}px`;

    const l2 = Math.ceil(title.length / 14);
    content.style.marginTop = `${20 * (l2 + 1)}px`;

    let pro = 0;
    const interval = setInterval(() => {
        pro += 10 / (deftime / 100);
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
            rz("你有 1 个未阅览完的 cg() 窗口。");
        }
    };

    setTimeout(() => {
        content.style.opacity = 0;
        content.style.transform = "translateY(-10%)";
        txt.style.opacity = 0;
        icon.style.opacity = 0;
        content.addEventListener("transitionend", () => {
            window.style.animation = `-fn 550ms forwards ${easing}`;
            setTimeout(() => {
                if (document.body.contains(window)) document.body.removeChild(window);
                close(window, windows)
            }, 550);
        });
    }, deftime);
    setTimeout(visible);
}

// fail 函数。

function fail(string, title) {
    if (string == null || string == undefined) {
        nullcount++;
        fail("不能输入 null 或 undefined！");
        monitor();
        return 39;
    } else if (title == null || title == undefined || title === "") title = "错误";
    else string = string.toString();
    let replaced = string.replace(/\s+/g, "");
    if (replaced === "") {
        warn("不能输入空字符串。");
        return -39;
    }
    if (nullcount > 26) {
        rz("你已被禁止调用函数。");
    }

    const window = document.createElement("div");
    window.className = `fail-window`;
    const square = document.createElement("div");
    square.className = `fail-square`;
    const icon = document.createElement("img");
    icon.className = `fail-icon`;
    icon.style.opacity = 0;
    icon.style.transistion = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const txt = document.createElement("div");
    txt.className = "fn-title";
    txt.style.opacity = 0;
    txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const content = document.createElement("div");
    content.className = "fn-content";
    content.style.opacity = 0;
    content.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const bar = document.createElement("div");
    bar.className = `fail-progressbar`;

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    square.appendChild(icon);
    square.appendChild(txt);
    window.appendChild(content);
    window.appendChild(bar);

    icon.src = `images/Err.png`;
    window.style.animation = `fn- 550ms forwards ${easing}`;
    content.innerHTML = string;
    txt.innerHTML = title;

    window.addEventListener("animationend", () => {
        content.style.transform = "translateY(0%)";
        content.style.opacity = 1;
        icon.style.opacity = 1;
        txt.style.opacity = 1;
    });

    const l1 = Math.ceil(string.length / 14);
    var lh1 = parseInt(window.style.lineHeight);
    content.style.height = `${l1 * lh1}px`;

    const l2 = Math.ceil(title.length / 14);
    content.style.marginTop = `${20 * (l2 + 1)}px`;

    let pro = 0;
    const interval = setInterval(() => {
        pro += 10 / (deftime / 100);
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
            rz("你有 1 个未阅览完的 fail() 窗口。");
        }
    };

    setTimeout(() => {
        content.style.opacity = 0;
        content.style.transform = "translateY(-10%)";
        icon.style.opacity = 0;
        txt.style.opacity = 0;
        content.addEventListener("transitionend", () => {
            window.style.animation = `-fn 550ms forwards ${easing}`;
            setTimeout(() => {
                if (document.body.contains(window)) document.body.removeChild(window);
                close(window, windows)
            }, 550);
        });
    }, deftime);
    setTimeout(visible);
}

// warn 函数。

function warn(string, title) {
    if (string == null || string == undefined) {
        nullcount++;
        fail("不能输入 null 或 undefined！");
        monitor();
        return 39;
    } else if (title == null || title == undefined || title === "") title = "注意";
    else string = string.toString();
    let replaced = string.replace(/\s+/g, "");
    if (replaced === "") {
        warn("不能输入空字符串。");
        return -39;
    }
    if (nullcount > 26) {
        rz("你已被禁止调用函数。");
    }

    const window = document.createElement("div");
    window.className = `warn-window`;
    const square = document.createElement("div");
    square.className = `warn-square`;
    const icon = document.createElement("img");
    icon.className = `warn-icon`;
    icon.style.opacity = 0;
    icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const txt = document.createElement("div");
    txt.className = "fn-title";
    txt.style.opacity = 0;
    txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const content = document.createElement("div");
    content.className = "fn-content";
    content.style.opacity = 0;
    content.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const bar = document.createElement("div");
    bar.className = `warn-progressbar`;

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    square.appendChild(icon);
    square.appendChild(txt);
    window.appendChild(content);
    window.appendChild(bar);

    icon.src = `images/Exc.png`;
    window.style.animation = `fn- 550ms forwards ${easing}`;
    content.innerHTML = string;
    txt.innerHTML = title;

    window.addEventListener("animationend", () => {
        content.style.transform = "translateY(0%)";
        content.style.opacity = 1;
        icon.style.opacity = 1;
        txt.style.opacity = 1;
    });

    const l1 = Math.ceil(string.length / 14);
    var lh1 = parseInt(window.style.lineHeight);
    content.style.height = `${l1 * lh1}px`;

    const l2 = Math.ceil(title.length / 14);
    content.style.marginTop = `${20 * (l2 + 1)}px`;

    let pro = 0;
    const interval = setInterval(() => {
        pro += 10 / (deftime / 100);
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
            rz("你有 1 个未阅览完的 warn() 窗口。");
        }
    };

    setTimeout(() => {
        content.style.opacity = 0;
        content.style.transform = "translateY(-10%)";
        icon.style.opacity = 0;
        txt.style.opacity = 0;
        content.addEventListener("transitionend", () => {
            window.style.animation = `-fn 550ms forwards ${easing}`;
            setTimeout(() => {
                if (document.body.contains(window)) document.body.removeChild(window);
                close(window, windows)
            }, 550);
        });
    }, deftime);
    setTimeout(visible);
}

// inp 函数。

async function inp(string, title) {
    return new Promise((resolve) => {
        if (string === null || string === undefined) {
            nullcount++;
            fail("不能输入 null 或 undefined！");
            monitor();
            return 39;
        } else if (title == null || title == undefined || title === "") title = "输入";
        else string = string.toString();
        let replaced = string.replace(/\s+/g, "");
        if (replaced === "") {
            warn("不能输入空字符串。");
            return -39;
        }
        if (nullcount > 26) {
            rz("你已被禁止调用函数。");
        }

        const window = document.createElement("div");
        window.className = `inp-window`;
        const square = document.createElement("div");
        square.className = `inp-square`;
        const icon = document.createElement("img");
        icon.className = `inp-icon`;
        icon.style.opacity = 0;
        icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const txt = document.createElement("div");
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const content = document.createElement("div");
        content.className = "fn-content";
        content.style.opacity = 0;
        content.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const box = document.createElement("textarea");
        box.type = "text";
        box.className = "inp-box";
        box.style.opacity = 0;
        box.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        box.style.resize = "none";
        box.focus();

        const visible = () => {
            const rect = window.getBoundingClientRect();
            const viewport = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
            if (viewport === false) {
                rz("你有 1 个未看到的 inp() 窗口。");
            }
        };

        create(window);
        document.body.appendChild(window);
        window.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        window.appendChild(content);
        window.appendChild(box);
        
        icon.src = `images/Inp.png`;
        window.style.animation = `fn- 550ms forwards ${easing}`;
        content.innerHTML = string;
        txt.innerHTML = title;

        window.addEventListener("animationend", () => {
            content.style.transform = "translateY(0%)";
            content.style.opacity = 1;
            box.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
        });

        const l1 = Math.ceil(string.length / 14);
        var lh1 = parseInt(window.style.lineHeight);
        content.style.height = `${l1 * lh1}px`;

        const l2 = Math.ceil(title.length / 14);
        content.style.marginTop = `${20 * (l2 + 1)}px`;

        box.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                const value = box.value;
                content.style.transform = "translateY(-10%)";
                content.style.opacity = 0;
                box.style.opacity = 0;
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                content.addEventListener("transitionend", () => {
                    window.style.animation = `-fn 550ms forwards ${easing}`;
                    setTimeout(() => {
                        resolve(value);
                        if (document.body.contains(window)) document.body.removeChild(window);
                        close(window, windows);
                    }, 550);
                });
            }
        });
        setTimeout(visible);
    });
}

// xz 函数。

async function xz(string, n, names, title) {
    return new Promise((resolve) => {
        if (n === null || n === undefined) fail("所输入的选项数量必须为数字。");
        else if (isNaN(n)) fail("所输入的选项数量必须为数字。");
        else if (n <= 0) fail("请输入一个正整数。")
        n = Math.ceil(Number(n));
        const array = Array.from(names);

        const window = document.createElement("div");
        window.className = `xz-window`;
        const square = document.createElement("div");
        square.className = `xz-square`;
        const icon = document.createElement("img");
        icon.className = `xz-icon`;
        icon.style.opacity = 0;
        icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const txt = document.createElement("div");
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const content = document.createElement("div");
        content.className = "fn-content";
        content.style.opacity = 0;
        content.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";

        if (string == null || string == undefined) {
            nullcount++;
            fail("不能输入 null 或 undefined！");
            monitor();
            return 39;
        } else if (title == null || title == undefined || title === "") title = "选择";
        else string = string.toString();
        let replaced1 = string.replace(/\s+/g, "");
        if (replaced1 === "") {
            warn("不能输入空字符串。");
            return -39;
        }
        if (nullcount > 26) {
            rz("你已被禁止调用函数。");
        }

        create(window);
        document.body.appendChild(window);
        window.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        window.appendChild(content);

        icon.src = `images/Sel.png`;
        window.style.animation = `fn- 550ms forwards ${easing}`;
        content.innerHTML = string;
        txt.innerHTML = title;

        const visible = () => {
            const rect = window.getBoundingClientRect();
            const viewport = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
            if (viewport === false) {
                rz("你有 1 个未看到的 xz() 窗口。");
            }
        };

        const l1 = Math.ceil(string.length / 14);
        var lh1 = parseInt(window.style.lineHeight);
        content.style.height = `${l1 * lh1}px`;

        const l2 = Math.ceil(title.length / 14);
        content.style.marginTop = `${20 * (l2 + 1)}px`;

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

        for (let i = 0; i < n; i++) {
            const btn = document.createElement(`button`);
            array[i] = String(array[i]);
            btn.id = `btn${i}`;
            btn.innerHTML = array[i];

            btn.style.backgroundColor = `${color()}b0`;
            btn.style.backdropFilter = "blur(14px) saturate(250%)";
            btn.style.opacity = 0;
            btn.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
            btn.style.fontSize = "20px";
            btn.style.border = "none";
            btn.style.padding = `14px 25px`;
            btn.style.textAlign = `center`;
            btn.style.cursor = `pointer`;
            btn.style.color = `white`;
            btn.style.position = "absolute";
            btn.style.top = `${i * 60 + 60}px`;
            btn.style.flex = "1";
            content.style.marginBottom = `${80 + i * 60}px`;
            btn.style.left = "20px";

            window.addEventListener("animationend", () => {
                content.style.transform = "translateY(0%)";
                content.style.opacity = 1;
                btn.style.opacity = 1;
                icon.style.opacity = 1;
                txt.style.opacity = 1;
            });

            btn.onclick = () => {
                resolve(array[i]);
                content.style.opacity = 0;
                content.style.transform = "translateY(-10%)";
                btn.style.opacity = 0;
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                content.addEventListener("transitionend", () => {
                    window.style.animation = `-fn 550ms forwards ${easing}`;
                    setTimeout(() => {
                        if (document.body.contains(window)) document.body.removeChild(window);
                        close(window, windows)
                    }, 550);
                });
            };
            content.appendChild(btn);
        }
        setTimeout(visible);
    });
}

// synchr 函数。

async function synchr(string, title) {
    if (string == null || string == undefined) {
        nullcount++;
        fail("不能输入 null 或 undefined！");
        monitor();
        return 39;
    } else if (title == null || title == undefined || title === "") title = "同步";
    else string = string.toString();
    let replaced = string.replace(/\s+/g, "");
    if (replaced === "") {
        warn("不能输入空字符串。");
        return -39;
    }
    if (nullcount > 26) {
        rz("你已被禁止调用函数。");
    }

    const window = document.createElement("div");
    window.className = `synchr-window`;
    const square = document.createElement("div");
    square.className = `synchr-square`;
    const icon = document.createElement("img");
    icon.className = `synchr-icon`;
    icon.style.opacity = 0;
    icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const txt = document.createElement("div");
    txt.className = "fn-title";
    txt.style.opacity = 0;
    txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const content = document.createElement("div");
    content.className = "fn-content";
    content.style.opacity = 0;
    content.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const bar = document.createElement("div");
    bar.className = `synchr-progressbar`;

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    square.appendChild(icon);
    square.appendChild(txt);
    window.appendChild(content);
    window.appendChild(bar);

    icon.src = `images/Synchronization.png`;
    window.style.animation = `fn- 550ms forwards ${easing}`;
    content.innerHTML = string;
    txt.innerHTML = title;

    window.addEventListener("animationend", () => {
        content.style.transform = "translateY(0%)";
        content.style.opacity = 1;
        icon.style.opacity = 1;
        txt.style.opacity = 1;
    });

    const l1 = Math.ceil(string.length / 14);
    var lh1 = parseInt(window.style.lineHeight);
    content.style.height = `${l1 * lh1}px`;

    const l2 = Math.ceil(title.length / 14);
    content.style.marginTop = `${20 * (l2 + 1)}px`;

    const visible = () => {
        const rect = window.getBoundingClientRect();
        const viewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        if (viewport === false) {
            rz("你有 1 个未阅览完的 synchr() 窗口。");
        }
    };
    
    setTimeout(() => {
        content.style.opacity = 0;
        content.style.transform = "translateY(-10%)";
        icon.style.opacity = 0;
        txt.style.opacity = 0;
        content.addEventListener("transitionend", () => {
            window.style.animation = `-fn 550ms forwards ${easing}`;
            setTimeout(() => {
                if (document.body.contains(window)) document.body.removeChild(window);
                close(window, windows)
            }, 550);
        });
    }, deftime);
    setTimeout(visible);
}

// lj 函数。

async function lj(string, url, title) {
    if (string == null || string == undefined || url == null || url == undefined) {
        nullcount++;
        fail("不能输入 null 或 undefined！");
        monitor();
        return 39;
    } else if (title == null || title == undefined || title === "") title = "链接";
    else {
        string = string.toString();
        url = url.toString();
    }
    let replaced1 = string.replace(/\s+/g, "");
    let replaced2 = url.replace(/\s+/g, "");
    if (replaced1 === "" || replaced2 === "") {
        warn("不能输入空字符串。");
        return -39;
    }
    if (nullcount > 26) {
        rz("你已被禁止调用函数。");
    }

    const window = document.createElement("div");
    window.className = `lj-window`;
    const square = document.createElement("div");
    square.className = `lj-square`;
    const icon = document.createElement("img");
    icon.className = `lj-icon`;
    icon.style.opacity = 0;
    icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const txt = document.createElement("div");
    txt.className = "fn-title";
    txt.style.opacity = 0;
    txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const content = document.createElement("div");
    content.className = "fn-content";
    content.style.opacity = 0;
    content.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const btn = document.createElement(`button`);
    btn.className = "lj-link";
    btn.style.opacity = 0;
    btn.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    square.appendChild(icon);
    square.appendChild(txt);
    window.appendChild(content);
    window.appendChild(btn);

    const visible = () => {
        const rect = window.getBoundingClientRect();
        const viewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        if (viewport === false) {
            rz("你有 1 个未看到的 lj() 窗口。");
        }
    };

    icon.src = `images/Link.png`;
    window.style.animation = `fn- 550ms forwards ${easing}`;
    content.innerHTML = string;
    btn.innerHTML = url;
    txt.innerHTML = title;

    window.addEventListener("animationend", () => {
        content.style.transform = "translateY(0%)";
        content.style.opacity = 1;
        btn.style.opacity = 1;
        icon.style.opacity = 1;
        txt.style.opacity = 1;
    });

    const l1 = Math.ceil(string.length / 14);
    var lh1 = parseInt(window.style.lineHeight);
    content.style.height = `${l1 * lh1}px`;

    const l2 = Math.ceil(title.length / 14);
    content.style.marginTop = `${20 * (l2 + 1)}px`;

    btn.onclick = () => {
        if (!open(url, `_blank`, `width=${defwid}, height=${defhei}`)) warn("弹出的窗口被阻止。");
        content.style.opacity = 0;
        content.style.transform = "translateY(-10%)";
        btn.style.opacity = 0;
        icon.style.opacity = 0;
        txt.style.opacity = 0;
        content.addEventListener("transitionend", () => {
            window.style.animation = `-fn 550ms forwards ${easing}`;
            setTimeout(() => {
                if (document.body.contains(window)) document.body.removeChild(window);
                close(window, windows)
            }, 550);
        });
    }
    setTimeout(visible);
}

// zd 函数。

async function zd(string, title) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            nullcount++;
            fail("不能输入 null 或 undefined！");
            monitor();
            return 39;
        } else if (title == null || title == undefined || title === "") title = "终端";
        else string = string.toString();
        let replaced = string.replace(/\s+/g, "");
        if (replaced === "") {
            warn("不能输入空字符串。");
            return -39;
        }
        if (nullcount > 26) {
            rz("你已被禁止调用函数。");
            return 0;
        }

        const window = document.createElement("div");
        window.className = `zd-window`;
        const square = document.createElement("div");
        square.className = `zd-square`;
        const icon = document.createElement("img");
        icon.className = `zd-icon`;
        icon.style.opacity = 0;
        icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const txt = document.createElement("div");
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const content = document.createElement("div");
        content.className = "fn-content";
        content.style.opacity = 0;
        content.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const box = document.createElement(`textarea`);
        box.className = `zd-box`;
        box.style.opacity = 0;
        box.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        box.style.resize = "none";
        box.focus();

        const visible = () => {
            const rect = window.getBoundingClientRect();
            const viewport = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
            if (viewport === false) {
                rz("你有 1 个未看到的 zd() 窗口。");
            }
        };

        box.addEventListener("keypress", async (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
                const value = box.value.trim();
                if (value === "") {
                    warn("不能输入空字符串。");
                    return;
                }
                try {
                    let k = eval(value);
                    rz(k);
                    resolve(eval(value));
                } catch (error) {
                    switch (error.name) {
                        case "ReferenceError":
                            let vof = error.message.split(" is not defined");
                            fail(`引用了未定义的变量或函数 “${vof[0]}”。`);
                            break;
                        case "SyntaxError":
                            if (error.message.includes("Unexpected identifier '")) {
                                let err = error.message.split("Unexpected identifier '");
                                err[1] = err[1].replace("'", "’");
                                fail(`‘${err[1]} 不是有效的标识符（Identifier）。`);
                            } else if (error.message.includes("Unexpected end of input")) {
                                fail("缺少必要的符号。");
                            } else if (error.message.includes("Unexpected token")) {
                                let err = error.message.split("Unexpected token '");
                                err[1] = err[1].replace("'", "’");
                                fail(`‘${err[1]} 不是有效的标识符（Token）。`);
                            } else if (error.message.includes("Invalid or unexpected token")) {
                                if (value.includes("\\")) fail("无效的转义字符 “\\”。");
                                else fail("无效标识符。");
                            } else if (error.message.includes("Missing initializer in const declaration")) {
                                fail("const 变量没有设置初始化值。");
                            } else if (error.message.includes("Invalid left-hand side in assignment")) {
                                fail("赋值操作中左侧表达式无效。");
                            } else if (error.message.includes("has already been declared") && error.message.includes("Identifier")) {
                                err = error.message.replace("Identifier '", "");
                                err = error.message.replace("' has already been declared", "");
                                fail(`标识符 ‘${err}’ 已经声明过。`);
                            } else {
                                fail(`语法错误：${error.message}。`);
                            }
                            break;
                        case "TypeError":
                            fail(`类型错误：${error.message}`);
                            break;
                        case "RangeError":
                            fail(`数值超出范围：${error.message}`);
                            break;
                        default:
                            fail(error.message);
                            break;
                    }
                    resolve();
                }
                content.style.opacity = 0;
                content.style.transform = "translateY(-10%)";
                box.style.opacity = 0;
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                content.addEventListener("transitionend", () => {
                    window.style.animation = `-fn 550ms forwards ${easing}`;
                    setTimeout(() => {
                        if (document.body.contains(window)) document.body.removeChild(window);
                        close(window, windows);
                    }, 550);
                });
            } else if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault();
                box.value += "\n";
            }
        });

        create(window);
        document.body.appendChild(window);
        window.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        window.appendChild(content);
        window.appendChild(box);

        icon.src = `images/Com.png`;
        window.style.animation = `fn- 550ms forwards ${easing}`;
        content.innerHTML = string;
        txt.innerHTML = title;

        window.addEventListener("animationend", () => {
            content.style.transform = "translateY(0%)";
            content.style.opacity = 1;
            box.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
        });

        const l1 = Math.ceil(string.length / 14);
        var lh1 = parseInt(window.style.lineHeight);
        content.style.height = `${l1 * lh1}px`;

        const l2 = Math.ceil(title.length / 14);
        content.style.marginTop = `${20 * (l2 + 1)}px`;

        setTimeout(visible);
    });
}

// wz 函数。

async function wz(string) {
    return new Promise((resolve) => {
        let clicked = false;
        if (string == null || string == undefined) {
            nullcount++;
            fail("不能输入 null 或 undefined！");
            monitor();
            resolve(39);
            return;
        }
        if (nullcount > 26) {
            rz("你已被禁止调用函数。");
            return 0;
        }

        const window = document.createElement("div");
        window.className = `wz-window`;
        const txt = document.createElement(`pre`);
        txt.className = `wz-content`;
        txt.innerHTML = string;
        const btn = document.createElement("img");
        btn.className = "wz-icon";
        btn.src = "images/Next.png";
        const left = document.createElement("div");
        left.className = `wz-left`;
        const right = document.createElement("div");
        right.className = `wz-right`;

        document.body.appendChild(window);
        window.appendChild(left);
        window.appendChild(right);
        window.appendChild(txt);
        window.appendChild(btn);

        window.style.animation = `--wz 550ms forwards ${easing}`;
        left.style.animation = `__solid 550ms forwards ${easing}`;
        right.style.animation = `__solid 550ms forwards ${easing}`;
        window.addEventListener("animationend", (e) => {
            if (e.animationName === "--wz") {
                window.style.animation = `-wz 550ms forwards ${easing}`;
                right.style.animation = `_right forwards 550ms ${easing}`;
                window.addEventListener("animationend", (f) => {
                    if (f.animationName === "-wz") {
                        txt.style.animation = `_txt forwards 0.3s ${easing}`;
                        btn.style.animation = `_btn forwards 0.3s ${easing}`;
                    }
                });
            }

            btn.onclick = () => {
                if (clicked) {
                    warn("请勿重复点击。");
                    return;
                }
                txt.style.animation = `txt_ 0.3s forwards ${easing}`;
                btn.style.animation = `btn_ 0.3s forwards ${easing}`;
                txt.addEventListener("animationend", (g) => {
                    if (g.animationName === "txt_") {
                        window.style.animation = `wz- 550ms forwards ${easing}`;
                        left.style.animation = `left_ 550ms forwards ${easing}`;
                        window.addEventListener("animationend", (h) => {
                            if (h.animationName === "wz-") {
                                window.style.animation = `wz-- 550ms forwards ${easing}`;
                                left.style.animation = `solid__ 550ms forwards ${easing}`;
                                right.style.animation = `solid__ 550ms forwards ${easing}`;
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
                    if (document.body.contains(window)) document.body.removeChild(window);
                }, 2100);
            };
        });
    });
}