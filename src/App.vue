<script setup>
import { RouterView } from 'vue-router'; // Cargamos el RouterView para gestionar vistas dinámicas
import AlarmDisplay from "@/components/AlarmDisplay.vue";
import { ref } from 'vue';
import apiClient from "@/api/axios";  // Tu cliente API
import AlarmService from "@/services/alarmService";  // Tu servicio de alarmas

const isAuthenticated = ref(!!localStorage.getItem('token')); // Verifica si hay un token
const alarmas = ref([]);  // Definir alarmas como ref en el setup

// Función para obtener parameterRooms
const fetchParameterRooms = async () => {
  if (!isAuthenticated.value) {
    return;
  }

  try {
    const response = await apiClient.get("/parameter_room/get_all");
    parameterRooms.value = response.data.data;
    checkAlarmas();
  } catch (error) {
    console.error("Error al obtener los parameterRooms:", error);
  }
};

// Función para obtener los parámetros
const fetchParameters = async () => {
  if (!isAuthenticated.value) {
    return [];
  }

  try {
    const response = await apiClient.get("/parameter/get_all");
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener los parámetros:", error);
    return [];
  }
};

// Función para verificar alarmas
const checkAlarmas = async () => {
  const parameters = await fetchParameters();  // Obtener los parámetros de la base de datos

  // Crear un mapa de parámetros por ID para optimizar la búsqueda
  const parametersMap = new Map(parameters.map(param => [param.id, param]));

  // Recorrer las habitaciones y verificar los valores
  for (let parameterRoom of parameterRooms.value) {
    const parameter = parametersMap.get(parameterRoom.id_parameter); // Accede rápidamente al parámetro correspondiente
    
    if (parameter) {
      // Comparar el valor del parameterRoom con el rango del parámetro
      if (parameterRoom.value > parameter.max_value || parameterRoom.value < parameter.min_value) {
        // Crear la alarma si el valor está fuera de rango
        const newAlarm = {
          id: parameterRoom.id, 
          nombre: `${parameter.name} en la estancia ${parameterRoom.id_room}`,
          idParameter: parameter.id,
          idParameterRoom: parameterRoom.id,
          idRoom: parameterRoom.id_room,
          valorActual: parameterRoom.value,
          valorMaxEsperado: parameter.max_value,
          valorMinEsperado: parameter.min_value,
        };

        AlarmService.addAlarm(newAlarm);

        if (!alarmas.value.find(alarm => alarm.id === newAlarm.id)) {
          alarmas.value.push(newAlarm);
        }
      }
    }
  }
};

// Montar el componente
const parameterRooms = ref([]);  // Lista de ParameterRooms
fetchParameterRooms();  // Obtener los parameterRooms cuando el componente se monta

// Intervalo para comprobar alarmas cada 10 segundos
setInterval(() => {
  checkAlarmas();  // Comprobar alarmas periódicamente
}, 10000);
</script>

<template>
  <!-- El RouterView se encargará de mostrar la vista correspondiente según la ruta -->
  <RouterView />
  <AlarmDisplay v-if="isAuthenticated" />
</template>

<style>
  body {
    background-color: black;
    color: white;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
  #app {
    display: flex;
  }
</style>
