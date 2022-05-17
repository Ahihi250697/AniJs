const AniJs = (function () {
    const windowHeight = $(window).innerHeight(),
        aniQuery = $(".ani"),
        pageHeight = $("html").innerHeight();

    let _defaults = {
        delay: 150,
        delayStart: 1000,
    };

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
    const InitImg = () => {
        const _ = $(".img_slide");
        if (_.length < 1) return false;

        for (let item of _) {
            let _item = $(item),
                _children = _item.children();
            if (_children.length === 1) {
                _children.addClass("img__content");
            } else {
                _item.html(`<div class="img__content">${_item.html()}</div>`);
            }
        }
    };

    const InitLinebar = function () {
        const _ = $(".linebar");
        if (_.length < 1) return false;

        for (let item of _) {
            let _item = $(item),
                _itemText = _item.text().trim();
            _.html(`<span class="linebar__inside">${_itemText}</span>`);
        }
    };

    // animation
    const Animation = function () {
        let // time delay each other
            _time = 0,
            // current offset
            _rangeTop = window.pageYOffset,
            // range show
            _rangeShowUp = _rangeTop + windowHeight * 0.75,
            // bottom
            _rangeBotton = _rangeTop + windowHeight;

        if (_rangeBotton >= pageHeight - 50) {
            _rangeShowup = _rangeBotton;
        }

        for (let item of aniQuery) {
            const _ = $(item);

            if (!_.hasClass("ani-pass")) {
                let _top = _.offset().top;

                if (_top >= _rangeTop && _top <= _rangeShowUp) {
                    // add class to check if it will be show
                    _.addClass("ani-pass");
                    // set time out to add class 'animated'
                    let _timeDelay = _time;
                    if (_.attr("data-ani-delay")) {
                        _timeDelay = +_.attr("data-ani-delay");
                    } else {
                        _time += _defaults.delay;
                    }

                    let _set = setTimeout(function () {
                        _.addClass("animated");
                    }, _timeDelay);
                } else if (_.offset().top < _rangeTop) {
                    // add class if it is on top screen
                    _.addClass("ani-pass animated");
                }
            }
        }
    };

    const Init = function (opts) {
        _defaults = $.extend({}, _defaults, opts);
        console.log(_defaults);
        //create wave
        InitWave();
        //linebar
        InitLinebar();
        //create sparkle
        InitImg();

        // console.log(_defaults, opts);
        $(window).on("load", function () {
            setTimeout(function () {
                Animation();
            }, _defaults.delayStart);
        });

        $(window).on("scroll", function () {
            Animation();
            console.log("first");
        });
    };

    return {
        init: function (opts) {
            Init(opts);
        },
    };
})();
