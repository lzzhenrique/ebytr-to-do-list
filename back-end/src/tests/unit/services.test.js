/* eslint-disable max-lines-per-function */
const sinon = require('sinon');
const { expect } = require('chai');
const { after, before, describe } = require('mocha');
const { ObjectId } = require('mongodb');
const errResponses = require('../utils/errResponses');
const { emptyFields } = require('../utils/errRequests');

// MODELS
const model = require('../../models')('tasks');

// SERVICES
const loginServices = require('../../services/login');
const tasksServices = require('../../services/tasks');
const usersServices = require('../../services/users');

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
    describe('Testa comportamento da camada ao se enviar uma requisição corretamente', () => {
      before(() => sinon.stub(model, 'create').resolves(EXPECTED_TASK));

      after(() => model.create.restore());
  
      it('Passa pela verificacoes do service e retorna a task criada', async () => {
        const response = await tasksServices.create(EXPECTED_TASK);
  
        expect(response).to.be.deep.equal(EXPECTED_TASK);
      });
    });

    describe('Testa comportamento da camada ao se enviar uma requisição incorretamente', () => {
      before(() => sinon.stub(model, 'create').resolves(EXPECTED_TASK));
      after(() => model.create.restore());

      it('Caso algum campo esteja vazio', async () => {
        for (let i = 0; i <= emptyFields.length; i += 1) {
          const response = tasksServices.create(emptyFields[i]);
          const resolveServiceResponse = Promise.resolve(response);

          resolveServiceResponse.then((solvedResp) => expect(solvedResp).to.have.key('error'));
        }
      });
    });
  });  
});