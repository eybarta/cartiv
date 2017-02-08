import { Meteor } from 'meteor/meteor'
import { Tracker }from 'meteor/tracker'
import * as types from './mutation-types';
import { Carts } from '/imports/api/collections/carts.js';
import { Inventory, ProductOptions } from '/imports/api/collections/inventory.js';


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


export const closePopup = ({commit}) => {
    
    commit('CLOSE_POPUP')
}
export const callPopup = ({commit}, data) => {
    console.log("CALL POPUP >> data: ", data);
    commit('CALL_POPUP', data)
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
        let inventory = Inventory.find({}, { fields: { 'owner':0, 'createdAt':0 }}).fetch();
            commit('UPDATE_INVENTORY_STATE', inventory)
            console.log("updated inventory from db > ", inventory);
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
    // commit('SAVE_PRODUCT', product, await dispatch('insertProductToDb', product));
    new Promise((resolve, reject) => {
        Meteor.call('inventory.insert', product, (err, result) =>{
            resolve();
            console.log("product saved to db");
        });
    });
	dispatch('closePopup');
}
export const deleteProduct = ({ commit, dispatch }, id) => {
    new Promise((resolve, reject) => {
        Meteor.call('inventory.delete', id, (err, result) =>{
            resolve();
            console.log("product deleted from db");
        });
    });
	dispatch('closePopup');
}
export const initProductOptions = ({commit}) => {
    Meteor.call('product_options.init');
    Tracker.autorun((c) => {
        Meteor.subscribe('product_options');
        let options = ProductOptions.findOne({ });
        commit('INIT_PRODUCT_OPTIONS', options);
    })
}
export const updateProductOptions = async ({commit}, option) => {
    // TODO :: Also save to DB
    return new Promise((resolve, reject) => {
        Meteor.call('product_options.update', option, (err, result) =>{
            console.log("product_options updated > ", option);
            resolve();
        });
    });
    commit('UPDATE_PRODUCT_OPTIONS', option);
}