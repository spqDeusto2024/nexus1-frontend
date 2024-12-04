<template>
  <div class="add-inquilino-page">
    <h1>Añadir Inquilino</h1>
    <form @submit.prevent="addInquilino">
      <div class="form-group">
        <label for="id_role">ID Role</label>
        <input type="number" v-model.number="inquilino.id_role" id="id_role" required />
      </div>

      <div class="form-group">
        <label for="id_dormitory">ID Dormitorio</label>
        <input type="number" v-model.number="inquilino.id_dormitory" id="id_dormitory" required />
      </div>

      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" v-model="inquilino.name" id="name" required />
      </div>

      <div class="form-group">
        <label for="surname">Apellido</label>
        <input type="text" v-model="inquilino.surname" id="surname" required />
      </div>

      <div class="form-group">
        <label for="age">Edad</label>
        <input type="text" v-model="inquilino.age" id="age" required />
      </div>

      <div class="form-group">
        <label for="status">Estado</label>
        <select v-model="inquilino.status" id="status" required>
          <option :value="true">Activo</option>
          <option :value="false">Inactivo</option>
        </select>
      </div>

      <div class="form-group">
        <label for="genre">Género</label>
        <input type="text" v-model="inquilino.genre" id="genre" required />
      </div>

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
      inquilino: {
        id_role: 0, // Número
        id_dormitory: 0, // Número
        name: "", // Cadena
        surname: "", // Cadena
        age: "", // Cadena
        status: true, // Booleano
        genre: "", // Cadena
      },
    };
  },
  methods: {
    async addInquilino() {
      try {
        const inquilinoData = {
          id_role: this.inquilino.id_role,
          id_dormitory: this.inquilino.id_dormitory,
          name: this.inquilino.name,
          surname: this.inquilino.surname,
          age: this.inquilino.age,
          status: this.inquilino.status,
          genre: this.inquilino.genre,
          created_at: new Date().toISOString(), // Fecha actual en formato ISO 8601
        };

        console.log("Datos enviados al backend:", inquilinoData);

        const response = await apiClient.post("/tenant/create", inquilinoData);
        console.log("Inquilino añadido con éxito:", response.data);

        // Mostrar alerta al añadir correctamente
        alert("Inquilino añadido correctamente");
        this.$router.push("/inquilinos"); // Redirige a la lista de inquilinos
      } catch (error) {
        console.error("Error al añadir el inquilino:", error);
        if (error.response) {
          console.error("Datos de error:", error.response.data);
          alert("Error: " + (error.response.data.message || "Inténtalo de nuevo."));
        } else {
          alert("Error de conexión al servidor.");
        }
      }
    },
    goBack() {
      this.$router.push("/inquilinos"); // Redirige a la lista de inquilinos
    },
  },
};
</script>

<style scoped>
.add-inquilino-page {
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
select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
