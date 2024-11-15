var infoNum = 0;
var warningNum = 0;
var failNum = 0;
var successNum = 0;
var choiceNum = 0;
var inputNum = 0;
var transmitNum = 0;
var linkNum = 0;
var commandNum = 0;
var nullCount = 0;
var windows = []; // 窗口数组。
let urlEndings = [
    ".com", ".net", ".cn", ".org", ".edu", ".gov", ".mil",
    ".biz", ".info", ".name", ".pro", ".aero", ".coop",
    ".museum", ".jobs", ".travel", ".xxx", ".top", ".site",
    ".wiki", ".cc", ".tv", ".mobi", ".me", ".bid", ".club",
    ".online", ".store", ".work", ".tech", ".bid"
];

// 更新窗口位置的函数
function updateSelectedWindowPos() {
    let total = 7 * window.innerHeight / 100; // 初始位置距离页面顶部的偏移（7vh）
    windows.forEach((window, index) => {
        const wh = window.offsetHeight; // 获取当前窗口的高度。
        window.style.transition = "top 0.3s cubic-bezier(0.33, 1, 0.68, 1)";
        // 更新每个窗口的位置，保持适当的间隔
        window.style.top = `${total}px`; 
        total += wh + 7; // 增加窗口高度和7px间距
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

// info 函数。
function info(string) {
    if (string == null || string == undefined) {
        nullCount++;
        fail("所输入内容不能为 null 或 undefined。");
        monitor();
        return 39;
    } if (nullCount > 26) {
        return "你已被禁止调用函数。";
    }

    infoNum++;
    const window = document.createElement("div");
    window.className = "info-window";
    const square = document.createElement("div");
    square.className = "info-square";
    const icon = document.createElement("div");
    icon.className = "info-icon";
    const content = document.createElement("div");
    content.className = "info-content";

    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);
    create(window); // 添加窗口。

    icon.innerHTML = `第 ${infoNum} 条信息`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    const lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "info- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }, 3000);
}

// success 函数。

function success(string) {
    if (string == null || string == undefined) {
        nullCount++;
        fail("所输入内容不能为 null 或 undefined。");
        monitor();
        return 39;
    } if (nullCount > 26) {
        return "你已被禁止调用函数。";
    }

    successNum++;
    const window = document.createElement("div");
    window.className = "success-window";
    const square = document.createElement("div");
    square.className = "success-square";
    const icon = document.createElement("div");
    icon.className = "success-icon";
    const content = document.createElement("div");
    content.className = "success-content";

    create(window); // 添加窗口。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = `第 ${successNum} 条成功消息`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "success- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }, 3000);
}

// fail 函数。

function fail(string) {
    if (string == null || string == undefined) {
        nullCount++;
        fail("所输入内容不能为 null 或 undefined。");
        monitor();
        return 39;
    } if (nullCount > 26) {
        return "你已被禁止调用函数。";
    }

    failNum++;
    const window = document.createElement("div");
    window.className = "fail-window";
    const square = document.createElement("div");
    square.className = "fail-square";
    const icon = document.createElement("div");
    icon.className = "fail-icon";
    const content = document.createElement("div");
    content.className = "fail-content";

    create(window); // 添加窗口。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = `第 ${failNum} 条错误消息`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "fail- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }, 3000);
}

// warning 函数。

function warning(string) {
    if (string == null || string == undefined) {
        nullCount++;
        fail("所输入内容不能为 null 或 undefined。");
        monitor();
        return 39;
    } if (nullCount > 26) {
        return "你已被禁止调用函数。";
    }

    warningNum++;
    const window = document.createElement("div");
    window.className = "warning-window";
    const square = document.createElement("div");
    square.className = "warning-square";
    const icon = document.createElement("div");
    icon.className = "warning-icon";
    const content = document.createElement("div");
    content.className = "warning-content";

    create(window); // 添加窗口。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = `第 ${warningNum} 条警告消息`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "warning- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }, 3000);
}

// input 函数。

function input(string, holder) {
    return new Promise((resolve) => {
        inputNum++;
        const window = document.createElement("div");
        window.className = "input-window";
        const square = document.createElement("div");
        square.className = "input-square";
        const icon = document.createElement("div");
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
        } if (nullCount > 26) {
            return "你已被禁止调用函数。";
        }
        const box = document.createElement("input");
        box.type = "text";
        box.className = "input-box";
        box.placeholder = holder;

        create(window); // 添加窗口。
        document.body.appendChild(window);
        window.appendChild(square);
        window.appendChild(content);
        window.appendChild(box);
        square.appendChild(icon);

        icon.innerHTML = `第 ${inputNum} 项输入`;
        content.innerHTML = string;

        const line = Math.ceil(string.length / 14);
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
        choiceNum++;
        const window = document.createElement("div");
        window.className = "choice-window";
        const square = document.createElement("div");
        square.className = "choice-square";
        const icon = document.createElement("div");
        icon.className = "choice-icon";
        const content = document.createElement("div");
        content.className = "choice-content";
        if (name1 === "" || name2 === "") {
            name1 = "确定";
            name2 = "取消";
        } if (string == null || string == undefined || name1 === undefined || name2 === undefined || name1 === null || name2 === null) {
            nullCount++;
            fail("所输入内容不能为 null 或 undefined。");
            monitor();
            return 39;
        } if (nullCount > 26) {
            return "你已被禁止调用函数。";
        }
        create(window); // 添加窗口。
        document.body.appendChild(window);
        window.appendChild(square);
        window.appendChild(content);
        square.appendChild(icon);

        icon.innerHTML = `第 ${choiceNum} 项选择`;
        content.innerHTML = string;

        const line = Math.ceil(string.length / 14);
        var lineHeight = parseInt(window.style.lineHeight);
        content.style.height = `${line * lineHeight}px`;

        const True = document.createElement("button");
        True.innerHTML = name1;
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
    if (string == null || string == undefined) {
        nullCount++;
        fail("所输入内容不能为 null 或 undefined。");
        monitor();
        return 39;
    } if (nullCount > 26) {
        return "你已被禁止调用函数。";
    }

    transmitNum++;
    const window = document.createElement("div");
    window.className = "transmit-window";
    const square = document.createElement("div");
    square.className = "transmit-square";
    const icon = document.createElement("div");
    icon.className = "transmit-icon";
    const content = document.createElement("div");
    content.className = "transmit-content";

    create(window); // 添加窗口。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = `第 ${transmitNum} 次传输`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "transmit- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }, 3000);
}

// link 函数。

function link(string, url) {
    if (string == null || string == undefined || url == null || url == undefined) {
        nullCount++;
        fail("所输入内容不能为 null 或 undefined。");
        monitor();
        return 39;
    } else if (url.startsWith("https") != true) {
        url = "https://" + url;
    } else if (urlEndings.some(ending => url.endsWith(ending)) == false) {
        warning("请检查你所输入的网址是否正确！");
    } if (nullCount > 26) {
        return "你已被禁止调用函数。";
    }

    linkNum++;
    const window = document.createElement("div");
    window.className = "link-window";
    const square = document.createElement("div");
    square.className = "link-square";
    const icon = document.createElement("div");
    icon.className = "link-icon";
    const content = document.createElement("div");
    content.className = "link-content";
    const btn = document.createElement("button");
    btn.className = "link-btn";
    var line_ = Math.ceil(url.length / 14);
    console.log(line_);
    content.style.marginBottom = `calc(70px + ${Math.round(line_ / 2)}em)`;

    create(window); // 添加窗口。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = `第 ${linkNum} 个链接`;
    content.innerHTML = string;
    btn.innerHTML = `跳转至 ${url}`;
    content.appendChild(btn);

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    btn.onclick = () => {
        open(url, "_blank", "width=1000, height=700")
        window.style.animation = "link- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。
        }, 700);
    }
}

// command 函数。

function command(string) {
    if (string == null || string == undefined) {
        nullCount++;
        fail("所输入内容不能为 null 或 undefined。");
        monitor();
        return 39;
    } if (nullCount > 26) {
        return "你已被禁止调用函数。";
    }

    commandNum++;
    const window = document.createElement("div");
    window.className = "command-window";
    const square = document.createElement("div");
    square.className = "command-square";
    const icon = document.createElement("div");
    icon.className = "command-icon";
    const content = document.createElement("div");
    content.className = "command-content";

    create(window); // 添加窗口。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = `第 ${commandNum} 个终端窗口`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "command- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            close(window) // 移除窗口。        
        }, 700);
    }, 3000);
}
