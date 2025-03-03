import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import MainView from '../views/MainView.vue';
import TenantView from '../views/TenantView.vue';
import AddTenantView from '../views/AddTenantView.vue';
import UpdateTenantView from '../views/UpdateTenantView.vue';
import RoomView from '../views/RoomView.vue';
import AddRoomView from '../views/AddRoomView.vue';
import UpdateRoomView from '../views/UpdateRoomView.vue';
import ShelterView from '../views/ShelterView.vue';
import UpdateShelterView from '../views/UpdateShelterView.vue';
import DormitoryView from '../views/DormitoryView.vue';
import AddDormitoryView from '../views/AddDormitoryView.vue';
import UpdateDormitoryView from '../views/UpdateDormitoryView.vue';
import RoleView from '../views/RoleView.vue';
import AddRoleView from '../views/AddRoleView.vue';
import UpdateRoleView from '../views/UpdateRoleView.vue';

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
    },
    {
      path: '/estancias',
      name: 'estancias',
      component: RoomView, // Vista para el main
    }, 
    {
      path: '/estancia/add',
      name: 'add-room',
      component: AddRoomView, // Vista para el main
    }, 

    {
      path: '/estancia/update/:id',
      name: 'update-estancia',
      component: UpdateRoomView, // Vista para el main
    },
    {
      path: '/refugio',
      name: 'refugio',
      component: ShelterView, // Vista para el main
    },
    {
      path: '/shelter/update/:id',
      name: 'update-shelter',
      component: UpdateShelterView, // Vista para el main
    },
    {
      path: '/habitaciones',
      name: 'habitaciones',
      component: DormitoryView, // Vista para el main
    },
    {
      path: '/dormitory/add',
      name: 'add-dormitory',
      component: AddDormitoryView, // Vista para el main
    }, 
    {
      path: '/dormitory/update/:id',
      name: 'update-dormitory',
      component: UpdateDormitoryView, // Vista para el main
    }, 
    {
      path: '/roles',
      name: 'roles',
      component: RoleView, // Vista para el main
    },
    {
      path: '/role/add',
      name: 'add-role',
      component: AddRoleView, // Vista para el main
    }, 
    {
      path: '/role/update/:id',
      name: 'update-role',
      component: UpdateRoleView, // Vista para el main
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
