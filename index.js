const index = (options) => {
  if (!options) {
    throw new Error('Options is not defined');
  }

  if (!options.nodes || !Array.isArray(options.nodes)) {
    throw new Error('The array of "nodes" in options not defined or is not an Array');
  }
  const hubraft = require('./lib/hubraft')({
    heartbeatInterval: options.heartbeatInterval || 300,
    minElectionTimeout: options.minElectionTimeout || 800,
    maxElectionTimeout: options.maxElectionTimeout || 1000,
    name: options.name,
    host: options.host,
    port: options.port,
    nodes: options.nodes
  });
  return hubraft;
};

module.exports = {
  init: index
};
