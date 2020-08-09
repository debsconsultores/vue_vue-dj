import Vue from 'vue'
import VueRouter from  'vue-router'

import Home from "./components/Home"
import Pixabay from "./components/pixabay/Pixabay"
import Documentos from "./components/documentos/Documentos"


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
    },
    {
        path:"/docs",
        name:"docuemtnos",
        component: Documentos
    }
]

const router = new VueRouter({
    mode:'history',
    routes
})

export default router