import {Meteor} from 'meteor/meteor';
import Vue from 'vue';

import { sync } from 'vuex-router-sync';
import '/imports/startup/client';
// Libs

_ = lodash;

import { initCartsState } from '/imports/ui/vuex/actions';

Vue.config.devtools = true;
Vue.config.debug = true;
// // Main app
import App from '/imports/ui/App.vue';


// sync(store, router);
// App start
Meteor.startup(() => {
  import router from './routes';
  import store from '/imports/client/vuex/index';
  sync(store, router);
  
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
