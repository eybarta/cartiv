import Vue from 'vue'
import Vuex from 'vuex';
import * as actions from './actions'

const state = {
    // CARTS
    activeAddCart: false,
    currentCart: {},
    carts: [],

    // INVENTORY
    activeAddProduct: false,
    inventory: []
}

const mutations = {
    TOGGLE_ADDCART (state) {
        state.activeAddCart = !state.activeAddCart;
        state.currentCart = {};
    },
    SAVE_CART (state, cart) {
        state.carts.push(cart);
    },
    UPDATE_CARTS_STATE (state, carts) {
        Vue.set(state, 'carts', carts)
        // state.carts = carts;
    },
    UPDATE_CURRENT_CART_LOCATION(state, location) {
        if (_.isEmpty(state.currentCart)) {
            state.currentCart = {
            location,
                createdAt: new Date(),
                thumb: null,
                _userId: Accounts.userId()
            }
        } 
        else {
            state.currentCart.location = location;
        }
    },
    UPDATE_CURRENT_CART_THUMB (state, image) {
        state.currentCart.thumb = image;
    },
    // inventory
    INIT_INVENTORY_STATE (state, inventory) {
        state.inventory = inventory;
    },
    TOGGLE_ADD_PRODUCT (state) {
        state.activeAddProduct = !state.activeAddProduct;
    },
    SAVE_PRODUCT (state, product) {
        state.inventory.push(product);
    }
}

const getters = {
    currentLocationThumbnail: state => {
        return _.isEmpty(state.currentCart) ? null : state.currentCart.thumb;
    },
	activeCart: state => {
        let cartId = state.route.params.cartId,
            cart = _.filter(state.carts, {_id: cartId});
        return !!cart.length ? cart[0] : null;
    },
	activeInventory: (state, getters) => {
		let cartId = state.route.params.cartId;
			console.log('in inventory getter.. CART == ', cartId);
console.log('inventory from state ... ', state.inventory);

            setTimeout(() => {
                console.log('22 inventory from state ... ', state.inventory);

            },1000)
            let inventory = _.filter(state.inventory, product => {
                console.log("product > ", product);
                return product.location_id == cartId
            })
		// let inventory = (!cartId) ? null : _.find(state.inventory, product => { return product.cart_id == cartId });
		    console.log("inventory >> ", inventory);
            return inventory
	},
}
export const storeconfig = {
    mutations,
    getters,
    actions,
    state
}