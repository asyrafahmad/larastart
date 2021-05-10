//IMPORT FROM APPJS IS FOR GLOBALLY USED

require('./bootstrap');

window.Vue = require('vue');    //default

//IMPORT VFORM ERROR HANDLING VALIDATION
import { Form, HasError, AlertError} from 'vform'

window.Form = Form;
// Vue.component(HasError.name, HasError)
// Vue.component(AlertError.name, AlertError)
//IMPORT VFORM ERROR HANDLING VALIDATION

//VUE ROUTER
import Vue from 'vue'
import VueRouter from'vue-router'
Vue.use(VueRouter)


import dashboard from './components/Dashboard.vue'
import profile from './components/Profile.vue'
import users from './components/Users.vue'

let routes = [
    { path: '/dashboard', name: 'dashboard', component: dashboard },
    { path: '/users', name: 'users', component: users},
    { path: '/profile', name: 'profile', component: profile}
]

const router = new VueRouter({
    mode: 'history',
    routes              // short for 'routes: routes
})
//VUE ROUTER

// javascript filter text to be used globally
Vue.filter('upText', function(text){
    return text.charAt(0).toUpperCase() + text.slice(1)
});


Vue.component('example-component', require('./components/ExampleComponent.vue').default);   //default

const app = new Vue({   //default
    el: '#app',
    router
});

