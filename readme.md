# Tabs

[![Build Status](https://api.travis-ci.org/pandorajs/tabs.png?branch=master)](http://travis-ci.org/pandorajs/tabs)
[![Coverage Status](https://coveralls.io/repos/pandorajs/tabs/badge.png?branch=master)](https://coveralls.io/r/pandorajs/tabs?branch=master)

---
简单的 Tab 切换

## Install

```bash
npm i pandora-tabs -S
```

## Usage

```html
<ul class="nav nav-tabs" data-role="tabs">
  <li><a href="#tab-pane-1" data-role="tab">1</a></li>
  <li><a href="#tab-pane-2" data-role="tab">2</a></li>
  <li><a href="#tab-pane-3" data-role="tab">3</a></li>
</ul>
<div class="tab-content">
  <div class="tab-pane fade" id="tab-pane-1">1</div>
  <div class="tab-pane fade" id="tab-pane-2">2</div>
  <div class="tab-pane fade" id="tab-pane-3">3</div>
</div>
```

```js
var Tabs = require('pandora-tabs')

new Tabs({
  element: '.nav-tabs',
  initialTab: 1
})

```
