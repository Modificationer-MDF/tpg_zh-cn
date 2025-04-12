let mode = "Preset";
let titleset = "Default";
let easing = "cubic-bezier(0.83, 0, 0.17, 1)";
let deftime = 3000;
let defwid = 1024;
let defhei = 768;
let f1 = false;
let f2 = false;

document.addEventListener("DOMContentLoaded", function () {
    var start = performance.now();
    var font1 = new FontFace("basic", 'url("fonts/Basic Modification Regular.woff2")');
    var font2 = new FontFace("lan", 'url("fonts/Lanubu Light.woff2")');
    var font3 = new FontFace("arno", 'url("fonts/Arno Pro Regular.woff2")');
    font1.load().then(function (f) {
        var end = performance.now();
        document.fonts.add(f);
        cg(`成功加载字体：Basic Modification Regular。用时 ${((end - start) / 1000).toFixed(3)} 秒。`);
    }).catch(function (error) {
        switch (error.name) {
            case "NetworkError":
                fail("网络错误。");
                break;
            case "FontLoadError":
                fail("字体加载失败。");
                break;
            default:
                fail(`未知错误。（${error}）`);
                break;
        }
    });
    font2.load().then(function (f) {
        var end = performance.now();
        document.fonts.add(f);
        cg(`成功加载字体：Lanubu Light。用时 ${((end - start) / 1000).toFixed(3)} 秒。`);
    }).catch(function (error) {
        switch (error.name) {
            case "NetworkError":
                fail("网络错误。");
                break;
            case "FontLoadError":
                fail("字体加载失败。");
                break;
            default:
                fail(`未知错误。（${error}）`);
                break;
        }
    });
    font3.load().then(function (f) {
        var end = performance.now();
        document.fonts.add(f);
        cg(`成功加载字体：Arno Pro Regular。用时 ${((end - start) / 1000).toFixed(3)} 秒。`);
    }).catch(function (error) {
        switch (error.name) {
            case "NetworkError":
                fail("网络错误。");
                break;
            case "FontLoadError":
                fail("字体加载失败。");
                break;
            default:
                fail(`未知错误。（${error}）`);
                break;
        }
    });

    const ctrl = document.querySelector(".control-pad");
    ctrl.style.animationName = "-ctrl";
    function width(name) {
        const el = document.querySelector(name);
        el.style.width = window.innerWidth + "px";
    }
    setInterval(() => {
        let arr1 = easing.match(/\d+(\.\d+)?/g);
        arr1 = (arr1 === null || arr1 === undefined ? [] : arr1.map(Number));
        let iseasing = (easing.startsWith("cubic-bezier(") && easing.endsWith(")")
            && (easing.match(/,/g) || []).length === 3 && arr1.length === 4
            && (arr1[0] >= 0 && arr1[0] <= 1 && arr1[1] >= 0 && arr1[2] >= 0 && arr1[2] <= 1 && arr1[3] >= 0))
            || (easing === "ease" || easing === "linear" || easing === "ease-in"
            || easing === "ease-out" || easing === "ease-in-out" || easing === "step-start" || easing === "step-end"
            || easing === "step" || easing === "");
        let isdefhei = (defhei > 300 && defhei % 1 === 0);
        let isdefwid = (defwid > 300 && defwid % 1 === 0);
        let isdeftime = (deftime > 1000);

        if (!iseasing) {
            easing = "cubic-bezier(0.83, 0, 0.17, 1)";
            fail("easing 的值不合法，已重置为 cubic-bezier(0.83, 0, 0.17, 1)。");
        } if (!isdefhei) {
            defhei = 768;
            fail("defhei 的值不合法，已重置为 768。");
        } if (!isdefwid) {
            defwid = 1024;
            fail("defwid 的值不合法，已重置为 1024。");
        } if (!isdeftime) {
            deftime = 3000;
            fail("deftime 的值不合法，已重置为 3000。");
        }
        width(".top");
        fn6();
    }, 250);
    document.addEventListener("keydown", (event) => {
        if (event.altKey) noti("将鼠标移动至左上角以打开选项；移动到右上角以查看杂项信息。")
    });
});