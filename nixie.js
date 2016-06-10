(function ($) {
if ( ! $) {
    console.error('Nixie error: jQuery not found.');
}

/**
 * @const
 * @type {String}
 */
var NIXIE_RAW =
    '<div class="nixie">' +
        '<div class="nixie__wrapper">' +
            '<div class="nixie__value"></div>' +
            '<div class="nixie__mesh"></div>' +
        '</div>' +
    '</div>';

/**
 * @const
 * @type {String}
 */
var INIT_DATA_ATTR = 'is-nixie-inited';

/**
 * Create pretty nice nixie tube
 * @params {Object} [options]
 *  @property {String} [value='']
 * @returns {jQuery}
 */
$.fn.nixie = function (options) {
    if (this.length) {
        this.each(function () {
            var opts = $.extend({}, $.fn.nixie.defaultState, options),
                $this = $(this),
                isInited = $this.data(INIT_DATA_ATTR),
                $nixie = $(NIXIE_RAW),
                thisText = $this.text(),
                thisClass,
                thisId;

            if ( ! opts.value && thisText) {
                opts.value = thisText;
            }

            if ( ! isInited) {
                if (thisClass = $this.attr('class')) {
                    $nixie.addClass(thisClass);
                }

                if (thisId = $this.attr('id')) {
                    $nixie.attr('id', thisId);
                }

                $this.replaceWith($nixie);
                $nixie.data(INIT_DATA_ATTR, true);
                $this = $nixie;
            }

            $.fn.nixie.setState.call($this, opts);
        });
    } else {
        return $.fn.nixie.setState.call($(nixie), $.extend({}, $.fn.nixie.defaultState, options));
    }

    return this;
};

/**
 * Set nixie state
 * @params {Object} state
 * @returns {jQuery}
 */
$.fn.nixie.setState = function (state) {
    if (typeof state.value === 'string') {
        this.find('.nixie__value').text(state.value);
    }

    return this;
};

/**
 * @static
 * @type {Object}
 */
$.fn.nixie.defaultState = {
    value: ''
};

})(jQuery);
