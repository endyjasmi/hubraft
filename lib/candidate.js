const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));

const candidateInit = (options) => {
  const actions = {
    startElection: (callback) => {
      setTimeout(() => {
        actions.requestElectionVotesAsync().then(resultRequest => {
          if (resultRequest) {
            candidate.vote += resultRequest;
          }
          actions.countVotesAsync(candidate.vote).then((resultElection) => {
            callback(false, resultElection);
          });
        });
      }, 500);
    },
    countVotes: (votes, callback) => {
      setTimeout(() => {
        if (votes === parseInt((options.servers.length + 1) / 2) + 1) {
          console.log('You are can the leader');
          return callback(false, true);
        } else if (votes === 1) {
          console.log('You are can the leader, but check the others servers');
          return callback(false, true);
        } else {
          return callback(false, false);
        }
      }, 300);
    },
    sendRequestVote: (server, callback) => {
      request.getAsync('http://' + server.host + ':' + server.port + '/requestVote/'
        + server.name, { timeout: 1000 }).then((res) => {
          callback(false, res.body);
        }).catch(err => {
          callback(true, err);
        });
    },
    requestElectionVotes: (callback) => {
      let servers = options.servers;
      let serversMap = servers.map((server) => {
        return actions.sendRequestVoteAsync(server).reflect();
      });
      let votesServers = 0;
      Promise.all(serversMap).map(body => {
        if(body.isFulfilled()) {
          return votesServers++;
        } else {
          return null;
        }
      }).then(() => {
        callback(false, votesServers);
      });
    }
  };

  Promise.promisifyAll(actions);

  const candidate = {
    state: 'off',
    vote: 1,
    start: () => {
      candidate.state = 'on';

      actions.startElectionAsync().then((r) => {
        if (r) {
          console.log('Send leader event');
          options.eventEmitter.emit('leader');
          candidate.vote = 1;
        } else {
          console.log('A new election begins');
        }
      });
    },
    stop: () => {
      candidate.state = 'off';
    }
  };
  return [candidate, actions];
};

module.exports = candidateInit;
