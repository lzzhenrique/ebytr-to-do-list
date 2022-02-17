# 🎯 O desafio 

Construir um serviço de tasks para as pessoas colaboradoras da empresa Ebytr.
Para atingir o desafio proposto, as principais ferramentas utilizadas foram: Node.js, React e Mongodb

___
## ⚙️ Setup inicial:

Além das ferramentas citadas acima, esse projeto também utiliza outras bibliotecas, para atingir seu potencial pleno. Siga o passo a passo abaixo para instalá-las:

Primeiro, em seu terminal, clone o projeto:
```
git clone git@github.com:lzzhenrique/ebytr-to-do-list.git
```
Após isso, para instalar as dependencias de back-end cole o comando a seguir:
```
cd ebytr-to-do-list/back-end
npm i
```
Agora, volte para a pasta raiz com:
```
cd ..
```
E para instalar as dependencias de front-end cole o comando a seguir:
```
cd front-end
npm i
```

Em seguida, certifique-se que seu mongoDB está ativado e funcionando, para isso, use o comandos a seguir: 
```
sudo service mongod start
```

Aguarde as instalações, e pronto! Setup montado 😀

___
## 🖥️ Usando a aplicação

Agora que você tem o projeto e as suas dependencias instalados, para rodar ele, volte para a pasta raiz do projeto e siga os seguintes comandos:

```
cd back-end
node src/api/server.js
```
Após isso, abra um segundo terminal no seu computador, esse terminal será o responsavel por rodar o nosso front-end. Dá pasta raiz desse segundo terminal, execute o seguinte comando
```
cd front-end
npm start
```

Executando esses comandos, o nosso front-end irá começar a funcionar na [porta 3000](http://localhost:3000) do seu computador, automaticamente uma janela do seu navegador será aberta, te levando para a pagina de login da aplicação.

___
## 📘 Como a aplicação funciona?

O funcionamento da todo-list-ebytr é simples e direto ao ponto, primeiro você precisa criar um usuario, acessando o botão de **REGISTER** na tela de login, e após ter um usuario cadastrado e autorizado, você pode fazer Login na nossa aplicação e começar a salvar, editar e excluir tarefas.

A aplicação também te dá a opção de organizar suas tarefas por: ordem alfabetica, data de criação e status.

___
## 🧪 Testes:

Atualmente, a aplicação conta com testagem na camada de modelos de back-end, para executar os testes, basta seguir o seguinte comando.
```
cd back-end
npm run test
```

## 👣 Próximos passos:

Os próximos passos da aplicação envolvem:
- Concluir testes unitarios de back-end
- Concluir testes unitarios de front-end
- Refinar a estilização da aplicação, adicionando fontes e mais detalhes aos componentes
- Design responsivo 