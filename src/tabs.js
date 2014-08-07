define(function (require, exports, module) {

/**
 * 标签页切换
 *
 * @module Tabs
 */

'use strict';

var $ = require('$'),
  Widget = require('widget');

/**
 * 简单标签页切换，从页面已有DOM结构生成
 *
 * @class Tabs
 * @extend Widget
 * @constructor
 */
var Tabs = Widget.extend({

  defaults: {
    /**
     * 主元素的className
     * @attribute classPrefix
     * @type {String}
     * @default ue-tabs  
     */
    classPrefix: 'ue-tabs',
    container: null,
    // container: 'body',
    // data: {
    //   tabs: []
    // },
    delegates: {
      'click [data-role=tab]': 'slide'
    },

    /**
     * 把tabs渲染到选择器指定的DOM元素上 
     * 
     * @attribute element
     * @type {String}
     * @default undefined  
     */
    // element: '<div></div>',
    // element: '.nav-tabs',
    /**
     * 实例化后默认选中的标签索引，从0开始。
     * 
     * @attribute initialTab 
     * @type {Number}
     * @default 0  
     */
    initialTab: 0,

    /**
     * 选中时，面板的className
     * 
     * @attribute paneClass
     * @type {String}
     * @default active in
     */
    paneClass: 'active in',

    /**
     * 阻止 location.hash 变化
     *
     * @attribute preventDefault
     * @type {Boolean}
     * @default true
     */
    preventDefault: true,

    /**
     * 选中时，tab的className
     * 
     * @attribute tabClass
     * @type {String}
     * @default active
     */
    tabClass: 'active',
    template: require('./tabs.handlebars')
  },

  setup: function () {
    var initialTab = this.option('initialTab');

    if (this.element.parent().length) {
      this.option('template', null);
    }

    this.render();

    if (initialTab !== -1) {
      this.role('tab')
        .eq(initialTab)
        .trigger('click');
    }
  },
  /**
   * 设置指定的tab为选中状态
   * 
   * @method slide
   * @param  {Number|String|Event} e  当e为Number时，e代表要选中的索引号，e为String时，则选中hash等于e的tab。
   * @example
   * ```
   * var tabs = new Tabs({
   *   element: '.nav-tabs',
   *   initialTab : 2
   * });
   * tabs.slide(1);
   * tabs.slide('detail');
   * 
   * ```
   */
  slide: function (e) {
    var self = this,
      tabClass = self.option('tabClass'),
      paneClass = self.option('paneClass'),
      tab, pane, remote;

    if (typeof e === 'number') {
      tab = self.role('tab').eq(e);
    } else if (typeof e === 'string') {
      tab = self.role('tab').filter(function () {
        return this.hash === e;
      });
    } else {
      tab = $(e.currentTarget);
      if (self.option('preventDefault')) {
        e.preventDefault();
      }
    }

    tab.parent()
      .addClass(tabClass)
      .siblings((' ' + tabClass).replace(/\s+/g, '.'))
      .removeClass(tabClass);

    pane = self.role('pane').filter('[id="' + tab.prop('hash').substring(1) + '"]');

    if (pane.length === 0) {
      pane = $('[id="' + tab.prop('hash').substring(1) + '"]');
    }

    if (pane.length) {

      pane
        .addClass(paneClass)
        .siblings((' ' + paneClass).replace(/\s+/g, '.'))
        .removeClass(paneClass);

      remote = pane.data('remote');

      if (remote) {
        pane.removeData('remote');
        pane.load(remote);
      }
    }

    self.activeTab = tab;
    self.activePane = pane;

    /**
     * tab选中事件，当切换或选中tab时触发。
     * 
     * @event tab
     * @param {object} e Event.
     * @param {jquery} tab 当前选中的tab标签
     * @param {jquery} pane 当前选中的pane面板
     */
    self.fire('tab', tab, pane);
  }

});

module.exports = Tabs;

});
