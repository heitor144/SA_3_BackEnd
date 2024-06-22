const taskModel = require("../models/taskModel");

class TaskController {

    // ----------------------------------------------------------------------------------------------
    // Integração API
    // ----------------------------------------------------------------------------------------------

    apiReadList(req, res) {
        const retorno = taskModel.apiReadList();
        return retorno
            .then((result) => result.length == 0
                ? res.status(404).send("Nenhuma tarefa foi encontrada!")
                : res.status(200).json(result)
            )
            .catch((error) => res.status(400).json(error.message));
    }

    apiRead(req, res) {
        const { id } = req.params;

        const retorno = taskModel.apiRead(id);
        return retorno
            .then((result) =>
                result.length == 0
                    ? res.status(404).send("Tarefa não encontrada!")
                    : res.status(200).json(result)
            )
            .catch((error) => res.status(400).json(error.message));
    }

    // Método para criar uma tarefa
    apiCreate(req, res) {
        // Obtém os dados da tarefa do corpo da requisição
        const reqBody = req.body;
        // Chama a função apiCreate() do modelo taskModel para criar uma tarefa
        const retorno = taskModel.apiCreate(reqBody);
        return retorno
            .then((result) =>
                res.status(201).send("Tarefa criada com sucesso!")
            )
            .catch((error) => res.status(400).json(error.message));
    }

    // Método para atualizar uma tarefa existente por ID
    apiUpdate(req, res) {
        // Obtém o parâmetro ID da requisição
        const { id } = req.params;
        // Obtém os dados atualizados da tarefa do corpo da requisição
        const reqBody = req.body;

        // Chama a função apiUpdate() do modelo taskModel para atualizar a tarefa com o ID fornecido
        const retorno = taskModel.apiUpdate(reqBody, id);
        return retorno
            .then((result) =>
                res.status(200).send("Tarefa atualizada com sucesso!")
            )
            .catch((error) => res.status(400).json(error.message));
    }


    // Método para excluir uma tarefa existente por ID
    apiDelete(req, res) {
        // Obtém o parâmetro ID da requisição
        const { id } = req.params;
        // Chama a função apiDelete() do modelo taskModel para excluir a tarefa com o ID fornecido
        const retorno = taskModel.apiDelete(id);
        return retorno
            .then((result) =>
                res.status(200).send("Tarefa deletada com sucesso!")
            )
            .catch((error) => res.status(400).json(error.message));
    }

    // ----------------------------------------------------------------------------------------------
    // Integração Front End x Back End
    // ----------------------------------------------------------------------------------------------

    // Método para visualizar o formulário de criação de uma nova tarefa
    viewCreate(req, res) {
        return res.status(200).render("./task/task_create", { title: "Adicionar tarefa" });
    }

    // Método para listar todas as tarefas
    viewReadList(req, res) {
        // Chama a função readList() do modelo taskModel para obter a lista de tarefas
        const tasksList = taskModel.readList();
        return tasksList
            .then((result) =>
                result.length == 0
                    ? res.status(404).render("./task/task_read", { title: "Tarefas", tasks: result, search: '' })
                    : res.status(200).render("./task/task_read", { title: "Tarefas", tasks: result, search: '' })
            )
            
            .catch((error) => res.status(400).send(error.message));
    }

    // Método para visualizar o formulário de atualização de uma tarefa existente
    viewUpdate(req, res) {
        // Obtém o parâmetro ID da requisição
        const { id } = req.params;
        // Chama a função read() do modelo taskModel para obter a tarefa com o ID fornecido
        const task = taskModel.read(id);
        return task
            .then((result) =>
                result.length == 0
                    ? res.status(404).redirect("/")
                    : res.status(200).render("./task", { title: "Atualizar Tarefa", tasks: result })
            )
            .catch((error) => res.status(400).send(error.message));
    }

    // Método para visualizar a página inicial
    viewHomePage(req, res) {
        
        const tasksList = taskModel.readList();
        return tasksList
            .then((result) =>
                result.length == 0
                    ? res.status(404).render("./index", { title: "Tarefas", tasks: result, search: '' })
                    : res.status(200).render("./index", { title: "Tarefas", tasks: result, search: '' })
            )
            
            .catch((error) => res.status(400).send(error.message));
    }

    // Método para criar uma nova tarefa
    create(req, res) {
        // Obtém os dados da nova tarefa do corpo da requisição
        const newTask = req.body;
        // Chama a função create() do modelo taskModel para criar uma nova tarefa
        const task = taskModel.create(newTask);
        return task
            .then((result) => {
                // Define uma mensagem de sucesso na sessão
                req.session.message = {
                    type: "success",
                    message: "Tarefa criada com sucesso!",
                }
                // Redireciona para a página de tarefas
                return res.status(201).redirect("./task");
            })
            .catch((error) => {
                // Define uma mensagem de erro na sessão
                req.session.message = {
                    type: "danger",
                    message: error.message,
                }
                // Redireciona para a página de tarefas
                return res.status(400).redirect("./task");
            });
    }

    // Método para atualizar uma tarefa existente por ID
    update(req, res) {
        // Obtém o parâmetro ID da requisição
        const { id } = req.params;
        // Obtém os dados atualizados da tarefa do corpo da requisição
        const updatedTask = req.body;
        // Chama a função update() do modelo taskModel para atualizar a tarefa com o ID fornecido
        const task = taskModel.update(updatedTask, id);
        return task
            .then((result) => {
                // Define uma mensagem de sucesso na sessão
                req.session.message = {
                    type: "success",
                    message: "Tarefa atualizada com sucesso!",
                }
                // Redireciona para a página de tarefas
                return res.status(200).redirect("../../task");
            })
            .catch((error) => {
                // Define uma mensagem de erro na sessão
                req.session.message = {
                    type: "danger",
                    message: error.message,
                }
                // Redireciona para a página de tarefas
                return res.status(400).redirect("../../task");
            });
    }

    // Método para excluir uma tarefa existente por ID
    delete(req, res) {
        // Obtém o parâmetro ID da requisição
        const { id } = req.params;
        // Chama a função delete() do modelo taskModel para excluir a tarefa com o ID fornecido
        const task = taskModel.delete(id);
        return task
            .then((result) => {
                // Define uma mensagem de sucesso na sessão
                req.session.message = {
                    type: "success",
                    message: "Tarefa excluída com sucesso!",
                }
                // Redireciona para a página de tarefas
                return res.status(200).redirect("../../task");
            })
            .catch((error) => {
                // Define uma mensagem de erro na sessão
                req.session.message = {
                    type: "danger",
                    message: error.message,
                }
                // Redireciona para a página de tarefas
                return res.status(400).redirect("../../task");
            });
    }

    
    // Método para pesquisar uma tarefa
    search(req, res) {
        // Obtém o valor digitado no campo de pesquisa
        const pesquisa = '%' + req.body.search + '%';
        // Chama a função search() do modelo taskModel para obter a lista de tarefas com base no que foi digitado no campo de pesquisa
        const tasksList = taskModel.search(pesquisa);
        return tasksList
            .then((result) =>
                result.length == 0
                    ? res.status(404).render("./", { title: "Tarefas", tasks: result, search: req.body.search })
                    : res.status(200).render("./", { title: "Tarefas", tasks: result, search: req.body.search })
            )
            .catch((error) => res.status(400).send(error.message));
    }
}

// Exporta uma instância da classe TaskController para ser utilizada em outros arquivos do projeto
module.exports = new TaskController();