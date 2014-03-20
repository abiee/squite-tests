define(['backbone'], function(Backbone) {
    TextModel = Backbone.Model.extend({
        defaults: { text: "" }
    });

    return TextModel;
});
