(function ($) {
    var nixie =
            '<div class="nixie">' +
                '<div class="nixie__wrapper">' +
                    '<div class="nixie__value"></div>' +
                    '<div class="nixie__mesh"></div>' +
                '</div>' +
            '</div>',
        initDataFlag = 'is-nixie-inited',
        modPowerOff = 'nixie_power_off';

    /**
     * Create pretty nice nixie tube
     * @params {Object} [options]
     *  @property {String} [value]
     * @returns {jQuery}
     */
    $.fn.nixie = function (options) {
        var opts = $.extend({}, $.fn.nixie.defaults, options),
            $nixie = $(nixie);

        if (this.length) {
            this.each(function () {
                var $this = $(this);

                if ( ! $this.data(initDataFlag)) {
                    $this.replaceWith($nixie);

                    $nixie.data(initDataFlag, true);

                    $this = $nixie;
                }

                $.fn.nixie.set.call($this, opts);
            });
        } else {
            return $.fn.nixie.set.call($nixie, opts);
        }

        return this;
    };

    $.fn.nixie.set = function (opts) {
        if (typeof opts.value === 'string') {
            this.find('.nixie__value').text(opts.value);

            this.toggleClass(modPowerOff, opts.value === '');
        }

        return this;
    };

    $.fn.nixie.defaults = {
        value: ''
    };
})(jQuery);