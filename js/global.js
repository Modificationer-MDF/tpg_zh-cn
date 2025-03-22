let mode = "Demo";
let theme = "Aero";
let easing = "cubic-bezier(0.16, 1, 0.3, 1)";
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
        cg(`成功加载字体：Basic Modification Regular。用时 ${((end - start) / 1000).toFixed(3)} 秒。`, deftime);
    }).catch(function (error) {
        fail(`字体加载失败。（${error}）`, deftime);
    });
    font2.load().then(function (f) {
        var end = performance.now();
        document.fonts.add(f);
        cg(`成功加载字体：Lanubu Light。用时 ${((end - start) / 1000).toFixed(3)} 秒。`, deftime);
    }).catch(function (error) {
        fail(`字体加载失败。（${error}）`, deftime);
    });
    font3.load().then(function (f) {
        var end = performance.now();
        document.fonts.add(f);
        cg(`成功加载字体：Arno Pro Regular。用时 ${((end - start) / 1000).toFixed(3)} 秒。`, deftime);
    }).catch(function (error) {
        fail(`字体加载失败。（${error}）`, deftime);
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
        if (event.altKey) info("将鼠标移动至左上角以打开选项。")
    });
});