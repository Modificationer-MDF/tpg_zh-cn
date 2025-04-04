let mode = "Preset";
let theme = "Present";
let easing = "cubic-bezier(0.83, 0, 0.17, 1)";
let deftime = 3000;
let defwid = 1024;
let defhei = 768;

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
        width(".top");
        fn6();
    }, 120);
    document.addEventListener("keydown", (event) => {
        if (event.altKey) noti("将鼠标移动至左上角以打开选项；移动到右上角以查看杂项信息。")
    });
});