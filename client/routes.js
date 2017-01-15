// import VueRouter from 'vue-router';

// Vue.use(VueRouter);


// pages
import Home from '/imports/ui/pages/Home.vue';
import CartsBank from '/imports/ui/pages/CartsBank.vue';
import Cart from '/imports/ui/pages/Cart.vue';


export const routes = [
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
	{
		path:'/cart/:cartId',
		name: 'cart',
		component:Cart
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