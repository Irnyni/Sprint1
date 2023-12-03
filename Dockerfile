# Use uma imagem base do Nginx
FROM nginx

# Remova o arquivo de configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copie os arquivos de configuração personalizados para o diretório de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copie os arquivos do projeto Nuxt para o diretório de trabalho do Nginx
COPY dist/ /usr/share/nginx/html/

# Exponha a porta 80
EXPOSE 80

# Comando para iniciar o servidor Nginx em segundo plano
CMD ["nginx", "-g", "daemon off;"]
