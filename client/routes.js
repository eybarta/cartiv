
// pages
import Home from '/imports/ui/pages/Home.vue';
import CartsBank from '/imports/ui/pages/CartsBank.vue';

Router.configure(router => {
  // Simple routes
  router.addRoutes([
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/cartsbank',
      name: 'cartsbank',
      component: CartsBank
    },
  ]);
});