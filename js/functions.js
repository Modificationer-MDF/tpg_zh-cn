var lognum = 0;
var nullCount = 0;
var windows = []; // 信息数组。
let logwin = []; // log() 信息数组。
let totalHeight = 0; // log() 的总高度。
let urlEndings = [
    ".com", ".net", ".cn", ".org", ".edu", ".gov", ".mil",
    ".biz", ".info", ".name", ".pro", ".aero", ".coop",
    ".museum", ".jobs", ".travel", ".xxx", ".top", ".site",
    ".wiki", ".cc", ".tv", ".mobi", ".me", ".bid", ".club",
    ".online", ".store", ".work", ".tech", ".bid"
];

// 更新窗口位置的函数
function updateSelectedWindowPos() {
    let total = 7 * window.innerHeight / 100; // 初始位置距离页面顶部的偏移（7vh）。
    windows.forEach((window) => {
        const wh = window.offsetHeight; // 获取当前窗口的高度。
        window.style.transition = "top 0.3s cubic-bezier(0.33, 1, 0.68, 1)";
        // 更新每个窗口的位置，保持适当的间隔。
        window.style.top = `${total}px`;
        total += wh + 7; // 增加窗口高度和7px间距。
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
    if (nullCount >= 3 && nullCount < 7) {
        warning(`你已连续 ${nullCount} 次输入 null 或 undefined。请检查你所输入的内容。`)
    } else if (nullCount >= 7 && nullCount < 14) {
        warning(`再次警告！你已连续输入 null 或 undefined ${nullCount} 次。请检查你所输入的内容。`)
    } else if (nullCount >= 14 && nullCount < 25) {
        info(`null 和 undefined 是指，变量的值为 null 或 undefined，即你在 prompt 输入框中点击了取消或者在函数的参数中传入了 null 或 undefined。请检查你所输入的内容。`);
    } else if (nullCount >= 25 && nullCount < 30) {
        fail("你已被禁止调用任何函数。");
        console.warn("你已被禁止调用任何函数。");
        warning("请查看控制台。");
    }
}

function log(string, time) {
    lognum++;
    function re() {
        totalHeight = logwin.reduce((acc, w) => acc + w.offsetHeight, 0);
    }

    if (time == null || time == undefined) {
        time = 3000;
    }

    const window = document.createElement("div");
    window.className = "log-window";
    window.style.opacity = 0;

    const content = document.createElement("div");
    content.className = "log-content";
    content.textContent = string;

    const line = Math.ceil(string.size / 14);
    content.style.height = `calc(${line * 20}px)`;

    document.body.appendChild(window);
    window.appendChild(content);

    window.style.top = `calc(${totalHeight}px + ${lognum}vh)`;
    totalHeight += window.offsetHeight;
    logwin.push(window);

    requestAnimationFrame(() => {
        window.style.animation = "-log 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
    });

    setTimeout(() => {
        window.style.animation = "log- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            logwin = logwin.filter(w => w !== window);
            re();
            lognum--;
        }, 700);
    }, time);
}

// info 函数。

function info(string) {
    let replaced = string.replace(/\s+/g, "");
    if (string == null || string == undefined) {
        nullCount++;
        fail("所输入内容不能为 null 或 undefined。");
        monitor();
        return 39;
    } else if (replaced === "") {
        fail("所输入内容不能为空字符串。");
        return -39;
    }
    if (nullCount > 26) {
        return "你已被禁止调用函数。";
    }

    const window = document.createElement("div");
    window.className = "info-window";
    const square = document.createElement("div");
    square.className = "info-square";
    const icon = document.createElement("img");
    icon.src = "images/Inf.png";
    const content = document.createElement("div");
    content.className = "info-content";
    if (theme === "Neon") {
        window.style.backdropFilter = "blur(14px) saturate(250%)";
        square.style.backdropFilter = "blur(14px) saturate(250%)";
    }

    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
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
            log(`你有 1 条未读完的 info() 信息。`);
        }
    };

    const line = Math.ceil(string.size / 14);
    const lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "info- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            close(window);
        }, 700);
    }, 3000);
    setTimeout(visible, 3000);
}

// success 函数。

function success(string) {
    let replaced = string.replace(/\s+/g, "");
    if (string == null || string == undefined) {
        nullCount++;
        fail("所输入内容不能为 null 或 undefined。");
        monitor();
        return 39;
    } else if (replaced === "") {
        fail("所输入内容不能为空字符串。");
        return -39;
    }
    if (nullCount > 26) {
        return "你已被禁止调用函数。";
    }

    const window = document.createElement("div");
    window.className = "success-window";
    const square = document.createElement("div");
    square.className = "success-square";
    const icon = document.createElement("img");
    icon.src = "images/Pass.png";
    const content = document.createElement("div");
    content.className = "success-content";
    if (theme === "Neon") {
        window.style.backdropFilter = "blur(14px) saturate(250%)";
        square.style.backdropFilter = "blur(14px) saturate(250%)";
    }

    create(window); // 添加窗口。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    // icon.innerHTML = `第 ${successNum} 条成功消息`;
    content.innerHTML = string;

    const line = Math.ceil(string.size / 14);
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
            log(`你有 1 条未读完的 success() 信息。`);
        }
    };

    setTimeout(() => {
        window.style.animation = "success- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }, 3000);
    setTimeout(visible, 3000);
}

// fail 函数。

function fail(string) {
    let replaced = string.replace(/\s+/g, "");
    if (string == null || string == undefined) {
        nullCount++;
        fail("所输入内容不能为 null 或 undefined。");
        monitor();
        return 39;
    } else if (replaced === "") {
        fail("所输入内容不能为空字符串。");
        return -39;
    }
    if (nullCount > 26) {
        return "你已被禁止调用函数。";
    }

    const window = document.createElement("div");
    window.className = "fail-window";
    const square = document.createElement("div");
    square.className = "fail-square";
    const icon = document.createElement("img");
    icon.className = "fail-icon";
    const content = document.createElement("div");
    content.className = "fail-content";
    if (theme === "Neon") {
        window.style.backdropFilter = "blur(14px) saturate(250%)";
        square.style.backdropFilter = "blur(14px) saturate(250%)";
    }

    create(window); // 添加窗口。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.src = "images/Error.png";
    content.innerHTML = string;

    const line = Math.ceil(string.size / 14);
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
            log(`你有 1 条未读完的 fail() 信息。`);
        }
    };

    setTimeout(() => {
        window.style.animation = "fail- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }, 3000);
    setTimeout(visible, 3000);
}

// warning 函数。

function warning(string) {
    let replaced = string.replace(/\s+/g, "");
    if (string == null || string == undefined) {
        nullCount++;
        fail("所输入内容不能为 null 或 undefined。");
        monitor();
        return 39;
    } else if (replaced === "") {
        fail("所输入内容不能为空字符串。");
        return -39;
    }
    if (nullCount > 26) {
        return "你已被禁止调用函数。";
    }

    const window = document.createElement("div");
    window.className = "warning-window";
    const square = document.createElement("div");
    square.className = "warning-square";
    const icon = document.createElement("img");
    icon.className = "warning-icon";
    const content = document.createElement("div");
    content.className = "warning-content";
    if (theme === "Neon") {
        window.style.backdropFilter = "blur(14px) saturate(250%)";
        square.style.backdropFilter = "blur(14px) saturate(250%)";
    }

    create(window); // 添加窗口。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.src = "images/Exclamation Mark.png";
    content.innerHTML = string;

    const line = Math.ceil(string.size / 14);
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
            log(`你有 1 条未读完的 warning() 信息。`);
        }
    };

    setTimeout(() => {
        window.style.animation = "warning- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }, 3000);
    setTimeout(visible, 3000);
}

// input 函数。

function input(string, holder) {
    return new Promise((resolve) => {
        let replaced1 = string.replace(/\s+/g, "");
        let replaced2 = holder.replace(/\s+/g, "");
        const window = document.createElement("div");
        window.className = "input-window";
        const square = document.createElement("div");
        square.className = "input-square";
        const icon = document.createElement("img");
        icon.className = "input-icon";
        const content = document.createElement("div");
        content.className = "input-content";
        if (holder === "") {
            holder = "在此输入……";
        } else if (string === null || string === undefined || holder === undefined || holder === null) {
            nullCount++;
            fail("所输入内容不能为 null 或 undefined。");
            monitor();
            return 39;
        } else if (replaced1 === "" || replaced2 === "") {
            fail("所输入内容不能为空字符串。");
            return -39;
        }
        if (nullCount > 26) {
            return "你已被禁止调用函数。";
        }
        const box = document.createElement("input");
        box.type = "text";
        box.className = "input-box";
        box.placeholder = holder;
        if (theme === "Neon") {
            window.style.backdropFilter = "blur(14px) saturate(250%)";
            square.style.backdropFilter = "blur(14px) saturate(250%)";
            box.style.backgroundFilter = "blur(14px) saturate(250%)";
        }

        create(window); // 添加窗口。
        document.body.appendChild(window);
        window.appendChild(square);
        window.appendChild(content);
        window.appendChild(box);
        square.appendChild(icon);
        
        icon.src = "images/Inp.png";
        content.innerHTML = string;

        const line = Math.ceil(string.size / 14);
        var lineHeight = parseInt(window.style.lineHeight);
        content.style.height = `${line * lineHeight}px`;

        box.focus();
        box.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                const value = box.value;
                window.style.animation = "input- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
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

function choice(string, name1, name2) {
    return new Promise((resolve) => {
        let replaced1 = string.replace(/\s+/g, "");
        let replaced2 = name1.replace(/\s+/g, "");
        let replaced3 = name2.replace(/\s+/g, "");
        const window = document.createElement("div");
        window.className = "choice-window";
        const square = document.createElement("div");
        square.className = "choice-square";
        const icon = document.createElement("img");
        icon.className = "choice-icon";
        const content = document.createElement("div");
        content.className = "choice-content";
        if (name1 === "" || name2 === "") {
            name1 = "确定";
            name2 = "取消";
        } else if (string == null || string == undefined || name1 === undefined || name2 === undefined || name1 === null || name2 === null) {
            nullCount++;
            fail("所输入内容不能为 null 或 undefined。");
            monitor();
            return 39;
        } else if (replaced1 === "" || replaced2 === "" || replaced3 === "") {
            fail("所输入内容不能为空字符串。");
            return -39;
        }
        if (nullCount > 26) {
            return "你已被禁止调用函数。";
        }
        if (theme === "Neon") {
            window.style.backdropFilter = "blur(14px) saturate(250%)";
            square.style.backdropFilter = "blur(14px) saturate(250%)";
        }

        create(window); // 添加窗口。
        document.body.appendChild(window);
        window.appendChild(square);
        window.appendChild(content);
        square.appendChild(icon);

        icon.src = "images/Choose.png";
        content.innerHTML = string;

        const line = Math.ceil(string.size / 14);
        var lineHeight = parseInt(window.style.lineHeight);
        content.style.height = `${line * lineHeight}px`;

        const True = document.createElement("button");
        True.innerHTML = name1;
        True.focus();
        True.className = "choice-true";
        True.onclick = () => {
            resolve(true);
            rm();
        };

        const False = document.createElement("button");
        False.innerHTML = name2;
        False.className = "choice-false";
        False.onclick = () => {
            resolve(false);
            rm();
        };

        // 将按钮添加到内容中。
        content.appendChild(True);
        content.appendChild(False);

        function rm() {
            window.style.animation = "choice- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)"; // 播放出场动画
            setTimeout(() => {
                document.body.removeChild(window);
                close(window) // 移除窗口。
            }, 700);
        }
    });
}

// transmit 函数。

function transmit(string) {
    let replaced = string.replace(/\s+/g, "");
    if (string == null || string == undefined) {
        nullCount++;
        fail("所输入内容不能为 null 或 undefined。");
        monitor();
        return 39;
    } else if (replaced === "") {
        fail("所输入内容不能为空字符串。");
        return -39;
    }
    if (nullCount > 26) {
        return "你已被禁止调用函数。";
    }

    const window = document.createElement("div");
    window.className = "transmit-window";
    const square = document.createElement("div");
    square.className = "transmit-square";
    const icon = document.createElement("img");
    icon.className = "transmit-icon";
    const content = document.createElement("div");
    content.className = "transmit-content";
    if (theme === "Neon") {
        window.style.backdropFilter = "blur(14px) saturate(250%)";
        square.style.backdropFilter = "blur(14px) saturate(250%)";
    }

    create(window); // 添加窗口。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.src = "images/Trans.png";
    content.innerHTML = string;

    const line = Math.ceil(string.size / 14);
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
            log(`你有 1 条未读完的 transmit() 信息。`);
        }
    };

    setTimeout(() => {
        window.style.animation = "transmit- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }, 3000);
    setTimeout(visible, 3000);
}

// link 函数。

function link(string, url) {
    url = String(url);
    let replaced1 = string.replace(/\s+/g, "");
    let replaced2 = url.replace(/\s+/g, "");
    if (string == null || string == undefined || url == null || url == undefined) {
        nullCount++;
        fail("所输入内容不能为 null 或 undefined。");
        monitor();
        return 39;
    } else if (url.startsWith("https") != true) {
        url = "https://" + url;
    } else if (urlEndings.some(ending => url.endsWith(ending)) == false) {
        warning("请检查你所输入的网址是否正确！");
    } else if (replaced1 === "" || replaced2 === "") {
        fail("所输入内容不能为空字符串。");
        return -39;
    }
    if (nullCount > 26) {
        return "你已被禁止调用函数。";
    }

    const window = document.createElement("div");
    window.className = "link-window";
    const square = document.createElement("div");
    square.className = "link-square";
    const icon = document.createElement("img");
    icon.className = "link-icon";
    const content = document.createElement("div");
    content.className = "link-content";
    const btn = document.createElement("button");
    btn.className = "link-btn";
    var line_ = Math.ceil(url.size / 14);
    content.style.marginBottom = `calc(70px + ${line_ * lineHeight}vh)`;
    if (theme === "Neon") {
        window.style.backdropFilter = "blur(14px) saturate(250%)";
        square.style.backdropFilter = "blur(14px) saturate(250%)";
    }

    create(window); // 添加窗口。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.src = "images/Link.png";
    content.innerHTML = string;
    btn.innerHTML = `跳转至 ${url}`;
    content.appendChild(btn);

    const line = Math.ceil(string.size / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    btn.onclick = () => {
        open(url, "_blank", "width=1024, height=768")
        window.style.animation = "link- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }
}

// command 函数。

function command(string) {
    let replaced = string.replace(/\s+/g, "");
    if (string == null || string == undefined) {
        nullCount++;
        fail("所输入内容不能为 null 或 undefined。");
        monitor();
        return 39;
    } else if (replaced === "") {
        fail("所输入内容不能为空字符串。");
        return -39;
    }
    if (nullCount > 26) {
        return "你已被禁止调用函数。";
    }

    const window = document.createElement("div");
    window.className = "command-window";
    const square = document.createElement("div");
    square.className = "command-square";
    const icon = document.createElement("img");
    icon.className = "command-icon";
    const content = document.createElement("div");
    content.className = "command-content";
    if (theme === "Neon") {
        window.style.backdropFilter = "blur(14px) saturate(250%)";
        square.style.backdropFilter = "blur(14px) saturate(250%)";
    }

    create(window); // 添加窗口。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.src = "images/Command.png";
    content.innerHTML = string;

    const line = Math.ceil(string.size / 14);
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
            log(`你有 1 条未读完的 command() 信息。`);
        }
    };

    setTimeout(() => {
        window.style.animation = "command- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }, 3000);
    setTimeout(visible, 3000);
}

// important 函数。

async function important(string) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            nullCount++;
            fail("所输入内容不能为 null 或 undefined。");
            monitor();
            return 39;
        } if (nullCount > 26) {
            return "你已被禁止调用函数。";
        }
        const window = document.createElement("div");
        window.className = "important-window";
        let clicked = false;
        document.body.appendChild(window);
        window.style.display = "block";
        window.style.animation = "-important forwards 0.7s cubic-bezier(0.33, 1, 0.68, 1)";
        const txt = document.createElement("div");
        txt.className = "windows-text";
        txt.innerHTML = string;
        window.appendChild(txt);
        const btn = document.createElement("button");
        btn.className = "important-confirm";
        btn.textContent = "确定";
        window.appendChild(btn);
        btn.onclick = () => {
            window.style.animation = "important- forwards 0.7s cubic-bezier(0.33, 1, 0.68, 1)";
            if (clicked) {
                warning("请勿多次点击。");
            }
            clicked = true;
            const ani_end = () => {
                window.removeChild(txt);
                window.removeChild(btn);
                window.style.display = "none";
                window.removeEventListener("animationend", ani_end);
            };
            window.addEventListener("animationend", ani_end);
            resolve();
            setTimeout(() => {
                document.body.removeChild(window);
            }, 700);
        };
    });
}

async function keyin(string, holder) {
    return new Promise((resolve) => {
        if (string == null || string == undefined || holder == null || holder == undefined) {
            nullCount++;
            fail("所输入内容不能为 null 或 undefined。");
            monitor();
            return 39;
        } if (nullCount > 26) {
            return "你已被禁止调用函数。";
        }
        if (holder === "") {
            holder = "在此输入……";
        }
        const window = document.createElement("div");
        let clicked = false;
        window.className = "keyin-window";
        window.style.display = "block";
        window.style.backgroundColor = "#ffffff9a";
        document.body.appendChild(window);
        window.style.animation = "-keyin forwards 0.7s cubic-bezier(0.33, 1, 0.68, 1)";
        const txt = document.createElement("div");
        txt.className = "windows-text";
        txt.innerHTML = string;
        txt.style.color = "#000000";
        window.appendChild(txt);
        const inp = document.createElement("input");
        inp.type = "text";
        inp.focus();
        inp.placeholder = holder;
        inp.style.fontFamily = "basic";
        inp.style.display = "block";
        inp.style.width = "500px";
        inp.style.height = "100px";
        inp.style.marginBottom = "10px";
        inp.style.position = "fixed";
        inp.style.top = "50%";
        inp.style.backgroundColor = "#ffffff9a";
        inp.style.backgroundFilter = "blur(14px) saturate(250%)";
        inp.style.color = "#000000";
        inp.style.left = "100%";
        window.appendChild(inp);
        const btn = document.createElement("button");
        btn.className = "important-confirm";
        btn.textContent = "确定";
        window.appendChild(btn);
        btn.onclick = () => {
            const value = inp.value;
            window.style.animation = "keyin- forwards 0.7s cubic-bezier(0.33, 1, 0.68, 1)";
            clicked = true;
            if (clicked) {
                warning("请勿多次点击。");
            }
            const ani_end = () => {
                window.removeChild(txt);
                window.removeChild(inp);
                window.removeChild(btn);
                window.style.display = "none";
                window.removeEventListener("animationend", ani_end);
                resolve(value);
            };
            window.addEventListener("animationend", ani_end);
            setTimeout(() => {
                document.body.removeChild(window);
            }, 700);
        };
    });
}

function alert(string) {
    important(string);
}
