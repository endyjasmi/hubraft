const candidate = require('./../lib/candidate')({
  heartbeatInterval: 300,
  minElectionTimeout: 800,
  maxElectionTimeout: 1000,
  name: 'cluster1',
  host: 'localhost',
  port: 9990,
  nodes: [{
    name: 'cluster2',
    host: 'localhost',
    port: 9991
  }]
});

test('Checking votes without another server On! Who started should become the leader', () => {
  expect.assertions(1);
  return candidate[1].startElectionAsync().then(resultElection => {
    expect(resultElection).toBe(true);
  });
});


test('Checking votes if you have another servers ON', () => {
  expect.assertions(1);
  const vm = require('vm');
  const sandbox = { globalvar: 1 };
  vm.createContext(sandbox);
  const code = `
  (function(require) {
    const hubraft = require('./../lib/hubraft')({
        heartbeatInterval:300,
        minElectionTimeout:800,
        maxElectionTimeout:1000,
        name:'cluster2',
        host:'localhost',
        port: 9991,
        nodes: [{
          name: 'cluster1',
          host: 'localhost',
          port: 9990
        }]
      })
      return false;
  })`;
  vm.runInContext(code, sandbox)(require);
  return candidate[1].requestElectionVotesAsync().then(resultElection => {
    expect(resultElection).toBe(1);
  });
});
