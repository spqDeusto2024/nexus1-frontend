<template>
  <div>
    <h2>Actualizar Refugio</h2>

    <!-- Formulario de actualización -->
    <form @submit.prevent="updateShelter">
      <div>
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="shelter.name" required />
      </div>

      <div>
        <label for="description">Descripción:</label>
        <textarea id="description" v-model="shelter.description" rows="4" required></textarea>
      </div>

      <!-- Botones -->
      <div style="display: flex; justify-content: space-between; margin-top: 20px;">
        <button type="button" @click="goBack" class="secondary-button">Volver</button>
        <button type="submit" class="primary-button">Actualizar Refugio</button>
      </div>
    </form>
  </div>
</template>

<script>
import apiClient from "../api/axios";

export default {
  data() {
    return {
      shelter: {
        id: this.$route.params.id, // Obtener el ID del refugio desde la URL
        name: "", // Nombre del refugio
        description: "", // Descripción
      },
    };
  },
  methods: {
    // Método para actualizar el refugio
    async updateShelter() {
      try {
        // Crear objeto con datos actualizados
        const updatedShelter = {
          id: this.shelter.id,
          name: this.shelter.name,
          description: this.shelter.description,
        };

        // Enviar datos al endpoint /shelter/update
        const response = await apiClient.post("/shelter/update", updatedShelter);

        console.log("Refugio actualizado:", response.data);
        alert("Refugio actualizado correctamente"); // Alerta de éxito
        this.$router.push("/refugio"); // Redirigir a la lista de refugios
      } catch (error) {
        console.error("Error al actualizar el refugio:", error);
        alert("Hubo un error al actualizar el refugio. Por favor, intenta de nuevo.");
      }
    },
    goBack() {
      this.$router.push("/refugio"); // Redirigir a la página de refugios
    },
  },
  async mounted() {
    try {
      // Obtener datos del refugio actual para pre-rellenar el formulario
      const response = await apiClient.get(`/shelter/${this.shelter.id}`);
      if (response.data.status === "ok") {
        this.shelter.name = response.data.data.name;
        this.shelter.description = response.data.data.description;
      } else {
        console.error("Error al cargar el refugio:", response.data.message);
      }
    } catch (error) {
      console.error("Error al cargar los datos del refugio:", error);
    }
  },
};
</script>

<style scoped>
/* Estilos del formulario */
form {
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
}

form div {
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
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

textarea {
  resize: none;
}

/* Estilo de botones */
button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  color: #fff;
}

button.primary-button {
  background-color: #007bff; /* Azul */
}

button.primary-button:hover {
  background-color: #0056b3; /* Azul oscuro */
}

button.secondary-button {
  background-color: #6c757d; /* Gris */
}

button.secondary-button:hover {
  background-color: #5a6268; /* Gris oscuro */
}

/* Espaciado entre botones */
button.secondary-button {
  margin-right: 15px; /* Más espacio entre los botones */
}
</style>
