/* eslint-disable max-lines-per-function */
const sinon = require('sinon');
const { expect } = require('chai');
const { after, before, describe } = require('mocha');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoConnection = require('../../models/connection');

const find = require('../../models/find');
const remove = require('../../models/remove');
const create = require('../../models/create');
const update = require('../../models/update');

let connectionMock;
const startDBMock = async () => {
  const DBServer = await MongoMemoryServer.create();
  const URIMock = DBServer.getUri();
  connectionMock = await MongoClient
    .connect(URIMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('Ebytr'));

  sinon.stub(mongoConnection, 'connect').resolves(connectionMock);
};

describe('Testa comportamento da camada de models para tasks', async () => {
  const TASKS_COLLECTION = 'tasks';
  const USER_ID = '619cf05c1b42550e2b16h2cf';
  const TASK_0_ID = ObjectId('619cf05c1b42550e2b16e9cf');

  const expectedTasks = [ 
    {
      _id: ObjectId('619cf05c1b42550e2b16e9cf'),
      title: 'Ir ao mercado',
      description: 'Comprar feijao e farinha',
      createdAt: '2020-02-16',
      deadline: '2020-02-19',
      status: 'Pending',
      userId: '619cf05c1b42550e2b16h2cf',
    },
    {
      _id: ObjectId('619cf05c1b42550e2b16e1cf'),
      title: 'Ir ao circo',
      description: 'Comprar caminhao',
      createdAt: '2020-02-15',
      deadline: '2020-02-18',
      status: 'Pending',
      userId: '619cf05c1b42550e2b16h2cf',
    },
    {
      _id: ObjectId('619cf05c1b49950e2b16e1cf'),
      title: 'Ir ao mercado',
      description: 'Comprar ouro',
      createdAt: '2020-02-15',
      deadline: '2020-02-18',
      status: 'Pending',
      userId: '619cf05c1b42550e2b16h2cf',
    },
  ];

  before(() => startDBMock());

  after(() => {
    mongoConnection.connect.restore();
  });

  describe('Testa o comportamento do arquivo models.find', () => {
    describe('Quando a lista pedida existe', () => {
      before(async () => {
        await connectionMock.collection(TASKS_COLLECTION).insertMany(expectedTasks);
      });
  
      after(async () => {
        await connectionMock.collection(TASKS_COLLECTION).drop();
      });
  
      it('Retorna um array igual a constante "expectedProducts"', async () => {
        const response = await find(TASKS_COLLECTION, { userId: USER_ID });
        expect(response).to.be.deep.equal(expectedTasks);
      });
    });

    describe('Quando nao existe produtos, logo, nao existe lista.', () => {
      it('Retorna um array', async () => {
        const response = await find(TASKS_COLLECTION, { userId: USER_ID });
  
        expect(response).to.be.a('array');
      });
  
      it('Retorna um array vazio', async () => {
        const response = await find(TASKS_COLLECTION, { userId: USER_ID });
        expect(response).to.have.length(0);
      });
    });
  });

  describe('Testa o comportamento do arquivo models.remove', () => {
    describe('Quando existem tasks na colecao', () => {
      before(async () => {
        await connectionMock.collection(TASKS_COLLECTION).insertMany(expectedTasks);
      });
  
      after(async () => {
        await connectionMock.collection(TASKS_COLLECTION).drop();
      });
  
      it('Exclui o item escolhido', async () => {
        const deletedConfirmation = { acknowledged: true, deletedCount: 1 };
        const response = await remove(TASKS_COLLECTION, TASK_0_ID);
        expect(response).to.be.deep.equal(deletedConfirmation);
      });
    });
  });

  describe('Testa o comportamento do arquivo models.create', () => {
    describe('Quando a task é inserida com sucesso', () => {
      afterEach(async () => {
        await connectionMock.collection(TASKS_COLLECTION).drop();
      });

      it('Retorna um obj igual ao obj da posição 0 da const expectedProducts[0]', async () => {
        const response = await create(TASKS_COLLECTION, expectedTasks[0]);
  
        expect(response).to.be.deep.equal(expectedTasks[0]);
      });
    });
  });

  describe('Testa o comportamento do arquivo models.update', () => {
    describe('Quando o produto é atualizado com sucesso', () => {
      const taskToUpdate = {
        postId: ObjectId('619cf05c1b42550e2b16e9cf'),
        title: 'Ir ao aeroporto',
        description: 'Comprar dois kilo de feijao',
        createdAt: '2020-30-14',
        deadline: '2020-02-19',
        status: 'Ready',
        userId: '619cf05c1b42550e2b16h2cf',
      };

      const attResponse = {
        acknowledged: true,
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1,
      };

      beforeEach(async () => {
        await connectionMock.collection(TASKS_COLLECTION).insertMany(expectedTasks);
      });

      afterEach(async () => {
        await connectionMock.collection(TASKS_COLLECTION).drop();
      });

      it('Retorna um obj de resposta comprovando que ocorreu a alteracao solicitada', async () => {
        const response = await update(TASKS_COLLECTION, taskToUpdate);
  
        expect(response).to.be.deep.equal(attResponse);
      });
    });
  });
});

describe('Testa comportamento da camada de models para usuario', async () => {
  const USERS_COLLECTION = 'users';
  const USER_EMAIL = 'luisizin06@gotmal.com';

  const expectedUsers = [ 
    {
      _id: ObjectId('619cf05c1b42550e2b16e9cf'),
      name: 'Luiz Henrique',
      email: 'luisizin06@gotmal.com',
      password: '87654231',
    },
    {
      _id: ObjectId('619cf05c7442550e2b16e9cf'),
      name: 'Ir ao mercado',
      email: 'luiswadwan06@ootmal.com',
      password: '2020-02-16',
    }, 
    {
      _id: ObjectId('619cf05c1b42590e2b16e9cf'),
      name: 'Maria Carol',
      email: 'marycarol@gotmail.com',
      password: 'carmaria',
    },
  ];

  before(async () => startDBMock());

  after(() => {
    mongoConnection.connect.restore();
  });

  describe('Testa o comportamento do arquivo models.getUserByEmail', () => {
    describe('Quando o usuario pedido existe', () => {
      before(async () => {
        await connectionMock.collection(USERS_COLLECTION).insertMany(expectedUsers);
      });
  
      after(async () => {
        await connectionMock.collection(USERS_COLLECTION).drop();
      });
  
      it('Retorna o usuario da posicao 0 da const expectedUsers', async () => {
        const response = await find(USERS_COLLECTION, { email: USER_EMAIL });
        expect(response).to.be.deep.equal(expectedUsers);
      });
    });
  });

  describe('Testa o comportamento do arquivo models.create para usuarios', () => {
    describe('Quando o usuario é inserido com sucesso', () => {
      afterEach(async () => {
        await connectionMock.collection(USERS_COLLECTION).drop();
      });

      it('Retorna um obj igual ao obj da posição 0 da const expectedUsers[0]', async () => {
        const response = await create(USERS_COLLECTION, expectedUsers[0]);
  
        expect(response).to.be.deep.equal(expectedUsers[0]);
      });
    });
  });
});
