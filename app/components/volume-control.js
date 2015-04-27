import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['VolumeControl'],

  /**
   * Minimum value in range
   */
  min: 0,

  /**
   * Maximum value in range
   */
  max: 1,

  /**
   * Steps in range
   */
  step: 0.1,

  /**
   * Current value in range
   */
  value: 0,

  initHandlers: function () {
    // Handle events on the range input
    this.$('input').on('change input', function (e) {
      this._handleChange(e);
    }.bind(this));
  }.on('didInsertElement'),

  /**
   * Observes changes in value
   */
  valueObserver: Ember.observer('value', function () {
    var value = this.get('value');

    // Set range track values
    var fraction = (value - this.get('min')) / (this.get('max') - this.get('min'));

    this.$('div.VolumeControl-track--lower')[0].style.flex = fraction;
    this.$('div.VolumeControl-track--upper')[0].style.flex = 1 - fraction;

    // Change volume in audio service
    this.set('audio.volume', value);
  }),

  /**
   * Handles change events on the range input
   */
  _handleChange: function (e) {
    var input = e.target,
        value = input.value;

    // This will fire twice in Chrome and FF, so make sure it's only handled once
    Ember.run.once(this, 'set', 'value', value);
  }
});
