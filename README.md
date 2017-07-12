### Installing

To install the module, open your project in the terminal and enter:

```javascript
npm install --save hubraft
```

### Starting

Afther install the module by npm, import it:

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

The key "raft" receive three items:

The first "heartbeat", informs to the module the interval in milliseconds of heartbeat to be sent by the leader of Hubraft.
Default value: 300.

The second is "minElection", it represents the minimum value to start the election.
Default value: 800.

The thrid and last ones are "maxElection", it represents the maximum value to start  the election.
Default value: 1000.

The key "me" receives the information from the current server , that is your machine/server what will receive/send heartbeats of servers if it's leader/follower  respectively, is required.

The key "servers" receives an array of objects to inform the servers which will be used on request heartbeat, is required.

Now just instanciate and pass the object created to the module.

```javascript
const hubraft = require('hubraft');

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

The Hubraft sends the following events :

- becomeLeader
- becomeFollower
- becomeCandidate

### - becomeLeader

When the server is elected leader the event "becomeLeader" is sent to other servers, and to apply some type to behavior, use this script:

```javascript
const hubraft = require('hubraft');

let options = {...};

const hub = hubraft.init(options);

hub.eventEmitter.on('becomeLeader', () => {
	// Start your system
});

```

### - becomeFollower

The event "becomeFollower" is sent when another server is elected leader, this way the current server is left in "Stand by", and just keeps listening to the leader's heartbeat

```javascript
const hubraft = require('hubraft');

let options = {...};

const hub = hubraft.init(options);

hub.eventEmitter.on('becomeFollower', () => {
	// Stop your system
});
```

### - becomeCandidate

The event "becomeCandidate" is sent when the server was a "Follower" and the leader stops sending the heartbeat, and by default when a server becomes a "Candidate", he automatically asks for an election.

##

It is the responsibility of the developer to pause and start their system based on Hubraft events.

### Run tests

To run test, just execute command

```javascript
npm test
```

The test usage ["jest"](http://facebook.github.io/jest/en/)
