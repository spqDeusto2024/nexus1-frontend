<template>
  <div class="shelters-page">
    <h1>Gestión del Refugio</h1>

    <table class="shelters-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th class="description-column">Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="shelter in shelters" :key="shelter.id">
          <td>{{ shelter.id }}</td>
          <td>{{ shelter.name }}</td>
          <td>{{ shelter.description }}</td>
          <td>
            <button class="update-btn" @click="updateShelter(shelter.id)">
              Actualizar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Imagen -->
    <div class="image-container">
      <img src="../assets/shelter_image.png" alt="Shelter Image" class="shelter-image" />
    </div>

    <!-- Botón de volver -->
    <div class="button-container">
      <button class="back-btn" @click="goBack">Atrás</button>
    </div>
  </div>
</template>

<script>
import apiClient from "../api/axios";

export default {
  data() {
    return {
      shelters: [], // Lista de shelters obtenida del backend
    };
  },
  methods: {
    // Obtener la lista de shelters desde el backend
    async fetchShelters() {
      try {
        const response = await apiClient.get("/shelter/get_all");
        console.log("Datos obtenidos:", response.data);
        if (response.data.status === "ok") {
          this.shelters = response.data.data; // Asignar datos a shelters
        } else {
          console.error("Error en la respuesta del servidor:", response.data.message);
        }
      } catch (error) {
        console.error("Error al obtener la lista de shelters:", error);
      }
    },
    // Redirigir a la página principal
    goBack() {
      this.$router.push("/main");
    },
    // Navegar a la vista de actualizar shelter
    updateShelter(id) {
      this.$router.push(`/shelter/update/${id}`);
    },
  },
  // Cargar la lista de shelters al montar el componente
  mounted() {
    this.fetchShelters();
  },
};
</script>

<style scoped>
.shelters-page {
  padding: 20px;
}

h1 {
  text-align: center; /* Centrar el texto */
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
  color: white;
}

.shelters-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.shelters-table th,
.shelters-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.shelters-table th {
  background-color: #f4f4f4;
  color: #000000;
}

.shelters-table th.description-column {
  width: 50%; /* Ampliar el ancho de la columna descripción */
}

.update-btn {
  background-color: #ffc107;
  color: #ffffff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.update-btn:hover {
  background-color: #e0a800;
}

.image-container {
  text-align: center;
  margin: 20px 0; /* Separación entre tabla y botón atrás */
}

.shelter-image {
  max-width: 100%;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.button-container {
  text-align: center;
}

.back-btn {
  padding: 10px 20px;
  font-size: 16px;
  color: #ffffff;
  background-color: #00aaff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-btn:hover {
  background-color: #0088cc;
}
</style>
