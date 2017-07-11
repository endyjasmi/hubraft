const stateInit = (options) => {
  const state = {
    follower: require('./follower')(options),
    candidate: require('./candidate')(options),
    leader: require('./leader')(options)
  };

  const actions = {
    becomeFollower: () => {
      state.candidate[0].stop();
      state.leader[0].stop();
      state.follower.start();
      state.current = 'follower';
      options.eventEmitter.emit('becomeFollower');
    },
    becomeCandidate: () => {
      state.follower.stop();
      state.leader[0].stop();
      state.candidate[0].start();
      state.current = 'candidate';
      options.eventEmitter.emit('becomeCandidate');
    },
    becomeLeader: () => {
      state.follower.stop();
      state.leader[0].stop();
      state.leader[0].start();
      state.current = 'leader';
      options.eventEmitter.emit('becomeLeader');
    }
  };

  actions.becomeFollower();

  options.eventEmitter.on('heartbeat', () => {
    if(state.current !== 'follower') {
      actions.becomeFollower();
    }
    state.follower.heartbeat = true;
  });

  options.eventEmitter.on('heartbeatTimeout', () => {
    if(state.current !== 'candidate') {
      actions.becomeCandidate();
    }
  });

  options.eventEmitter.on('leader', () => {
    if (state.current === 'candidate') {
      actions.becomeLeader();
    }
  });

  return state;
};

module.exports = stateInit;
