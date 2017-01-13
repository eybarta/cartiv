import * as types from './mutation-types';
import { Carts } from '../../../api/collections/carts.js';
import { Inventory } from '../../../api/collections/inventory.js';

// CART ACTIONS
export const toggleAddCart = ({ commit }) => {
  commit('TOGGLE_ADDCART');
}
export const saveCart = ({ commit, state }, cart) => {
    Carts.insert(cart);
    commit('SAVE_CART', cart);
	commit('TOGGLE_ADDCART');
    console.log('save cart to db');
}
export const getCartById = ({ commit, state }, cartId) => {
	Carts.insert(cart);
	commit('SAVE_CART', cart);
	commit('CART_BY_ID');
	console.log('save cart to db');
}
export const initCartsState = ({ commit }, _userId) => {
  console.log("INIT CARTS WITH USERID: ", _userId);
	let carts = [];
	let findtimer = setInterval(() => {
        carts = Carts.find().fetch();
		console.log("in timer > ", carts.length);
		if (carts.length>0) {
            clearInterval(findtimer);
			carts = Carts.find({ _userId }).fetch();
			findtimer = null;
			commit('INIT_CARTS_STATE', carts);
        }
  },200)
    setTimeout(()=> {
	    if (!!findtimer) {
			clearInterval(findtimer);
        }
	},3000)
    console.log("carts from db > ", carts);

}
export const updateCurrentCartLocation = ({ commit }, location) => {
    commit('UPDATE_CURRENT_CART_LOCATION', location);
}
export const updateCurrentCartThumb = ({ commit }, image) => {
    commit('UPDATE_CURRENT_CART_THUMB', image);
}


// INVENTORY ACTIONS
export const toggleAddProduct = ({ commit }) => {
  commit('TOGGLE_ADD_PRODUCT');
}
export const saveProduct = ({ commit, state }, product) => {
    Inventory.insert(product);
    commit('SAVE_PRODUCT', product);
	commit('TOGGLE_ADD_PRODUCT');
    console.log('save cart to db');
}