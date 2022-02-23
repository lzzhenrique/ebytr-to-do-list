

# 🎯 The challenge:

  Make a task service to the colaborators of Ebytr.
  To accomplish that goal, my main tools were: Node.js, React and MongoDB.

## 🖥️ Using the application

    If you wanna visit the application, click [here](https://ebytr-to-do-list.vercel.app/).
    
    If you download them and check locally, just follow the Initial Setup topic.

## ⚙️ Initial Setup:
  Besides this tools that i comment above, this project consume others libraries to work properly. Follow the step-by-step below to install them.

  First, in your CLI, clone the project
  ```
  git clone git@github.com:lzzhenrique/ebytr-to-do-list.git
  ```
  After that, to install the back-end dependencies, use the follow command:
  ```
  cd ebytr-to-do-list/back-end
  npm i
  ```
  And, for install the front-end dependencies, comeback to the main folder and use the follow command:
  ```
  cd front-end
  npm i
  ```
  After this, make sure you mongoDB are active and working, to do that, use this command: 
  ```
  sudo service mongod start
  ```

  After the installations, your setup are monted!

## 📘  What this app do?

Users are able to:
  - Register using a valid email and passoword
  - Create tasks
  - Delete tasks
  - Edit tasks
  - Sort tasks alphabetically, by status and by date

## 🧪 Tests:
The application have a back-end unit tests, to run this tests, you just need run this in the back-end folder:
```
npm run test
```
