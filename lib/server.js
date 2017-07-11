const restify = require('restify');
const hubraftServer = (options) => {
  const server = restify.createServer();

  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());

  server.get('/heartbeat/:node', function (req, res, next) {
    res.send('ok');
    options.eventEmitter.emit('heartbeat');
    return next();
  });

  server.get('/requestVote/:node', function (req, res, next) {
    res.send('ok');
    options.eventEmitter.emit('requestVote');
    return next();
  });

  server.listen(options.me.port, function () {
    console.log('%s listening at %s:%s', options.me.name, options.me.host,
  options.me.port);
  });
};

module.exports = hubraftServer;
