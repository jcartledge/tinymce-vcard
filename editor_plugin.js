(function(window, tinymce, undefined) {

  "use strict";

  tinymce.create('tinymce.plugins.VCard', {

    init : function(editor, url) {

      // Register commands
      editor.addCommand('mceInsertVCard', function(vcard_plugin) {
        return function() {
          vcard_plugin._execCommand(editor, url);
        };
      }(this));

      // Register image caption button
      editor.addButton('vcard', {
        title : 'User vard',
        cmd : 'mceInsertVCard',
        image : url + '/img/vcard.gif'
      });

      // Register event handlers
      // Comment out because I don't know if we need them?
      // editor.onNodeChange.add(this._nodeChange, this);
      // editor.onKeyDown.add(this._keyDown, this);
    },

    // Currently inserts the vcard template directly into the document.
    // TODO: break out the template
    // TODO: implement a modal to enter/edit values
    // TODO: extract values from existing VCard instance if we are in one
    _execCommand : function(editor, url) {

      // Open the modal popover
      editor.windowManager.open({
        file : url + '/vcard.html',
        width : 400,
        height : 235,
        inline : 1
      }, {
        plugin_url : url
      });
      // var sel = editor.selection.getNode();
      // var par = this._getParentNode(sel, ["p","h1","h2","h3","h4"]);
      //  // insert only if you are inside paragraph or headings and doesn't have 'div' parent
      // if (par && !this._getParentNode(par,["div"])) {
      //   var b = editor.selection.getBookmark();

      //   var divVcard = editor.dom.create('div', {
      //     'class':'vcard'
      //   });

      //   var imgVcard = editor.dom.create('img', {
      //     'width':'90',
      //     'alt':'Profile photo',
      //     'src':'/++resource++act.tinymce.plugins/vcard/img/dummy.gif'
      //   });

      //   var divInfo = editor.dom.create('div',{'class':'info'});
      //   var h5 = editor.dom.create('h5',{'class':'fn'}, "Name");
      //   var p1 = editor.dom.create('p');
      //   var span_role = editor.dom.create('span',{'class':'role'}, 'Role');
      //   var span_at = editor.dom.create('span',{}, ' at ');
      //   var span_org = editor.dom.create('span',{'class':'org'}, 'Organisation');
      //   var p2 = editor.dom.create('p');

      //   var span_tel = editor.dom.create('span',{'class':'tel'}, '+41xxxxx');
      //   var ebr = editor.dom.create('br',{});
      //   var span_mail = editor.dom.create('span',{'class':'link-mailto'});
      //   var a_mail = editor.dom.create('a',{'class':'email','href':'mailto:#'}, 'Email name@server');

      //   p1.appendChild(span_role);
      //   p1.appendChild(span_at);
      //   p1.appendChild(span_org);

      //   p2.appendChild(span_tel);
      //   p2.appendChild(ebr);
      //   span_mail.appendChild(a_mail);
      //   p2.appendChild(span_mail);

      //   divInfo.appendChild(h5);
      //   divInfo.appendChild(p1);
      //   divInfo.appendChild(p2);

      //   divVcard.appendChild(imgVcard);
      //   divVcard.appendChild(divInfo);

      //   sel.parentNode.insertBefore(divVcard, sel);
      //   editor.selection.moveToBookmark(b);
      // }
    },

    // I think this deletes the containing div if you delete an image?
    // _keyDown : function(editor, e) {
    //   if (e.keyCode == 46) {    // DELETE
    //     var n = editor.selection.getNode();
    //     if (n && n.nodeName.toLowerCase()=="img") {
    //       var d = this._getParentNode(n, ["div"]);
    //       if (d) {
    //         editor.dom.remove(d);
    //         tinymce.dom.Event.cancel(e);
    //       }
    //     }
    //   }
    // },

    // Don't know what this does?
    // _nodeChange : function(editor, cm, n) {
    //   // Check if active editor
    //   if (tinyMCE.activeEditor.id != editor.id) return;
    //   // Set button state
    //   cm.setDisabled('vcard', this._getParentNode(n, ["div"]));
    // },

    // @TODO: rewrite or delete
    _inArray : function(s, a) {
      for (var i = 0; i < a.length; i++) {
        if (s == a[i]) {
          return true;
        }
      }
      return false;
    },

    // @TODO: rewrite or delete
    _getParentNode : function(e, a) {
      a.push("body");
      var p = e;
      while (!this._inArray(p.nodeName.toLowerCase(), a)) {
        p = p.parentNode;
      }
      if (p.nodeName.toLowerCase() == "body") {
        return false;
      } else {
        return p;
      }
    },

    getInfo : function() {
      return {
        longname : 'Vcard plugin',
        author : 'jcartledge@gmail.com',
        authorurl : '',
        infourl : '',
        version : '0.1'
      };
    }

  });

  // Register plugin
  tinymce.PluginManager.add('vcard', tinymce.plugins.VCard);

})(this, tinymce);
