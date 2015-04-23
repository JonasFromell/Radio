import Ember from 'ember';

export default Ember.Component.extend({

  init: function () {
    this._super();

    this.set('audio.track', { url: 'http://hpr.dogphilosophy.net/test/mp3.mp3' });
  },

  // Declare actions
  actions: {
    toggle: function () {
      var playing = this.get('audio.playing');

      if (playing) {
        this.audio.pause();
      }
      else {
        this.audio.play();
      }
    }
  }

});
