const topicController = require('../../controller/topics/topics.controller');

module.exports = function(app) {

    app.get("/topics/list", topicController.listar);
    app.get("/topics/:id", topicController.consultarPorCodigo);
    app.get("/topics/consuTopTem/:id", topicController.consultarTopicoDeTema);
    app.post("/topics/update", topicController.actualizar);
    app.delete("/topics/delete/:id", topicController.eliminar);
}