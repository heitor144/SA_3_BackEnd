const routerTasks = require("./taskRouter.js");

module.exports = function (app, express) {

  app.use(express.json());

  app.use(routerTasks);
};