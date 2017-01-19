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
    UPDATE_INVENTORY_STATE(state, inventory) {
        Vue.set(state, 'inventory', inventory)
    },
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
}
export const storeconfig = {
    mutations,
    getters,
    actions,
    state
}