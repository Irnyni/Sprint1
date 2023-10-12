const database = require("../../database/TempDatabase");
const ItemPatrimonio = require("../../database/model/ItemPatrimonio");
const ItemRepoSeed = require("../../database/seed/ItemPatrimonioSeed");

class PostagemRepository{
    constructor(){
        // Quando definirmos o ORM, precisaremos adicionar o model aqui.
        // this.model = ItemPatrimonioModel;
        ItemRepoSeed(database); // Popula o nosso banco de dados temporário
        this.database = database;
    }

    async create(dados){
        const newItem = new Postagem(
            (postagem= dados.postagem),
            (descricao = dados.descricao),

          )
        database.addItem(newItem);
        return newItem;
    }

    async find(itemDescricao){
        return database.findByPostagem(itemDescricao);
    }

    async all(){
        return database.getAllItems();
    }

    async remove(patrimonioId){
        return database.removeByPatrimonio(patrimonioId);
    }
}

module.exports = new PostagemRepository();
