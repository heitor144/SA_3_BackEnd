const routerJobs = require("./jobRouter.js");

module.exports = function (app, express) {

  app.use(express.json());

  app.use(routerJobs);
};