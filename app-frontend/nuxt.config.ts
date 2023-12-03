
// nuxt.config.js

export default {
  plugins: [
    'C:/Users/felip/Desktop/SPRINT3/Sprint1/plugins/axios'
  ],

  modules: [
    '@invictus.codes/nuxt-vuetify'
  ],
  devtools: { enabled: true },
  
  axios: {
    baseURL: 'http://localhost:5000', // Defina o URL do servidor Express aqui
  },

  // ...
}
