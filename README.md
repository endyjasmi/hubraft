### Installing

For install the module, open your project in terminal and enter:

```javascript
npm install --save hubraft
```

### Starting

Before install the module by npm, import it:

```javascript
const hubraft = require('hubraft');
```

The module receive an object in this structure:

```json
{
	"raft": {
    	"heartbeat": 300,
        "minElection": 1000,
        "maxElection": 1500
    },
    "me": {
    	"name": "Cluster 1",
        "host": "localhost",
        "port": 5000
    },
    "servers": [
    	{
        	"name": "Cluster 2",
            "host": "localhost",
            "port": 5001
        }
    ]
}
```

The key "raft" receive tree itens:

First "heartbeat", it's to inform to the module the interval in milliseconds of heartbeat to be send by the leader of Hubraft.
Default value: 300.

Second is "minElection", it represents the minimum value to start election.
Default value: 800.

Thrid and last is the "maxElection", it represents the maximum value to start election.
Default value: 1000.

The key "me", receive the information to current server , that is your machine/server what will receive/send heartbeats of servers if it's leader/follower  respectively.
Is required.

The key "servers", receive an array of objects for info the servers which will be used on request heartbeat.
Is required.

Now just instanciate and pass the object create for the module.

```javascript
const hubraft = require('./hubraft');

let options = {
  raft: {
    heartbeat: 400,
    minElection: 1000,
    maxElection: 1500
  },
  me: {
    name: 'Cluster 1',
    host: 'localhost',
    port: 5000
  },
  servers: [
    {
      name: 'Cluster 2',
      host: 'localhost',
      port: 5001
    }
  ]
}

const hub = hubraft.init(options)
```


### Usage

The Hubraft send the following events :

- becomeLeader
- becomeFollower
- becomeCandidate

### - becomeLeader

When the server is elected leader the event "becomeLeader" is send for other servers, and to apply some type to behavior, usage this script:

```javascript
const hubraft = require('./hubraft');

let options = {...};

const hub = hubraft.init(options);

hub.eventEmitter.on('becomeLeader', () => {
	// Start your system
});

```

### - becomeFollower

The event "becomeFollower", is send when another server is elected leader, this way the current server is left in "Stand by", and just stay listening the heartbeat of leader.

```javascript
const hubraft = require('./hubraft');

let options = {...};

const hub = hubraft.init(options);

hub.eventEmitter.on('becomeFollower', () => {
	// Stop your system
});
```

### - becomeCandidate

The event "becomeCandidate" is send wen the server was a "Follower" and the leader stop send heartbeat, and by default when a will come "Candidate", automatically asks for it election.

##

It is the responsibility of the developer to pause and start their system based on Hubraft events.

### Run tests

For run test, just execute command

```javascript
npm test
```

The test usage ["jest"](http://facebook.github.io/jest/en/)
