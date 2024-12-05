<template>
  <div class="add-estancia-page">
    <h1>Añadir Estancia</h1>
    <form @submit.prevent="addEstancia">
      <div class="form-group">
        <label for="id_shelter">ID Shelter</label>
        <input type="number" v-model.number="estancia.id_shelter" id="id_shelter" required />
      </div>

      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" v-model="estancia.name" id="name" required />
      </div>

      <div class="form-group">
        <label for="description">Descripción</label>
        <textarea v-model="estancia.description" id="description" rows="4" required></textarea>
      </div>

      <div class="form-group">
        <label for="capacity">Capacidad</label>
        <input type="number" v-model.number="estancia.capacity" id="capacity" required />
      </div>

      <div class="form-group">
        <label for="actual_tenant_number">Número Actual de Inquilinos</label>
        <input type="number" v-model.number="estancia.actual_tenant_number" id="actual_tenant_number" required />
      </div>

      <div class="form-group">
        <label for="availability">Disponibilidad</label>
        <select v-model="estancia.availability" id="availability" required>
          <option :value="true">Disponible</option>
          <option :value="false">No Disponible</option>
        </select>
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
      estancia: {
        id_shelter: 0, // Número
        name: "", // Cadena
        description: "", // Cadena
        capacity: 0, // Número
        actual_tenant_number: 0, // Número
        availability: true, // Booleano
      },
    };
  },
  methods: {
    async addEstancia() {
      try {
        const estanciaData = {
          id_shelter: this.estancia.id_shelter,
          name: this.estancia.name,
          description: this.estancia.description,
          capacity: this.estancia.capacity,
          actual_tenant_number: this.estancia.actual_tenant_number,
          availability: this.estancia.availability,
          created_at: new Date().toISOString(), // Fecha actual en formato ISO 8601
        };

        console.log("Datos enviados al backend:", estanciaData);

        const response = await apiClient.post("/room/create", estanciaData);
        console.log("Estancia añadida con éxito:", response.data);

        // Mostrar alerta al añadir correctamente
        alert("Estancia añadida correctamente");
        this.$router.push("/estancias"); // Redirige a la lista de estancias
      } catch (error) {
        console.error("Error al añadir la estancia:", error);
        if (error.response) {
          console.error("Datos de error:", error.response.data);
          alert("Error: " + (error.response.data.message || "Inténtalo de nuevo."));
        } else {
          alert("Error de conexión al servidor.");
        }
      }
    },
    goBack() {
      this.$router.push("/estancias"); // Redirige a la lista de estancias
    },
  },
};
</script>

<style scoped>
.add-estancia-page {
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
textarea,
select {
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
