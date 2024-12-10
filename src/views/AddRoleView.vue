<template>
  <div class="add-role-page">
    <h1>Añadir Rol</h1>
    <form @submit.prevent="addRole">
      <!-- Nombre -->
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" v-model="role.name" id="name" required />
      </div>

      <!-- Descripción -->
      <div class="form-group">
        <label for="description">Descripción</label>
        <textarea v-model="role.description" id="description" required></textarea>
      </div>

      <!-- ID Room Relationship -->
      <div class="form-group">
        <label for="id_room_relationship">ID Room Relationship</label>
        <input type="number" v-model.number="role.id_room_relationship" id="id_room_relationship" required />
      </div>

      <!-- Botones -->
      <button type="submit" class="submit-btn">Guardar</button>
      <button type="button" class="back-btn" @click="goBack">Atrás</button>
    </form>
  </div>
</template>

<script>
import apiClient from "../api/axios"; // Ajusta la ruta a tu cliente de Axios

export default {
  data() {
    return {
      role: {
        name: "", // Cadena
        description: "", // Cadena
        id_room_relationship: 0, // Número
      },
    };
  },
  methods: {
    // Método para añadir un rol
    async addRole() {
      try {
        const roleData = {
          name: this.role.name,
          description: this.role.description,
          id_room_relationship: this.role.id_room_relationship,
          created_at: new Date().toISOString(), // Fecha actual en formato ISO 8601
        };

        console.log("Datos enviados al backend:", roleData);

        const response = await apiClient.post("/role/create", roleData);
        console.log("Rol añadido con éxito:", response.data);

        // Mostrar alerta al añadir correctamente
        alert("Rol añadido correctamente");
        this.$router.push("/roles"); // Redirige a la lista de roles
      } catch (error) {
        console.error("Error al añadir el rol:", error);
        if (error.response) {
          console.error("Datos de error:", error.response.data);
          alert("Error: " + (error.response.data.message || "Inténtalo de nuevo."));
        } else {
          alert("Error de conexión al servidor.");
        }
      }
    },
    goBack() {
      this.$router.push("/roles"); // Redirige a la lista de roles
    },
  },
};
</script>

<style scoped>
.add-role-page {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  resize: none;
}

.submit-btn,
.back-btn {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  color: #ffffff;
  background-color: #00aaff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover,
.back-btn:hover {
  background-color: #0088cc;
}
</style>
