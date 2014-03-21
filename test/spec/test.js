define(['backbone', 'marionette', 'Squire'], function(Backbone, Marionette, Squire) {
    'use strict';

    var testContext = {};

    describe('Controller', function () {
        beforeEach(function(done) {
            var that = this;

            testContext = {
                injector: new Squire(),
                stubs: {
                    inputViewInitialize: sinon.stub(),
                    echoViewInitialize: sinon.stub()
                }
            }

            var TextModelMock = Backbone.Model.extend();
            var InputViewMock = Marionette.ItemView.extend({
                initialize: testContext.stubs.inputViewInitialize,
                template: function() { return "<div></div>" }
            });
            var EchoViewMock = Marionette.ItemView.extend({
                initialize: testContext.stubs.echoViewInitialize,
                template: function() { return "<div></div>" }
            });

            testContext.injector.mock({
                'textModel': TextModelMock,
                'inputView': InputViewMock,
                'echoView': EchoViewMock
            });

            testContext.injector.require(['controller'], function(Controller) {
                that.app = new Controller();
                that.app.showMe();
                done();
            });
        });

        describe('views are placed on the right div', function () {
            it('render inputView on #view div', function () {
                expect(testContext.stubs.inputViewInitialize)
                    .to.have.been.calledWith({ el: '#input' });
            });

            it('render echoView on #echo div', function () {
                expect(testContext.stubs.echoViewInitialize)
                    .to.have.been.calledWithMatch({ el: '#echo' });
            });
        });

        describe('echoView model', function () {
            it('is constructed with app model', function() {
                expect(testContext.stubs.echoViewInitialize)
                    .to.have.been.calledWithMatch({ model: this.app.model });
            });
        });

        describe('events', function () {
            it('updates model on every \'text:changed\' event', sinon.test(function () {
                sinon.stub(this.app.model, 'set');
                this.app.inputView.trigger('text:changed', 'New text');
                expect(this.app.model.set).to.have.been.calledWith('text', 'New text');
                this.app.inputView.trigger('text:changed', 'Another value');
                expect(this.app.model.set).to.have.been.calledWith('text', 'Another value');
            }));
        });
    });
});
