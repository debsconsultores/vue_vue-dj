import Vue from 'vue'
import VueRouter from  'vue-router'

import Home from "./components/Home"
import Pixabay from "./components/pixabay/Pixabay"

Vue.use(VueRouter);

const routes = [
    {
        path:"/",
        name:"home",
        component: Home
    },
    {
        path:"/pixa",
        name:"pixa",
        component: Pixabay
    }
]

const router = new VueRouter({
    mode:'history',
    routes
})

export default router