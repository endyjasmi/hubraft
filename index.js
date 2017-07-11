const index = (options) => {
  if (!options) {
    throw new Error('Options is not defined');
  }
  if (typeof options.raft !== undefined) {
    options.raft = {};
  }

  if (!options.me) {
    throw new Error('Key "me" in options is required');
  }

  if (!options.servers || !Array.isArray(options.servers)) {
    throw new Error('The array of "servers" in options not defined or is not an Array');
  }
  const hubraft = require('./lib/hubraft')({
    raft: {
      heartbeatInterval: options.raft.heartbeat || 300,
      minElectionTimeout: options.raft.minElection || 800,
      maxElectionTimeout: options.raft.maxElection || 1000
    },
    me: {
      name: options.me.name,
      host: options.me.host,
      port: options.me.port
    },
    servers: options.servers
  });
  return hubraft;
};

module.exports = {
  init: index
};
