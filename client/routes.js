// import VueRouter from 'vue-router';

// Vue.use(VueRouter);


// pages
import Home from '/imports/ui/pages/Home.vue';
import Carts from '/imports/ui/pages/Carts.vue';
import Cart from '/imports/ui/pages/Cart.vue';
import Inventory from '/imports/ui/pages/Inventory.vue';

export const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/cartsbank',
		name: 'cartsbank',
		component: Carts
	},
	{
		path:'/cart/:cartId',
		name: 'cart',
		component:Cart
	},
	{
		path: '/inventory',
		name: 'inventory',
		component: Inventory
	}
]


// export default new VueRouter({
//   mode: 'history',
//   routes
// })

//  Router.configure(router => {
//  //   Simple routes
//    router.addRoutes([
//      {
//        path: '/',
//        name: 'home',
//        component: Home,
//      },
//      {
//        path: '/cartsbank',
//        name: 'cartsbank',
//        component: CartsBank
//      },
//        {
//          path:'/cart/:cartId',
//          name: 'cart',
//          component:Cart
//        }
//    ]);
//  });