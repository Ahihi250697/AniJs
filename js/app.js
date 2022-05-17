const AniJs = (function () {
    const Window_height = $(window).innerHeight();
    const Ani_items = $(".ani");

    let _defaults = {
        delay: 150,
        delayStart: 1000,
    };

    // console.log(_defaults);

    // ani wave
    const InitWave = function () {
        const _ = $(".wave");
        if (_.length < 1) return false;

        const CreateSpan = function (txt) {
            let _return = "",
                _txt = txt.split("");

            for (let item of _txt) {
                item !== " "
                    ? (_return += `<span>${item}</span>`)
                    : (_return += " ");
            }

            return _return;
        };

        for (let item of _) {
            let _item = $(item).html().trim().replace(/\s\s+/g, ""),
                _itemHasBr = _item.split("<br>"),
                _html = "";

            let _itemLength = _itemHasBr.length;
            if (_itemLength !== 1) {
                for (let _i = 0; _i < _itemLength; _i++) {
                    _html += CreateSpan(_itemHasBr[_i]);

                    if (_i !== _itemLength - 1) {
                        _html += "<br>";
                    }
                }
            } else {
                _html = CreateSpan(_item);
            }

            $(item).html(_html);
        }
    };

    // ani type
    const ImgInit = () => {
        const _ = $(".img_slide");
        if (_.length < 1) return false;

        $.each(_, function (a, b) {
            let _b = $(b),
                _bchildren = _b.children();
            if (_bchildren.length === 1) {
                _bchildren.addClass("img__content");
            } else {
                _b.html(`<div class="img__content">${_b.html()}</div>`);
            }
        });
    };

    const LinebarInit = function () {
        const _ = $(".linebar");
        if (_.length < 1) return false;

        $.each(_, function (a, b) {
            const _b = $(b);
            let _html =
                '<span class="linebar__inside">' + _b.text().trim() + "</span>";
            _.html(_html);
        });
    };

    // animation
    const Animation = function () {
        let _set_time = 0, // time delay each other
            _page_offset = window.pageYOffset, // scroll top page
            _screen_bottom = _page_offset + Window_height; // scroll end page

        $.each(Ani_items, function (ind, val) {
            let _ = $(val);
            if (!_.hasClass("ani-pass")) {
                let _top = _.offset().top;

                if (_top >= _page_offset && _top <= _screen_bottom) {
                    // add class to check it is ready to show
                    _.addClass("ani-pass");
                    // set time out to add class animated
                    let _time = _set_time;
                    if (_.attr("data-ani-delay")) {
                        _time = +_.attr("data-ani-delay");
                    } else {
                        _set_time += _defaults.delay;
                    }

                    let _set = setTimeout(function () {
                        _.addClass("animated");
                    }, _time);
                } else if (_.offset().top < _page_offset) {
                    // add class if it is on top screen position
                    _.addClass("ani-pass animated");
                }
            }
        });
    };

    const Init = function (opts) {
        _defaults = $.extend({}, _defaults, opts);
        //create wave
        InitWave();
        //linebar
        LinebarInit();
        //create sparkle
        ImgInit();

        // console.log(_defaults, opts);
        $(window).on("load", function () {
            setTimeout(function () {
                Animation();
            }, _defaults.delayStart);
        });

        $(window).on("scroll", function () {
            Animation();
        });
    };

    return {
        init: function (opts) {
            Init(opts);
        },
    };
})();
