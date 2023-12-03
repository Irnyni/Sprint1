<template>
  <v-container>

    
    <!-- Navegação -->
    <v-app-bar :elevation="50" color="black" dark>
      <v-app-bar-title class="ml-7">GeekStation</v-app-bar-title>

      <!-- ... outros itens de navegação ... -->

      <!-- Botão para abrir o modal de criação de novo perfil -->
      
      <v-btn @click="openCreateProfileModal" text color="white">Criar novo perfil</v-btn>
      
      <!-- Botão para abrir o modal de login -->
      <v-btn @click="openLoginModal" text color="white">Login</v-btn>

      <!-- Modal para criar novo perfil -->
      <v-dialog v-model="isCreateProfileModalOpen" variant="tona2">
        <!-- ... conteúdo do modal de criação de novo perfil ... -->
      </v-dialog>

      <!-- Modal para login -->
      <v-dialog v-model="isLoginModalOpen" variant="tona2">
        <v-card title="FAÇA LOGIN">
          <v-container>
            <v-form v-on:submit.prevent="login">
              <label class="mr-sm-2" for="input-username">Nome de usuário:</label>
              <v-text-field
                id="input-username"
                v-model="loginForm.username"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Insira seu nome de usuário"
              ></v-text-field>

              <label class="mr-sm-2" for="input-password">Senha:</label>
              <v-text-field
                id="input-password"
                v-model="loginForm.password"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Insira sua senha"
                type="password"
              ></v-text-field>

              <v-divider></v-divider>

              <div class="pa4">
                <v-row>
                  <v-col>
                    <v-btn type="submit" color="blue" variant="elevated">Login</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn type="reset" color="red" variant="elevated">Limpar</v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <!-- ... outras partes do conteúdo ... -->
 <!-- Modal para criar novo perfil -->
 <v-dialog v-model="isCreateProfileModalOpen" variant="tona2">
        <v-card title="CRIAR NOVO PERFIL">
          <v-container>



<v-divider></v-divider>

<v-form v-on:submit.prevent="createUser(novoPerfil)">

<label class="mr-sm-2" for="input-name">Nome:</label>
<v-text-field

          id="input-nome"
          v-model="novoPerfil.name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Insira o nome do novo perfil"
        ></v-text-field>
              <label class="mr-sm-2" for="input-email">Email:</label>
              <v-text-field
                id="input-email"
                v-model="novoPerfil.email"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Insira o email do novo perfil"
              ></v-text-field>
              <label class="mr-sm-2" for="input-password">Senha:</label>
<v-text-field
  id="input-password"
  v-model="novoPerfil.password"
  class="mb-2 mr-sm-2 mb-sm-0"
  placeholder="Insira a senha do novo perfil"
  type="password"
></v-text-field>
              <label class="mr-sm-2" for="input-nascimento">Data de Nascimento:</label>
              <v-text-field
                id="input-nascimento"
                v-model="novoPerfil.birthdate"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Insira a data de nascimento do novo perfil"
              ></v-text-field>
      
              <v-divider></v-divider>
  
              <div class="pa4">
                <v-row>
                  <v-col>
                    <v-btn type="submit" color="blue" variant="elevated">Criar</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn type="reset" color="red" variant="elevated">Limpar</v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';
const URL_SERVER = "http://localhost:5000";

export default {
  data() {
    return {
      // ... outros dados existentes ...
      isCreateProfileModalOpen: false,
      novoPerfil: {
        name: '',
        email: '',
        birthdate: '',
      },
      loginForm: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    // ... outros métodos existentes ...

    // Método para abrir o modal de criar novo perfil
    openCreateProfileModal() {
      this.isCreateProfileModalOpen = true;
    },

    // Método para abrir o modal de login
    openLoginModal() {
      this.isLoginModalOpen = true;
    },

    // Método para lidar com a lógica de criar novo usuário
    async createUser() {
  try {
    const response = await axios.post(`${URL_SERVER}/users`, this.novoPerfil);

    if (response.status === 201) {
      // Novo usuário criado com sucesso
      console.log('Novo usuário criado com sucesso!');
      this.isCreateProfileModalOpen = false; // Feche o modal após criar o usuário
    } else {
      console.error('Erro ao criar um novo usuário:', response);
    }
  } catch (error) {
    console.error('Erro ao criar um novo usuário:', error);
  }
},
    // Método para lidar com a lógica de login
    async login() {
  try {
    // Chame a API de login no seu backend
    const response = await this.$axios.post('/login', {
      username: this.loginForm.username,
      password: this.loginForm.password,
    });

    // Armazene o token JWT no localStorage ou Vuex (dependendo das suas necessidades)
    const token = response.data.token;
    localStorage.setItem('token', token);

    // Redirecione para a página após o login bem-sucedido
    this.$router.push('/perfil');
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
},
  },
};
</script>
