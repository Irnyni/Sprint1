// plugins/axios.js
export default function ({ $axios, store }) {
  // Certifique-se de que $axios e store estão definidos antes de acessar 'interceptors'
  if ($axios && store && store.state.auth) {
    $axios.interceptors.request.use((config) => {
      const token = store.state.auth.token;

      if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
      }

      return config;
    });
  }
}
