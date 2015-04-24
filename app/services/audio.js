import Ember from 'ember';

export default Ember.Object.extend({

  init: function () {
    this._super();

    /**
     * Sets up an Audio context, with handlers for usual events
     */
    var context = new Audio();

    /**
     * Fired when loading of media starts
     */
    context.addEventListener('loadstart', function (e) {
      this._loadStarted(e);
    }.bind(this));

    /**
     * Fired when loading the media has progressed
     */
    context.addEventListener('progress', function (e) {
      this._loadProgressed(e);
    }.bind(this));

    /**
     * Fired when media metadata is loaded
     */
    context.addEventListener('loadedmetadata', function (e) {
      this._metadataLoaded(e);
    }.bind(this));

    /**
     * Fired when enough of the media has loaded to be able to play
     */
    context.addEventListener('canplay', function (e) {
      this._canPlay(e);
    }.bind(this));

    /**
     * Fired as media is being played
     */
    context.addEventListener('timeupdate', function (e) {
      this._timeUpdated(e);
    }.bind(this));

    this.set('context', context);
  },

  /**
   * Flag playback state
   *
   * @prop { Boolean }
   */
  playing: false,

  /**
   * Track to be played
   *
   * @prop { Object }
   */
  track: null,

  /**
   * Duration of current track
   *
   * @prop { Number }
   */
  duration: 0,

  /**
   * Buffered amount of current track
   *
   * @prop { Number }
   */
  buffered: 0,

  /**
   * Progressed amount of current track
   *
   * @prop { Number }
   */
  progress: 0,

  /**
   * Observes changes to track and sets up the context to play it
   */
  trackObserver: Ember.observer('track', function () {
    console.log('observer triggered');

    var track = this.get('track'),
        context = this.get('context');

    // Set source file on context
    context.src = track.url;
  }),

  /**
   * Starts playback
   */
  play: function () {
    var playing = this.get('playing'),
        context = this.get('context');

    if (!playing) {
      context.play();

      this.set('playing', true);
    }
  },

  /**
   * Pauses playback
   */
  pause: function () {
    var playing = this.get('playing'),
        context = this.get('context');

    if (playing) {
      context.pause();

      this.set('playing', false);
    }
  },

  /**
   * Seeks to supplied time
   *
   * @param time { Number }
   */
  seek: function (time) {

  },

  /**
   * Callback for `canplay` event
   */
  _canPlay: function (e) {
    // This mimics `autoplay=true` but gives a little more control
    var playing = this.get('playing'),
        context = this.get('context');

    if (playing) {
      this.pause();
    }

    this.play();
  },

  /**
   * Callback for `metadataloaded` event
   */
  _metadataLoaded: function (e) {
    var context = this.get('context'),
        duration = context.duration;

    this.set('duration', duration);
  },

  /**
   * Callback for `progress` event
   */
  _loadProgressed: function (e) {
    var context = this.get('context');

    // Loop over ranges, putting them into an array structure
    var ranges = [];

    for (var i=0; i<context.buffered.length; i++) {
      ranges.push([
        context.buffered.start(i),
        context.buffered.end(i)
      ]);
    }

    // TODO: Handle this better (edge cases include, multiple ranges)
    this.set('buffered', ranges[0][1]);
  },

  /**
   * Callback for `loadstart` event
   */
  _loadStarted: function (e) {
    // Reset some states
    this.set('duration', 0);
    this.set('buffered', 0);
    this.set('progress', 0);
  },

  /**
   * Callback for `timeupdate` event
   */
  _timeUpdated: function (e) {
    var context = this.get('context');

    this.set('progress', context.currentTime);
  }
});
