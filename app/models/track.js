import DS from 'ember-data';

var Track = DS.Model.extend({
  name: DS.attr('string'),
  url: DS.attr('string')
});

Track.reopenClass({
  FIXTURES: [
    { id: 1, name: 'MP3', url: 'http://hpr.dogphilosophy.net/test/mp3.mp3' },
    { id: 2, name: 'WAV', url: 'http://hpr.dogphilosophy.net/test/wav.wav' },
    { id: 3, name: 'OGG', url: 'http://hpr.dogphilosophy.net/test/ogg.ogg' }
  ]
});

export default Track;
