var num = 0; // 窗口数量。

// 更新窗口位置的函数
function updateSelectedWindowPos(wc) {
    const windows = document.querySelectorAll(wc);
    let total = 0;
        windows.forEach((window, index) => {
            const wh = window.offsetHeight; // 获取当前窗口的高度。
            total += (index === 0 ? 0 : 7) + wh; // 计算此窗口的顶部位置。
            // 设置位置过渡。
            window.style.transition = "top 0.3s cubic-bezier(0.33, 1, 0.68, 1)";
            if (index <= 2) {
                window.style.top = `calc(${total}px + 8vh)`;
            } else {
                window.style.top = `calc(${total}px + 8vh)`; // 更新每个窗口的位置。
            }
        });
}

// info 函数。
function info(string, name) {
    num++;
    const window = document.createElement("div");
    window.className = "info-window";
    const square = document.createElement("div");
    square.className = "info-square";
    const icon = document.createElement("div");
    icon.className = "info-icon";
    const content = document.createElement("div");
    content.className = "info-content";

    updateSelectedWindowPos(".info-window"); // 更新所有窗口位置。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    if (name === "" || name === undefined) {
        name = "确定";
    }

    icon.innerHTML = `第 ${num} 条信息`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    const lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "info- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            updateSelectedWindowPos(".info-window"); // 更新所有窗口位置。
            num--; // 更新窗口数量。
        }, 700);
    }, 3000);
}

// success 函数。

function success(string) {
    num++;
    const window = document.createElement("div");
    window.className = "success-window";
    const square = document.createElement("div");
    square.className = "success-square";
    const icon = document.createElement("div");
    icon.className = "success-icon";
    const content = document.createElement("div");
    content.className = "success-content";

    updateSelectedWindowPos(".success-window"); // 更新所有窗口位置。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = `第 ${num} 条成功消息`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "success- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            updateSelectedWindowPos(".success-window"); // 更新所有窗口位置。
            num--; // 更新窗口数量。
        }, 700);
    }, 3000);
}

// fail 函数。

function fail(string) {
    num++;
    const window = document.createElement("div");
    window.className = "fail-window";
    const square = document.createElement("div");
    square.className = "fail-square";
    const icon = document.createElement("div");
    icon.className = "fail-icon";
    const content = document.createElement("div");
    content.className = "fail-content";

    updateSelectedWindowPos(".fail-window"); // 更新所有窗口位置。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = `第 ${num} 条错误消息`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "fail- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            updateSelectedWindowPos(".fail-window"); // 更新所有窗口位置。
            num--; // 更新窗口数量。
        }, 700);
    }, 3000);
}

// warning 函数。

function warning(string) {
    num++;
    const window = document.createElement("div");
    window.className = "warning-window";
    const square = document.createElement("div");
    square.className = "warning-square";
    const icon = document.createElement("div");
    icon.className = "warning-icon";
    const content = document.createElement("div");
    content.className = "warning-content";

    updateSelectedWindowPos(".warning-window"); // 更新所有窗口位置。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = `第 ${num} 条警告消息`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "warning- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            updateSelectedWindowPos(".warning-window"); // 更新所有窗口位置。
            num--; // 更新窗口数量。
        }, 700);
    }, 3000);
}

// input 函数。

function input(string, holder) {
    return new Promise((resolve) => {
        num++;
        const window = document.createElement("div");
        window.className = "input-window";
        const square = document.createElement("div");
        square.className = "input-square";
        const icon = document.createElement("div");
        icon.className = "input-icon";
        const content = document.createElement("div");
        content.className = "input-content";
        if (holder === "" || holder === undefined) {
            holder = "在此输入……";
        }
        const box = document.createElement("input");
        box.type = "text";
        box.className = "input-box";
        box.placeholder = holder;

        updateSelectedWindowPos(".input-window"); // 更新所有窗口位置。
        document.body.appendChild(window);
        window.appendChild(square);
        window.appendChild(content);
        window.appendChild(box);
        square.appendChild(icon);

        icon.innerHTML = `第 ${num} 项输入`;
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
                        updateSelectedWindowPos(".input-window"); // 更新所有窗口位置。
                        num--; // 更新窗口数量。
                    }
                }, 700);
            }
        });
    });
}


// choice 函数。

function choice(string, name1, name2) {
    return new Promise((resolve) => {
        num++;
        const window = document.createElement("div");
        window.className = "choice-window";
        const square = document.createElement("div");
        square.className = "choice-square";
        const icon = document.createElement("div");
        icon.className = "choice-icon";
        const content = document.createElement("div");
        content.className = "choice-content";
        if (name1 === "" || name2 === "" || name1 === undefined || name2 === undefined) {
            name1 = "确定";
            name2 = "取消";
        }

        updateSelectedWindowPos(".choice-window"); // 更新所有窗口位置。
        document.body.appendChild(window);
        window.appendChild(square);
        window.appendChild(content);
        square.appendChild(icon);

        icon.innerHTML = `第 ${num} 项选择`;
        content.innerHTML = string;

        const line = Math.ceil(string.length / 14);
        var lineHeight = parseInt(window.style.lineHeight);
        content.style.height = `${line * lineHeight}px`;

        const True = document.createElement("button");
        True.innerHTML = name1;
        True.className = "choice-true";
        True.onclick = () => {
            resolve(true);
            close();
        };

        const False = document.createElement("button");
        False.innerHTML = name2;
        False.className = "choice-false";
        False.onclick = () => {
            resolve(false);
            close();
        };

        // 将按钮添加到内容中。
        content.appendChild(True);
        content.appendChild(False);

        function close() {
            window.style.animation = "choice- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)"; // 播放出场动画
            setTimeout(() => {
                document.body.removeChild(window);
                updateSelectedWindowPos(".choice-window"); // 更新所有窗口位置。
                num--; // 更新窗口数量。
            }, 700);
        }
    });
}

// transmit 函数。

function transmit(string) {
    num++;
    const window = document.createElement("div");
    window.className = "transmit-window";
    const square = document.createElement("div");
    square.className = "transmit-square";
    const icon = document.createElement("div");
    icon.className = "transmit-icon";
    const content = document.createElement("div");
    content.className = "transmit-content";

    updateSelectedWindowPos(".command-window");
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = `第 ${num} 次传输`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "transmit- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            updateSelectedWindowPos(".transmit-window"); // 更新所有窗口位置。
            num--; // 更新窗口数量。
        }, 700);
    }, 3000);
}

// link 函数。

function link(string, url) {
    if (url === "" || url === undefined) {
        fail("链接地址不能为空！");
        return 39;
    }

    num++;
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


    updateSelectedWindowPos(".link-window"); // 更新所有窗口位置。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = `第 ${num} 个链接`;
    content.innerHTML = string;
    btn.innerHTML = "跳转";
    content.appendChild(btn);

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    btn.onclick = () => {
        open(url, "_blank", "width=800, height=600")
        window.style.animation = "link- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            updateSelectedWindowPos(".link-window"); // 更新所有窗口位置。
            num--; // 更新窗口数量。
        }, 700);
    }
}

// command 函数。

function command(string) {
    num++;
    const window = document.createElement("div");
    window.className = "command-window";
    const square = document.createElement("div");
    square.className = "command-square";
    const icon = document.createElement("div");
    icon.className = "command-icon";
    const content = document.createElement("div");
    content.className = "command-content";

    updateSelectedWindowPos(".command-window"); // 更新所有窗口位置。
    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = `第 ${num} 个终端窗口`;
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "command- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
            updateSelectedWindowPos(".command-window"); // 更新所有窗口位置。
            num--; // 更新窗口数量。
        }, 700);
    }, 3000);
}
