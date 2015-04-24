import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ProgressActivity'],

  /**
   * Min value in range
   */
  min: 0,

  /**
   * Max value in range
   */
  max: 100,

  /**
   * Current value in range
   */
  value: 0,

  valueObserver: Ember.observer('value', function () {
    var max = this.get('max'),
        value = this.get('value');

    // Calculate percentage
    var percentage = (value / max) * 100;

    // Indicate change in value
    this.$('.ProgressActivity-bar').width(percentage + '%');
  }),

});
