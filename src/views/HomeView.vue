<script setup>
// Estado reactivo para determinar si el usuario está autenticado
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isAuthenticated = ref(!!localStorage.getItem('token')); // Verifica si hay un token

// Función para manejar el login: redirige a la ruta /login
const handleLogin = () => {
  router.push('/login'); // Cambia de pestaña a la vista /login
};

// Función para manejar el logout: elimina el token y actualiza el estado
const handleLogout = () => {
  localStorage.removeItem('token'); // Elimina el token
  isAuthenticated.value = false; // Cambia el estado a no autenticado
};

// Función para manejar clics en la imagen
const handleImageClick = () => {
  if (isAuthenticated.value) {
    router.push('/main'); // Redirige a /main si está autenticado
  } else {
    router.push('/login'); // Redirige a /login si no está autenticado
  }
};
</script>

<template>
  <div class="auth-buttons">
    <button v-if="!isAuthenticated" @click="handleLogin" class="btn">Login</button>
    <button v-else @click="handleLogout" class="btn">Logout</button>
  </div>

  <main class="home-container">
    <!-- Botones en la esquina superior derecha -->
    <div>
      <p id="logo_title">NEXUS 1</p>
    </div>

    <!-- Imagen clickeable -->
    <img
      src="../assets/shelter_icon.png"
      alt="Imagen central"
      class="center-image"
      @click="handleImageClick"
    />
  </main>
</template>

<style scoped>
/* Estilo para la vista principal */
body {
  justify-content: center;
  display: flex;
}
#app {
  display: flex;
  justify-content: center;
}
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 900px;
  position: relative;
  background-color: black; /* Fondo negro */
}

#logo_title {
  margin-bottom: 10px;
  font-size: 50px;
}

/* Estilo para los botones de login/logout */
.auth-buttons {
  position: absolute;
  top: 20px;
  right: 20px;
}

.btn {
  background-color: black;
  color: white;
  border: 2px solid black;
  border-radius: 15px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: white;
  color: black;
}

/* Estilo para la imagen centrada */
.center-image {
  width: 400px; /* Ancho fijo */
  height: 400px; /* Alto fijo */
  object-fit: contain; /* Mantiene la proporción de la imagen */
  border-radius: 20px;
  cursor: pointer; /* Cambia el cursor a mano */
  transition: transform 0.3s ease; /* Efecto de hover */
}

.center-image:hover {
  transform: scale(1.05); /* Aumenta el tamaño un 5% al pasar el cursor */
}
</style>
