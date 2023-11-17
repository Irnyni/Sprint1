<template>
    <v-dialog id="modal-novo-perfil" variant="tona2">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" text color="white">Criar novo perfil</v-btn>
      </template>
  
      <template v-slot:default="{ isActive }">
        <v-card title="CRIAR NOVO PERFIL">
          <v-container>
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
      </template>
    </v-dialog>
    <!-- ... código existente ... -->
  </template>
  
  <script>
  import { ref, onMounted, defineProps } from 'vue';
import axios from 'axios';
// ===== FETCH DATA =====
const URL_SERVER = "http://localhost:5000";
// https://stackoverflow.com/questions/75680934/nuxt3-nuxt-request-error-unhandled-500-fetch-failed-http-localhost#:~:text=%22dev%22%3A%20%22nuxt%20dev%20--host%200.0.0.0%22%20If%20the%20issue,an%20SSL%20issue%20or%20something%20with%20node%20v18
// https://nuxt.com/docs/api/composables/use-async-data
// https://nuxt.com/docs/api/utils/dollarfetch

  export default {
    // ... código existente ...
  
    data() {
      return {
        // ... dados existentes ...
        novoPerfil: {
          name: '',
          email: '',
          birthdate: '',
        },
      };
    },
  
    methods: {
        async createUser() {
  try {
    const user = {
      name: this.novoPerfil.name,
      email: this.novoPerfil.email,
      birthdate: this.novoPerfil.birthdate,
    };

    const response = await axios.post(`${URL_SERVER}/users`, user);

    if (response.status === 201) {
      this.novoPerfil.name = '';
      this.novoPerfil.email = '';
      this.novoPerfil.birthdate = '';

      // Feedback ao usuário
      console.log('Novo usuário criado com sucesso!');
    
    } else {
      console.error('Erro ao criar um novo usuário:', response);

    }
  } catch (error) {
    console.error('Erro ao criar um novo usuário:', error);
  }
}
    },
  };
  </script>
  