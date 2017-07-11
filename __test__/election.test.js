const candidate = require('./../lib/candidate')({raft: {
  heartbeatInterval: 300,
  minElectionTimeout: 800,
  maxElectionTimeout: 1000
},
  me: {
    name: 'cluster1',
    host: 'localhost',
    port: 7070
  },
  servers: [{
    name: 'cluster2',
    host: 'localhost',
    port: 4040
  },
  {
    name: 'cluster3',
    host: 'localhost',
    port: 5050
  }]
});

test('Caso um servidor caia, uma nova eleição é iniciada', (done) => {
  const spawn = require('child_process').spawn;
  const firstHubraft = spawn('node',
    ['index.js',
      '5050', '7070', '9090', '4040']);
  firstHubraft.stdout.on('data', (data) => {
    setTimeout(() => {
      firstHubraft.kill();
    }, 2000);
  console.log(`stdout: ${data}`);
  });
  firstHubraft.on('error', (err) => {
    console.log(err)
  });
  setTimeout(() => {
    const secondHubraft = spawn('node',
      ['index.js',
        '4040', '7070', '9090', '5050']);
    secondHubraft.stdout.on('data', (data) => {
      setTimeout(() => {
        secondHubraft.kill();
      }, 2000);
      console.log(`stdout: ${data}`);
    });
    secondHubraft.on('error', (err) => {
      console.log(err);
    });
  }, 1000);
  expect.assertions(1);
  return candidate[1].requestElectionVotesAsync().then(resultElectionWithVotes => {
    expect(resultElectionWithVotes).toBe(0);
    done();
  });
});
