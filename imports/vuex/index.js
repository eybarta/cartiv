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
    INIT_CARTS_STATE (state, carts) {
        state.carts = carts;
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
		let inventory = (!cartId) ? null : _.find(state.inventory, (o) => { return o.location._id == cartId });
		    console.log("inventory >> ", inventory);
            return !!inventory && inventory.length ? inventory[0] : null;
	},
}
export const storeconfig = {
    mutations,
    getters,
    actions,
    state
}