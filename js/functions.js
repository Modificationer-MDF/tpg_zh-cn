// rz 函数。

function rz(string, time) {
    if (string == null) {
        warn("这个值为 null。");
        return;
    } else if (string == undefined) {
        warn("这个值为 undefined。");
        return;
    }
    if (time == null || time == undefined) time = smarttime(string);

    const window = document.createElement("div");
    window.className = "rz-window";
    window.style.opacity = 0;
    const content = document.createElement("div");
    content.className = "rz-content";
    content.innerHTML = string;

    const l = Math.ceil(string.length / 14);
    const lh = parseInt(content.style.lineHeight);
    content.style.height = `${l * lh}px`;

    create(window);
    document.body.appendChild(window);
    window.appendChild(content);

    requestAnimationFrame(() => {
        window.style.animation = `jr_rz 0.55s forwards ${easing}`;
    });

    setTimeout(() => {
        window.style.animation = `cc_rz 0.55s forwards ${easing}`;
        setTimeout(() => {
            if (document.body.contains(window)) document.body.removeChild(window);
            close(window);
        }, 550);
    }, time);
}

// noti 函数。

function noti(string, title, id) {
    if (string == null || string == undefined) {
        fail("不能输入 null 或 undefined！");
        return "在 Noti() 函数中，string 参数不能为 null 或 undefined。";
    }
    string = String(string);
    let s_replaced = string.replace(/\s+/g, "");
    if (title == null || title == undefined) title = "通知";
    if (id == null || id == undefined) id = "";
    else {
        title = String(title);
        let t_replaced = title.replace(/\s+/g, "");
        if (t_replaced === "") title = "通知";
    }
    if (s_replaced === "") {
        warn("不能输入空字符串。");
        return "在 Noti() 函数中，string 参数不能为空。";
    }

    const window = document.createElement("div");
    window.className = "noti-window";
    window.id = id;
    const square = document.createElement("div");
    square.className = "noti-square";
    const icon = document.createElement("img");
    icon.src = "images/Notification.png";
    icon.alt = "";
    icon.style.opacity = 0;
    icon.style.transistion = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const txt = document.createElement("div");
    txt.className = "fn-title";
    txt.style.opacity = 0;
    txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const content = document.createElement("div");
    content.className = "fn-content";
    content.style.opacity = 0;
    content.style.transition = `all 175ms ${easing}`;
    const bar = document.createElement("div");
    bar.className = "noti-progressbar";
    const timerdesc = document.createElement("div");
    timerdesc.className = "fn-timerdesc";
    timerdesc.style.transition = `all 175ms ${easing}`;

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    square.appendChild(icon);
    square.appendChild(txt);
    window.appendChild(content);
    window.appendChild(bar);
    window.appendChild(timerdesc);

    window.style.animation = `jr_fn 0.55s forwards ${easing}`;
    content.innerHTML = string;
    txt.innerHTML = title;

    window.addEventListener("animationend", () => {
        content.style.transform = "translateY(0)";
        content.style.opacity = 1;
        icon.style.opacity = 1;
        txt.style.opacity = 1;
        timerdesc.style.opacity = 1;
        timerdesc.style.transform = "translateX(0)";
        window.style.maxHeight = window.getBoundingClientRect().height + "px";
    });

    visible(content, "Noti");

    const l2 = Math.ceil(title.length / 14);
    content.style.marginTop = `${20 * (l2 + 1)}px`;

    let pro = 0;
    let ls_finish = false;
    let passed_time = 0;
    const interval = setInterval(() => {
        passed_time += 10;
        pro += 10 / (smarttime(string) / 100);
        bar.style.width = `${pro}%`;
        timerdesc.innerHTML = `${fhsj(passed_time)} / ${fhsj(smarttime(string))} | ${ pro.toFixed(2) }%`;
        if (pro >= 100) {
            clearInterval(interval);
            ls_finish = true;
        }
    }, 10);

    setInterval(() => {
        if (ls_finish) {
            content.style.opacity = 0;
            content.style.transform = "translateY(-10px)";
            timerdesc.style.opacity = 0;
            timerdesc.style.transform = "translateX(25px)";
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            content.addEventListener("transitionend", () => {
                window.style.animation = `cc_fn 0.55s forwards ${easing}`;
                close(window, windows);
                setTimeout(() => {
                    if (document.body.contains(window)) document.body.removeChild(window);
                }, 550);
            });
        }
    }, 25);
}

// cg 函数。

function cg(string, title, id) {
    if (string == null || string == undefined) {
        fail("不能输入 null 或 undefined！");
        return "在 Cg() 函数中，string 参数不能为 null 或 undefined。";
    }
    string = String(string);
    let s_replaced = string.replace(/\s+/g, "");
    if (title == null || title == undefined) title = "完成";
    if (id == null || id == undefined) id = "";
    else {
        title = String(title);
        let t_replaced = title.replace(/\s+/g, "");
        if (t_replaced === "") title = "完成";
    }
    if (s_replaced === "") {
        warn("不能输入空字符串。");
        return "在 Cg() 函数中，string 参数不能为空。";
    }

    const window = document.createElement("div");
    window.className = "cg-window";
    window.id = id;
    const square = document.createElement("div");
    square.className = "cg-square";
    const txt = document.createElement("div");
    txt.className = "fn-title";
    txt.style.opacity = 0;
    txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const icon = document.createElement("img");
    icon.alt = "";
    icon.src = "images/Suc.png";
    icon.style.opacity = 0;
    icon.style.transistion = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const content = document.createElement("div");
    content.className = "fn-content";
    content.style.opacity = 0;
    content.style.transition = `all 175ms ${easing}`;
    const bar = document.createElement("div");
    bar.className = "cg-progressbar";
    const timerdesc = document.createElement("div");
    timerdesc.className = "fn-timerdesc";
    timerdesc.style.transition = `all 175ms ${easing}`;

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    square.appendChild(icon);
    square.appendChild(txt);
    window.appendChild(content);
    window.appendChild(bar);
    window.appendChild(timerdesc);

    window.style.animation = `jr_fn 0.55s forwards ${easing}`;
    content.innerHTML = string;
    txt.innerHTML = title;

    window.addEventListener("animationend", () => {
        content.style.transform = "translateY(0)";
        content.style.opacity = 1;
        txt.style.opacity = 1;
        icon.style.opacity = 1;
        timerdesc.style.opacity = 1;
        timerdesc.style.transform = "translateX(0)";
        window.style.maxHeight = window.getBoundingClientRect().height + "px";
    });

    const l2 = Math.ceil(title.length / 14);
    content.style.marginTop = `${20 * (l2 + 1)}px`;

    let pro = 0;
    let ls_finish = false;
    let passed_time = 0;
    const interval = setInterval(() => {
        pro += 10 / (smarttime(string) / 100);
        passed_time += 10;
        bar.style.width = `${pro}%`;
        timerdesc.innerHTML = `${fhsj(passed_time)} / ${fhsj(smarttime(string))} | ${ pro.toFixed(2) }%`;
        if (pro >= 100) {
            clearInterval(interval);
            ls_finish = true;
        }
    }, 10);

    visible(content, "Cg");

    setInterval(() => {
        if (ls_finish) {
            content.style.opacity = 0;
            content.style.transform = "translateY(-10px)";
            timerdesc.style.opacity = 0;
            timerdesc.style.transform = "translateX(25px)";
            txt.style.opacity = 0;
            icon.style.opacity = 0;
            content.addEventListener("transitionend", () => {
                window.style.animation = `cc_fn 0.55s forwards ${easing}`;
                close(window, windows)
                setTimeout(() => {
                    if (document.body.contains(window)) document.body.removeChild(window);
                }, 550);
            });
        }
    }, 25);
}

// fail 函数。

function fail(string, title, id) {
    if (string == null || string == undefined) {
        fail("不能输入 null 或 undefined！");
        return "在 Fail() 函数中，string 参数不能为 null 或 undefined。";
    }
    string = String(string);
    let s_replaced = string.replace(/\s+/g, "");
    if (title == null || title == undefined) title = "错误";
    if (id == null || id == undefined) id = "";
    else {
        title = String(title);
        let t_replaced = title.replace(/\s+/g, "");
        if (t_replaced === "") title = "错误";
    }
    if (s_replaced === "") {
        warn("不能输入空字符串。");
        return "在 Fail() 函数中，string 参数不能为空。";
    }

    const window = document.createElement("div");
    window.className = "fail-window";
    window.id = id;
    const square = document.createElement("div");
    square.className = "fail-square";
    const icon = document.createElement("img");
    icon.alt = "";
    icon.className = "fail-icon";
    icon.style.opacity = 0;
    icon.style.transistion = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const txt = document.createElement("div");
    txt.className = "fn-title";
    txt.style.opacity = 0;
    txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const content = document.createElement("div");
    content.className = "fn-content";
    content.style.opacity = 0;
    content.style.transition = `all 175ms ${easing}`;
    const bar = document.createElement("div");
    bar.className = "fail-progressbar";
    const timerdesc = document.createElement("div");
    timerdesc.className = "fn-timerdesc";
    timerdesc.style.transition = `all 175ms ${easing}`;

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    square.appendChild(icon);
    square.appendChild(txt);
    window.appendChild(content);
    window.appendChild(bar);
    window.appendChild(timerdesc);

    icon.src = "images/Err.png";
    window.style.animation = `jr_fn 0.55s forwards ${easing}`;
    content.innerHTML = string;
    txt.innerHTML = title;

    window.addEventListener("animationend", () => {
        content.style.transform = "translateY(0)";
        content.style.opacity = 1;
        icon.style.opacity = 1;
        txt.style.opacity = 1;
        timerdesc.style.opacity = 1;
        timerdesc.style.transform = "translateX(0)";
        window.style.maxHeight = window.getBoundingClientRect().height + "px";
    });

    const l2 = Math.ceil(title.length / 14);
    content.style.marginTop = `${20 * (l2 + 1)}px`;

    let pro = 0;
    let ls_finish = false;
    let passed_time = 0;
    const interval = setInterval(() => {
        pro += 10 / (smarttime(string) / 100);
        passed_time += 10;
        bar.style.width = `${pro}%`;
        timerdesc.innerHTML = `${fhsj(passed_time)} / ${fhsj(smarttime(string))} | ${ pro.toFixed(2) }%`;
        if (pro >= 100) {
            clearInterval(interval);
            ls_finish = true;
        }
    }, 10);

    visible(content, "Fail")

    setInterval(() => {
        if (ls_finish) {
            content.style.opacity = 0;
            content.style.transform = "translateY(-10px)";
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            timerdesc.style.opacity = 0;
            timerdesc.style.transform = "translateX(25px)";
            content.addEventListener("transitionend", () => {
                window.style.animation = `cc_fn 0.55s forwards ${easing}`;
                close(window, windows)
                setTimeout(() => {
                    if (document.body.contains(window)) document.body.removeChild(window);
                }, 550);
            });
        }
    }, 25);
}

// warn 函数。

function warn(string, title, id) {
    if (string == null || string == undefined) {
        fail("不能输入 null 或 undefined！");
        return "在 Warn() 函数中，string 参数不能为 null 或 undefined。";
    }
    string = String(string);
    let s_replaced = string.replace(/\s+/g, "");
    if (title == null || title == undefined) title = "注意";
    if (id == null || id == undefined) id = "";
    else {
        title = String(title);
        let t_replaced = title.replace(/\s+/g, "");
        if (t_replaced === "") title = "注意";
    }
    if (s_replaced === "") {
        warn("不能输入空字符串。");
        return "在 Warn() 函数中，string 参数不能为空。";
    }

    const window = document.createElement("div");
    window.className = "warn-window";
    const square = document.createElement("div");
    square.className = "warn-square";
    const icon = document.createElement("img");
    icon.alt = "";
    icon.className = "warn-icon";
    icon.style.opacity = 0;
    icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const txt = document.createElement("div");
    txt.className = "fn-title";
    txt.style.opacity = 0;
    txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const content = document.createElement("div");
    content.className = "fn-content";
    content.style.opacity = 0;
    content.style.transition = `all 175ms ${easing}`;
    const bar = document.createElement("div");
    bar.className = "warn-progressbar";
    const timerdesc = document.createElement("div");
    timerdesc.className = "fn-timerdesc";
    timerdesc.style.transition = `all 175ms ${easing}`;

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    square.appendChild(icon);
    square.appendChild(txt);
    window.appendChild(content);
    window.appendChild(bar);
    window.appendChild(timerdesc);

    icon.src = "images/Exc.png";
    window.style.animation = `jr_fn 0.55s forwards ${easing}`;
    content.innerHTML = string;
    txt.innerHTML = title;

    window.addEventListener("animationend", () => {
        content.style.transform = "translateY(0)";
        content.style.opacity = 1;
        icon.style.opacity = 1;
        txt.style.opacity = 1;
        timerdesc.style.opacity = 1;
        timerdesc.style.transform = "translateX(0)";
        window.style.maxHeight = window.getBoundingClientRect().height + "px";
    });

    const l2 = Math.ceil(title.length / 14);
    content.style.marginTop = `${20 * (l2 + 1)}px`;

    let pro = 0;
    let ls_finish = false;
    let passed_time = 0;
    const interval = setInterval(() => {
        pro += 10 / (smarttime(string) / 100);
        passed_time += 10;
        bar.style.width = `${pro}%`;
        timerdesc.innerHTML = `${fhsj(passed_time)} / ${fhsj(smarttime(string))} | ${ pro.toFixed(2) }%`;
        if (pro >= 100) {
            clearInterval(interval);
            ls_finish = true;
        }
    }, 10);

    visible(content, "Warn");

    setInterval(() => {
        if (ls_finish) {
            content.style.opacity = 0;
            content.style.transform = "translateY(-10px)";
            timerdesc.style.opacity = 0;
            timerdesc.style.transform = "translateX(25px)";
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            content.addEventListener("transitionend", () => {
                window.style.animation = `cc_fn 0.55s forwards ${easing}`;
                close(window, windows)
                setTimeout(() => {
                    if (document.body.contains(window)) document.body.removeChild(window);
                }, 550);
            });
        }
    }, 25);
}

// inp 函数。

async function inp(string, title, id) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            fail("不能输入 null 或 undefined！");
            return "在 Inp() 函数中，string 参数不能为 null 或 undefined。";
        }
        string = String(string);
        let s_replaced = string.replace(/\s+/g, "");
        if (title == null || title == undefined) title = "输入";
        if (id == null || id == undefined) id = "";
        else {
            title = String(title);
            let t_replaced = title.replace(/\s+/g, "");
            if (t_replaced === "") title = "输入";
        }
        if (s_replaced === "") {
            warn("不能输入空字符串。");
            return "在 Inp() 函数中，string 参数不能为空。";
        }

        const window = document.createElement("div");
        window.className = "inp-window";
        window.id = id;
        const square = document.createElement("div");
        square.className = "inp-square";
        const icon = document.createElement("img");
        icon.alt = "";
        icon.className = "inp-icon";
        icon.style.opacity = 0;
        icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const txt = document.createElement("div");
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const content = document.createElement("div");
        content.className = "fn-content";
        content.style.opacity = 0;
        content.style.transition = `all 175ms ${easing}`;
        const box = document.createElement("textarea");
        box.type = "text";
        box.className = "inp-box";
        box.style.opacity = 0;
        box.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        box.style.resize = "none";
        box.focus();

        visible(content, "Inp");

        create(window);
        document.body.appendChild(window);
        window.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        window.appendChild(content);
        window.appendChild(box);
        
        icon.src = "images/Inp.png";
        window.style.animation = `jr_fn 0.55s forwards ${easing}`;
        content.innerHTML = string;
        txt.innerHTML = title;

        window.addEventListener("animationend", () => {
            content.style.transform = "translateY(0)";
            content.style.opacity = 1;
            box.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            window.style.maxHeight = window.getBoundingClientRect().height + "px";
        });

        const l2 = Math.ceil(title.length / 14);
        content.style.marginTop = `${20 * (l2 + 1)}px`;

        box.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                const value = box.value;
                content.style.transform = "translateY(-10px)";
                content.style.opacity = 0;
                box.style.opacity = 0;
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                content.addEventListener("transitionend", () => {
                    window.style.animation = `cc_fn 0.55s forwards ${easing}`;
                    close(window, windows);
                    resolve(value);
                    setTimeout(() => {
                        if (document.body.contains(window)) document.body.removeChild(window);
                    }, 550);
                });
            }
        });
    });
}

// xz 函数。

async function xz(string, n, names, title, id) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            fail("不能输入 null 或 undefined！");
            return "在 Xz() 函数中，string 参数不能为 null 或 undefined。";
        }
        string = String(string);
        let s_replaced = string.replace(/\s+/g, "");
        if (title == null || title == undefined) title = "选择";
        if (id == null || id == undefined) id = "";
        if (n > names.length) {
            fail("所给予的选项数量不足！");
            return;
        }
        else {
            title = String(title);
            let t_replaced = title.replace(/\s+/g, "");
            if (t_replaced === "") title = "选择";
        }
        if (s_replaced === "") {
            warn("不能输入空字符串。");
            return "在 Xz() 函数中，string 参数不能为空。";
        }

        const window = document.createElement("div");
        window.className = "xz-window";
        window.id = id;
        const square = document.createElement("div");
        square.className = "xz-square";
        const icon = document.createElement("img");
        icon.alt = "";
        icon.className = "xz-icon";
        icon.style.opacity = 0;
        icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const txt = document.createElement("div");
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const content = document.createElement("div");
        content.className = "fn-content";
        content.style.opacity = 0;
        content.style.transition = `all 175ms ${easing}`;
        const confirm = document.createElement("button");
        confirm.className = "xz-confirm";
        confirm.innerHTML = "确定";
        confirm.style.opacity = 0;

        const array = Array.from(names);
        const xz_items = []; // 被选择的选项。

        create(window);
        document.body.appendChild(window);
        window.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        window.appendChild(content);
        window.appendChild(confirm);

        icon.src = "images/Sel.png";
        window.style.animation = `jr_fn 0.55s forwards ${easing}`;
        content.innerHTML = string;
        txt.innerHTML = title;

        visible(content, "Xz");

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
        
        confirm.onclick = () => {
            if (xz_items.length === 0) {
                warn("你还没有勾选！");
                return;
            } else {
                resolve(xz_items);
                content.style.opacity = 0;
                content.style.transform = "translateY(-10px)";
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                confirm.style.opacity = 0;
                content.addEventListener("transitionend", () => {
                    window.style.animation = `cc_fn 0.55s forwards ${easing}`;
                    close(window, windows)
                    setTimeout(() => {
                        if (document.body.contains(window)) document.body.removeChild(window);
                    }, 550);
                });
            }
        };

        for (let i = 0; i < array.length; i++) {
            const container = document.createElement("div");
            container.style.position = "relative";
            container.style.display = "flex";
            container.style.marginBottom = "10px";
            container.style.left = "0px";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "xz-checkbox";
            checkbox.id = `checkbox${i}`;
            
            const btn = document.createElement("button");
            array[i] = String(array[i]);
            btn.id = `btn${i}`;
            btn.className = "xz-btn";
            btn.innerHTML = array[i];

            btn.style.backgroundColor = `${color()}b0`;

            container.appendChild(checkbox);
            container.appendChild(btn);
            container.style.top = `${btn.offsetHeight + 25}px`;
            content.style.marginBottom = `25px`;

            window.addEventListener("animationend", () => {
                content.style.transform = "translateY(0)";
                content.style.opacity = 1;
                btn.style.opacity = 1;
                checkbox.style.opacity = 1;
                icon.style.opacity = 1;
                txt.style.opacity = 1;
                confirm.style.opacity = 1;
                window.style.maxHeight = window.getBoundingClientRect().height + "px";
            });

            checkbox.onchange = () => {
                if (checkbox.checked) {
                    if (xz_items.length >= n) {
                        warn(`勾选的选项数量已达上限。最多可勾选 ${n} 个。`);
                        checkbox.checked = false;
                        return;
                    }
                    xz_items.push(array[i]);
                } else {
                    const index = xz_items.indexOf(array[i]);
                    if (index > -1) {
                        xz_items.splice(index, 1);
                    }
                }
            };

            btn.onclick = () => {
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event('change'));
            };

            content.appendChild(container);
        }
    });
}

// synchr 函数。

async function synchr(string, title, id) {
    if (string == null || string == undefined) {
        fail("不能输入 null 或 undefined！");
        return "在 Synchr() 函数中，string 参数不能为 null 或 undefined。";
    }
    string = String(string);
    let s_replaced = string.replace(/\s+/g, "");
    if (title == null || title == undefined) title = "同步";
    if (id == null || id == undefined) id = "";
    else {
        title = String(title);
        let t_replaced = title.replace(/\s+/g, "");
        if (t_replaced === "") title = "同步";
    }
    if (s_replaced === "") {
        warn("不能输入空字符串。");
        return "在 Synchr() 函数中，string 参数不能为空。";
    }

    const window = document.createElement("div");
    window.className = "synchr-window";
    window.id = id;
    const square = document.createElement("div");
    square.className = "synchr-square";
    const icon = document.createElement("img");
    icon.alt = "";
    icon.className = "synchr-icon";
    icon.style.opacity = 0;
    icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const txt = document.createElement("div");
    txt.className = "fn-title";
    txt.style.opacity = 0;
    txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const content = document.createElement("div");
    content.className = "fn-content";
    content.style.opacity = 0;
    content.style.transition = `all 175ms ${easing}`;
    const bar = document.createElement("div");
    bar.className = "synchr-progressbar";

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    square.appendChild(icon);
    square.appendChild(txt);
    window.appendChild(content);
    window.appendChild(bar);

    icon.src = "images/Synchronization.png";
    window.style.animation = `jr_fn 0.55s forwards ${easing}`;
    content.innerHTML = string;
    txt.innerHTML = title;

    window.addEventListener("animationend", () => {
        content.style.transform = "translateY(0)";
        content.style.opacity = 1;
        icon.style.opacity = 1;
        txt.style.opacity = 1;
        window.style.maxHeight = window.getBoundingClientRect().height + "px";
    });

    const l2 = Math.ceil(title.length / 14);
    content.style.marginTop = `${20 * (l2 + 1)}px`;

    visible(content, "Synchr");
    
    setTimeout(() => {
        content.style.opacity = 0;
        content.style.transform = "translateY(-10px)";
        icon.style.opacity = 0;
        txt.style.opacity = 0;
        content.addEventListener("transitionend", () => {
            window.style.animation = `cc_fn 0.55s forwards ${easing}`;
            close(window, windows)
            setTimeout(() => {
                if (document.body.contains(window)) document.body.removeChild(window);
            }, 550);
        });
    }, smarttime(string));
}

// lj 函数。

async function lj(string, url, title, id) {
    if (string == null || string == undefined) {
        fail("不能输入 null 或 undefined！");
        return "在 Lj() 函数中，string 参数不能为 null 或 undefined。";
    }
    if (url == null || url == undefined) {
        warn("无法跳转至 null 或 undefined。");
        return "在 Lj() 函数中，url 参数不能为 null 或 undefined。";
    }
    string = String(string);
    url = String(url);
    let s_replaced = string.replace(/\s+/g, "");
    let u_replaced = url.replace(/\s+/g, "");
    if (title == null || title == undefined) title = "链接";
    if (id == null || id == undefined) id = "";
    else {
        title = String(title);
        let t_replaced = title.replace(/\s+/g, "");
        if (t_replaced === "") title = "链接";
    }
    if (s_replaced === "") {
        warn("不能输入空字符串。");
        return "在 Lj() 函数中，string 参数不能为空。";
    }
    if (u_replaced === "") {
        warn("无法跳转至空地址。");
        return "在 Lj() 函数中，url 参数不能为空。";
    }

    const window = document.createElement("div");
    window.className = "lj-window";
    window.id = id;
    const square = document.createElement("div");
    square.className = "lj-square";
    const icon = document.createElement("img");
    icon.alt = "";
    icon.className = "lj-icon";
    icon.style.opacity = 0;
    icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const txt = document.createElement("div");
    txt.className = "fn-title";
    txt.style.opacity = 0;
    txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const content = document.createElement("div");
    content.className = "fn-content";
    content.style.opacity = 0;
    content.style.transition = `all 175ms ${easing}`;
    const link = document.createElement("button");
    link.className = "lj-link";
    link.style.opacity = 0;
    link.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const ignore = document.createElement("button");
    ignore.className = "lj-ignore";
    ignore.style.opacity = 0;
    ignore.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";

    create(window);
    document.body.appendChild(window);
    window.appendChild(square);
    square.appendChild(icon);
    square.appendChild(txt);
    window.appendChild(content);
    window.appendChild(link);
    window.appendChild(ignore);

    visible(content, "Lj");

    icon.src = "images/Link.png";
    window.style.animation = `jr_fn 0.55s forwards ${easing}`;
    content.innerHTML = string;
    link.innerHTML = url;
    ignore.innerHTML = "忽略";
    txt.innerHTML = title;

    window.addEventListener("animationend", () => {
        content.style.transform = "translateY(0)";
        content.style.opacity = 1;
        link.style.opacity = 1;
        ignore.style.opacity = 1;
        icon.style.opacity = 1;
        txt.style.opacity = 1;
        window.style.maxHeight = window.getBoundingClientRect().height + "px";
    });

    const l2 = Math.ceil(title.length / 14);
    content.style.marginTop = `${20 * (l2 + 1)}px`;

    function guanbi() {
        content.style.opacity = 0;
        content.style.transform = "translateY(-10px)";
        link.style.opacity = 0;
        ignore.style.opacity = 0;
        icon.style.opacity = 0;
        txt.style.opacity = 0;
        content.addEventListener("transitionend", () => {
            window.style.animation = `cc_fn 0.55s forwards ${easing}`;
            close(window, windows)
            setTimeout(() => {
                if (document.body.contains(window)) document.body.removeChild(window);
            }, 550);
        });
    }

    link.onclick = () => {
        if (!open(url, "_blank", `width=${defwid}, height=${defhei}`)) {
            warn("弹出的窗口被阻止。");
        }
        guanbi();
    };
    ignore.onclick = () => {
        rz("已忽略该链接。");
        guanbi();
    };
}

// zd 函数。

async function zd(string, title, id) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            fail("不能输入 null 或 undefined！");
            return "在 Zd() 函数中，string 参数不能为 null 或 undefined。";
        }
        string = String(string);
        let s_replaced = string.replace(/\s+/g, "");
        if (title == null || title == undefined) title = "终端";
        if (id == null || id == undefined) id = "";
        else {
            title = String(title);
            let t_replaced = title.replace(/\s+/g, "");
            if (t_replaced === "") title = "终端";
        }
        if (s_replaced === "") {
            warn("不能输入空字符串。");
            return "在 Zd() 函数中，string 参数不能为空。";
        }

        const window = document.createElement("div");
        window.className = "zd-window";
        window.id = id;
        const square = document.createElement("div");
        square.className = "zd-square";
        const icon = document.createElement("img");
        icon.alt = "";
        icon.className = "zd-icon";
        icon.style.opacity = 0;
        icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const txt = document.createElement("div");
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const content = document.createElement("div");
        content.className = "fn-content";
        content.style.opacity = 0;
        content.style.transition = `all 175ms ${easing}`;
        const box = document.createElement("textarea");
        box.className = "zd-box";
        box.style.opacity = 0;
        box.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        box.style.resize = "none";
        box.focus();

        visible(content, "Zd");

        box.addEventListener("keypress", async (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
                const value = box.value.trim();
                if (value === "") {
                    warn("不能输入空字符串。");
                    return;
                }
                try {
                    let k = await eval(value);
                    if (k !== undefined && k !== null) {
                        rz(k);
                        resolve(k);
                    } else if (k === undefined) {
                        rz("返回值为 undefined。");
                        resolve();
                    } else if (k === null) {
                        rz("返回值为 null。");
                        resolve();
                    }
                } catch (error) {
                    switch (error.name) {
                        case "ReferenceError":
                            let vof = error.message.split(" is not defined");
                            fail(`引用了未定义的变量或函数 ‘${vof[0]}’。`);
                            break;
                        case "SyntaxError":
                            if (error.message.includes("Unexpected identifier")) {
                                let err = "‘" + (error.message.split("Unexpected identifier '")[1].replace("'", "’"));
                                fail(`${err} 不是有效的标识符（Identifier）。`);
                            } else if (error.message.includes("Unexpected end of input")) {
                                fail("缺少必要的符号。");
                            } else if (error.message.includes("Unexpected token")) {
                                let token = "‘" + (error.message.split("Unexpected token '")[1].replace("'", "’"));
                                fail(`意外的符号 ${token}。`);
                            } else if (error.message.includes("Invalid or unexpected token")) {
                                if (value.includes("\\")) {
                                    fail("无效的转义字符 “\\”。");
                                } else {
                                    fail("无效标识符。");
                                }
                            } else if (error.message.includes("Missing initializer in const declaration")) {
                                fail("const 变量没有设置初始化值。");
                            } else if (error.message.includes("Invalid left-hand side in assignment")) {
                                fail("赋值操作中左侧表达式无效。");
                            } else if (error.message.includes("has already been declared") && error.message.includes("Identifier")) {
                                let err = error.message.replace("Identifier '", "").replace("' has already been declared", "").replace("'", "’");
                                fail(`标识符 ‘${err}’ 已经声明过。`);
                            } else {
                                fail(`语法错误：${error.message}。`);
                            }
                            break;
                        case "TypeError":
                            if (error.message.includes("is not a function")) {
                                let err = error.message.replace(" is not a function", "").replace("'", "’");
                                fail(`‘${err}’ 不是函数。`);
                            } else if (error.message.includes("Cannot read properties")) {
                                let err1 = error.message.split("Cannot read properties of ")[1].replace(" (reading '", "").replace("')", "");
                                let err2 = (err1.includes("null") ? "null" : "undefined");
                                err1 = err1.split(err2)[1];
                                fail(`‘${err1}’ 不能用于含 ‘${err2}’ 的对象上。`);
                            }
                            else {
                                fail(`类型错误：${error.message}。`);
                            }
                            break;
                        case "RangeError":
                            fail(`数值超出范围：${error.message}。`);
                            break;
                        default:
                            fail(error.message);
                            break;
                    }
                    resolve();
                }
                content.style.opacity = 0;
                content.style.transform = "translateY(-10px)";
                box.style.opacity = 0;
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                content.addEventListener("transitionend", () => {
                    window.style.animation = `cc_fn 0.55s forwards ${easing}`;
                    close(window, windows);
                    setTimeout(() => {
                        if (document.body.contains(window)) document.body.removeChild(window);
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

        icon.src = "images/Com.png";
        window.style.animation = `jr_fn 0.55s forwards ${easing}`;
        content.innerHTML = string;
        txt.innerHTML = title;

        window.addEventListener("animationend", () => {
            content.style.transform = "translateY(0)";
            content.style.opacity = 1;
            box.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            window.style.maxHeight = window.getBoundingClientRect().height + "px";
        });

        const l2 = Math.ceil(title.length / 14);
        content.style.marginTop = `${20 * (l2 + 1)}px`;
    });
}

// timer 函数。

async function timer(string, time, title, id) {
    return new Promise((resolve) => {
        let passed_time = 0;
        let ls_finish = false;
        if (string == null || string == undefined) {
            fail("不能输入 null 或 undefined！");
            return "在 Timer() 函数中，string 参数不能为 null 或 undefined。";
        }
        if (time == null || time == undefined) {
            fail("null 或 undefined 不是有效的数字。");
            return "在 Timer() 函数中，time 参数不能为 null 或 undefined。";
        }
        string = String(string);
        time = Number(time);
        let s_replaced = string.replace(/\s+/g, "");
        if (title == null || title == undefined) title = "计时";
        if (id == null || id == undefined) id = "";
        if (isNaN(time)) {
            fail("time 参数必须为可识别的数字或纯数字字符串。");
            return "在 Timer() 函数中，time 参数必须为可识别的数字或纯数字字符串。";
        } else if (time < 1250) {
            warn("time 的值过小，无法正常计时。");
            return "在 Timer() 函数中，time 的值必须大于等于 1250。";
        } else if (time > 3.15576e10 * 1.1568) {
            warn("time 的值过大，无法正常计时。");
            return "在 Timer() 函数中，time 的值必须小于等于 6.048e10。";
        }
        else {
            title = String(title);
            let t_replaced = title.replace(/\s+/g, "");
            if (t_replaced === "") title = "计时";
        }
        if (s_replaced === "") string = "";

        const window = document.createElement("div");
        window.className = "timer-window";
        window.id = id;
        const square = document.createElement("div");
        square.className = "timer-square";
        const icon = document.createElement("img");
        icon.alt = "";
        icon.src = "images/Timer.png";
        icon.style.opacity = 0;
        icon.style.transistion = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const txt = document.createElement("div");
        txt.className = "fn-title";
        txt.style.color = "black";
        txt.style.opacity = 0;
        txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const content = document.createElement("div");
        content.className = "fn-content";
        content.style.color = "black";
        content.style.opacity = 0;
        content.style.transition = `all 175ms ${easing}`;
        const bar = document.createElement("div");
        bar.className = "timer-progressbar";
        const timerdesc = document.createElement("div");
        timerdesc.className = "fn-timerdesc";
        timerdesc.color = "#000000";
        timerdesc.style.transition = `all 175ms ${easing}`;

        create(window);
        document.body.appendChild(window);
        window.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        window.appendChild(content);
        window.appendChild(bar);
        window.appendChild(timerdesc);

        window.style.animation = `jr_fn 0.55s forwards ${easing}`;
        txt.innerHTML = title;

        let i = setInterval(() => {
            passed_time += timer_speed * 10;
            content.innerHTML = string;
            if (timer_speed > 1) {
                content.style.color = "#ff0000";
            } else if (timer_speed < 1 && timer_speed > 0) {
                content.style.color = "#0000ff";
            } else if (timer_speed === 0) {
                content.style.color = "#d00000";
            } else if (timer_speed > -1 && timer_speed < 0) {
                content.style.color = "#d0d000";
            } else if (timer_speed < -1) {
                content.style.color = "#d0d0d0";
            } else {
                content.style.color = "#000000";
            }
        }, 10);

        window.addEventListener("animationend", () => {
            content.style.transform = "translateY(0)";
            content.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            timerdesc.style.opacity = 1;
            timerdesc.style.transform = "translateX(0)";
        });

        visible(content, "Timer");

        const l2 = Math.ceil(title.length / 14);
        content.style.marginTop = `${20 * (l2 + 1)}px`;
        
        let pro = 0;
        const interval = setInterval(() => {
            let timer_backwards = timer_speed < 0;
            pro += timer_speed * 10 / (time / 100);
            bar.style.width = `${pro}%`;
            timerdesc.innerHTML = `${timer_speed === 0 ? "停滞" : String(timer_speed) + " 倍速"} | ${passed_time > 0 ? fhsj(passed_time) : 0} / ${fhsj(time)} | ${pro > 0 ? pro.toFixed(2) : 0}%`;
            if (timer_speed > 1) {
                bar.style.backgroundColor = "#ff000099";
                timerdesc.style.color = "#ff0000";
            } else if (timer_speed < 1 && timer_speed > 0) {
                bar.style.backgroundColor = "#0000ff99";
                timerdesc.style.color = "#0000ff";
            } else if (timer_speed === 0) {
                bar.style.backgroundColor = "#d0000099";
                timerdesc.style.color = "#d00000";
            } else if (timer_speed > -1 && timer_speed < 0) {
                bar.style.backgroundColor = "#d0d00099";
                timerdesc.style.color = "#d0d000";
            } else if (timer_speed < -1) {
                bar.style.backgroundColor = "#d0d0d099";
                timerdesc.style.color = "#d0d0d0";
            } else {
                bar.style.backgroundColor = "#00000099";
                timerdesc.style.color = "#000000";
            }
            if (pro >= 100) {
                clearInterval(interval);
                ls_finish = true;
            } else if (timer_backwards && passed_time <= 0) {
                clearInterval(interval);
                ls_finish = true;
            }
        }, 10);
        setInterval(() => {
            if (ls_finish) {
                window.style.maxHeight = window.getBoundingClientRect().height + "px";
                content.style.opacity = 0;
                content.style.transform = "translateY(-10px)";
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                timerdesc.style.opacity = 0;
                timerdesc.style.transform = "translateX(25px)";
                resolve(true);
                content.addEventListener("transitionend", () => {
                    window.style.animation = `cc_fn 0.55s forwards ${easing}`;
                    close(window, windows);
                    setTimeout(() => {
                        if (document.body.contains(window)) document.body.removeChild(window);
                    }, 550);
                });
            }
        }, 25);
    });
}

// wz 函数。

async function wz(string, qj_title) {
    return new Promise((resolve) => {
        let clicked = false;
        if (string == null || string == undefined) {
            fail("不能输入 null 或 undefined！");
            resolve(39);
            return;
        }
        if (qj_title == null || qj_title == undefined || qj_title.replace(/\s+/g, "") === "") qj_title = "信息";

        const window = document.createElement("div");
        window.className = "wz-window";
        const square = document.createElement("div");
        square.className = "wz-square";
        const icon = document.createElement("img");
        icon.alt = "";
        icon.src = "images/Inf.png";
        icon.style.opacity = 0;
        icon.style.transistion = "all 150ms cubic-bezier(0.33, 1, 0.68, 1)";
        const title = document.createElement("div");
        title.className = "fn-title";
        title.innerHTML = qj_title;
        title.style.opacity = 0;
        title.style.transition = "all 150ms cubic-bezier(0.33, 1, 0.68, 1)";
        const txt = document.createElement("pre");
        txt.className = "wz-content";
        txt.innerHTML = string;
        const btn = document.createElement("img");
        btn.alt = "下一步";
        btn.className = "wz-btn";
        btn.src = "images/Next.png";

        document.body.appendChild(window);
        window.appendChild(square);
        square.appendChild(icon);
        square.appendChild(title);
        window.appendChild(txt);
        window.appendChild(btn);
        window.appendChild(btn);
        wzwin.push(window);

        window.style.animation = `jr_wz 0.5s forwards ${easing}`;
        setTimeout(() => {
            icon.style.opacity = 1;
            title.style.opacity = 1;
            title.style.maxWidth = "calc(50vw - 100px)";
            txt.style.animation = `jr_txt forwards 0.3s ${easing}`;
            btn.style.animation = `jr_btn forwards 0.3s ${easing}`;
        }, 250);

        btn.onclick = () => {
            if (clicked) {
                warn("请勿重复点击。");
                return "重复点击可能会导致程序运行异常。";
            }
            txt.style.animation = `cc_txt 0.3s forwards ${easing}`;
            btn.style.animation = `cc_btn 0.3s forwards ${easing}`;
            icon.style.opacity = 0;
            title.style.opacity = 0;
            title.style.maxWidth = "30ch";
            setTimeout(() => {
                window.style.animation = `cc_wz 0.5s forwards ${easing}`;
            }, 150);
            clicked = true;
            resolve("已确认。");
            wzwin.pop();
            window.addEventListener("animationend", (i) => {
                if (i.animationName === "cc_wz") {
                    if (document.body.contains(window)) document.body.removeChild(window);
                }
            });
        };
    });
}