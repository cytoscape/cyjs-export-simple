/*global $,cy */
$(function () {
    'use strict';

    var CYJS_ID = '#cy';
    var NETWORK_FILE_NAME = 'network.json';
    var STYLE_FILE_NAME = 'style.json';

    $(CYJS_ID).cytoscape({
        // Since the network is always created from Cytoscape 3,
        // (x,y) locations are always available.
        layout: {
            name: 'preset',
            padding: 10
        },

        ready: function () {
            window.cy = this;
            $.getJSON(NETWORK_FILE_NAME).success(function(network) {
                $.getJSON(STYLE_FILE_NAME).success(function(styles) {

                    cy.load(network.elements);
                    console.log(network);

                    // Find style
                    var vs = findPreferredStyle('default', styles);
                    if(vs === null) {
                        vs = styles[0];
                    }
                    cy.style().fromJson(vs.style).update();
                });
            });
        }
    });


    /**
     * Find Style object based on title
     *
     * @param styleName Style title
     * @param styles List of Styles to be used.
     * @returns Style object if found.  Otherwise, null.
     */
    function findPreferredStyle(styleName, styles) {
        var styleLen = styles.length;
        for(var i = 0; i<=styleLen; i++) {
            console.log(styles[i]);
            var name = styles[i].title;
            if(name === styleName) {
                return styles[i];
            }
        }
        return null;
    }
});