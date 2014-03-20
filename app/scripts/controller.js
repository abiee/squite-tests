define(['marionette', 'textModel', 'inputView', 'echoView'], 
        function(Marionette, TextModel, InputView, EchoView) {
    Controller = Marionette.Controller.extend({
        showMe: function() {
            this.model = new TextModel();
            this.inputView = new InputView({ el: '#input' });
            this.echoView = new EchoView({
                el: '#echo',
                model: this.model
            });

            this.inputView.on('text:changed', this.updateModel, this);

            this.inputView.render();
            this.echoView.render();
        },
        updateModel: function(text) {
            this.model.set('text', text);
        }
    });

    return Controller;
});
