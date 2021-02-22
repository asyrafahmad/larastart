
require('./bootstrap');

window.Vue = require('vue');

// START import vue router
import VueRouter from 'vue-router'
Vue.use(VueRouter);

let routes = [
    { path: '/dashboard', component:  require('./components/Dashboard.vue').default},
    { path: '/users', component:  require('./components/Users.vue').default},
    { path: '/profile', component:  require('./components/Profile.vue').default}
]

const router = new VueRouter({
    mode: 'history',
    routes
})
// END import vue router

Vue.component('example-component', require('./components/ExampleComponent.vue').default);


app = new Vue({
    el: '#app',
    router
});
