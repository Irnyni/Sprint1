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
    </v-app-bar>

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

    <!-- Modal para criar novo perfil -->
    <v-dialog v-model="isCreateProfileModalOpen" variant="tona2">
      <v-card title="CRIAR NOVO PERFIL">
        <v-container>
          <v-divider></v-divider>

          <v-form v-on:submit.prevent="createUser(novoPerfil)">
            <label class="mr-sm-2" for="input-nome">Nome:</label>
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
      isCreateProfileModalOpen: false,
      isLoginModalOpen: false,
      novoPerfil: {
      name: '',
      email: '',  // Adicione a propriedade email aqui
      birthdate: '',
      // ... outros campos do objeto ...
    },
    loginForm: {
      name: '',
      email: '',  // Adicione a propriedade email aqui
      password: '',
    },
    };
  },
  methods: {
    openCreateProfileModal() {
      this.isCreateProfileModalOpen = true;
    },

    openLoginModal() {
      this.isLoginModalOpen = true;
    },

    async createUser() {
      try {
        const response = await axios.post(`${URL_SERVER}/users`, this.novoPerfil);

        if (response.status === 201) {
          console.log('Novo usuário criado com sucesso!');
          this.isCreateProfileModalOpen = false;
        } else {
          console.error('Erro ao criar um novo usuário:', response);
        }
      } catch (error) {
        console.error('Erro ao criar um novo usuário:', error);
      }
    },

    async login() {
  console.log("Entrando na função de login");

  try {
    // Realize a chamada assíncrona para a API de autenticação
    const response = await axios.post(`${URL_SERVER}/login`, {
      email: this.loginForm.email,
      password: this.loginForm.password,
    });

    if (response.status === 201) {
      // Login bem-sucedido
      console.log('Login bem-sucedido! Token de acesso:', response.data.token);
      // Lógica adicional após o login, se necessário
    } else {
      // Se a resposta não for um status 201, trata como falha de login
      console.error('Falha no login. Resposta da API:', response);
      // Lógica adicional para lidar com a falha de login, se necessário
    }
  } catch (error) {
    // Trata erros na chamada assíncrona (por exemplo, falha de rede)
    console.error('Erro durante a tentativa de login:', error);
    // Lógica adicional para lidar com erros, se necessário
  }
}




  },
};
</script>