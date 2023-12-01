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
                <v-text-field id="input-descricao" v-model="novoItem.descricao" class="mb-2 mr-sm-2 mb-sm-0"
                  placeholder="Insira a descrição do seu post"></v-text-field>

                <label class="mr-sm-2" for="input-texto">Post:</label>
                <v-textarea id="post" v-model="novoItem.postagem" class="mb-2 mr-sm-2 mb-sm-0"
                  placeholder="Escreva seu post"></v-textarea>
                <v-text-field id="input-capa" v-model="novoItem.imagem" class="mb-2 mr-sm-2 mb-sm-0"
                  placeholder="link da imagem"></v-text-field>
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
    <v-dialog v-model="commentModalOpen" variant="tonal">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" text color="primary">Adicionar Comentário</v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="ADICIONAR COMENTÁRIO">
          <v-container>
            <v-form @submit.prevent="adicionarComentario($event)">


              <label class="mr-sm-2" for="input-comentario">Comentário:</label>
              <v-textarea id="input-comentario" v-model="novoComentarioTexto" class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Escreva seu comentário"></v-textarea>

              <v-divider></v-divider>

              <div class="pa4">
                <v-row>
                  <v-col>
                    <v-btn type="submit" color="blue" variant="elevated">Adicionar</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn type="reset" color="red" variant="elevated" @click="commentModalOpen = false">Cancelar</v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-form>
          </v-container>
        </v-card>
      </template>
    </v-dialog>

    <v-main>
<div class="all">






      <v-container>
        <v-row>

          <v-col v-for="post in posts" :key="post.id" class="postagens">
            <v-card class="profile-card" density="compact" :prepend-avatar="profileImageURL" subtitle="geek"
              title="Mariana" variant="text"> </v-card>
            <v-card class="cardpostagem">
              <h2>{{ post.descricao }}</h2>
              <v-img :src="post.imagem"></v-img>
              <p>{{ post.postagem }}</p>

              <template v-slot:actions>
                <v-btn color="primary" variant="text">Curtir</v-btn>

                <v-btn @click="openCommentModal(post._id)" color="primary">Adicionar Comentário</v-btn>

                <v-btn @click="excluirPostagem(post._id)" color="red" variant="text">Excluir</v-btn>
              </template>
            </v-card>

            <!-- comentarios!!! -->
            <v-col v-for="comment in comments[post._id]" :key="comment._id" class="coments">
  <v-card class="profile-card" density="compact" :prepend-avatar="profileImageURL" subtitle="geek"
              title="Mariana" variant="text"> </v-card>
              <v-card>
                
                <h2>{{ comment.commenterName }}</h2>
                <p>{{ comment.commentText }}</p>

              </v-card>
            </v-col>

          </v-col>


        </v-row>
      </v-container>
    </div>
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
// const { data } = await useAsyncData('', () => $fetch(URL_SERVER))
// const items = reactive(data.value);

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
const novoComentarioTexto = ref("");
const comments = ref({});
const commentModalOpen = ref(false);
const currentPostId = ref(null);


function openCommentModal(postId) {
  commentModalOpen.value = true;
  currentPostId.value = postId;
}

const posts = reactive([]);
const commenys = reactive([]);
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
    const postId = 1; // Substitua 1 pelo ID do post específico para o qual deseja buscar os comentários
    const response = await axios.get(`http://localhost:5000/comments/${postId}`);
    comments.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar os comentários:', error);
  }
}

async function excluirPostagem(postId) {
  try {
    console.log('ID do post a ser excluído:', postId);

    const response = await axios.delete(`${URL_SERVER}/posts/${postId}`);
    if (response.status === 200) {
      console.log('Postagem excluída com sucesso!');
      // Atualize a lista de postagens após excluir a postagem
      fetchData();
    } else {
      console.error('Erro ao excluir a postagem:', response);
    }
  } catch (error) {
    console.error('Erro ao excluir a postagem:', error);
  }
}


function getRandomProfileImageURL() {
  const randomNumber = Math.floor(Math.random() * 100) + 1; // Gera um número aleatório de 1 a 100
  return `https://randomuser.me/api/portraits/women/${randomNumber}.jpg`;
}
function openCardView() {

  cardView.value = true;
  tableView.value = false;
};

function openTabView() {
  cardView.value = false;
  tableView.value = true;
}

function updateItemList() {
  $fetch(URL_SERVER + 'postagem').then(data => {
    items.value = data;
  })
};

async function fetchData() {
  try {
    const postsResponse = await axios.get('http://localhost:5000/posts');
    const commentsResponse = await axios.get('http://localhost:5000/comments');
    
    for(const post of postsResponse.data){
      console.log(post._id);
      await fetchCommentsForPost(post._id);
    }

    console.log('Posts:', postsResponse.data);
    console.log('Comments:', comments.value);

    // Atualizar o valor da variável reativa `posts`
    posts.splice(0, posts.length, ...postsResponse.data);

    // Atualizar o valor da variável reativa `comments`
    // comments.value = {};

    // Adicione cada conjunto de comentários à chave correspondente
    // commentsResponse.data.forEach(comment => {
    //   if (!comments.value[comment.postId]) {
    //     comments.value[comment.postId] = [];
    //   }
    //   comments.value[comment.postId].push(comment);
    // });
    // Adicione este log para verificar se `posts` e `comments` foram atualizados corretamente
    console.log('Posts Atualizados:', posts);
    console.log('Comments Atualizados:', comments);
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
}

// onMounted(() => {
//   fetchData();
// });

async function fetchCommentsForPost(postId) {
  try {
    console.log("Server: " + `${URL_SERVER}/comments/posts/${postId}`);
    const response = await axios.get(`${URL_SERVER}/comments/posts/${postId}`);
    comments.value[postId] = response.data;
    console.log('Comentários para o post', postId, ':', response.data);
  } catch (error) {
    console.error('Erro ao buscar os comentários para o post:', error);
  }
}



async function adicionarComentario() {

  try {
    console.log('Comentários no Vue:', comments);
    const postId = currentPostId.value;
    const commentText = novoComentarioTexto.value;

    // Validar dados antes da solicitação
    if (!postId || !commentText.trim()) {
      console.error('Invalid postId or empty commentText.');
      return;
    }

    // Fazer uma chamada à API para adicionar o comentário
    const response = await axios.post(`${URL_SERVER}/comments/${postId}`, {
      commenterName: 'Username',
      commentText,
    });

    if (response.status === 201) {
      console.log('Comment added successfully!');
      // Atualizar os comentários para a postagem atual
      fetchCommentsForPost(postId);
    } else {
      console.error('Error adding comment:', response);
    }

    // Fechar o modal de comentários
    commentModalOpen.value = false;
  } catch (error) {
    console.error('Error adding comment:', error.message || error);
  }
}














</script>

<style scoped>
.profile-card {
  /* Aumenta o tamanho da foto de perfil */
  --v-avatar-size: 600px;
  /* /* Ajuste o valor conforme necessário */

  /* Aumenta o tamanho do título */
  font-size: 50px;
  /* Ajuste o valor conforme necessário */
}

/* Aumenta o tamanho do subtítulo */
.profile-card .v-subtitle {
  font-size: 50px;
  /* Ajuste o valor conforme necessário */
}

/* Aumenta o tamanho do texto do cartão */
.profile-card .v-card-text {
  font-size: 20px;
  /* Ajuste o valor conforme necessário */
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
  color: white;
  /* Remove o negrito */
}

.imgg {
  margin: 70px;
}

.profile-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 20px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

h2 {
  align-self: center;
}

.link {
  text-decoration: none;
}

.profile-card {
  margin-top: 120px;
}

.postagens {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 20px;






}

.cardpostagem {
  display: flex;
  flex-direction: column;


  width: 750px;
  height: auto;
  padding: 30px;
  margin: 30px;
  min-height: 700px;
}
.coments{

  height: 200px;
  width: 70%;
}
.v-col.postagens{
  display: flex;
  justify-content: center;
  align-items: start;
  padding-bottom: 300px;
 

}
</style>
