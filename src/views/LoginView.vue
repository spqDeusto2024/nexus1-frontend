<template>
  <div class="login-container">
    <div class="login-form">
      <h1 class="login-title">Login</h1>
      <form @submit.prevent="login()">
        <div class="input-group">
          <input v-model="username" placeholder="Username" required class="input" />
        </div>
        <div class="input-group">
          <input v-model="password" type="password" placeholder="Password" required class="input" />
        </div>
        <button type="submit" class="btn">Login</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import apiClient from '../api/axios'; // Ajusta el path según donde esté configurado el cliente

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        // Crear el objeto con los datos
        const payload = new URLSearchParams();
        payload.append('username', this.username);
        payload.append('password', this.password);

        const response = await apiClient.post('/auth/login', payload);
        
       

        // Verificar el token en la respuesta
        const token = response.data.access_token; // Confirma que "access_token" es el nombre correcto
        if (token) {
          localStorage.setItem('token', token); // Guarda el token en localStorage
          console.log('Token guardado:', token);
          this.$router.push("/main");
         
        } else {
          throw new Error('El token no fue recibido.');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = 'Credenciales inválidas. Inténtalo de nuevo.';
      }
    },
  },
};
</script>

  
  <style scoped>
  /* Estilos generales */
  #app{
    padding-left: 100px;
  }


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  /* Fondo oscuro para toda la página */
  body {
    background-color: #121212;
    font-family: 'Arial', sans-serif;
    color: #f5f5f5;
    align-content: center;
    justify-content: center;
  }
  
  /* Contenedor del login */
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

  }
  
  /* Formulario de login */
  .login-form {
    background-color: #1e1e1e;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 400px;
    text-align: center;
  }
  
  /* Título del formulario */
  .login-title {
    font-size: 2em;
    margin-bottom: 20px;
    color: #ffffff;
  }
  
  /* Estilo de los inputs */
  .input-group {
    margin-bottom: 20px;
  }
  
  .input {
    width: 100%;
    padding: 10px;
    font-size: 1em;
    border: none;
    border-radius: 5px;
    background-color: #333;
    color: #fff;
    outline: none;
    transition: background-color 0.3s;
  }
  
  /* Hover en los inputs */
  .input:hover {
    background-color: #444;
  }
  
  /* Botón de login */
  .btn {
    width: 100%;
    padding: 12px;
    font-size: 1.1em;
    background-color: #00aaff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .btn:hover {
    background-color: #0088cc;
    transform: translateY(-2px);
  }
  
  /* Mensaje de error */
  .error-message {
    margin-top: 20px;
    color: #ff3b3b;
    font-size: 0.9em;
  }
  </style>
  
  
  <style scoped>
  /* Estilos generales */
  #app{
    padding-left: 100px;
  }


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  /* Fondo oscuro para toda la página */
  body {
    background-color: #121212;
    font-family: 'Arial', sans-serif;
    color: #f5f5f5;
    align-content: center;
    justify-content: center;
  }
  
  /* Contenedor del login */
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

  }
  
  /* Formulario de login */
  .login-form {
    background-color: #1e1e1e;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 400px;
    text-align: center;
  }
  
  /* Título del formulario */
  .login-title {
    font-size: 2em;
    margin-bottom: 20px;
    color: #ffffff;
  }
  
  /* Estilo de los inputs */
  .input-group {
    margin-bottom: 20px;
  }
  
  .input {
    width: 100%;
    padding: 10px;
    font-size: 1em;
    border: none;
    border-radius: 5px;
    background-color: #333;
    color: #fff;
    outline: none;
    transition: background-color 0.3s;
  }
  
  /* Hover en los inputs */
  .input:hover {
    background-color: #444;
  }
  
  /* Botón de login */
  .btn {
    width: 100%;
    padding: 12px;
    font-size: 1.1em;
    background-color: #00aaff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .btn:hover {
    background-color: #0088cc;
    transform: translateY(-2px);
  }
  
  /* Mensaje de error */
  .error-message {
    margin-top: 20px;
    color: #ff3b3b;
    font-size: 0.9em;
  }
  </style>
  