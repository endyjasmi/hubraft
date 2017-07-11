const Promise = require('bluebird');
const request = require('request');
const leaderInit = (options) => {
  const actions = {
    sendHeartbeat: () => {
      for(let server in options.servers) {
        request('http://' + options.servers[server].host + ':'
         + options.servers[server].port
         + '/heartbeat/' + options.me.name, { timeout: 1000 }, () => {
         });
      }
    }
  };

  Promise.promisifyAll(actions);

  const leader = {
    state: 'off',
    start: () => {
      leader.state = 'on';

      leader.heartbeatInterval = setInterval(() => {
        actions.sendHeartbeat();
      }, options.raft.heartbeatInterval);
    },
    stop: () => {
      leader.state = 'off';
      clearInterval(leader.heartbeatInterval);
    }
  };
  return [leader, actions];
};

module.exports = leaderInit;
