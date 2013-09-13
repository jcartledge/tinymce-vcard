(function(window, tinymce, undefined) {

  "use strict";

  tinymce.create('tinymce.plugins.VCard', {

    init : function(editor, url) {
      // Register commands
      editor.addCommand('mceInsertVCard', function(vcardPlugin) {
        return function() {
          vcardPlugin._execCommand(editor, url);
        };
      }(this));

      // Register image caption button
      editor.addButton('vcard', {
        title : 'User vard',
        cmd : 'mceInsertVCard',
        image : url + '/img/vcard.gif'
      });

      // Set button active when we're in a vcard instance
      editor.onNodeChange.add(function(vcardPlugin) {
        return function(editor, cm, node) {
          cm.setActive('vcard', !!vcardPlugin._containingVCard(node));
        };
      }(this));

    },

    _execCommand : function(editor, url) {
      // Open the modal popover
      editor.windowManager.open({
        'file': url + '/vcard.html',
        'width': 400,
        'height': 235,
        'inline': 1
      }, {
        'plugin_url': url,
        'containingVCard': this._containingVCard(editor.selection.getNode())
      });
    },

    _containingVCard: function(node) {
      var parent;
      if(node.className && node.className.match(/\bvcard\b/)) {
        return node;
      } else {
        parent = node.parentNode;
        if(parent) {
          return this._containingVCard(parent);
        }
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
