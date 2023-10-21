
// nuxt.config.js

export default {
  // ...

  modules: [
    '@invictus.codes/nuxt-vuetify'
  ],
  devtools: { enabled: true },
  
  axios: {
    baseURL: 'http://localhost:5000', // Defina o URL do servidor Express aqui
  },

  // ...
}
