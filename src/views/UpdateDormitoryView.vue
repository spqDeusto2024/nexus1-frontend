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
        id: this.$route.params.id,
        id_shelter: 0, // ID del refugio por defecto
        name: "", // Nombre vacío inicialmente
        description: "", // Descripción vacía inicialmente
        capacity: 0, // Capacidad por defecto
        actual_tenant_number: 0, // Número actual de inquilinos por defecto
        availability: true, // Disponibilidad por defecto
        
      },
    };
  },
  methods: {
    async updateDormitory() {
      try {
        // Validación: Verificar si se proporcionan valores esenciales
        if (
          this.dormitory.id_shelter === undefined ||
          this.dormitory.name === "" ||
          this.dormitory.description === "" ||
          this.dormitory.capacity === undefined ||
          this.dormitory.actual_tenant_number === undefined ||
          this.dormitory.availability === undefined
        ) {
          alert("Por favor, completa todos los campos requeridos.");
          return;
        }

        // Enviar los datos actualizados a la API
        const response = await apiClient.post("/dormitory/update", {
          id_shelter: this.dormitory.id_shelter,
          name: this.dormitory.name,
          description: this.dormitory.description,
          capacity: this.dormitory.capacity,
          actual_tenant_number: this.dormitory.actual_tenant_number,
          availability: this.dormitory.availability,
          id: this.tenant.id
        });

        console.log("Dormitorio actualizado:", response.data);
        alert("Dormitorio actualizado correctamente");
        this.$router.push("/habitaciones"); // Redirigir a la lista de dormitorios
      } catch (error) {
        console.error("Error al actualizar el dormitorio:", error.response?.data || error.message);
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
