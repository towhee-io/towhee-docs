export const init = function () {
  'use strict';
  var getCurrentScript = function () {
    var currentScript = document.currentScript;
    function isKatacoda(script) {
      var src = script.getAttribute('src');
      return (
        src &&
        new URL(src, window.location.origin).hostname.indexOf('katacoda') >= 0
      );
    }
    if (!currentScript) {
      var scripts = document.getElementsByTagName('script');
      for (var i = 0; i < scripts.length; ++i) {
        if (isKatacoda(scripts[i])) {
          currentScript = scripts[i];
          break;
        }
      }
    }
    if (currentScript) {
      return currentScript;
    } else {
      var script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', 'https://www.katacoda.com/embed.js');
      return script;
    }
  };
  var getSourceHost = function (script) {
    var src = script.getAttribute('src');
    var l = document.createElement('a');
    l.href = src;
    return l.host;
  };
  var listenForChildEvents = function () {
    var eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent';
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';
    var activeFullScreenTarget;
    var originalStyle;
    eventer(
      messageEvent,
      function (e) {
        if (e.data === null) {
          return;
        }
        if (e.data.type === 'resize') {
          var d = e.data.data;
          var target = document.getElementById(d.target);
          target.style.height = d.h;
        }
        if (
          e.data.type === 'close-panel' &&
          e.data.data &&
          e.data.data.target
        ) {
          var panelContainer = document.getElementById(e.data.data.target);
          if (panelContainer) {
            var targetPanel = panelContainer.children[0];
            if (targetPanel) {
              targetPanel.parentElement.removeChild(targetPanel);
            }
          }
        }
        if (e.data.type === 'host') {
          var d = e.data.data;
          var target = document.getElementById(d.target);
          var p;
          if (target) {
            p = document.getElementById(target);
          } else {
            p = document.getElementById('katacoda-panel-container');
          }
          var iframe;
          if (p) {
            iframe = p.getElementsByTagName('iframe')[0];
            if (!iframe) return;
          } else {
            iframe = document.getElementById('katacoda-container');
          }
          if (iframe) {
            var host = getSourceHost(currentScript);
            iframe.contentWindow.postMessage(
              {cmd: 'host', data: {host: window.location.host}},
              window.location.protocol + '//' + host,
            );
          }
        }
      },
      false,
    );
    if (document.addEventListener) {
      document.addEventListener('webkitfullscreenchange', exitHandler, false);
      document.addEventListener('mozfullscreenchange', exitHandler, false);
      document.addEventListener('fullscreenchange', exitHandler, false);
      document.addEventListener('MSFullscreenChange', exitHandler, false);
    }
    function exitHandler(e) {
      var target = activeFullScreenTarget;
      if (target) {
        if (
          !document.webkitIsFullScreen &&
          !document.mozFullScreen &&
          !document.msFullscreenElement
        ) {
          restoreStyle(activeFullScreenTarget, originalStyle);
          activeFullScreenTarget = undefined;
        }
      }
    }
  };
  var cloneStyle = function (target) {
    var style = {};
    var s = target.style;
    for (var property in s) {
      if (s.hasOwnProperty(property)) {
        style[property] = s[property];
      }
    }
    return style;
  };
  var restoreStyle = function (target, style) {
    var s = style;
    for (var property in s) {
      if (s.hasOwnProperty(property)) {
        target.style[property] = s[property];
      }
    }
  };
  var addParameter = function (element, options, value) {
    var attr = element.getAttribute('data-katacoda-' + value);
    if (attr) {
      options += '&' + value + '=' + encodeURIComponent(attr);
    }
    return options;
  };
  var addDefaultContent = function (element, options) {
    var defaultContent = element.textContent;
    if (defaultContent !== '') {
      var cleanedConent = defaultContent
        .trim()
        .replace(/\uFFFD/g, '')
        .replace(/“/g, '"')
        .replace(/”/g, '"');
      options += '&code=' + btoa(cleanedConent);
      element.textContent = '';
    }
    return options;
  };
  var createOptions = function (ui, element, originalHost) {
    var target = element.getAttribute('id');
    var options =
      '/?v=2&embed=true&ui=' +
      ui +
      '&host=' +
      originalHost +
      '&url=' +
      encodeURIComponent(window.location.href) +
      '&target=' +
      target +
      '&nonce=' +
      window.katacoda.nonce;
    var params = new URLSearchParams(window.location.search);
    var cloudBurst = parseInt(params.get('cloudBurst'));
    if (cloudBurst) {
      options += '&three&cloudBurst=' + cloudBurst;
    }
    var items = [
      'layout',
      'port',
      'lang',
      'token',
      'userid',
      'filename',
      'command',
      'runinbackground',
      'prompt',
      'color',
      'secondary',
      'background',
      'hideintro',
      'hidefinish',
      'hidetitle',
      'hidesidebar',
      'hideprogress',
      'font',
      'fontheader',
      'startscenariobuttontext',
      'ctaurl',
      'ctatext',
      'externalcss',
      'hideiframebuttons',
    ];
    for (var i = 0; i < items.length; i++) {
      options = addParameter(element, options, items[i]);
    }
    options = addDefaultContent(element, options);
    return options;
  };
  var processInline = function (host, element) {
    element.style.height = element.style.height || '200px';
    var options = createOptions('inline', element, originalHost);
    var env = element.getAttribute('data-katacoda-env');
    var iframe = document.createElement('iframe');
    iframe.id = 'katacoda-container';
    iframe.src =
      window.location.protocol + '//' + host + '/embed/' + env + options;
    var layout = element.getAttribute('data-katacoda-layout');
    var minHeight =
      element.style.height || (layout === 'editor' ? '200px' : '250px');
    iframe.style.minHeight = minHeight;
    iframe.style.height = '100%';
    iframe.style.width = '100%';
    iframe.style.border = '0px';
    iframe.style.backgroundColor = 'transparent';
    iframe.frameBorder = '0';
    iframe.setAttribute('allowTransparency', 'true');
    iframe.setAttribute('allowFullScreen', 'true');
    element.appendChild(iframe);
    bubbleIframeMouseMove(iframe);
  };
  var processScenario = function (host, element) {
    element.style.height = element.style.height || '200px';
    var options = createOptions('inline', element, originalHost);
    var env = element.getAttribute('data-katacoda-id');
    var iframe = document.createElement('iframe');
    iframe.id = 'katacoda-container';
    iframe.src =
      window.location.protocol + '//' + host + '/embed/' + env + options;
    var layout = element.getAttribute('data-katacoda-layout');
    var minHeight =
      element.style.height || (layout === 'editor' ? '200px' : '250px');
    iframe.style.minHeight = minHeight;
    iframe.style.height = '100%';
    iframe.style.width = '100%';
    iframe.style.border = '0px';
    iframe.style.backgroundColor = 'transparent';
    iframe.frameBorder = '0';
    iframe.setAttribute('allowTransparency', 'true');
    iframe.setAttribute('allowFullScreen', 'true');
    element.appendChild(iframe);
    bubbleIframeMouseMove(iframe);
  };
  function resize(element, mousemove) {
    return;
    element.style.cursor = 'n-resize';
    element.mousemove = mousemove;
    element.onmousedown = function (e) {
      document.documentElement.addEventListener(
        'mousemove',
        element.doDrag,
        false,
      );
      document.documentElement.addEventListener(
        'mouseup',
        element.stopDrag,
        false,
      );
    };
    element.doDrag = function (e) {
      if (e.which != 1) {
        element.stopDrag(e);
        return;
      }
      element.mousemove(e);
    };
    element.stopDrag = function (e) {
      document.documentElement.removeEventListener(
        'mousemove',
        element.doDrag,
        false,
      );
      document.documentElement.removeEventListener(
        'mouseup',
        element.stopDrag,
        false,
      );
    };
  }
  function bubbleIframeMouseMove(iframe) {
    var existingOnMouseMove = iframe.contentWindow.onmousemove;
    iframe.contentWindow.onmousemove = function (e) {
      if (existingOnMouseMove) existingOnMouseMove(e);
      var evt = document.createEvent('MouseEvents');
      var boundingClientRect = iframe.getBoundingClientRect();
      evt.initMouseEvent(
        'mousemove',
        true,
        false,
        window,
        e.detail,
        e.screenX,
        e.screenY,
        e.clientX + boundingClientRect.left,
        e.clientY + boundingClientRect.top,
        e.ctrlKey,
        e.altKey,
        e.shiftKey,
        e.metaKey,
        e.button,
        null,
      );
      iframe.dispatchEvent(evt);
    };
  }
  var addPanel = function (host, element) {
    var options = createOptions('panel', element, originalHost);
    var env = element.getAttribute('data-katacoda-env');
    if (env === null) env = element.getAttribute('data-katacoda-id');
    if (document.getElementById('katacoda-panel-container') !== null) {
      return;
    }
    var div = document.createElement('div');
    div.id = 'katacoda-panel-container';
    div.style.width = '100%';
    div.style.height = '40%';
    div.style.margin = '0';
    div.style.padding = '0';
    div.style.bottom = '0';
    div.style.left = '0';
    div.style.right = '0';
    div.style.zIndex = '9999';
    div.style.position = 'fixed';
    div.style.paddingTop = '10px';
    div.style.minHeight = '200px';
    div.style.maxHeight = '95%';
    var iframe = document.createElement('iframe');
    iframe.id = 'katacoda-container';
    iframe.src =
      window.location.protocol + '//' + host + '/embed/' + env + options;
    iframe.style.height = '100%';
    iframe.style.minHeight = '300px';
    iframe.style.width = '100%';
    iframe.style.border = '0px';
    iframe.style.backgroundColor = 'transparent';
    iframe.frameBorder = '0';
    iframe.setAttribute('allowTransparency', 'true');
    iframe.setAttribute('allowFullScreen', 'true');
    div.appendChild(iframe);
    element.appendChild(div);
    bubbleIframeMouseMove(iframe);
  };
  var executeCodeBlock = function (e) {
    var cmd = e.target.textContent;
    var target = e.target.getAttribute('data-katacoda-target');
    var p;
    if (target) {
      p = document.getElementById(target);
    } else {
      p = document.getElementById('katacoda-panel-container');
    }
    var iframe = p.getElementsByTagName('iframe')[0];

    if (!iframe) return;
    var host = getSourceHost(currentScript);

    iframe.contentWindow.postMessage(
      {cmd: 'writeTerm', data: cmd},
      window.location.protocol + '//' + host,
    );
  };
  var writeToTerminal = function (cmd) {
    var target = document.querySelectorAll('[data-katacoda-env]');
    if (target.length === 0)
      target = document.querySelectorAll('[data-katacoda-id]');
    if (target.length === 0) {
      if (console && console.error) console.error('No katacoda elements found');
      return;
    }
    var p = document.getElementById(target[0].getAttribute('id'));
    var iframe = p.getElementsByTagName('iframe')[0];
    if (!iframe) return;
    var host = getSourceHost(currentScript);
    iframe.contentWindow.postMessage(
      {cmd: 'writeTerm', data: cmd},
      window.location.protocol + '//' + host,
    );
  };
  var writeToEnvironment = function (cmd) {
    var target = document.querySelectorAll('[data-katacoda-env]');
    if (target.length === 0)
      target = document.querySelectorAll('[data-katacoda-id]');
    if (target.length === 0) {
      if (console && console.error) console.error('No katacoda elements found');
      return;
    }
    var p = document.getElementById(target[0].getAttribute('id'));
    var iframe = p.getElementsByTagName('iframe')[0];
    if (!iframe) return;
    var host = getSourceHost(currentScript);
    iframe.contentWindow.postMessage(
      {cmd: 'writeToEnvironment', data: cmd},
      window.location.protocol + '//' + host,
    );
  };
  var eraseCookie = function (name) {
    document.cookie = name + '=; Max-Age=-99999999;';
  };
  var onLoadUI = function () {
    var host = getSourceHost(currentScript);
    var panel = document.querySelector('*[data-katacoda-ui=panel]');
    var elements = [];
    var scenarios = [];
    if (panel) {
      addPanel(host, panel);
    } else {
      elements = document.querySelectorAll('*[data-katacoda-env]');
      scenarios = document.querySelectorAll('*[data-katacoda-id]');
    }
    listenForChildEvents();
    for (var i = 0; i < elements.length; i++) {
      var e = elements[i];
      if (e.getAttribute('data-katacoda-ui') === 'panel') continue;
      processInline(host, e);
    }
    for (var i = 0; i < scenarios.length; i++) {
      var e = scenarios[i];
      processScenario(host, e);
    }
    var codeBlocks = document.querySelectorAll('code[data-katacoda-target]');
    for (i = 0; i < codeBlocks.length; i++) {
      var c = codeBlocks[i];
      c.style.cursor = 'pointer';
      c.addEventListener('click', executeCodeBlock, false);
    }
    var codeBlocks = document.querySelectorAll('code[data-lang="shell"]');
    for (i = 0; i < codeBlocks.length; i++) {
      var c = codeBlocks[i];
      c.style.cursor = 'pointer';
      c.addEventListener('click', executeCodeBlock, false);
    }
  };
  var onLoad = function (e) {
    window.removeEventListener('load', onLoad);
    createnonce(function (err, response) {
      window.katacoda.nonce = response;
      var host = getSourceHost(currentScript);
      var panel = document.querySelector('*[data-katacoda-ui=panel]');
      var elements = [];
      var scenarios = [];
      if (panel) {
        addPanel(host, panel);
      } else {
        elements = document.querySelectorAll('*[data-katacoda-env]');
        scenarios = document.querySelectorAll('*[data-katacoda-id]');
      }
      listenForChildEvents();
      for (var i = 0; i < elements.length; i++) {
        var e = elements[i];
        if (e.getAttribute('data-katacoda-ui') === 'panel') continue;
        processInline(host, e);
      }
      for (var i = 0; i < scenarios.length; i++) {
        var e = scenarios[i];
        processScenario(host, e);
      }
      var codeBlocks = document.querySelectorAll('code[data-katacoda-target]');
      for (i = 0; i < codeBlocks.length; i++) {
        var c = codeBlocks[i];
        c.style.cursor = 'pointer';
        c.addEventListener('click', executeCodeBlock, false);
      }
      var codeBlocks = document.querySelectorAll('code[data-lang="shell"]');
      for (i = 0; i < codeBlocks.length; i++) {
        var c = codeBlocks[i];
        c.style.cursor = 'pointer';
        c.addEventListener('click', executeCodeBlock, false);
      }
    });
  };
  var createnonce = function (cb) {
    var host = getSourceHost(currentScript);
    var protocol = 'https://';
    if (host.indexOf('localhost') === 0) {
      protocol = 'http://';
    }
    var oReq = new XMLHttpRequest();
    var reqListener = function () {
      if (oReq.readyState == 4 && oReq.status == 200) {
        cb(null, oReq.responseText);
      }
    };
    oReq.addEventListener('load', reqListener);
    oReq.addEventListener('error', function () {});
    oReq.addEventListener('abort', function () {});
    oReq.open(
      'GET',
      protocol +
        host +
        '/api/embed/nonce?protocol=' +
        window.location.protocol +
        '&host=' +
        window.location.host,
    );
    oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    oReq.send();
    return;
  };
  var logout = function () {
    var host = getSourceHost(currentScript);
    var reqListener = function () {};
    eraseCookie('katacoda-instance');
    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', reqListener);
    oReq.addEventListener('error', function () {});
    oReq.addEventListener('abort', function () {});
    oReq.withCredentials = true;
    oReq.open(
      'GET',
      window.location.protocol +
        '//' +
        host +
        '/logout?protocol=' +
        window.location.protocol +
        '&host=' +
        window.location.host,
    );
    oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    oReq.send();
    return;
  };
  var currentScript = getCurrentScript();
  var originalHost = window.location.host;
  var ondemandselector = 'data-katacoda-ondemand';
  var ondemand = document.querySelector('*[' + ondemandselector + ']');
  if (!ondemand) {
    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
    }
  }
  window.katacoda = {
    init: function () {
      currentScript = getCurrentScript();
      originalHost = window.location.host;
      onLoad();
    },
    write: writeToTerminal,
    logout: logout,
    runInForeground: writeToTerminal,
    runInBackground: writeToEnvironment,
  };
};
