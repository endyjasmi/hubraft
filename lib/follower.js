const followerInit = (options) => {
  const follower = {
    state: 'off',
    heartbeat: false,
    start: () => {
      follower.state = 'on';

      (function electionTimeoutLoop() {
        let electionTimeoutInterval = Math.round(Math.random()
         * (options.raft.maxElectionTimeout - options.raft.minElectionTimeout))
          + options.raft.minElectionTimeout;
        follower.electionTimeout = setTimeout(() => {
          console.log(follower.heartbeat);
          console.log(electionTimeoutInterval);

          if(!follower.heartbeat) {
            options.eventEmitter.emit('heartbeatTimeout');
          }

          if(follower.state === 'on') {
            electionTimeoutLoop();
          }
          follower.heartbeat = false;
        }, electionTimeoutInterval);
      }());
    },
    stop: () => {
      follower.state = 'off';
      clearTimeout(follower.electionTimeout);
    }
  };

  return follower;
};

module.exports = followerInit;
