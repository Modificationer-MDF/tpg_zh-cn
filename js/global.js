let mode = "Preset";
let titleset = "Default";
let rightset = "跟随该网站的设置";
let easing = "cubic-bezier(0.17, 0.9, 0.4, 0.99)";
let deftime = "Smart";
let defwid = 1024;
let defhei = 768;
let timer_speed = 1;
let f1 = false; // “预设” 开关。
let f2 = false; // “演示” 开关。
let f3 = false; // “版本列表” 开关。
let alphabets = `AÀÁÂÃÄÅÆĀĂĄǍǞǠǺȀȂȦȺḀẠẢẤẦẨẪẬẮẰẲẴẶB
CÇĆĈĊČḈḊḌḎḐḒDÐĎĐḌḎḐḒEÈÉÊËĒĔĖĘĚȄȆȨȨḔḖḘḚḜẸẺẼẾỀỂỄỆF
ḞGĜĞĠĢǦǤǴḠḠHĤĦḢḤḦḨḪIÌÍÎÏĨĪĬĮİȈȊḬḮỈỊJĴĴKĶǨḰḲḴLĹĻĽḶḸḺḼMḾṀṂN
ÑŃŅŇǸȠṆṈṊOÒÓÔÕÖØŌŎŐƠǑǪǬȌȎȪȬȮȰṌṎṐṒỌỎỐỒỔỖỘỚ
ỜỞỠỢPṔṖQȊRŔŖŘȐȒṘṚṜṞSŚŜŞŠȘṠṢṤṦṨTŢŤȚȚṪṬṮṰUÙÚÛÜŨŪŬŮŰ
ŲȔȖɄṲṴṶṸṺỤỦỨỪỬỮỰVṼṾWŴẀẂẄẆẈXẊẌYÝŶŸȲẎẎỲỴỶỸZŹŻŽȤẐ
ẒẔaàáâãäåæāăąǎǟǡǻȁȃȧḁạảấầẩẫậắằẳẵặbḃḅḇcçćĉċčḉdðďđḍḏḑḓeè
éêëēĕėęěȅȇȩḕḗḙḛḝẹẻẽếềểễệfḟgĝğġģǧǵḡḡhĥħḣḥḧḩḫẖiìíîïĩīĭįȉȋḭḯỉịjĵǰk
ķĸǩḱḳḵlĺļľḷḹḻḽmḿṁṃnñńņňǹȵṅṇṉṋoòóôõöøōŏőơǒǫǭȍȏȫȭȯȱṍṏṑṓọ
ỏốồổỗộớờởỡợpṕṗqȓrŕŗřȑȓṙṛṝṟsśŝşšșṡṣṥṧṩẜẝtţťțẗṫṭṯṱẗuùúûüũūŭůűųȕȗ
ưṳṵṷṹṻụủứừửữựvṽṿẘwŵẁẃẅẇẉẘxẋẍẋyýÿŷȳẏẏỳỵỷỹzźżžȥẑẓẕßẞÐÞð
þĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĴĵĶķĸĹ
ĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰ
űŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭ
ƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜ
ǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑ
ȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇ
ɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽ
ɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵ
ʶʷʸʹʺʻʼʽʾʿˀˁ˂˃˄˅ˆˇˈˉˊˋˌˍˎˏːˑ˒˓˔˕˖˗˘˙˚˛˜˝˞˟ˠˡˢˣˤ˥˦˧˧˨˩˪˫ˬ˭ˮ˯˰˱˲˳˴˵˶˷˸˹˺˻
˼˽˾˿ΐάέήίΰαβγδεζηθικλμνξοπρστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠ
ϡϢϣϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵϷϸϹϺϻϼϽϾϿЀЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕ
ЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхц
чшщъыьэюяѐёђѓєѕіїјљњћќѝўџѠѡѢѣѤѥѦѧѨѩѪѫѬѭѮѯѰѱѲѳѴѵѶѷѸѹѺѻѼѽѾ
ѿҀҁҊҋҌҍҎҏҐґҒғҔҕҖҗҘҙҚқҜҝҞҟҠҡҢңҤҥҦҧҨҩҪҫҬҭҮүҰұҲҳҴҵҶҷҸҹҺһҼҽҾ
ҿӀӁӂӃӄӅӆӇӈӉӊӋӌӍӎӏӐӑӒӓӔӕӖӗӘәӚӛӜӝӞӟӠӡӢӣӤӥӦӧӨөӪӫӬӭӮӯӰӱӲӳӴӵӶ
ӷӸӹӺӻӼӽӾӿԀԁԂԃԄԅԆԇԈԉԊԋԌԍԎԏԐԑԒԓԔԕԖԗԘԙԚԛԜԝԞԟԠԡԢԣԤԥԦԧԨԩԪԫԬԭԮ
ԯԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔՕՖաբգդեզէըթժիլխ
ծկհձղճմյնշոչպջռսվտրցւփքօֆև`;
let marks = `\n\t\r\\b\\f\\v\\0!@#$%^&*()_+-=[]{}|;:'"\\,./<>?±€£¥¢¤©®™•
†‡¬¦~¯´¨ˆ˜ªº¡¿×÷≈≠≤≥≡√∞∫∂∆∏∑‰‱Ω℮⇧⇨←↑→↓↔↕↖↗↘↙♠♣♥♦★
☆♀♂♩♪♫♭♯✓✔✕✖✗✘☠☢☣☤☥☦☧☨☩☪☫☬☭①②③④⑤⑥⑦⑧⑨⑩⑪⑫
⑬⑭⑮⑯⑰⑱⑲⑳ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ１２
３４５６７８９０。＂＃＄％＆＇（）＊＋，－／：；＜＝＞＠［＼］＾＿｀｛
｜｝～“”‘’«»‹›《》「」『』【】〘〙〚〛〝〞〟–—…‧¤¦§¨©ª«¬­®¯°²³´µ¶¸¹º»¼½¾¿
￥￦￡₳₲₪₮₰₱₲₵₹₺₽₿！？“”《》、；‘’【】·~，、：；“”‘’《》（）…￥—` + "`";
let control_block = false; // 锁定 “选项”。
let inf_block = false; // 锁定 “未读信息”。
let control_moved = false; // “选项”。
let inf_moved = false; // “未读信息”。
let isdimmed = false;
let windows = []; // 十函数数组。
let rzwin = []; // rz() 数组。
let wzwin = []; // wz() 数组。
let noti_unv = [];
let cg_unv = [];
let fail_unv = [];
let warn_unv = [];
let synchr_unv = [];
let timer_unv = [];
let ls_notiunv = 0;
let ls_cgunv = 0;
let ls_failunv = 0;
let ls_warnunv = 0;
let ls_synchrunv = 0;
let unv_warned = false; // 是否警告过用户不要修改 unv 数组？
let during_fn7 = false; // fn7() 是否在运行？

document.addEventListener("DOMContentLoaded", function () {
    var start = performance.now();
    var font1 = new FontFace("mhmts", 'url("fonts/Moharmiteksai.woff2")');
    var font2 = new FontFace("lan", 'url("fonts/Lanubu Light.woff2")');
    font1.load().then(function (f) {
        var end = performance.now();
        document.fonts.add(f);
        cg(`成功加载字体：Moharmiteksai。用时 ${((end - start) / 1000).toFixed(2)} 秒。`);
    }).catch(function (error) {
        var by_font1 = new FontFace("mhmts", 'url("fonts/Moharmiteksai.otf")');
        by_font1.load().then(function (f) {
            var end = performance.now();
            document.fonts.add(f);
            cg(`成功加载字体：Moharmiteksai。用时 ${((end - start) / 1000).toFixed(2)} 秒。`);
        }).catch(function (error) {
            switch (error.name) {
                case "NetworkError":
                    fail("网络或系统错误。");
                    break;
                case "FontLoadError":
                    fail("字体加载失败。");
                    break;
                default:
                    fail(`未知错误。（${error}）`);
                    break;
            }
        });
    });
    font2.load().then(function (f) {
        var end = performance.now();
        document.fonts.add(f);
        cg(`成功加载字体：Lanubu Light。用时 ${((end - start) / 1000).toFixed(2)} 秒。`);
    }).catch(function (error) {
        var by_font2 = new FontFace("lan", 'url("fonts/Lanubu Light.ttf")');
        by_font2.load().then(function (f) {
            var end = performance.now();
            document.fonts.add(f);
            cg(`成功加载字体：Lanubu Light。用时 ${((end - start) / 1000).toFixed(2)} 秒。`);
        }).catch(function (error) {
            switch (error.name) {
                case "NetworkError":
                    fail("网络或系统错误。");
                    break;
                case "FontLoadError":
                    fail("字体加载失败。");
                    break;
                default:
                    fail(`未知错误。（${error}）`);
                    break;
            }
        });
    });

    const mscomb = document.getElementById("ms_comb");
    const tpginf = document.getElementById("tpg_inf");

    const ctrl = document.querySelector(".control-pad");
    ctrl.style.animationName = "cc_ctrl";
    const inf = document.querySelector(".information-table");
    inf.style.animationName = "cc_inf";
    const main = document.getElementById("main");
    const menu = document.querySelector(".rightclick-menu");

    setInterval(() => {
        let arr = easing.match(/\d+(\.\d+)?/g);
        arr = (arr === null || arr === undefined ? [] : arr.map(Number));
        let iseasing = (easing.startsWith("cubic-bezier(") && easing.endsWith(")")
            && (easing.match(/,/g) || []).length === 3 && arr.length === 4
            && (arr[0] >= 0 && arr[0] <= 1 && arr[2] >= 0 && arr[2] <= 1))
            || (easing === "ease" || easing === "linear" || easing === "ease-in"
            || easing === "ease-out" || easing === "ease-in-out" || easing === "step-start" || easing === "step-end"
            || easing === "step" || easing === "");
        let isdefhei = (defhei > 300 && defhei % 1 === 0);
        let isdefwid = (defwid > 300 && defwid % 1 === 0);
        let isdeftime = (deftime >= 1250 || deftime === "Smart");
        let istimerspeed = !isNaN(timer_speed);

        if (!iseasing) {
            easing = "cubic-bezier(0.17, 0.9, 0.4, 0.99)";
            fail("easing 的值不合法，已重置为 cubic-bezier(0.17, 0.9, 0.4, 0.99)。");
        } if (!isdefhei) {
            defhei = 768;
            fail("defhei 的值不合法，已重置为 768。");
        } if (!isdefwid) {
            defwid = 1024;
            fail("defwid 的值不合法，已重置为 1024。");
        } if (!isdeftime) {
            deftime = "Smart";
            fail("deftime 的值不合法，已重置为 Smart。");
        } if (!istimerspeed) {
            timer_speed = 1;
            fail("timer_speed 的值不合法，已重置为 1。");
        }

        width(".top");
        inf_cont();

        if (windows.length > 0 || rzwin.length > 0 || wzwin.length > 0) {
            if (isdimmed === false) ld(main, "75%");
        } else {
            ld(main, "100%");
            isdimmed = false;
        }

        if (rightset === "跟随该网站的设置") {
            document.addEventListener("contextmenu", function (e) {
                e.preventDefault();
                menu.style.visibility = "visible";
                menu.style.transition = `opacity 0.3s, top 0.3s, left 0.3s ${easing}`;
                menu.style.opacity = "1";
                menu.style.left = `${e.pageX}px`;
                menu.style.top = `${e.pageY}px`;
            }, { once: true });

            document.addEventListener("click", function (e) {
                const menu = document.querySelector(".rightclick-menu");
                menu.style.opacity = "0";
                menu.addEventListener("transitionend", () => {
                    menu.style.visibility = "hidden";
                }, { once: true });
            }, { once: true });
        }
        mscomb.textContent = `末纱组合 | 2024.2/6 ~ ${xzsj().split(" ")[0]}`;
        tpginf.textContent = `The Play Games 网页 | 2024.10/20 ~ ${xzsj().split(" ")[0]}`;
    }, 500);
    document.addEventListener("keydown", (event) => {
        if (event.altKey) noti("将鼠标移动至左上角以打开选项；移动到右上角以查看未读信息。")
    });
});