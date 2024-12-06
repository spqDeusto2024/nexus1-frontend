<template>
  <div class="add-dormitory-page">
    <h1>Añadir Dormitorio</h1>
    <form @submit.prevent="addDormitory">
      <div class="form-group">
        <label for="id_shelter">ID Refugio</label>
        <input type="number" v-model.number="dormitory.id_shelter" id="id_shelter" required />
      </div>

      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" v-model="dormitory.name" id="name" required />
      </div>

      <div class="form-group">
        <label for="description">Descripción</label>
        <input type="text" v-model="dormitory.description" id="description" required />
      </div>

      <div class="form-group">
        <label for="capacity">Capacidad</label>
        <input type="number" v-model.number="dormitory.capacity" id="capacity" required />
      </div>

      <div class="form-group">
        <label for="actual_tenant_number">Número Actual de Inquilinos</label>
        <input
          type="number"
          v-model.number="dormitory.actual_tenant_number"
          id="actual_tenant_number"
          required
        />
      </div>

      <div class="form-group">
        <label for="availability">Disponibilidad</label>
        <select v-model="dormitory.availability" id="availability" required>
          <option :value="true">Disponible</option>
          <option :value="false">No disponible</option>
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
      dormitory: {
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
    async addDormitory() {
      try {
        // Prepara los datos para enviar
        const dormitoryData = {
          id_shelter: this.dormitory.id_shelter,
          name: this.dormitory.name,
          description: this.dormitory.description,
          capacity: this.dormitory.capacity,
          actual_tenant_number: this.dormitory.actual_tenant_number,
          availability: this.dormitory.availability,
          created_at: new Date().toISOString(), // Fecha actual en formato ISO 8601
        };

        console.log("Datos enviados al backend:", dormitoryData);

        // Enviar solicitud al endpoint
        const response = await apiClient.post("/dormitory/create", dormitoryData);
        console.log("Dormitorio añadido con éxito:", response.data);

        // Mostrar alerta y redirigir
        alert("Dormitorio añadido correctamente");
        this.$router.push("/habitaciones"); // Redirige a la lista de dormitorios
      } catch (error) {
        console.error("Error al añadir el dormitorio:", error);
        if (error.response) {
          console.error("Datos de error:", error.response.data);
          alert("Error: " + (error.response.data.message || "Inténtalo de nuevo."));
        } else {
          alert("Error de conexión al servidor.");
        }
      }
    },
    goBack() {
      this.$router.push("/habitaciones"); // Redirige a la lista de dormitorios
    },
  },
};
</script>

<style scoped>
.add-dormitory-page {
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
