import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import MainView from '../views/MainView.vue';
import TenantView from '../views/TenantView.vue';
import AddTenantView from '../views/AddTenantView.vue';
import UpdateTenantView from '../views/UpdateTenantView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView, // Vista para el login
    },
    {
      path: '/main',
      name: 'main',
      component: MainView, // Vista para el main
    },
    {
      path: '/inquilinos',
      name: 'inquilinos',
      component: TenantView, // Vista para el main
    },
    {
      path: '/inquilino/add',
      name: 'add-inquilinos',
      component: AddTenantView, // Vista para el main
    },

    {
      path: '/inquilino/update/:id',
      name: 'update-inquilinos',
      component: UpdateTenantView, // Vista para el main
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue'),
    //   meta: { requiresAuth: true }, // Indica que esta ruta está protegida
    // },
  ],
});

// Middleware global para manejar autenticación
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica si hay un token guardado
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirige al login si no está autenticado
  } else {
    next(); // Continúa con la navegación
  }
});

export default router;
