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
  max: 100,


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

    console.log(value);
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
