<template>
  <div class="inquilinos-page">
    <h1>Gestión de Inquilinos</h1>

    <table class="inquilinos-table">
      <thead>
        <tr>
          <th class="id-column">ID</th>
          <th class="name-column">Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="inquilino in inquilinos.data" :key="inquilino.id">
          <td>{{ inquilino.id }}</td>
          <td>{{ inquilino.name }}</td>
          <td>
            <button class="details-btn" @click="showDetails(inquilino)">
              Ver detalles
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Botones debajo de la tabla -->
    <div class="button-container">
      <button class="back-btn" @click="goBack">Atrás</button>
      <button class="add-btn" @click="addInquilino">Añadir Inquilino</button>
    </div>

    <!-- Popup -->
    <div v-if="selectedInquilino" class="popup-overlay" @click.self="closePopup">
      <div class="popup">
        <h2>Detalles del Inquilino</h2>
        <p><strong>ID:</strong> {{ selectedInquilino.id }}</p>
        <p><strong>ID Role:</strong> {{ selectedInquilino.id_role }}</p>
        <p><strong>ID Dormitorio:</strong> {{ selectedInquilino.id_dormitory }}</p>
        <p><strong>Nombre:</strong> {{ selectedInquilino.name }}</p>
        <p><strong>Apellido:</strong> {{ selectedInquilino.surname }}</p>
        <p><strong>Edad:</strong> {{ selectedInquilino.age }}</p>
        <p><strong>Estado:</strong> {{ selectedInquilino.status === true ? 'Activo' : 'Inactivo' }}</p>
        <p><strong>Género:</strong> {{ selectedInquilino.genre }}</p>

        <!-- Botones de actualizar y eliminar -->
        <div class="action-buttons">
          <button class="update-btn" @click="updateInquilino(selectedInquilino.id)">
            Actualizar Inquilino
          </button>
          <button class="delete-btn" @click="deleteInquilino(selectedInquilino.id)">
            Eliminar Inquilino
          </button>
        </div>

        <!-- Botón de cerrar -->
        <button class="close-btn" @click="closePopup">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "../api/axios";

export default {
  data() {
    return {
      inquilinos: [],
      selectedInquilino: null,
    };
  },
  methods: {
    async fetchInquilinos() {
      try {
        const response = await apiClient.get("/tenant/get_all");
        console.log("Respuesta del backend:", response.data);
        this.inquilinos = response.data;
      } catch (error) {
        console.error("Error al obtener la lista de inquilinos:", error);
      }
    },
    goBack() {
      this.$router.push("/main");
    },
    addInquilino() {
      this.$router.push("/inquilino/add");
    },
    showDetails(inquilino) {
      this.selectedInquilino = inquilino;
    },
    closePopup() {
      this.selectedInquilino = null;
    },
    updateInquilino(id) {
      this.$router.push(`/inquilino/update/${id}`);
    },
    async deleteInquilino(id) {
      if (confirm("¿Estás seguro de que deseas eliminar este inquilino?")) {
        try {
          // Enviar el id del inquilino en el cuerpo de la solicitud
          const response = await apiClient.post("/tenant/delete", { id: id });

          // Verificar si la respuesta fue exitosa
          if (response.status === 200) {
            alert("Inquilino eliminado correctamente.");
            this.closePopup();
            this.fetchInquilinos(); // Actualizar la lista después de eliminar
          } else {
            alert("No se pudo eliminar el inquilino. Por favor, inténtalo de nuevo.");
          }
        } catch (error) {
          console.error("Error al eliminar el inquilino:", error);
          alert("Error al eliminar el inquilino. Por favor, inténtalo de nuevo.");
        }
      }
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
  color: #000000;
}

.inquilinos-table th.id-column {
  width: 10%;
}

.inquilinos-table th.name-column {
  width: 60%;
}

.details-btn {
  background-color: #007bff;
  color: #ffffff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.details-btn:hover {
  background-color: #0056b3;
}

.button-container {
  margin-top: 20px;
  text-align: center;
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

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background: #ffffff;
  color: #000000;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.popup h2 {
  margin-top: 0;
}

.popup .action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.popup .update-btn {
  background-color: #ffc107;
  color: #ffffff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.popup .update-btn:hover {
  background-color: #e0a800;
}

.popup .delete-btn {
  background-color: #dc3545;
  color: #ffffff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.popup .delete-btn:hover {
  background-color: #c82333;
}

.popup .close-btn {
  display: block; /* Asegura que el botón ocupe un bloque */
  margin: 20px auto; /* Centra el botón horizontalmente */
  padding: 10px 20px;
  font-size: 14px;
  color: #ffffff;
  background-color: #6c757d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.popup .close-btn:hover {
  background-color: #5a6268;
}
</style>
