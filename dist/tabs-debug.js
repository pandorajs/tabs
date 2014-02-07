define("crossjs/tabs/0.0.3/tabs-debug", [ "$-debug", "crossjs/class/0.0.5/class-debug", "crossjs/class/0.0.5/super-debug" ], function(require, exports, module) {
    /**
 * @module Tabs
 */
    "use strict";
    var $ = require("$-debug"), Class = require("crossjs/class/0.0.5/class-debug");
    var options = {
        tabs: ".ui-tab",
        initialTab: 0,
        classes: {
            paneLoading: "ui-pane-loading",
            // 'tab':              'ui-tab',
            tabActive: "ui-tab-active"
        }
    };
    /**
   * 简单标签页类
   * @class Tabs
   * @constructor
   */
    var Tabs = new Class({
        /**
     * 构造函数
     * @method __construct
     */
        __construct: function() {
            var self = this, activeTab;
            self.options = $.extend(true, {}, options, self.options);
            self.parseArgs.apply(self, arguments);
            if (!self.options.tabs) {
                return;
            }
            // 事件订阅
            if ($.isPlainObject(self.options.on)) {
                self.on(self.options.on);
            }
            self.tabs = $(self.options.tabs).each(function(i, n) {
                var tab = $(n), pane;
                if (tab.length === 0) {
                    return true;
                }
                pane = $(n.hash, tab.parents("body"));
                if (pane.length === 0) {
                    return true;
                }
                pane.toggle(tab.hasClass(self.options.tabActive));
                tab.on("click", function(e) {
                    e.preventDefault();
                    self.slide(i);
                }).data("pane", pane);
                if (location.hash && n.hash === location.hash || self.options.initialTab === i || self.options.initialTab === n.hash) {
                    activeTab = tab;
                }
            });
            if (activeTab) {
                activeTab.trigger("click");
            }
        },
        /**
     * 解析函数参数
     * @method parseArgs
     * @private
     */
        parseArgs: function() {
            var args = Array.prototype.slice.call(arguments, 0), arg0 = args.shift();
            if ($.isPlainObject(arg0)) {
                $.extend(true, this.options, arg0);
            } else {
                this.options.tabs = arg0;
            }
            if (args.length === 1 && typeof args[0] === "function") {
                this.options.effects.pane = args[0];
            }
            return this;
        },
        /**
     * 滑动到指定标签与窗格
     * @param {number} idx 标签索引
     * @method slide
     */
        slide: function(idx) {
            var toOff, toOn = this.tabs.eq(idx), url;
            if (this.index !== undefined) {
                toOff = this.tabs.eq(this.index);
            } else {
                toOff = this.tabs.filter("." + this.options.classes.tabActive);
            }
            // 先是tab
            this.toggleTabs(toOff, toOn);
            // 然后是pane
            if (toOff) {
                toOff = toOff.data("pane");
            }
            toOn = toOn.data("pane");
            this.togglePanes(toOff, toOn);
            // 最后是url
            url = toOn.data("url");
            if (url) {
                this.getRemote(toOn, url);
            }
            this.index = idx;
            this.fire("toggled", idx);
        },
        toggleTabs: function(toOff, toOn) {
            var cls = this.options.classes;
            toOff && toOff.removeClass(cls.tabActive);
            toOn && toOn.addClass(cls.tabActive);
        },
        togglePanes: function(toOff, toOn) {
            if (toOff) {
                toOff.hide();
            }
            toOn.show();
        },
        getRemote: function(pane, url) {
            var cls = this.options.classes;
            if (cls.paneLoading) {
                pane.addClass(cls.paneLoading);
            }
            $.get(url, function(res) {
                if (cls.paneLoading) {
                    pane.removeClass(cls.paneLoading);
                }
                pane.html(res);
                pane.data("url", null);
            });
        }
    });
    return Tabs;
});
