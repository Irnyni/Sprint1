<template>
  <div>
    <!-- <h1>Lista de Itens</h1> -->
    <ul>

    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [    { id: 1, nome: 'Item 1', descricao: 'Descrição do Item 1' },
        { id: 2, nome: 'Item 2', descricao: 'Descrição do Item 2' },], // Aqui você armazenará os itens que serão exibidos
    };
  },
  created() {
    // Aqui você buscará os itens da API ou de outra fonte de dados
    // Exemplo: this.$fetch('/api/items').then(data => { this.items = data; });
  },
};

</script>
