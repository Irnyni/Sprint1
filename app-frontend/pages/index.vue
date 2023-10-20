<template>
  <div>
    <!-- Navegação -->
    <v-app-bar :elevation="50" color="black" dark>
      <v-app-bar-title class="ml-7">GeekStation</v-app-bar-title>

      <v-btn @click="openCardView()" color="white" text>
        <NuxtLink to="/perfil" class="link-no-bold">Perfil</NuxtLink>

      </v-btn>

      <v-btn @click="openTabView()" color="white" text>
        Posts
      </v-btn>
      <!-- Modal para inserir novo -->
      <v-dialog id="modal-novo-item" variant="tonal">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" text color="white">Criar post</v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="CRIAR NOVO">
            <v-container>
              <v-form v-on:submit.prevent="createNewItem(novoItem)">
                <label class="mr-sm-2" for="input-descricao">Descrição:</label>
                <v-text-field
                  id="input-descricao"
                  v-model="novoItem.descricao"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  placeholder="Insira a descrição do seu post"
                ></v-text-field>

                <label class="mr-sm-2" for="input-texto">Post:</label>
                <v-textarea
                  id="post"
                  v-model="novoItem.postagem"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  placeholder="Escreva seu post"
                ></v-textarea>
                <v-text-field
                  id="input-capa"
                  v-model="novoItem.imagem"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  placeholder="link da imagem"
                ></v-text-field>
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
      <div class="invent-table" v-if="tableView">
  <v-container fluid>

      <v-col v-for="item in posts" :key="item.descricao">
  
        <card-item :item="item"></card-item>
       
        <v-card
            border
        
          
      class="profile-card" 
      density="compact"
    
      :prepend-avatar="profileImageURL"
      subtitle="geek"
      title="Mariana"
      variant="text"
      
          > 
         <h2 class="titulo"> {{ item.descricao }}</h2>
          

          <v-img :src="item.imagem" height="500" class="imgg"></v-img>
  
          <v-card-text>
              <h3>   {{ item.postagem }}</h3>
           
            </v-card-text>
            <template v-slot:actions>
              <v-btn color="primary" variant="text">Curtir</v-btn>
              <v-btn color="primary" variant="text">Comentar</v-btn>
            </template>
          </v-card>
      </v-col>
  
  </v-container>
 
</div>

      <!-- Tabela do iventário -->
      <div class="invent-table" v-if="tableView">
   
          <v-main>
        <v-container fluid>
          
        
        </v-container>
        
      </v-main>
        
       
      </div>

      <!-- Cards do iventário -->

        <v-container>
          <v-row>
            <v-col v-for="item in posts" :key="posts.descricao">
              <!-- Dentro do v-for, o filtro deve ser invocado como um método -->
              <!-- <card-item v-bind:key="item.patrimonio" v-for="item in filterSearch(items, itemSearch)" -->
              <card-item v-bind:item="item">
              </card-item>
            </v-col>
          </v-row>
        </v-container>
        <template>
  <div class="invent-cards" v-if="cardView">
  <v-container>
    <v-row>
      <v-col v-for="item in items" :key="item.id">
        <card-item :item="item"></card-item>
        <div>{{ item.descricao }}</div>
      </v-col>
    </v-row>
  </v-container>
</div>

</template>

    
    </v-main>
  </div>
</template>

<script setup lang="js">

// ===== FETCH DATA =====
const URL_SERVER = "http://localhost:3000/api/";
// https://stackoverflow.com/questions/75680934/nuxt3-nuxt-request-error-unhandled-500-fetch-failed-http-localhost#:~:text=%22dev%22%3A%20%22nuxt%20dev%20--host%200.0.0.0%22%20If%20the%20issue,an%20SSL%20issue%20or%20something%20with%20node%20v18
// https://nuxt.com/docs/api/composables/use-async-data
// https://nuxt.com/docs/api/utils/dollarfetch
const { data } = await useAsyncData('', () => $fetch(URL_SERVER + 'index'))

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
const profileImageURL = getRandomProfileImageURL();

const posts =reactive( [
  {
    descricao: "Matrix Resurrections",
    postagem: "Assisti ao filme 'Matrix Resurrections' e fiquei impressionado com os efeitos especiais e a história intrigante. Keanu Reeves entrega uma atuação incrível como Neo.",
    imagem: "https://ogimg.infoglobo.com.br/rioshow/24118715-847-afa/FT1086A/760/matrix.jpg",
  },
  {
    descricao: "Duna",
    postagem: "Ontem à noite, assisti ao épico 'Duna'. A fotografia é deslumbrante e a trama é cativante. Ansioso pela sequência!",
    imagem: "https://olhardigital.com.br/wp-content/uploads/2021/05/Elenco-de-Duna-tem-scaled.jpg",
  },
  {
    descricao: "No Time to Die",
    postagem: "O último filme de James Bond, 'No Time to Die', é uma montanha-russa de ação e emoção. Daniel Craig encerra sua jornada como Bond de maneira espetacular.",
    imagem: "https://static.mediapart.fr/etmagine/article_google_discover/files/2022/01/27/no-time-to-die-mgm-sets-pvod-release-date-for-daniel-craigs-final-bond-film.jpg",
  },
  {
    descricao: "Spider-Man: No Way Home",
    postagem: "Assisti ao filme 'Spider-Man: No Way Home' e fiquei maravilhado com o multiverso do Homem-Aranha. Uma explosão de nostalgia para os fãs!",
    imagem: "https://gkpb.com.br/wp-content/uploads/2022/06/fagWFrNEGrM2p3DCOwgrO5fBmUn-scaled-e1655148584687.jpg",
  },
  {
    descricao: "Inception",
    postagem: "Reassisti 'Inception' de Christopher Nolan. A complexa trama dos sonhos ainda me fascina, e a atuação de Leonardo DiCaprio é incrível.",
    imagem: "https://frontmediaspot.com/wp-content/uploads/2023/07/Inception-3.jpg",
  },
]);

const novoItem = ref({
  descricao: "",
  postagem: "",
  imagem: ""
});


function createNewItem(novoItem) {
  const novaPostagem = {
    descricao: novoItem.descricao,
    postagem: novoItem.postagem,
    imagem: novoItem.imagem
  };
  console.log(novaPostagem);

  posts.push(novaPostagem);
console.log(posts);
  // Limpe o objeto novoItem após adicionar a nova postagem
  novoItem.descricao = "";
  novoItem.postagem = "";
  novoItem.imagem = "";
}


function getRandomProfileImageURL() {
  const randomNumber = Math.floor(Math.random() * 100) + 1; // Gera um número aleatório de 1 a 100
  return `https://randomuser.me/api/portraits/women/${randomNumber}.jpg`;
}
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
.imgg{
  margin: 70px;
  }
  .profile-card{display: flex;flex-direction: column;  
  justify-content: center;}
  h2{
    align-self: center;
  }
</style>
