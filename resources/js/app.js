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
import developer from './components/Developer.vue'

let routes = [
    { path: '/dashboard', name: 'dashboard', component: dashboard },
    { path: '/developer', name: 'developer', component: developer },
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
// javascript filter text to be used globally


// Using momenJS globally
import moment from 'moment';

Vue.filter('myDate', function(created){
    return moment(created).format('MMMM DD YYYY')
});
// Using momenJS globally

// import progress bar API globally
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
})
// import progress bar API globally

// import SweetAlert globally
import swal from 'sweetalert2'
window.swal = swal;

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

window.toast = swal;
// import SweetAlert globally

//
window.Fire = new Vue();

//Passport AOuth2 Token testing
Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);
//Passport AOuth2 Token testing


Vue.component('example-component', require('./components/ExampleComponent.vue').default);   //default

const app = new Vue({   //default
    el: '#app',
    router
});

