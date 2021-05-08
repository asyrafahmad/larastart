
require('./bootstrap');

window.Vue = require('vue');    //default

//VUE ROUTER
import Vue from 'vue'
import VueRouter from'vue-router'
Vue.use(VueRouter)


import dashboard from './components/Dashboard.vue'
import profile from './components/Profile.vue'

let routes = [
    { path: '/dashboard', name: 'dashboard', component: dashboard },
    { path: '/profile', name: 'profile', component: profile}
]

const router = new VueRouter({
    mode: 'history',
    routes      // short for 'routes: routes
})
//VUE ROUTER


Vue.component('example-component', require('./components/ExampleComponent.vue').default);   //default

const app = new Vue({   //default
    el: '#app',
    router
});

