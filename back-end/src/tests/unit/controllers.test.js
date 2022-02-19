/* eslint-disable max-lines */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable max-lines-per-function */
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const spies = require('chai-spies');
const chai = require('chai');

chai.use(spies);
chai.use(sinonChai);
const { expect } = chai;
const { ObjectId } = require('mongodb');
const { after, before, describe } = require('mocha');

const ID = ObjectId('6210e400d4cd634698aa47e3'); 

// SERVICES
const TasksService = require('../../services/tasks');

// CONTROLLERS
const TasksControllers = require('../../controllers/tasks');

const TASK = {
  title: 'Ir ao mercadso',
  description: 'Comprar feijao e farinha',
  createdAt: '2020-02-16',
  deadline: '2023-05-19',
  status: 'Pending',
};

const TASK_TO_UPDATE = {
  title: 'Ir afeira',
  description: 'comprar abacate',
  createdAt: '2020-02-16',
  deadline: '2023-05-19',
  status: 'Pending',
};

const EXPECTED_TASK = {
  title: 'Ir ao mercadso',
  description: 'Comprar feijao e farinha',
  createdAt: '2020-02-16',
  deadline: '2023-05-19',
  status: 'Pending',
  userId: '619cf05c1b42550e2b16h2cf',
  _id: new ObjectId('62104e7c97252a6342d0c7ff'),
};

describe('Testa a camada de controller para Tasks', () => {
  describe('Testa controllers.create', () => {
    describe('Quando a req enviada é válida', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = { ...TASK };
        request.user = { _id: '619cf05c1b42550e2b16h2cf' };
  
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns({ task: EXPECTED_TASK });
  
        sinon.stub(TasksService, 'create')
          .resolves(true);
      });
  
      after(() => {
        TasksService.create.restore();
      });
  
      it('é chamado o status com o código 201', async () => {
        await TasksControllers.create(request, response);
  
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
  
      it('é chamado o json com a mensagem "Filme criado com sucesso!"', async () => {
        await TasksControllers.create(request, response);
        const responseJSON = response.json();
  
        expect(responseJSON).to.be.deep.equal({ task: EXPECTED_TASK });
      });
    });
    describe('Quando a req enviada nao tem os campos corretos', () => {
      const response = {};
      const request = {};
      let countNextCalls = 0;
      const next = (e) => {
        if (e.message) countNextCalls += 1;
      }; 
  
      before(() => {
        request.body = {};
        request.user = { _id: '619cf05c1b42550e2b16h2cf' };
  
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
  
        sinon.stub(TasksService, 'create')
          .resolves();
      });
  
      after(() => {
        TasksService.create.restore();
      });
  
      it('Chama a função next', async () => {
        await TasksControllers.create(request, response, next);
        expect(countNextCalls).to.be.greaterThan(0);
      });
    });
    describe('Quando a req enviada não tem body ou user', () => {
      const response = {};
      const request = {};
      let countNextCalls = 0;
      const next = (e) => {
        if (e.message) countNextCalls += 1;
      }; 
  
      before(() => {
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
      });
  
      it('Chama a função next', async () => {
        await TasksControllers.create(request, response, next);
        expect(countNextCalls).to.be.greaterThan(0);
      });
    });
  });
  describe('Testa controllers.remove', () => {
    describe('Quando a req enviada é válida', () => {
      const response = {};
      const request = {};
  
      before(async () => {
        request.params = { id: ID };
  
        response.status = sinon.stub()
          .returns(response);
        response.end = sinon.stub()
          .returns();
        response.json = sinon.stub()
          .returns();
      });
  
      it('é chamado o status com o código 204', async () => {
        await TasksControllers.remove(request, response);
  
        expect(response.status.calledWith(204)).to.be.equal(true);
      });
    });
    describe('Quando a req enviada nao tem os campos corretos', () => {
      const response = {};
      const request = {};
      let countNextCalls = 0;
      const next = (e) => {
        if (e.message) countNextCalls += 1;
      }; 
  
      before(() => {
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
  
        sinon.stub(TasksService, 'create')
          .resolves({ error: 'BLALBALBLAL' });
      });
  
      after(() => {
        TasksService.create.restore();
      });
  
      it('Chama a função next', async () => {
        await TasksControllers.remove(request, response, next);
        expect(countNextCalls).to.be.greaterThan(0);
      });
    });
  });
  describe('Testa controllers.find', () => {
    describe('Testa procurar por uma task', () => {
      describe('Retorna um erro quando a task nao existe', () => {
        const response = {};
        const request = {};
        let countNextCalls = 0;
        const next = (e) => {
          if (e.message) countNextCalls += 1;
        }; 
    
        before(async () => {
          request.params = { id: ID };
          request.user = { _id: '619cf05c1b42550e2b16h2cf' };
    
          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns();
    
          sinon.stub(TasksService, 'find')
            .resolves(true);
        });

        after(() => {
          TasksService.find.restore();
        });
    
        it('é chamado o status com o código 204', async () => {
          await TasksControllers.find(request, response, next);
    
          expect(countNextCalls).to.be.greaterThan(0);
        });
      });
    });
    describe('Testa procurar por todas as tasks', () => {
      describe('Retorna todas as tasks do db', () => {
        const response = {};
        const request = {};
        let countNextCalls = 0;
        const next = (e) => {
          if (e.message) countNextCalls += 1;
        }; 
    
        before(async () => {
          request.user = { _id: '619cf05c1b42550e2b16h2cf' };
          request.params = { };
    
          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns([]);
        });
    
        it('a funcao next nao eh chamada', async () => {
          await TasksControllers.find(request, response, next);
    
          expect(countNextCalls).to.be.equals(0);
        });
        it('a funcao next nao eh chamada', async () => {
          await TasksControllers.find(request, response, next);
    
          expect(response.json()).to.be.an('array');
        });
      });
    });
  });
  describe('Testa controllers.update', () => {
    describe('Quando a req enviada é válida', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = { ...TASK_TO_UPDATE };
        request.user = { _id: '619cf05c1b42550e2b16h2cf' };
        request.params = { id: '62104e7c97252a6342d0c7ff' };
  
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns({ TASK_TO_UPDATE });
  
        sinon.stub(TasksService, 'update')
          .resolves(true);
      });
  
      after(() => {
        TasksService.update.restore();
      });
  
      it('é chamado o status com o código 200', async () => {
        await TasksControllers.update(request, response);
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o json com a mensagem "Filme criado com sucesso!"', async () => {
        await TasksControllers.create(request, response);
        const responseJSON = response.json();
  
        expect(responseJSON).to.be.deep.equal({ TASK_TO_UPDATE });
      });
    });
    describe('Quando a req enviada nao tem os campos corretos', () => {
      const response = {};
      const request = {};
      let countNextCalls = 0;
      const next = (e) => {
        if (e.message) countNextCalls += 1;
      }; 
  
      before(() => {
        request.body = {};
        request.user = { _id: '619cf05c1b42550e2b16h2cf' };
        request.params = { id: '62104e7c97252a6342d0c7ff' };
  
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
  
        sinon.stub(TasksService, 'update')
          .resolves();
      });
  
      after(() => {
        TasksService.update.restore();
      });
  
      it('Chama a função next', async () => {
        await TasksControllers.create(request, response, next);
        expect(countNextCalls).to.be.greaterThan(0);
      });
    });
    describe('Quando a req enviada não tem body ou user', () => {
      const response = {};
      const request = {};
      let countNextCalls = 0;
      const next = (e) => {
        if (e.message) countNextCalls += 1;
      }; 
    
      it('Chama a função next', async () => {
        await TasksControllers.create(request, response, next);
        expect(countNextCalls).to.be.greaterThan(0);
      });
    });
  });
});
