import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        component: () => import("@/views/Login"),
    },
    {
        path: "/home",
        component: () => import("@/Layout/index.vue"),
        redirect:"/home/monitor",
     children:[
        {
            path:"monitor",
            component:()=>import("@/views/Monitor/DataMonitor")

        }
     ]
    },
];

const router = new VueRouter({
    routes,
});

export default router;
