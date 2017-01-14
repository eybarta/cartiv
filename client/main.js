import Vue from 'vue';
import Vuex from 'vuex';
import {Meteor} from 'meteor/meteor';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
Vue.use(Vuex);
import routes from './routes';
import store from '/imports/client/vuex/index';

import { sync } from 'vuex-router-sync';
import '/imports/startup/client';

const router =  new VueRouter({
  mode: 'history',
  routes
})

sync(store, router);
// Libs

_ = lodash;

import { initCartsState } from '/imports/vuex/actions';

Vue.config.devtools = true;
Vue.config.debug = true;
// // Main app


// sync(store, router);
// App start
Meteor.startup(() => {
  import App from '/imports/ui/App.vue';
  
  // Start the router
  new Vue({
    router,
    render: h => h(App),
    store,
    mounted() {
        console.log("userid > ", Accounts.userId());
        let ref = this;
        setTimeout(()=> {
            ref.$store.dispatch('initCartsState', Accounts.userId());
        },1000)
    }
  }).$mount('app');
});
