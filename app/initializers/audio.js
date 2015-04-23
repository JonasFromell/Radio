export default {
  name: 'audio',

  initialize: function (container, application) {
    // Inject service
    application.inject('component', 'audio', 'service:audio');
  }
}
