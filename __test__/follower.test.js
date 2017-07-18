const follower = require('../lib/follower')({
  options:{
    heartbeatInterval: 300,
    minElectionTimeout: 800,
    maxElectionTimeout: 1000,
    name: 'cluster2',
    host: 'localhost',
    port: 9991,
    nodes: [{
      name: 'cluster1',
      host: 'localhost',
      port: 9990},
    {
      name: 'cluster3',
      host: 'localhost',
      port: 9992
    }]
  }
});

test('Receive heartbeat from another server', () => {
  expect(follower.start()).toBeUndefined();
});
