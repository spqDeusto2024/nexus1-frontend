<template>
  <div class="dormitories-page">
    <h1>Gestión de Dormitorios</h1>

    <table class="dormitories-table">
      <thead>
        <tr>
          <th class="name-column">Nombre</th>
          <th class="availability-column">Disponibilidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dormitory in dormitories.data" :key="dormitory.id">
          <td>{{ dormitory.name }}</td>
          <td>{{ dormitory.availability ? 'Disponible' : 'No disponible' }}</td>
          <td>
            <button class="details-btn" @click="showDetails(dormitory)">
              Ver detalles
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Botones debajo de la tabla -->
    <div class="button-container">
      <button class="back-btn" @click="goBack">Atrás</button>
      <button class="add-btn" @click="addDormitory">Añadir Dormitorio</button>
    </div>

    <!-- Popup -->
    <div v-if="selectedDormitory" class="popup-overlay" @click.self="closePopup">
      <div class="popup">
        <h2>Detalles del Dormitorio</h2>
        <p><strong>ID:</strong> {{ selectedDormitory.id }}</p>
        <p><strong>ID Refugio:</strong> {{ selectedDormitory.id_shelter }}</p>
        <p><strong>Nombre:</strong> {{ selectedDormitory.name }}</p>
        <p><strong>Capacidad:</strong> {{ selectedDormitory.capacity }}</p>
        <p><strong>Disponibilidad:</strong> {{ selectedDormitory.availability ? 'Disponible' : 'No disponible' }}</p>
        <p><strong>Descripción:</strong> {{ selectedDormitory.description }}</p>
        <p><strong>Número actual de inquilinos:</strong> {{ selectedDormitory.actual_tenant_number }}</p>
        <p><strong>Fecha de creación:</strong> {{ selectedDormitory.created_at }}</p>

        <!-- Botones de actualizar y eliminar -->
        <div class="action-buttons">
          <button class="update-btn" @click="updateDormitory(selectedDormitory.id)">
            Actualizar Dormitorio
          </button>
          <button class="delete-btn" @click="deleteDormitory(selectedDormitory.id)">
            Eliminar Dormitorio
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
      dormitories: [],
      selectedDormitory: null,
    };
  },
  methods: {
    async fetchDormitories() {
      try {
        const response = await apiClient.get("/dormitory/get_all");
        console.log("Respuesta del backend:", response.data);
        this.dormitories = response.data;
      } catch (error) {
        console.error("Error al obtener la lista de dormitorios:", error);
      }
    },
    goBack() {
      this.$router.push("/main");
    },
    addDormitory() {
      this.$router.push("/dormitory/add");
    },
    showDetails(dormitory) {
      this.selectedDormitory = dormitory;
    },
    closePopup() {
      this.selectedDormitory = null;
    },
    updateDormitory(id) {
      this.$router.push(`/dormitory/update/${id}`);
    },
    async deleteDormitory(id) {
      if (confirm("¿Estás seguro de que deseas eliminar este dormitorio?")) {
        try {
          // Enviar el id del dormitorio en el cuerpo de la solicitud
          const response = await apiClient.post("/dormitory/delete", { id: id });

          // Verificar si la respuesta fue exitosa
          if (response.status === 200) {
            alert("Dormitorio eliminado correctamente.");
            this.closePopup();
            this.fetchDormitories(); // Actualizar la lista después de eliminar
          } else {
            alert("No se pudo eliminar el dormitorio. Por favor, inténtalo de nuevo.");
          }
        } catch (error) {
          console.error("Error al eliminar el dormitorio:", error);
          alert("Error al eliminar el dormitorio. Por favor, inténtalo de nuevo.");
        }
      }
    },
  },
  mounted() {
    this.fetchDormitories();
  },
};
</script>

<style scoped>
.dormitories-page {
  padding: 20px;
}

.dormitories-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.dormitories-table th,
.dormitories-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.dormitories-table th {
  background-color: #f4f4f4;
  color: #000000;
}

.dormitories-table th.name-column {
  width: 60%;
}

.dormitories-table th.availability-column {
  width: 20%;
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
  display: block;
  margin: 20px auto;
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
