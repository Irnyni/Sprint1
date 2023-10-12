<template>
    <div>
      <!-- Navegação -->
      <v-app-bar :elevation="50" color="black" dark>
        <v-app-bar-title class="ml-7">GeekStation</v-app-bar-title>
  
        <v-btn @click="openCardView()" color="white" text>
          <NuxtLink to="/perfil" class="link-no-bold">Perfil</NuxtLink>
  
        </v-btn>
  
        <v-btn @click="openTabView()" color="white" text>
            <NuxtLink to="/" class="link-no-bold">POST</NuxtLink>
  
        </v-btn>
        <!-- Modal para inserir novo -->
        <v-dialog id="modal-novo-item" variant="tonal">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text color="white">Criar post</v-btn>
          </template>
  
          <template v-slot:default="{ isActive }">
            <v-card title="CRIAR NOVO">
              <v-container>
                <v-form v-on:submit.prevent="createNewItem">
                  <label class="mr-sm-2" for="input-descricao">Descrição:</label>
                  <v-text-field
                    id="input-patrimonio"
                    v-model="novoItem.descricao"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    placeholder="Insira a descrição do seu post"
                  ></v-text-field>
  
                  <label class="mr-sm-2" for="input-texto">Post:</label>
                  <v-textarea
                    id="post"
                    v-model="novoItem.post"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    placeholder="Escreva seu post"
                  ></v-textarea>
                  <v-file-input
        v-model="imagem" 
        label="Carregar Imagem" 
        accept="image/*" 
        @change="handleFileUpload" 
      ></v-file-input>
                  <v-divider></v-divider>
  
                  <div class="pa4">
                    <v-row>
                      <v-col>
                        <v-btn type="submit" color="blue" variant="elevated" @click="isActive.value = false">Criar</v-btn>
                      </v-col>
                      <v-col>
                        <v-btn type="reset" color="red" variant="elevated">Limpar</v-btn>
                      </v-col>
                    </v-row>
                  </div>
                </v-form>
              </v-container>
            </v-card>
          </template>
        </v-dialog>
      </v-app-bar>
  
      <!-- Conteúdo principal da página -->
      <v-main>
        <!-- Tabela do iventário -->
        <div class="invent-table" v-if="tableView">
   <h1>PAGINA DE PERFIL</h1>
         
        </div>
  
        <!-- Cards do iventário -->
        <div class="invent-cards" v-if="cardView">
          <v-container>
            <v-row>
              <v-col v-for="item in items" :key="item.patrimonio">
                <!-- Dentro do v-for, o filtro deve ser invocado como um método -->
                <!-- <card-item v-bind:key="item.patrimonio" v-for="item in filterSearch(items, itemSearch)" -->
                <card-item v-bind:item="item">
                </card-item>
              </v-col>
            </v-row>
          </v-container>
  
        </div>
      </v-main>
    </div>
  </template>
  
  <script setup lang="js">
  
  // ===== FETCH DATA =====
  const URL_SERVER = "http://127.0.0.1:3333/api/";
  // https://stackoverflow.com/questions/75680934/nuxt3-nuxt-request-error-unhandled-500-fetch-failed-http-localhost#:~:text=%22dev%22%3A%20%22nuxt%20dev%20--host%200.0.0.0%22%20If%20the%20issue,an%20SSL%20issue%20or%20something%20with%20node%20v18
  // https://nuxt.com/docs/api/composables/use-async-data
  // https://nuxt.com/docs/api/utils/dollarfetch
  const { data } = await useAsyncData('', () => $fetch(URL_SERVER + 'post'))
  
  const items = reactive(data.value);
  
  // ===== DATA ======
  const show = ref(false);
  const tableView = ref(true);
  const cardView = ref(false);
  const itemSearch = ref("ok");
  const currentPage = ref(1);
  const totalRows = ref(0);
  const perPage = ref(3);
  const url = ref('');
  
  
  
  const novoItem = ref({
    descricao: "",
    post: ""
  ,
  
  });
  
  // ===== METHODS ======
  function createNewItem (event) {
    $fetch(URL_SERVER + 'postagem', {
      method: 'POST',
      body: JSON.stringify(novoItem.value)
    })
    .then((response) => {
      console.log('Resposta do servidor obtida');
      updateItemList();
    })
    .catch((error) => {
      console.error('Não foi possível criar um novo item');
      console.log(error);
  
    });
  };
  
  function openCardView () {
    // Use o .value para alterar os valores das propriedades definidas acima;
    cardView.value = true;
    tableView.value = false;
  };
  
  function openTabView () {
    cardView.value = false;
    tableView.value = true;
  }
  
  function updateItemList () {
    $fetch(URL_SERVER + 'postagem').then(data => {
      items.value = data;
    })
  }; 
  
  </script>
  
  <style scoped>
  .profile-card {
    /* Aumenta o tamanho da foto de perfil */
    --v-avatar-size: 440px; /* Ajuste o valor conforme necessário */
  
    /* Aumenta o tamanho do título */
    font-size: 50px; /* Ajuste o valor conforme necessário */
  }
  
  /* Aumenta o tamanho do subtítulo */
  .profile-card .v-subtitle {
    font-size: 50px; /* Ajuste o valor conforme necessário */
  }
  
  /* Aumenta o tamanho do texto do cartão */
  .profile-card .v-card-text {
    font-size: 20px; /* Ajuste o valor conforme necessário */
  }
  .invent-table {
    padding: 0 100px;
    margin: 0 auto;
  }
  
  .invent-cards {
    padding: 0px 100px;
    margin: 20px auto;
  }
  .link-no-bold {
    font-weight: normal;
    color: white; /* Remove o negrito */
  }
  </style>
  