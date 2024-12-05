<template>
  <div class="estancias-page">
    <h1>Gestión de Estancias</h1>

    <table class="estancias-table">
      <thead>
        <tr>
          <th class="name-column">Nombre</th>
          <th>Disponibilidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="estancia in estancias.data" :key="estancia.id">
          <td>{{ estancia.name }}</td>
          <td>{{ estancia.availability ? "Disponible" : "No Disponible" }}</td>
          <td>
            <button class="details-btn" @click="showDetails(estancia)">
              Ver detalles
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Botones debajo de la tabla -->
    <div class="button-container">
      <button class="back-btn" @click="goBack">Atrás</button>
      <button class="add-btn" @click="addEstancia">Añadir Estancia</button>
    </div>

    <!-- Popup -->
    <div v-if="selectedEstancia" class="popup-overlay" @click.self="closePopup">
      <div class="popup">
        <h2>Detalles de la Estancia</h2>
        <p><strong>ID Shelter:</strong> {{ selectedEstancia.id_shelter }}</p>
        <p><strong>Nombre:</strong> {{ selectedEstancia.name }}</p>
        <p><strong>Capacidad:</strong> {{ selectedEstancia.capacity }}</p>
        <p><strong>Disponibilidad:</strong> {{ selectedEstancia.availability ? "Disponible" : "No Disponible" }}</p>
        <p><strong>Descripción:</strong> {{ selectedEstancia.description }}</p>
        <p><strong>Inquilinos actuales:</strong> {{ selectedEstancia.actual_tenant_number }}</p>
       

        <!-- Botones de actualizar y eliminar -->
        <div class="action-buttons">
          <button class="update-btn" @click="updateEstancia(selectedEstancia.id)">
            Actualizar Estancia
          </button>
          <button class="delete-btn" @click="deleteEstancia(selectedEstancia.id)">
            Eliminar Estancia
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
      estancias: [], // Datos de las estancias obtenidas del backend
      selectedEstancia: null, // Estancia seleccionada para mostrar en el popup
    };
  },
  methods: {
    // Obtener la lista de estancias desde el backend
    async fetchEstancias() {
      try {
        const response = await apiClient.get("/room/get_all");
        console.log("Respuesta del backend:", response.data);
        this.estancias = response.data;
      } catch (error) {
        console.error("Error al obtener la lista de estancias:", error);
      }
    },
    // Volver a la página principal
    goBack() {
      this.$router.push("/main");
    },
    // Mostrar detalles de la estancia en el popup
    showDetails(estancia) {
      this.selectedEstancia = estancia;
    },
    // Cerrar el popup
    closePopup() {
      this.selectedEstancia = null;
    },
    // Navegar a la vista de añadir estancia
    addEstancia() {
      this.$router.push("/estancia/add");
    },
    // Navegar a la vista de actualizar estancia
    updateEstancia(id) {
      this.$router.push(`/estancia/update/${id}`);
    },
    // Eliminar una estancia
    async deleteEstancia(id) {
      if (confirm("¿Estás seguro de que deseas eliminar esta estancia?")) {
        try {
          // Enviar el id de la estancia en el cuerpo de la solicitud
          const response = await apiClient.post("/room/delete", { id: id });

          // Verificar si la respuesta fue exitosa
          if (response.status === 200) {
            alert("Estancia eliminada correctamente.");
            this.closePopup();
            this.fetchEstancias(); // Actualizar la lista después de eliminar
          } else {
            alert("No se pudo eliminar la estancia. Por favor, inténtalo de nuevo.");
          }
        } catch (error) {
          console.error("Error al eliminar la estancia:", error);
          alert("Error al eliminar la estancia. Por favor, inténtalo de nuevo.");
        }
      }
    },
  },
  // Cargar la lista de estancias al montar el componente
  mounted() {
    this.fetchEstancias();
  },
};
</script>

<style scoped>
/* Similar al código anterior con estilos para botones */
.estancias-page {
  padding: 20px;
}

.estancias-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.estancias-table th,
.estancias-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.estancias-table th {
  background-color: #f4f4f4;
  color: #000000;
}

.estancias-table th.name-column {
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
