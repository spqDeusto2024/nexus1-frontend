<template>
  <div class="dashboard">
    <button class="dashboard-btn" @click="navigateTo('')">INQUILINOS</button>
    <button class="dashboard-btn" @click="navigateTo('')">ESTANCIAS</button>
    <button class="dashboard-btn" @click="navigateTo('')">HABITACIONES</button>
    <button class="dashboard-btn" @click="navigateTo('')">ROLES</button>
    <button class="dashboard-btn" @click="navigateTo('')">REFUGIO</button>
    <button class="dashboard-btn" @click="navigateTo('')">ALARMAS</button>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(objectName) {
      console.log(`Navigating to ${objectName}`);
      this.$router.push(`/${objectName}`); // Ajusta las rutas según tu configuración
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columnas */
  grid-template-rows: repeat(2, 1fr); /* 2 filas */
  gap: 10px;
  height: 100vh; /* Ocupa toda la altura de la pantalla */
  width: 100vw; /* Ocupa toda la anchura de la pantalla */
  padding: 20px;
  box-sizing: border-box;
}

.dashboard-btn {
  background-color: #00aaff;
  color: #ffffff;
  font-size: 1.5em;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%; /* Asegura que el botón ocupe todo el ancho de su celda */
  height: 100%; /* Asegura que el botón ocupe toda la altura de su celda */
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard-btn:hover {
  background-color: #0088cc;
  transform: translateY(-5px);
}

.dashboard-btn:active {
  background-color: #005f99;
  transform: translateY(0);
}

/* Ajuste para pantallas más pequeñas */
@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas en pantallas pequeñas */
    grid-template-rows: repeat(3, 1fr); /* 3 filas en pantallas pequeñas */
  }
}
</style>
