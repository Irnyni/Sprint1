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
          <v-btn @click="" color="white" text>
        <NuxtLink to="/newUser" class="link-no-bold">login</NuxtLink>

      </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="CRIAR NOVO">
            <v-container>
              <v-form v-on:submit.prevent="createPost(novoItem)">
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
              <p>   {{ item.postagem }}</p>
           
            </v-card-text>
            <template v-slot:actions>
              <v-btn color="primary" variant="text">Curtir</v-btn>
              <v-btn color="primary" variant="text">Comentar</v-btn>
            </template>
          </v-card>
          


          <v-container fluid>
    <v-col v-for="comment in comments" :key="comment.id">
      <card-item :item="comment"></card-item>
      <v-card
        border
        class="coment-card"
        density="compact"
        :prepend-avatar="profileImageURL"
        subtitle="geek"
        title="Mariana"
        variant="text"
      >
        <p class="titulo">{{ comment.descricao }}</p>
        <!-- Adicione os detalhes do comentário conforme necessário -->
        <template v-slot:actions>
          <v-btn color="primary" variant="text">Curtir</v-btn>
        </template>
      </v-card>
    </v-col>
  </v-container>



          

          
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
import { ref, onMounted, defineProps } from 'vue';
import axios from 'axios';
// ===== FETCH DATA =====
const URL_SERVER = "http://localhost:5000";
// https://stackoverflow.com/questions/75680934/nuxt3-nuxt-request-error-unhandled-500-fetch-failed-http-localhost#:~:text=%22dev%22%3A%20%22nuxt%20dev%20--host%200.0.0.0%22%20If%20the%20issue,an%20SSL%20issue%20or%20something%20with%20node%20v18
// https://nuxt.com/docs/api/composables/use-async-data
// https://nuxt.com/docs/api/utils/dollarfetch
const { data } = await useAsyncData('', () => $fetch(URL_SERVER))
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
const { postId } = defineProps(['postId']);

const comments = ref([
  { id: 1, descricao: 'Ótimo post!', userId: 1 },
  { id: 2, descricao: 'Adorei ler isso!', userId: 2 },
  { id: 3, descricao: 'Muito informativo. Obrigado por compartilhar!', userId: 3 },
  { id: 4, descricao: 'Esse é um dos melhores posts que já li.', userId: 4 },
  { id: 10, descricao: 'Esse post mudou minha perspectiva sobre o assunto. Incrível!', userId: 10 },

]);
const posts = reactive([]);

const novoItem = ref({
  descricao: "",
  postagem: "",
  imagem: ""
});
onMounted(() => {
  fetchComments();
});
onMounted(() => {
  fetchData(); 
})
console.log(posts);

async function createPost(novoItem) {
  try {
    // Objeto com os dados do novo post
    const post = {
      descricao: novoItem.descricao,
      postagem: novoItem.postagem,
      imagem: novoItem.imagem
    };

    // Faz uma solicitação HTTP POST para adicionar o novo post
    const response = await axios.post(`${URL_SERVER}/posts`, post);
    if (response.status === 201) {
      fetchData();
      novoItem.descricao = "";
      novoItem.postagem = "";
      novoItem.imagem = "";

     
      console.log('Nova postagem criada com sucesso!');
    } else {
     
      console.error('Erro ao criar uma nova postagem:', response);
    }
    // Limpa o formulário ou atualiza a lista após a postagem ser criada com sucesso
    // (dependendo do seu fluxo de trabalho)
    console.log('Postagem criada com sucesso:', response.data);

    // Atualiza a lista de posts após adicionar um novo post
    fetchData();
  } catch (error) {
    console.error('Erro ao criar uma nova postagem:', error);
  }
}
async function fetchComments() {
  try {
    const response = await axios.get(`${URL_SERVER}/comments?postId=${postId}`);
    comments.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar os comentários:', error);
  }
}

function getRandomProfileImageURL() {
  const randomNumber = Math.floor(Math.random() * 100) + 1; // Gera um número aleatório de 1 a 100
  return `https://randomuser.me/api/portraits/women/${randomNumber}.jpg`;
}
function openCardView () {
 
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
async function fetchData() {
  try {
    const response = await axios.get('http://localhost:5000/posts');
    const serverPosts = response.data; 
    posts.splice(0, posts.length, ...serverPosts); 
  } catch (error) {
    console.error('Erro ao buscar os objetos:', error);
  }
}



</script>

<style scoped>
.profile-card {
  /* Aumenta o tamanho da foto de perfil */
  --v-avatar-size: 600px; /* /* Ajuste o valor conforme necessário */

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
  justify-content: center;line-height:20px;font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;}
  h2{
    align-self: center;
  }
  .link{
    text-decoration: none;
  }
  .profile-card{margin-top:  120px;}
</style>
