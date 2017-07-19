### Hubraft concepts
Hubraft is a NodeJs partial implementation of [The Raft Consensus Algorithm](https://raft.github.io), aiming to fullfil the needs of resilient applications that can't run in parallel.

![alt text](http://danehans.github.io/v3_presentation/images/etcd_raft_consensus.gif "Logo Title Text 1")

Hubraft does the election of nodes when the leader stop sending hearbeats, but **does not implements data replication**.

### Install
```javascript
npm install --save @pontal/hubraft
```
### Initializing

```javascript
const hubraft = require('@pontal/hubraft')(
    heartbeatInterval: 300, // optional
    minElectionTimeout: 800, // optional
    maxElectionTimeout: 1000, // optional
    name: 'master', // required
    host: 'master.example.com', // required
    port: 9899, // required
    nodes: [{ // required
        name: 'backup1',
        host: 'backup1.example.com',
        port: 9899,
    }, {
        name: 'backup2',
        host: 'backup2.example.com',
        port: 9899,
    }]
);
```

### Options
* `heartbeatInterval`: (optional) in milliseconds, defaults to 300ms
* `minElectionTimeout`: (optional) in milliseconds, defaults to 800ms
* `maxElectionTimeout`: (optional) in milliseconds, defaults to 1000ms
* `name`: (required) slug that identifies the application node
* `host`: (required) the hostname/ip which application is running
* `port`: (required) port which hubraft should listen  
* `nodes`: (required) other nodes of the application (array of name, host, port objects)  

### How it works

The Hubraft emits the following events :

- becomeLeader
- becomeFollower
- becomeCandidate

#### - becomeLeader

When the server is elected leader the event "becomeLeader" is sent to other servers, and to apply some type to behavior, use this script:

```javascript
const hubraft = require('@pontal/hubraft');

let options = {...};

const hub = hubraft.init(options);

hub.eventEmitter.on('becomeLeader', () => {
	// Start your application
}); 

```

#### - becomeFollower

The event "becomeFollower" is sent when another server is elected leader, this way the current server is left in "Stand by", and just keeps listening to the leader's heartbeat

```javascript
const hubraft = require('@pontal/hubraft');

let options = {...};

const hub = hubraft.init(options);

hub.eventEmitter.on('becomeFollower', () => {
	// Stop your system
});
```

#### - becomeCandidate

The event "becomeCandidate" is sent when the server was a "Follower" and the leader stops sending the heartbeat, and by default when a server becomes a "Candidate", he automatically asks for an election.

### Tests

["Jest"](http://facebook.github.io/jest/en/) needed.

```javascript
npm test
```
