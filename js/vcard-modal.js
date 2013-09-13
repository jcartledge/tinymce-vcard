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

  function populateForm(form, vcard) {
    if(!vcard) return;
    function vcardGet(className, field) {
      var els = vcard.getElementsByClassName(className);
      return (els.length) ? els[0][(field ? field : 'innerHTML')] : '';
    }
    form.elements.url.value = vcardGet('url', 'href');
    form.elements.name.value = vcardGet('fn');
    form.elements.role.value = vcardGet('role');
    form.elements.email.value = vcardGet('email');
    form.elements.phone.value = vcardGet('tel');
  }

  function render(data) {
    var children = [];
    if(data.name) {
      var name = tag('div', {'class': 'fn'}, data.name);
      children.push(data.url ?
        tag('a', {'class': 'url', 'href': data.url}, [name]): name);
    }
    if(data.role)  children.push(tag('div', {'class': 'role'}, data.role));
    if(data.email) children.push(tag('a', {
      'class': 'email',
      'href': 'mailto:' + data.email
    }, data.email));
    if(data.phone) children.push(tag('div', {'class': 'tel'}, data.phone));
    return tag('div', [tag('div', {'class': 'vcard mceNonEditable'}, children)]).innerHTML;
  }

  var VCardDialog = {

    'init': function(editor) {
      var form = document.getElementById('vcard-form');
      var vcard = tinyMCEPopup.params.containingVCard;
      populateForm(form, vcard);
      tinymce.dom.Event.add(form, 'submit', function(e) {
        var data = {};
        var inputs = this.getElementsByTagName('input');
        for(var i in inputs) {
          data[inputs[i].name] = inputs[i].value;
        }
        if(vcard) {
          editor.selection.select(vcard);
          editor.selection.setContent(render(data));
        } else {
          editor.execCommand('mceInsertContent', false, render(data));
        }
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
