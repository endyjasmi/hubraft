const hub = {
  serverPool: [],
  addServer: (server) => {
    hub.serverPool.push(server);
  },
  getAll: (server) => {
    return hub.serverPool;
  }
};

const hubInit = (options) => {
  for(let i = 0; i < options.servers.length; i++) {
    hub.addServer(options.servers[i]);
  }

  return hub;
};

module.exports = hubInit;
