<template>
  <div>
    <h2>Actualizar Estancia</h2>

    <!-- Formulario de actualización -->
    <form @submit.prevent="updateEstancia">
      <div>
        <label for="id_shelter">ID Shelter:</label>
        <input type="number" id="id_shelter" v-model.number="room.id_shelter" required />
      </div>

      <div>
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="room.name" required />
      </div>

      <div>
        <label for="description">Descripción:</label>
        <textarea id="description" v-model="room.description" rows="4" required></textarea>
      </div>

      <div>
        <label for="capacity">Capacidad:</label>
        <input type="number" id="capacity" v-model.number="room.capacity" required />
      </div>

      <div>
        <label for="actual_tenant_number">Número Actual de Inquilinos:</label>
        <input type="number" id="actual_tenant_number" v-model.number="room.actual_tenant_number" required />
      </div>

      <div>
        <label for="availability">Disponibilidad:</label>
        <select id="availability" v-model="room.availability" required>
          <option :value="true">Disponible</option>
          <option :value="false">No Disponible</option>
        </select>
      </div>

      <!-- Botones -->
      <div style="display: flex; justify-content: space-between; margin-top: 20px;">
        <button type="button" @click="goBack" class="secondary-button">Volver</button>
        <button type="submit" class="primary-button">Actualizar Estancia</button>
      </div>
    </form>
  </div>
</template>

<script>
import apiClient from "../api/axios"; // Asegúrate de que apiClient está correctamente configurado

export default {
  data() {
    return {
      room: {
        id: this.$route.params.id, // Obtener el ID de la estancia desde la URL
        id_shelter: 0, // ID del shelter
        name: "", // Nombre de la estancia
        description: "", // Descripción
        capacity: 0, // Capacidad máxima
        actual_tenant_number: 0, // Número actual de inquilinos
        availability: true, // Disponibilidad (true o false)
      },
    };
  },
  methods: {
    async updateEstancia() {
      try {
        // Crear un objeto con los datos actualizados
        const updatedRoom = {
          id: this.room.id, // ID de la estancia
          id_shelter: this.room.id_shelter,
          name: this.room.name,
          description: this.room.description,
          capacity: this.room.capacity,
          actual_tenant_number: this.room.actual_tenant_number,
          availability: this.room.availability,
        };

        // Enviar datos al endpoint /room/update
        const response = await apiClient.post("/room/update", updatedRoom);

        console.log("Estancia actualizada:", response.data);
        alert("Estancia actualizada correctamente"); // Alerta de éxito
        this.$router.push("/estancias"); // Redirigir a la lista de estancias
      } catch (error) {
        console.error("Error al actualizar la estancia:", error);
        alert("Hubo un error al actualizar la estancia. Por favor, intenta de nuevo.");
      }
    },
    goBack() {
      this.$router.push("/estancias"); // Redirigir a la página de estancias
    },
  },
};
</script>

<style scoped>
/* Estilos del formulario */
form {
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

textarea {
  resize: none;
}

/* Estilo de botones */
button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  color: #fff;
}

button.primary-button {
  background-color: #007bff; /* Azul */
}

button.primary-button:hover {
  background-color: #0056b3; /* Azul oscuro */
}

button.secondary-button {
  background-color: #6c757d; /* Gris */
}

button.secondary-button:hover {
  background-color: #5a6268; /* Gris oscuro */
}

/* Espaciado entre botones */
button.secondary-button {
  margin-right: 15px; /* Más espacio entre los botones */
}
</style>
