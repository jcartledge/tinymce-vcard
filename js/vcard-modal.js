(function(tinymce, tinyMCEPopup, undefined) {

  "use strict";

  function tag(name) {
    var args = [].slice.call(arguments);
    args.shift();
    var nextArg, children = [], attrs = {}, content = '';
    while(args.length) {
      nextArg = args.shift();
      if(nextArg instanceof Array) {
        children = nextArg;
      } else if(nextArg instanceof Object) {
        attrs = nextArg;
      } else {
        content = nextArg;
      }
    }
    var el = document.createElement(name);
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
    if(content.length > 0) {
      el.appendChild(document.createTextNode(content));
    }
    while(children.length > 0) {
      el.appendChild(children.shift());
    }
    return el;
  }

  function render(data) {
    var children = [];
    if(data.name) {
      var name = tag('span', {'class': 'fn'}, data.name);
      children.push(data.url ?
        tag('a', {'class': 'url', 'href': data.url}, [name]): name);
    }
    if(data.role)  children.push(tag('span', {'class': 'role'}, data.role));
    if(data.email) children.push(tag('a', {
      'class': 'email',
      'href': 'mailto:' + data.email
    }, data.email));
    if(data.phone) children.push(tag('span', {'class': 'tel'}, data.phone));
    return tag('div', [tag('div', {'class': 'vcard'}, children)]).innerHTML;
  }

  var VCardDialog = {

    'init': function(editor) {
      var form = document.getElementById('vcard-form');
      tinymce.dom.Event.add(form, 'submit', function(e) {
        var data = {};
        var inputs = this.getElementsByTagName('input');
        for(var i in inputs) {
          data[inputs[i].name] = inputs[i].value;
        }
        console.log(render(data));
        editor.execCommand('mceInsertContent', false, render(data));
        editor.undoManager.add();
        editor.execCommand('mceRepaint');
        editor.focus();
        tinyMCEPopup.close();
        return false;
      });
    }

  };

  tinyMCEPopup.onInit.add(VCardDialog.init, VCardDialog);
  tinyMCEPopup.requireLangPack();

}(tinymce, tinyMCEPopup));
