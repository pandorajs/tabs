define(function (require, exports, module) {

/**
 * @module Tabs
 */

'use strict';

var $ = require('$'),
  Widget = require('widget');

  /**
   * 简单标签页类
   * @class Tabs
   * @constructor
   */
var Tabs = Widget.extend({

  defaults: {
    activeClass: 'active in',
    container: null,
    // data: {},
    delegates: {
      'click [data-role=tab]': 'slide'
    },
    element: '.nav-tabs',
    initialTab: 0/*,
    template: require('./tabs.handlebars')*/
  },

  setup: function () {
    this
      .$('[data-role=tab]:eq(' + this.option('initialTab') + ')')
      .trigger('click');
  },

  slide: function (e) {
    var ac = this.option('activeClass'),
      tab = $(e.currentTarget),
      pane = $(tab.prop('hash')),
      remote = pane.data('remote');

    e.preventDefault();

    tab.parent().addClass(ac)
      .siblings((' ' + ac).replace(/\s+/g, '.')).removeClass(ac);

    pane.show()
      .siblings(':visible').hide();

    if (remote) {
      pane.removeData('remote');
      pane.load(remote);
    }

    this.fire('tab', tab);
  }

});

module.exports = Tabs;

});
