import { Meteor } from 'meteor/meteor'
import { Tracker }from 'meteor/tracker'
import * as types from './mutation-types';
import { Carts } from '/imports/api/collections/carts.js';
import { Inventory } from '/imports/api/collections/inventory.js';


// USER ID
export const initUserId = ({ commit }) => {
    Tracker.autorun((c) => {
        let userId = Accounts.userId();
        if (!!userId) {
            commit('INIT_USER_ID', userId)
            stop();
        }
    })

}

// CART ACTIONS
export const toggleAddCart = ({ commit }) => {
  commit('TOGGLE_ADDCART');
}
export const insertCartToDb = async ({ commit }, cart) => {
    return new Promise((resolve, reject) => {
        Meteor.call('carts.insert', cart, (err, result) =>{
            resolve();
        });
    });
}

export const saveCart =  async ({dispatch,commit}, cart) => {
        commit('SAVE_CART', cart, await dispatch('insertCartToDb', cart));
	    commit('TOGGLE_ADDCART');
         console.log('CART SAVED TO STORE >> ', cart);
}

export const getCartById = ({ commit, state }, cartId) => {
	Carts.insert(cart);
	commit('SAVE_CART', cart);
	commit('CART_BY_ID');
	console.log('save cart to db');
}
export const initCartsState = ({ commit }, _userId) => {
    Tracker.autorun((c) => {
        Meteor.subscribe('carts');
        let carts = Carts.find().fetch();
        commit('UPDATE_CARTS_STATE', carts)
        console.log("carts from db > ", carts);
        
    })

}
export const updateCurrentCartLocation = ({ commit }, location) => {
    commit('UPDATE_CURRENT_CART_LOCATION', location);
}
export const updateCurrentCartThumb = ({ commit }, image) => {
    commit('UPDATE_CURRENT_CART_THUMB', image);
}


// INVENTORY ACTIONS
export const initInventoryState = ({ commit }) => {
    Tracker.autorun((c) => {
        Meteor.subscribe('inventory');
        let inventory = Inventory.find({ }).fetch();
        commit('UPDATE_INVENTORY_STATE', inventory)
        console.log("carts from db > ", inventory);
    })
}
export const toggleAddProduct = ({ commit }) => {
  commit('TOGGLE_ADD_PRODUCT');
}

export const insertProductToDb = async ({ commit }, product) => {
    return new Promise((resolve, reject) => {
        Meteor.call('inventory.insert', product, (err, result) =>{
            resolve();
        });
    });
}
export const saveProduct = async ({ commit, dispatch }, product) => {
    commit('SAVE_PRODUCT', product, await dispatch('insertProductToDb', product));
	commit('TOGGLE_ADD_PRODUCT');
    console.log('save cart to db');
}