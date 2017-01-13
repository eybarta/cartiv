import * as types from './mutation-types';
import { Carts } from '../../api/carts/carts.js';

export const toggleAddCart = ({ commit }) => {
  commit('TOGGLE_ADDCART');
}

export const saveCart = ({ commit, state }, cart) => {
    Carts.insert(cart);
    commit('SAVE_CART', cart);
	commit('TOGGLE_ADDCART');
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
    console.log("ACTION: UPDATE CURRENT CART LOCATION >> ", location);
    commit('UPDATE_CURRENT_CART_LOCATION', location);

}

export const updateCurrentCartThumb = ({ commit }, image) => {
    console.log("ACTION: UPDATE_CURRENT_CART_THUMB >> ", image);
    commit('UPDATE_CURRENT_CART_THUMB', image);
}