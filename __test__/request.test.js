const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const server = {
  name: 'cluster3',
  host: 'localhost',
  port: 9992,
  nodes: [{
    name: 'cluster2',
    host: 'localhost',
    port: 9991
  },
  {
    name: 'cluster1',
    host: 'localhost',
    port: 9990
  }]
};

test('Request heartbeat', () => {
  setTimeout(() => {
    expect.assertions(1);
    return request.getAsync('http://' + server.nodes[1].host + ':'
     + server.nodes[1].port
     + '/heartbeat/' + server.name, { timeout: 1000 }).then((a) => {
       expect(a).toBe('"ok"');
     }).catch(e => {
       console.log(e);
     });
  }, 2000);
});
