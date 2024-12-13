<script setup>
import { ref, onMounted } from "vue";
import AlarmService from "@/services/alarmService";
import apiClient from "@/api/axios";  // Tu cliente API
const activeAlarms = ref([]);

onMounted(() => {
  AlarmService.subscribe((alarmas) => {
    activeAlarms.value = alarmas;
  });
});

// Acción para resolver una alarma




const resolverAlarma = async (idParameter, idRoom, idParameterRoom, max_value, min_value) => {
  try {
    // Generar un nuevo valor aleatorio entre min_value y max_value
    const newValue = Math.random() * (max_value - min_value) + min_value;
  console.log("entro");
    // Obtener la fecha actual en formato ISO
    const now = new Date().toISOString();

    // Crear el objeto con la información actualizada (sin llaves extra)
    const updatedParameterRoom = {
      id_room: idRoom,
      id_parameter: idParameter,
      date: now,
      value: newValue,
      id: idParameterRoom
    };

    // Hacer la petición POST para actualizar el registro
    await apiClient.post("/parameter_room/update/", updatedParameterRoom);

    activeAlarms.value = activeAlarms.value.filter(
      (alarma) =>
        alarma.idParameter !== idParameter ||
        alarma.idRoom !== idRoom ||
        alarma.idParameterRoom !== idParameterRoom
    );
    
  } catch (error) {
    console.error("Error al resolver la alarma:", error);
  }
};

const inhabilitarEstancia = async (idRoom, idParameterRoom) => {
  try {
    // Obtener la lista de estancias desde el backend
    const response = await apiClient.get("/room/get_all");
    

 const estancias = response.data.data;

    // Buscar la estancia que coincida con el idRoom
    let estancia = estancias.find(estancia => estancia.id === idRoom);

    if (!estancia) {
      throwError(`No se encontró la estancia con el id: ${idRoom}`);
    }

  

    // Actualizar la propiedad availability a false
    estancia.availability = false;

    // Enviar datos al endpoint /room/update
    const updateResponse = await apiClient.post("/room/update", estancia);
    console.log("Estancia actualizada:", updateResponse.data);
    console.log(idParameterRoom)
    
    // Si usas Vue Router, descomenta la siguiente línea para redirigir
    // this.$router.push("/estancias");
    
    return updateResponse.data;
  } catch (error) {
    console.error("Error al obtener o actualizar la estancia:", error);
    throw error; // Relanzar el error para manejarlo externamente si es necesario
  }
};

const handleClick = (idParameter, idRoom, idParameterRoom, max_value, min_value) => {
  inhabilitarEstancia(idRoom, idParameterRoom);
  resolverAlarma(idParameter, idRoom, idParameterRoom, max_value, min_value);
};

</script>




<template>
  <div v-if="activeAlarms.length > 0" class="overlay">
    <div class="alarm-container">
      <h1 class="title">⚠️ ¡ALERTA CRÍTICA! ⚠️</h1>
      <div v-for="alarma in activeAlarms" :key="alarma.id" class="alarm">
        <p>
          <strong>⚠️ {{ alarma.nombre }}</strong> - {{ alarma.variable }} está fuera de rango<br />
          <span>Valor actual: <strong class="highlight">{{ alarma.valorActual }}</strong></span><br />
          <span>Esperado: <strong>entre {{ alarma.valorMinEsperado }} y {{ alarma.valorMaxEsperado }}</strong></span>
        </p>
        <div class="button-group">
          <button @click="resolverAlarma(alarma.idParameter,alarma.idRoom, alarma.idParameterRoom, alarma.valorMaxEsperado, alarma.valorMinEsperado)" class="resolve-button">
            Resolver
          </button>
          <button @click="handleClick(alarma.idParameter,alarma.idRoom, alarma.idParameterRoom, alarma.valorMaxEsperado, alarma.valorMinEsperado)" class="disable-button">
            Inhabilitar estancia
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Fondo oscuro que cubre toda la pantalla */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 0, 0, 0.8); /* Fondo rojo semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Contenedor de alarmas */
.alarm-container {
  background-color: #ffcccc; /* Rojo claro para el fondo */
  color: #8b0000; /* Rojo oscuro para el texto */
  padding: 20px;
  border: 3px solid #ff0000; /* Borde rojo intenso */
  border-radius: 15px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 8px 15px rgba(255, 0, 0, 0.5);
  text-align: center;
  animation: pulse 1.5s infinite; /* Efecto de pulsación */
}

/* Animación de pulsación */
@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.7);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 25px rgba(255, 0, 0, 1);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.7);
  }
}

/* Título destacado */
.title {
  font-size: 2rem;
  font-weight: bold;
  color: #8b0000;
  margin-bottom: 20px;
}

/* Estilo individual de las alarmas */
.alarm {
  margin: 15px 0;
  padding: 15px;
  background-color: #ff6666; /* Fondo rojo intermedio */
  border: 2px solid #ff0000; /* Borde rojo intenso */
  border-radius: 10px;
  font-size: 1.1rem;
  text-align: left;
}

/* Resaltar valores */
.highlight {
  color: #b30000;
  font-weight: bold;
}

/* Grupo de botones */
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

/* Botón de resolver */
.resolve-button {
  background-color: #8b0000;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.resolve-button:hover {
  background-color: #ff0000;
}

/* Botón de inhabilitar estancia */
.disable-button {
  background-color: #ff4500; /* Naranja oscuro */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.disable-button:hover {
  background-color: #ff6347; /* Rojo anaranjado */
}
</style>
