<!-- src/components/ListaItens.vue -->
<template>
  
    <div>
      <h1>Lista de Dados</h1>
      <ul>
        <li v-for="(item, index) in lista" :key="index">
          <strong>{{ item.nome }}</strong> - Idade: {{ item.idade }}
        </li>
      </ul>
      <!-- Outra lógica relacionada à exibição de itens aqui -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        lista: []
      };
    }
  };
  </script>
  