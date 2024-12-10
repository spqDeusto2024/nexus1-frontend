<template>
  <div>
    <h2>Actualizar Rol</h2>

    <!-- Formulario de actualización -->
    <form @submit.prevent="updateRole">
      <div>
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="role.name" required />
      </div>

      <div>
        <label for="description">Descripción:</label>
        <textarea id="description" v-model="role.description" rows="4" required></textarea>
      </div>

      <div>
        <label for="id_room_relationship">ID Relación de Sala:</label>
        <input
          type="number"
          id="id_room_relationship"
          v-model.number="role.id_room_relationship"
          required
        />
      </div>

      <!-- Botones -->
      <div style="display: flex; justify-content: space-between; margin-top: 20px;">
        <button type="button" @click="goBack" class="secondary-button">Volver</button>
        <button type="submit" class="primary-button">Actualizar Rol</button>
      </div>
    </form>
  </div>
</template>

<script>
import apiClient from "../api/axios"; // Asegúrate de que apiClient está correctamente configurado

export default {
  data() {
    return {
      role: {
        id: this.$route.params.id, // Obtener el ID del rol desde la URL
        name: "", // Nombre del rol
        description: "", // Descripción
        id_room_relationship: 0, // Relación con la sala (ID)
      },
    };
  },
  methods: {
    async updateRole() {
      try {
        // Crear un objeto con los datos actualizados
        const updatedRole = {
          id: this.role.id, // ID del rol
          name: this.role.name,
          description: this.role.description,
          id_room_relationship: this.role.id_room_relationship,
        };

        // Enviar datos al endpoint /role/update
        const response = await apiClient.post("/role/update", updatedRole);

        console.log("Rol actualizado:", response.data);
        alert("Rol actualizado correctamente."); // Alerta de éxito
        this.$router.push("/roles"); // Redirigir a la lista de roles
      } catch (error) {
        console.error("Error al actualizar el rol:", error);
        alert("Hubo un error al actualizar el rol. Por favor, intenta de nuevo.");
      }
    },
    goBack() {
      this.$router.push("/roles"); // Redirigir a la página de roles
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
