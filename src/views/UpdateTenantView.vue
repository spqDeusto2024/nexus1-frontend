<template>
  <div>
    <h2>Actualizar Inquilino</h2>

    <!-- Formulario de actualización -->
    <form @submit.prevent="updateInquilino">
      <div>
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="tenant.name" required />
      </div>
      <div>
        <label for="surname">Apellido:</label>
        <input type="text" id="surname" v-model="tenant.surname" required />
      </div>
      <div>
        <label for="age">Edad:</label>
        <input type="text" id="age" v-model="tenant.age" required />
      </div>
      <div>
        <label for="status">Estado:</label>
        <select id="status" v-model="tenant.status" required>
          <option :value="true">Activo</option>
          <option :value="false">Inactivo</option>
        </select>
      </div>
      <div>
        <label for="genre">Género:</label>
        <input type="text" id="genre" v-model="tenant.genre" required />
      </div>
      <div>
        <label for="id_role">Rol:</label>
        <input type="number" id="id_role" v-model="tenant.id_role" required />
      </div>
      <div>
        <label for="id_dormitory">ID Dormitorio:</label>
        <input type="number" id="id_dormitory" v-model="tenant.id_dormitory" required />
      </div>

      <!-- Botones -->
      <div style="display: flex; justify-content: space-between;">
        <button type="button" @click="goBack" style="margin-right: 10px;">Volver</button>
        <button type="submit">Actualizar Inquilino</button>
      </div>
    </form>
  </div>
</template>

<script>
import apiClient from "../api/axios"; // Asegúrate de que apiClient está correctamente configurado

export default {
  data() {
    return {
      tenant: {
        id: this.$route.params.id, // Obtener el ID del inquilino desde la URL
        name: "", // Nombre vacío inicialmente
        surname: "", // Apellido vacío inicialmente
        age: "", // Edad vacía inicialmente
        status: true, // Estado por defecto (Activo)
        genre: "", // Género vacío inicialmente
        id_role: 0, // Rol por defecto (0)
        id_dormitory: 0, // ID de dormitorio por defecto (0)
      },
    };
  },
  methods: {
    async updateInquilino() {
      try {
        // Crear un objeto con los campos que han sido modificados
        const updatedTenant = {};

        // Validar y solo agregar campos al objeto de actualización si tienen un valor
        if (this.tenant.name) updatedTenant.name = this.tenant.name;
        if (this.tenant.surname) updatedTenant.surname = this.tenant.surname;
        if (this.tenant.age) updatedTenant.age = this.tenant.age;
        if (this.tenant.status !== undefined) updatedTenant.status = this.tenant.status;
        if (this.tenant.genre) updatedTenant.genre = this.tenant.genre;
        if (this.tenant.id_role !== undefined) updatedTenant.id_role = this.tenant.id_role;
        if (this.tenant.id_dormitory !== undefined) updatedTenant.id_dormitory = this.tenant.id_dormitory;

        // Verificar si se proporcionan valores esenciales para la actualización
        if (
          updatedTenant.name === undefined ||
          updatedTenant.surname === undefined ||
          updatedTenant.age === undefined ||
          updatedTenant.status === undefined ||
          updatedTenant.genre === undefined ||
          updatedTenant.id_role === undefined ||
          updatedTenant.id_dormitory === undefined
        ) {
          alert("Por favor, completa todos los campos requeridos.");
          return;
        }

        // Enviar solo los campos modificados a la API
        const response = await apiClient.post("/tenant/update", {
          id: this.tenant.id, // Siempre enviamos el id del inquilino
          ...updatedTenant, // Campos actualizados
        });

        console.log("Inquilino actualizado:", response.data);
        alert("Inquilino actualizado correctamente"); // Alerta de éxito
        this.$router.push("/inquilinos"); // Redirigir a la lista de inquilinos después de la actualización
      } catch (error) {
        console.error("Error al actualizar el inquilino:", error);
        alert("Hubo un error al actualizar el inquilino. Por favor, intenta de nuevo.");
      }
    },
    goBack() {
      this.$router.push("/inquilinos"); // Redirige a la página de inquilinos
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
