const Postagem= require("./model/ItemPatrimonio");

// Classe que serve de banco de dados temporário. Será substituído pelo ORM.
class TempDatabase {
    constructor() {
        this.items = []
    }

    getAllItems() {
        return this.items;
    }

    addItem(novoItem) {
        if(novoItem instanceof Postagem){
            this.items.push(novoItem)
        }else{
            throw Error("DB: Objeto não é do tipo Postagem")
        }
    }

     findByPostagem(postagem) {
           return this.items.filter(item => item.postagem === postagem)[0];
     }

    removeByPostagem(postagem) {
        let item = this.items.splice(this.items.findIndex(item => item.postagem === postagem), 1);
        return item;
    }
}

let banco = new TempDatabase();

module.exports = banco;