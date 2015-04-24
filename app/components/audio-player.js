import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['AudioPlayer'],

  init: function () {
    this._super();
    // TODO: This is not supposed to be here
    this.set('audio.track', { url: 'http://record.awdio.com:443/awdiosounds/awdio-nfm3wo5tmI0C_Spelsnackarna_2014_11_25.m4a' });
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
