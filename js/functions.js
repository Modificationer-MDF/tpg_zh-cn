// info 函数。

function info(string) {
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

    icon.innerHTML = "信息";
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "info- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
        }, 700);
    }, 3000);
}

// success 函数。

function success(string) {
    const window = document.createElement("div");
    window.className = "success-window";
    const square = document.createElement("div");
    square.className = "success-square";
    const icon = document.createElement("div");
    icon.className = "success-icon";
    const content = document.createElement("div");
    content.className = "success-content";

    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = "成功";
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "success- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
        }, 700);
    }, 3000);
}

// fail 函数。

function fail(string) {
    const window = document.createElement("div");
    window.className = "fail-window";
    const square = document.createElement("div");
    square.className = "fail-square";
    const icon = document.createElement("div");
    icon.className = "fail-icon";
    const content = document.createElement("div");
    content.className = "fail-content";

    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = "错误";
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "fail- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
        }, 700);
    }, 3000);
}

// warning 函数。

function warning(string) {
    const window = document.createElement("div");
    window.className = "warning-window";
    const square = document.createElement("div");
    square.className = "warning-square";
    const icon = document.createElement("div");
    icon.className = "warning-icon";
    const content = document.createElement("div");
    content.className = "warning-content";

    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = "注意";
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "warning- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
        }, 700);
    }, 3000);
}

// input 函数。

function input(string, value) {
    const window = document.createElement("div");
    window.className = "input-window";
    const square = document.createElement("div");
    square.className = "input-square";
    const icon = document.createElement("div");
    icon.className = "input-icon";
    const content = document.createElement("div");
    content.className = "input-content";
    const box = document.createElement("input");
    box.type = "text";
    box.className = "input-box";
    box.placeholder = "在此输入……";

    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    window.appendChild(box);
    square.appendChild(icon);

    icon.innerHTML = "输入";
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    box.focus();

    box.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            window.style.animation = "input- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
            setTimeout(() => {
                if (document.body.contains(window)) {
                    document.body.removeChild(window);
                }
            }, 700);
        }
        return (box.value);
    });
}

// choice 函数。

function choice(string) {
    const window = document.createElement("div");
    window.className = "choice-window";
    const square = document.createElement("div");
    square.className = "choice-square";
    const icon = document.createElement("div");
    icon.className = "choice-icon";
    const content = document.createElement("div");
    content.className = "choice-content";

    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = "选择";
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "choice- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
        }, 700);
    }, 3000);
}

// transmit 函数。

function transmit(string) {
    const window = document.createElement("div");
    window.className = "transmit-window";
    const square = document.createElement("div");
    square.className = "transmit-square";
    const icon = document.createElement("div");
    icon.className = "transmit-icon";
    const content = document.createElement("div");
    content.className = "transmit-content";

    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = "同步";
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "transmit- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
        }, 700);
    }, 3000);
}

// feedback 函数。

function feedback(string) {
    const window = document.createElement("div");
    window.className = "feedback-window";
    const square = document.createElement("div");
    square.className = "feedback-square";
    const icon = document.createElement("div");
    icon.className = "feedback-icon";
    const content = document.createElement("div");
    content.className = "feedback-content";

    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = "反馈";
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "feedback- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
        }, 700);
    }, 3000);
}

// command 函数。

function command(string) {
    const window = document.createElement("div");
    window.className = "command-window";
    const square = document.createElement("div");
    square.className = "command-square";
    const icon = document.createElement("div");
    icon.className = "command-icon";
    const content = document.createElement("div");
    content.className = "command-content";

    document.body.appendChild(window);
    window.appendChild(square);
    window.appendChild(content);
    square.appendChild(icon);

    icon.innerHTML = "终端";
    content.innerHTML = string;

    const line = Math.ceil(string.length / 14);
    var lineHeight = parseInt(window.style.lineHeight);
    content.style.height = `${line * lineHeight}px`;

    setTimeout(() => {
        window.style.animation = "command- 0.7s forwards cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            document.body.removeChild(window);
        }, 700);
    }, 3000);
}
