define(['jquery', 'underscore', 'marionette'], function($, _, Marionette) {
    EchoView = Marionette.ItemView.extend({
        template: function (serializedData) {
            var template = $("#echo-template").html();
            return _.template(template, serializedData);
        },
        modelEvents: {
            "change": "render"
        }
    });

    return EchoView;
});
