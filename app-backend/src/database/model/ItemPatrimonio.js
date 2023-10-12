class Postagem {
    constructor(descricao, postagem) {
        this.descricao = descricao ;
        this.postagem = postagem;
        this.itemTipo = typeof(itemTipo) === "object" ? itemTipo : {
            nome: itemTipo,           
            descricao: "None",        
            imagem: 'https://images.unsplash.com/photo-1602506860730-b690f1a6f662?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
        };

    }
}

module.exports = Postagem;