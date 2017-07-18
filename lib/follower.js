const followerInit = (options) => {
  const params = options.options;
  const follower = {
    state: 'off',
    heartbeat: false,
    start: () => {
      follower.state = 'on';

      (function electionTimeoutLoop() {
        let electionTimeoutInterval = Math.round(Math.random()
         * (params.maxElectionTimeout - params.minElectionTimeout))
          + params.minElectionTimeout;
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
