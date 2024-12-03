<template>
  <div class="inquilinos-page">
    <h1>Gestión de Inquilinos</h1>
    <button class="back-btn" @click="goBack">Atrás</button>
    <button class="add-btn" @click="addInquilino">Añadir Inquilino</button>
    <table class="inquilinos-table">
      <thead>
        <tr>
          <th>ID</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="inquilino in inquilinos.data" :key="inquilino.id">
          <td>{{ inquilino.id }}</td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import apiClient from "../api/axios"; // Ajusta la ruta a tu cliente de Axios

export default {
  data() {
    return {
      inquilinos: [], // Lista de inquilinos
    };
  },
  methods: {
    async fetchInquilinos() {
      try {
        const response = await apiClient.get("/tenant/get_all"); // Ajusta el endpoint
         console.log("Respuesta del backend:", response.data); 
        this.inquilinos = response.data;

      } catch (error) {
        console.error("Error al obtener la lista de inquilinos:", error);
      }
    },
    goBack() {
      this.$router.push("/"); // Ajusta según la ruta de tu dashboard
    },
    addInquilino() {
      this.$router.push("/inquilino/add");
      console.log("Añadir Inquilino - Implementar funcionalidad"); // Aquí puedes abrir un formulario modal o navegar a otra página
    },
  },
  mounted() {
    this.fetchInquilinos();
  },
};
</script>

<style scoped>
.inquilinos-page {
  padding: 20px;
}

.inquilinos-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.inquilinos-table th,
.inquilinos-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.inquilinos-table th {
  background-color: #f4f4f4;
}

.add-btn,
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

.add-btn:hover,
.back-btn:hover {
  background-color: #0088cc;
}
</style>
