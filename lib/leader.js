const Promise = require('bluebird');
const request = require('request');
const leaderInit = (options) => {
  const actions = {
    sendHeartbeat: () => {
      for(let server in options.nodes) {
        request('http://' + options.nodes[server].host + ':'
         + options.nodes[server].port
         + '/heartbeat/' + options.name, { timeout: 1000 }, () => {
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
      }, options.heartbeatInterval);
    },
    stop: () => {
      leader.state = 'off';
      clearInterval(leader.heartbeatInterval);
    }
  };
  return [leader, actions];
};

module.exports = leaderInit;
