var $ = require('jquery');
var Tabs = require('../../src/tabs');

describe('tabs', function() {
  it('normal', function() {

    $('<ul class="nav nav-tabs" data-role="tabs">' +
        '<li><a href="#tab-pane-1" data-role="tab">1</a></li>' +
        '<li><a href="#tab-pane-2" data-role="tab">2</a></li>' +
        '<li><a href="#tab-pane-3" data-role="tab">3</a></li>' +
      '</ul>' +
      '<div class="tab-content">' +
        '<div class="tab-pane fade" id="tab-pane-1">1</div>' +
        '<div class="tab-pane fade" id="tab-pane-2">2</div>' +
        '<div class="tab-pane fade" id="tab-pane-3">3</div>' +
      '</div>').appendTo('body');

    $('<ul class="nav nav-tabs" data-role="tabs">' +
        '<li><a href="#tab-pane-n1" data-role="tab">n1</a></li>' +
        '<li><a href="#tab-pane-n2" data-role="tab">n2</a></li>' +
        '<li><a href="#tab-pane-n3" data-role="tab">n3</a></li>' +
      '</ul>' +
      '<div class="tab-content">' +
        '<div class="tab-pane fade" id="tab-pane-n1">n1</div>' +
        '<div class="tab-pane fade" id="tab-pane-n2">n2</div>' +
        '<div class="tab-pane fade" id="tab-pane-n3" data-remote="remote.txt">n3</div>' +
      '</div>').appendTo('body');

    var tabs = new Tabs({
      element: '.nav-tabs',
      initialTab: 1
    });

    expect( !$('#tab-pane-1').is('.active.in')).to.be.ok();
    expect( $('#tab-pane-2').is('.active.in')).to.be.ok();

    expect( $('.nav-tabs [data-role=tab]:eq(1)').parent().is('.active')).to.be.ok();

    $('.nav-tabs [data-role=tab]:eq(0)').trigger('click');

    expect( $('#tab-pane-1').is('.active.in')).to.be.ok();
    expect( !$('#tab-pane-2').is('.active.in')).to.be.ok();

    expect( !$('.nav-tabs [data-role=tab]:eq(1)').is('.active')).to.be.ok();

    $('.nav-tabs').remove();
  });

  it('template', function() {

    var tabs = new Tabs({
      container: 'body',
      data: {
        tabs: [
          {
            id: 'tab-pane-1',
            name: 'tab-pane-1'
          },
          {
            id: 'tab-pane-2',
            name: 'tab-pane-2',
            url: 'remote.txt'
          },
          {
            id: 'tab-pane-3',
            name: 'tab-pane-3'
          }
        ]
      },
      initialTab: 1
    });

    expect($('.ue-tabs').length).to.be(1);
    expect( !$('#tab-pane-1').is('.active.in')).to.be.ok();
    expect( $('#tab-pane-2').is('.active.in')).to.be.ok();

    expect( $('.nav-tabs [data-role=tab]:eq(1)').parent().is('.active')).to.be.ok();

    $('.nav-tabs [data-role=tab]:eq(0)').trigger('click');

    expect( $('#tab-pane-1').is('.active.in')).to.be.ok();
    expect( !$('#tab-pane-2').is('.active.in')).to.be.ok();

    expect( !$('.nav-tabs [data-role=tab]:eq(1)').is('.active')).to.be.ok();

  });
})
