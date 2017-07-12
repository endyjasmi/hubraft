const EventEmitter = require('events');
class HubRaftEmitter extends EventEmitter {}
const hubRaftEmitter = new HubRaftEmitter();

const hubraftInit = (options) => {
  class Hubraft {
    constructor() {
      this.hub = require('./hub')({
        nodes: options.nodes
      });

      this.server = require('./server')({
        options,
        eventEmitter: hubRaftEmitter
      });

      this.state = require('./state')({
        options,
        nodes: options.nodes,
        eventEmitter: hubRaftEmitter
      });

      this.eventEmitter = hubRaftEmitter;
    }
  }

  const hubraft = new Hubraft(options);
  setTimeout(() => {
    hubraft.eventEmitter.emit('init', options.me);
  }, 3000);
  return hubraft;
};

module.exports = hubraftInit;
