<!-- src/components/CriarItem.vue -->
<template>
    <div>
      <h2>Criar Novo Item</h2>
      <form @submit.prevent="createNewItem">
        <div>
          <label for="descricao">Descrição:</label>
          <input type="text" id="descricao" v-model="novoItem.descricao" />
        </div>
        <div>
          <label for="post">Post:</label>
          <textarea id="post" v-model="novoItem.post"></textarea>
        </div>
        <div>
          <button type="submit">Criar</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        novoItem: {
          descricao: "",
          postagem: ""
        }
      };
    },
    methods: {
      createNewItem() {
        // Verifique se a descrição e o post não estão vazios
        if (!this.novoItem.descricao || !this.novoItem.postagem) {
          alert("Por favor, preencha todos os campos.");
          return;
        }
  
        // Crie um novo objeto com os dados do novo item
        const novoItemObj = {
          descricao: this.novoItem.descricao,
          post: this.novoItem.postagem
        };
  
        // Em vez de alert, você pode adicionar o novo item a uma lista ou enviar para um servidor
        // Exemplo de adição a uma lista fictícia (você pode ter uma lista real no estado do Vuex ou em outro lugar)
        this.$store.commit("adicionarItem", novoItemObj);
  
        // Limpe o formulário
        this.novoItem.descricao = "";
        this.novoItem.postagem = "";
  
        // Opcional: redirecionar para a página de lista de itens ou exibir uma mensagem de sucesso
        this.$router.push("/lista-itens");
      }
    }
  };
  </script>
  