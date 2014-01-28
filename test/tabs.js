define(function (require, exports) {

  'use strict';

  var Tabs = require('../src/tabs');

  QUnit.start();

  module('Module Tabs');
  test('new Tabs({})', function() {
    var dom = $('<div><div class="ui-tabs"><a href="#ui-pane-1" class="ui-tab"></a><a href="#ui-pane-2" class="ui-tab"></a><a href="#ui-pane-3" class="ui-tab"></a></div><div class="ui-panes"><div id="ui-pane-1"></div><div id="ui-pane-2"></div><div id="ui-pane-3"></div></div>')
      .appendTo('#qunit-fixture'),
      tabs = new Tabs({
        initialTab: 1
      });

    ok($('#ui-pane-1').is(':hidden'), '');
    ok($('#ui-pane-2').is(':visible'), '');

    ok($('.ui-tabs > :nth-child(2)').hasClass('ui-tab-active'), '');

    $('.ui-tabs > :nth-child(1)').trigger('click');

    ok($('#ui-pane-1').is(':visible'), '');
    ok($('#ui-pane-2').is(':hidden'), '');

    ok(!$('.ui-tabs > :nth-child(2)').hasClass('ui-tab-active'), '');

  });
});