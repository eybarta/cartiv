import {Vue} from 'meteor/akryum:vue';
import Vuex from 'vuex';
import * as actions from './actions'



const state = {
  activeAddCart: false,
  currentCart: {},
  carts: []
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
    console.log("MUTATE CARTS STATE >> ", carts);
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
      } else {
          state.currentCart.location = location;
      }
  },
  UPDATE_CURRENT_CART_THUMB (state, image) {
      state.currentCart.thumb = image;
  },
}

const getters = {
    currentLocationThumbnail: state => {
        return _.isEmpty(state.currentCart) ? null : state.currentCart.thumb;
    }
}

export default new Vuex.Store({
    mutations,
    getters,
    actions,
    state
})