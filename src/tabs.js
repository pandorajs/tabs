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
    var tabClass = this.option('tabClass'),
      paneClass = this.option('paneClass'),
      tab = $(e.currentTarget),
      pane = this.role('pane').filter(tab.prop('hash')),
      remote;

    e.preventDefault();

    tab.parent()
      .addClass(tabClass)
      .siblings((' ' + tabClass).replace(/\s+/g, '.'))
      .removeClass(tabClass);

    if (pane.length === 0) {
      pane = $(tab.prop('hash'));
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

    this.activeTab = tab;
    this.activePane = pane;

    this.fire('tab', tab, pane);
  }

});

module.exports = Tabs;

});
