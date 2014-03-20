define(['marionette'], function(Marionette) {
    InputView = Marionette.ItemView.extend({
        template: "#input-template",
        events: {
            "change textarea": "textChanged",
            "keyup textarea": "textChanged"
        },
        textChanged: function() {
            var text = this.$("textarea").val();
            this.trigger('text:changed', text);
        }
    });

    return InputView;
});
