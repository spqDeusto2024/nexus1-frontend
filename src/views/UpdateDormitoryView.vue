<template>
  <div>
    <h2>Actualizar Dormitorio</h2>

    <!-- Formulario de actualización -->
    <form @submit.prevent="updateDormitory">
      <div>
        <label for="id_shelter">ID Shelter:</label>
        <input type="number" id="id_shelter" v-model="dormitory.id_shelter" required />
      </div>
      <div>
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="dormitory.name" required />
      </div>
      <div>
        <label for="description">Descripción:</label>
        <input type="text" id="description" v-model="dormitory.description" required />
      </div>
      <div>
        <label for="capacity">Capacidad:</label>
        <input type="number" id="capacity" v-model="dormitory.capacity" required />
      </div>
      <div>
        <label for="actual_tenant_number">Número Actual de Inquilinos:</label>
        <input type="number" id="actual_tenant_number" v-model="dormitory.actual_tenant_number" required />
      </div>
      <div>
        <label for="availability">Disponibilidad:</label>
        <select id="availability" v-model="dormitory.availability" required>
          <option :value="true">Disponible</option>
          <option :value="false">No Disponible</option>
        </select>
      </div>

      <!-- Botones -->
      <div style="display: flex; justify-content: space-between;">
        <button type="button" @click="goBack" style="margin-right: 10px;">Volver</button>
        <button type="submit">Actualizar Dormitorio</button>
      </div>
    </form>
  </div>
</template>

<script>
import apiClient from "../api/axios"; // Asegúrate de que apiClient está correctamente configurado

export default {
  data() {
    return {
      dormitory: {
        id: this.$route.params.id, // Obtener el ID del dormitorio desde la URL
        id_shelter: 0, // ID del refugio por defecto
        name: "", // Nombre vacío inicialmente
        description: "", // Descripción vacía inicialmente
        capacity: 0, // Capacidad inicial
        actual_tenant_number: 0, // Número actual de inquilinos
        availability: true, // Disponibilidad por defecto
      },
    };
  },
  methods: {
    async updateDormitory() {
      try {
        // Crear un objeto con los campos que han sido modificados
        const updatedDormitory = {};

        // Validar y solo agregar campos al objeto de actualización si tienen un valor
        if (this.dormitory.id_shelter !== undefined) updatedDormitory.id_shelter = this.dormitory.id_shelter;
        if (this.dormitory.name) updatedDormitory.name = this.dormitory.name;
        if (this.dormitory.description) updatedDormitory.description = this.dormitory.description;
        if (this.dormitory.capacity !== undefined) updatedDormitory.capacity = this.dormitory.capacity;
        if (this.dormitory.actual_tenant_number !== undefined) updatedDormitory.actual_tenant_number = this.dormitory.actual_tenant_number;
        if (this.dormitory.availability !== undefined) updatedDormitory.availability = this.dormitory.availability;

        // Verificar si se proporcionan valores esenciales para la actualización
        if (
          updatedDormitory.id_shelter === undefined ||
          updatedDormitory.name === undefined ||
          updatedDormitory.description === undefined ||
          updatedDormitory.capacity === undefined ||
          updatedDormitory.actual_tenant_number === undefined ||
          updatedDormitory.availability === undefined
        ) {
          alert("Por favor, completa todos los campos requeridos.");
          return;
        }

        // Enviar solo los campos modificados a la API
        const response = await apiClient.post("/dormitory/update", {
          id: this.dormitory.id, // Siempre enviamos el id del dormitorio
          ...updatedDormitory, // Campos actualizados
        });

        console.log("Dormitorio actualizado:", response.data);
        alert("Dormitorio actualizado correctamente"); // Alerta de éxito
        this.$router.push("/habitaciones"); // Redirigir a la lista de dormitorios después de la actualización
      } catch (error) {
        console.error("Error al actualizar el dormitorio:", error);
        alert("Hubo un error al actualizar el dormitorio. Por favor, intenta de nuevo.");
      }
    },
    goBack() {
      this.$router.push("/habitaciones"); // Redirige a la página de dormitorios
    },
  },
};
</script>

<style scoped>
/* Estilos del formulario de actualización */
form {
  max-width: 500px;
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
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

button[type="button"] {
  background-color: #6c757d;
}

button[type="button"]:hover {
  background-color: #5a6268;
}

/* Espacio entre botones */
button[type="button"] {
  margin-right: 10px; /* Añadimos un margen a la derecha para separar los botones */
}
</style>
