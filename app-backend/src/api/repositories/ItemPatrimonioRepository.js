const database = require("../../database/TempDatabase");
const Postagem = require("../../database/model/ItemPatrimonio");
const ItemRepoSeed = require("../../database/seed/ItemPatrimonioSeed");

class PostagemRepository{
    constructor(){
        // Quando definirmos o ORM, precisaremos adicionar o model aqui.
        // this.model = ItemPatrimonioModel;
        ItemRepoSeed(database); // Popula o nosso banco de dados temporário
        this.database = database;
    }

    async create(dados){
        const newItem = new Postagem({
            postagem: dados.postagem,
            descricao: dados.descricao,
          });
          
        database.addItem(newItem);
        return newItem;
    }

    async find(descricao){
        return database.findByPostagem(descricao);
    }

    async all(){
        return database.getAllItems();
    }

    async remove(postId){
        return database.removeByDescricao(postId);
    }
}

module.exports = new PostagemRepository();
