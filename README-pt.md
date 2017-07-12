# Hubraft

### Instalando

Para instalar o módulo, abra seu projeto no terminal e digite :

```javascript
npm install --save hubraft
```

### Iniciando

Após instalar o modulo via npm, importe o mesmo:

```javascript
const hubraft = require('hubraft');
```

O módulo deve receber um objeto nesta estrutura para que o mesmo funcione:

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
O objeto "raft" recebe três itens:
O primeiro "heartbeat" é para informar ao módulo o intervalo em milisegundos dos heartbeat que serão emitidos pelo líder do Hubraft.
Valor padrão 300.

O segundo é o "minElection", ele representa o valor minimo para iniciar uma eleição.
Valor padrão 800.

O terceito e ultimo é o "maxElection", como o próprio nome diz é o valor máximo para iniciar uma eleição.
Valor padrão 1000.

O objeto "me", recebe as informações do servidor atual, ou seja da sua própria maquina que irá emitir/receber heartbeats dos servidores caso seja lider/follower respectivamente.
Sempre necessário.

O objeto "servers" recebe um array de objetos para informar os servidores que serão chamados/usados na request do heartbeat.
Sempre necessário.

Agora basta instânciar e passar o objeto criado para o módulo.


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

### Usando

O Hubraft emite os seguintes eventos:

- becomeLeader
- becomeFollower
- becomeCandidate

#### - becomeLeader

Quando o servidor é eleito líder, o evento "becomeLeader" é emitido, e para aplicar algum tipo de comportamento use o seguinte script no arquivo que o Hubraft foi instanciado :

```javascript
const hubraft = require('hubraft');

let options = {...};

const hub = hubraft.init(options);

hub.eventEmitter.on('becomeLeader', () => {
	console.log('Aqui o init do seu sistema/serviço')
});

```

#### - becomeFollower

O evento "becomeFollower" é emitido quando outro servidor é eleito líder, desta forma o servidor atual é deixado em "Stand by", e só fica escutando o heartbeat do líder.


```javascript
const hubraft = require('hubraft');

let options = {...};

const hub = hubraft.init(options);

hub.eventEmitter.on('becomeFollower', () => {
	console.log('Aqui o stop do seu sistema/serviço')
});
```
#### - becomeCandidate

O evento "becomeCandidate" é emitido quando o servidor era um "Follower" e o líder deixa de emitir heartbeat, e por padrão quando um servidor vira "Candidate", automáticamente ele solicita uma eleição para se tornar lider.

##
Fica sob responsabilidade do desenvolvedor pausar e iniciar seu sistema com base nos eventos do Hubraft.

### Testes

Para rodar os testes, basta executar o comando:

```javascript
npm test
```

Os testes utilizam ["jest"](http://facebook.github.io/jest/pt-BR/)
