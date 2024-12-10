<template>
  <div class="roles-page">
    <h1>Gestión de Roles</h1>

    <table class="roles-table">
      <thead>
        <tr>
          <th class="id-column">ID</th>
          <th class="name-column">Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles.data" :key="role.id">
          <td>{{ role.id }}</td>
          <td>{{ role.name }}</td>
          <td>
            <button class="details-btn" @click="showDetails(role)">
              Ver detalles
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Botones debajo de la tabla -->
    <div class="button-container">
      <button class="back-btn" @click="goBack">Atrás</button>
      <button class="add-btn" @click="addRole">Añadir Role</button>
    </div>

    <!-- Popup -->
    <div v-if="selectedRole" class="popup-overlay" @click.self="closePopup">
      <div class="popup">
        <h2>Detalles del Role</h2>
        <p><strong>ID:</strong> {{ selectedRole.id }}</p>
        <p><strong>Nombre:</strong> {{ selectedRole.name }}</p>
        <p><strong>Descripción:</strong> {{ selectedRole.description }}</p>
        <p><strong>ID Room Parameter:</strong> {{ selectedRole.id_room_parameter }}</p>
        <p><strong>Creado en:</strong> {{ formatDate(selectedRole.created_at) }}</p>

        <!-- Botones de actualizar y eliminar -->
        <div class="action-buttons">
          <button class="update-btn" @click="updateRole(selectedRole.id)">
            Actualizar Role
          </button>
          <button class="delete-btn" @click="deleteRole(selectedRole.id)">
            Eliminar Role
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
      roles: [], // Almacena la lista de roles
      selectedRole: null, // Role seleccionado para mostrar detalles en el popup
    };
  },
  methods: {
    // Método para obtener la lista de roles desde el backend
    async fetchRoles() {
      try {
        const response = await apiClient.get("/role/get_all");
        console.log("Respuesta del backend:", response.data);
        this.roles = response.data;
      } catch (error) {
        console.error("Error al obtener la lista de roles:", error);
      }
    },
    // Navegar a la página principal
    goBack() {
      this.$router.push("/main");
    },
    // Navegar a la página de añadir un nuevo role
    addRole() {
      this.$router.push("/role/add");
    },
    // Mostrar los detalles de un role en el popup
    showDetails(role) {
      this.selectedRole = role;
    },
    // Cerrar el popup
    closePopup() {
      this.selectedRole = null;
    },
    // Navegar a la página de actualización de roles
    updateRole(id) {
      this.$router.push(`/role/update/${id}`);
    },
    // Método para eliminar un role
    async deleteRole(id) {
      if (confirm("¿Estás seguro de que deseas eliminar este role?")) {
        try {
          const response = await apiClient.post("/role/delete", { id: id });
          if (response.status === 200) {
            alert("Role eliminado correctamente.");
            this.closePopup();
            this.fetchRoles(); // Actualizar la lista después de eliminar
          } else {
            alert("No se pudo eliminar el role. Por favor, inténtalo de nuevo.");
          }
        } catch (error) {
          console.error("Error al eliminar el role:", error);
          alert("Error al eliminar el role. Por favor, inténtalo de nuevo.");
        }
      }
    },
    // Formatear la fecha para que sea más legible
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
      return new Date(dateString).toLocaleDateString("es-ES", options);
    },
  },
  mounted() {
    this.fetchRoles(); // Obtener los roles al montar el componente
  },
};
</script>

<style scoped>
.roles-page {
  padding: 20px;
}

.roles-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.roles-table th,
.roles-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.roles-table th {
  background-color: #f4f4f4;
  color: #000000;
}

.roles-table th.id-column {
  width: 10%;
}

.roles-table th.name-column {
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
