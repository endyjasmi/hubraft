const Promise = require('bluebird');
const request = require('request');
const leaderInit = (leaderParams) => {
  const actions = {
    sendHeartbeat: () => {
      for(let server in leaderParams.nodes) {
        request('http://' + leaderParams.nodes[server].host + ':'
         + leaderParams.nodes[server].port
         + '/heartbeat/' + leaderParams.options.name, { timeout: 1000 }, () => {
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
      }, leaderParams.options.heartbeatInterval);
    },
    stop: () => {
      leader.state = 'off';
      clearInterval(leader.heartbeatInterval);
    }
  };
  return [leader, actions];
};

module.exports = leaderInit;
