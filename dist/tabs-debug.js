define("pandora/tabs/1.0.0/tabs-debug", [ "$-debug", "pandora/widget/1.0.0/widget-debug", "pandora/base/1.0.0/base-debug", "pandora/class/1.0.0/class-debug", "pandora/events/1.0.0/events-debug" ], function(require, exports, module) {
    /**
 * @module Tabs
 */
    "use strict";
    var $ = require("$-debug"), Widget = require("pandora/widget/1.0.0/widget-debug");
    /**
   * 简单标签页类
   * @class Tabs
   * @constructor
   */
    var Tabs = Widget.extend({
        defaults: {
            activeClass: "active in",
            container: null,
            // data: {},
            delegates: {
                "click [data-role=tab]": "slide"
            },
            element: ".nav-tabs",
            initialTab: 0
        },
        setup: function() {
            this.$("[data-role=tab]:eq(" + this.option("initialTab") + ")").trigger("click");
        },
        slide: function(e) {
            var ac = this.option("activeClass"), tab = $(e.currentTarget), pane = $(tab.prop("hash")), remote;
            e.preventDefault();
            tab.parent().addClass(ac).siblings((" " + ac).replace(/\s+/g, ".")).removeClass(ac);
            if (pane.length) {
                pane.show().siblings(":visible").hide();
                remote = pane.data("remote");
                if (remote) {
                    pane.removeData("remote");
                    pane.load(remote);
                }
            }
            this.fire("tab", tab);
        }
    });
    module.exports = Tabs;
});
