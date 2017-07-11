const EventEmitter = require('events');
class HubRaftEmitter extends EventEmitter {}
const hubRaftEmitter = new HubRaftEmitter();

const hubraftInit = (options) => {
  class Hubraft {
    constructor() {
      this.hub = require('./hub')({
        servers: options.servers
      });

      this.server = require('./server')({
        me: options.me,
        eventEmitter: hubRaftEmitter
      });

      this.state = require('./state')({
        me: options.me,
        raft: options.raft,
        servers: options.servers,
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
