import Vue from 'vue'
import Vuex from 'vuex';
import * as actions from './actions'

const state = {
    // CARTS
    activeAddCart: false,
    currentCart: {},
    carts: [],
    userId:null,
    popup: {
        active:false,
        ui: 'circle',
        type:null,
        data:null,
        title:null
    },
    modal: {
        active:false, 
        content:null,
    },
    // INVENTORY
    activeAddProduct: false,
    inventory: [],
    productOptions: null
}

const mutations = {
    // MISC
    CLOSE_POPUP (state) {
        state.popup.active = false //!state.popup.active
        state.popup.type = null
        state.popup.data = null
        state.popup.title = null
    },
    CALL_POPUP (state, data) {
        state.popup.active = true;
        state.popup.type = data.type;
        state.popup.data = data.data || null;
        state.popup.title = data.title || null;
        state.popup.ui = data.ui || 'circle';

    },
// MISC
    CLOSE_MODAL (state) {
        state.modal.active = false //!state.popup.active
        state.modal.content = null
    },
    CALL_MODAL (state, data) {
        state.modal.active = true;
        if (!!data.content) {
            state.modal.content = data.content;
        }
    },


    INIT_USER_ID (state, userId) {
        state.userId = userId;
    },
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
    },

    // DEFAULT PRODUCT OPTIONS (tags basically)
    INIT_PRODUCT_OPTIONS (state, options) {
        state.productOptions = options;
    },
    UPDATE_PRODUCT_OPTIONS (state, option) {
        state.productOptions[option.name].push(option.tag);
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
    activeInventory: state => {
        let cartId = state.route.params.cartId,
            inventory = state.inventory;
        
        if (!!cartId) {
            // Fetch only for this cart
            return _.filter(inventory, product => {
                let locations = _.map(product.atLocations, 'locationId');
                return locations.indexOf(cartId)>-1
            })
        }
    },
    parsedInventory: state => {
        let inventory = state.inventory;
        return _.map(inventory, product => {
            return {
                _id: product._id,
                image: product.image,
                type: product.type,
                category: product.category,
                brand: product.brand,
                size: product.size,
                amount: product.amount,
                price: product.priceMax || product.priceMin,
                atLocations: product.atLocations || null
            }
        })
    }
}
export const storeconfig = {
    mutations,
    getters,
    actions,
    state
}