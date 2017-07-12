const hub = {
  serverPool: [],
  addServer: (node) => {
    hub.serverPool.push(node);
  },
  getAll: (node) => {
    return hub.serverPool;
  }
};

const hubInit = (options) => {
  for(let i = 0; i < options.nodes.length; i++) {
    hub.addServer(options.nodes[i]);
  }

  return hub;
};

module.exports = hubInit;
