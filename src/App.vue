<script setup>
import { RouterView } from 'vue-router'; // Cargamos el RouterView para gestionar vistas dinámicas
</script>

<template>
  <!-- <div id="app"> -->

    <!-- El RouterView se encargará de mostrar la vista correspondiente según la ruta -->
    <RouterView />

</template>
<!-- 
<style scoped>
/* Estilos globales del contenedor principal */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->

<style>
  body {
    background-color: black; /* Fondo negro */
    color: white; /* Para asegurar que el texto se vea bien sobre el fondo oscuro */
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif; /* Puedes elegir tu fuente preferida */
    align-content: center;
  }
  #app {
    display: flex;
  }

</style>
