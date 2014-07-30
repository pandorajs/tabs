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
 * @constructor
 */
var Tabs = Widget.extend({

  defaults: {
    classPrefix: 'ue-tabs',
    container: null,
    // container: 'body',
    // data: {
    //   tabs: []
    // },
    delegates: {
      'click [data-role=tab]': 'slide'
    },
    // element: '<div></div>',
    // element: '.nav-tabs',
    initialTab: 0,
    paneClass: 'active in',
    // 阻止 location.hash 变化
    preventDefault: true,
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

    self.fire('tab', tab, pane);
  }

});

module.exports = Tabs;

});
