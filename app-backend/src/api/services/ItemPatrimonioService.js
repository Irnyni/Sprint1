
const PostRepository = require("../repositories/PostRepository");

module.exports = {
    getAllPost: async function (){
        const data = await PostRepository.all();
        return data;
    },

    getPostById: async function (postagemId){
        const data = await PostRepository.find(postagemId);
        return data;
    },

    addNewPost: async function (Postagem){
        const data = await PostRepository.create(Postagem);
        if(data) return {status: "Item criado com sucesso."}
        else return {status: "Não foi possível criar o item"}
    },
    
    removePostById: async function(postagemId) {
        const status = await PostRepository.remove(postagemId);
        if(status) return {status: "Item removido com sucesso."}
        else return {status: "Item não encontrado."}
    }
}
