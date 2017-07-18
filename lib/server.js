const restify = require('restify');
const hubraftServer = (options) => {
  const params = options.options;
  const server = restify.createServer();

  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());

  server.get('/heartbeat/:node', (req, res, next) => {
    res.send('ok');
    options.eventEmitter.emit('heartbeat');
    return next();
  });

  server.get('/requestVote/:node', (req, res, next) => {
    res.send('ok');
    options.eventEmitter.emit('requestVote');
    return next();
  });

  server.listen(params.port, () => {
    console.log('%s listening at %s:%s', params.name, params.host,
  params.port);
  });
};

module.exports = hubraftServer;
