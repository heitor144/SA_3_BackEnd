const Router = require ("express").Router;

const router = Router();

const taskController = require ("../controllers/taskController.js");

// ----------------------------------------------------------------------------------------------
// Integração API
// ----------------------------------------------------------------------------------------------

router.get ("/api/task", taskController.apiReadList);

router.get ("/api/task/:id", taskController.apiRead);

router.post ("/api/task", taskController.apiCreate);

router.put ("/api/task/:id", taskController.apiUpdate);

router.delete ("/api/task/:id", taskController.apiDelete);

// ----------------------------------------------------------------------------------------------
// Integração Front End x Back End
// ----------------------------------------------------------------------------------------------

router.get ("/task/create", taskController.viewCreate);

router.get ("/task", taskController.viewReadList);

router.get ("/task/update/:id", taskController.viewUpdate);

router.get ("/", taskController.viewHomePage);

//router.post ("/task.search", taskController.search);

router.post ("/task", taskController.create);

router.post ("/task/:id", taskController.update);

router.get ("/task/delete/:id", taskController.delete);

module.exports = router;