import {createWebHistory, createRouter} from "vue-router";
import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        props: true,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        props: false,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        props: false,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;