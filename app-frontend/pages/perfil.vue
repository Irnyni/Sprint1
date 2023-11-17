<template>
      <!-- Navegação -->
      <v-app-bar :elevation="50" color="black" dark>
      <v-app-bar-title class="ml-7">GeekStation</v-app-bar-title>

      <v-btn @click="openCardView()" color="white" text>
        <NuxtLink to="/perfil" class="link-no-bold">Perfil</NuxtLink>

      </v-btn>

      <v-btn @click="openTabView()" color="white" text>
        <NuxtLink to="/" class="link-no-bold">Post</NuxtLink>

      </v-btn>
      <!-- Modal para inserir novo -->
      <v-dialog id="modal-novo-item" variant="tonal">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" text color="white">Criar post</v-btn>
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

  <v-container>
    <!-- Capa do Perfil -->
    <v-row>
      <v-col cols="12">
        <v-img
          :src="coverImageURL"
          height="500"
          class="cover-image"
        ></v-img>
      </v-col>
    </v-row>

    <!-- Informações do Perfil -->
    <v-row>
      <v-col cols="12" md="4">
        <!-- Foto de Perfil -->
        <v-avatar size="150">
          <v-img :src="profileImageURL" alt="Foto de Perfil"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="12" md="8">
        <!-- Detalhes do Perfil -->
        <v-card>
          <v-card-title class="headline">{{ user.name }}</v-card-title>
          <v-card-subtitle>{{ user.bio }}</v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <strong>Email:</strong> {{ user.email }}
              </v-col>
              <v-col cols="6">
                <strong>Data de Nascimento:</strong> {{ user.birthdate }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Histórico de Postagens -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline">Histórico de Postagens</v-card-title>
          <v-list>
            <v-list-item-group v-if="user.posts.length">
              <v-list-item v-for="post in user.posts" :key="post.id">
                <v-list-item-content>
                  <v-list-item-title>{{ post.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ post.date }}</v-list-item-subtitle>
                  <!-- Adicione mais detalhes do post conforme necessário -->
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item v-else>
              <v-list-item-content>Nenhuma postagem ainda.</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const profileImageURL = getRandomProfileImageURL();

export default {
  
  data() {
    return {
      user: {
        name: 'Marissa Doe',
        email: 'Marissa.doe@example.com',
        birthdate: '01/01/1990',
        bio: 'Entusiasta da tecnologia e amante de viagens.',
        posts: [
          { id: 1, title: 'Minha Primeira Postagem', date: '10/10/2022' }, { id: 2, title: 'Minha segunda Postagem', date: '10/10/2022' }
          // Adicione mais postagens conforme necessário
        ],
      },
      profileImageURL: profileImageURL , // URL da imagem de perfil
      coverImageURL: 'https://source.unsplash.com/1600x400/?nature,technology', // URL da imagem de capa
    };
  },
};
function getRandomProfileImageURL() {
  const randomNumber = Math.floor(Math.random() * 100) + 1; // Gera um número aleatório de 1 a 100
  return `https://randomuser.me/api/portraits/women/${randomNumber}.jpg`;
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
</style>

