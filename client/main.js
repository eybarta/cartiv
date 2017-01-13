import {Router, nativeScrollBehavior} from 'meteor/akryum:vue-router2';
import '/imports/startup/client';
import store from '/imports/vuex/store/index';
import { initCartsState } from '/imports/vuex/store/actions';
import VueLazyload from 'vue-lazyload';

Vue.config.devtools = true;

Vue.use(VueLazyload, {
    preLoad: 3,
    error: 'img/error.png',
    loading: 'img/loader.svg',
    attempt: 1
})
// // Main app
import App from '/imports/ui/App.vue';
// Create router instance
const router = new Router({
  mode: 'history',
  scrollBehavior: nativeScrollBehavior,
});

// App start
Meteor.startup(() => {
  // Start the router
  new Vue({
    router: router.start(),
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
