/* eslint-disable max-lines-per-function */
const sinon = require('sinon');
const { expect } = require('chai');
const { after, before, describe } = require('mocha');
const { ObjectId } = require('mongodb');
const { emptyFields } = require('../utils/errRequests');

// MODELS
const model = require('../../models')('tasks');
const dropCollection = require('../../models/dropCollection');

// SERVICES
const loginServices = require('../../services/login');
const tasksServices = require('../../services/tasks');
const usersServices = require('../../services/users');

const TASK_UPDATED = {
  title: 'Ir ao circo',
  description: 'Comprar feijao e amendoin',
  createdAt: '2020-02-16',
  deadline: '2023-05-19',
  status: 'Pending',
  userId: '619cf05c1b42550e2b16h2cf',
  postId: '619cf05c1b49950e2b16e1cf',
};
const DELETED_CONFIRMATION = { acknowledged: true, deletedCount: 0 };
const EXPECTED_TASK = {
  title: 'Ir ao mercadso',
  description: 'Comprar feijao e farinha',
  createdAt: '2020-02-16',
  deadline: '2023-05-19',
  status: 'Pending',
  userId: '619cf05c1b42550e2b16h2cf',
};

describe('Testa cobertura de linhas da camada de services para tasks', () => {
  describe('Testa tasksService.create', () => {
    // eslint-disable-next-line sonarjs/no-duplicate-string
    describe('Testa comportamento da camada ao se enviar uma requisição corretamente', () => {
      it('Passa pela verificacoes do service e retorna a task criada', async () => {
        const response = await tasksServices.create(EXPECTED_TASK);
  
        expect(response).to.be.deep.equal(EXPECTED_TASK);
      });
    });

    describe('Testa comportamento da camada ao se enviar uma requisição incorretamente', () => {
      it('Caso algum campo esteja vazio', async () => {
        for (let i = 0; i <= emptyFields.length; i += 1) {
          const response = tasksServices.create(emptyFields[i]);
          const resolveServiceResponse = Promise.resolve(response);

          resolveServiceResponse.then((solvedResp) => expect(solvedResp).to.have.key('error'));
        }
      });
    });
  });

  describe('Testa tasksService.remove', () => {
    describe('Testa comportamento da camada ao se enviar uma requisição corretamente', () => {
      before(async () => {
        sinon.stub(model, 'remove').resolves(DELETED_CONFIRMATION);
      });

      after(() => model.remove.restore());
  
      it('Passa pela verificacoes do service e retorna a task criada', async () => {
        const id = ObjectId('619cf05c1b42550e2b16e9cf');
        const response = await tasksServices.remove(id);
        expect(response).to.be.deep.equal(DELETED_CONFIRMATION);

        // teste nao ta rolando do jeito que eu queria, preciso tirar essa duvida com alguem.
      });
    });
  });
  describe('Testa tasksService.find', () => {
    
  });
});