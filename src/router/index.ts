import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import WrapperLayout from "@/components/WrapperLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    meta: {
      title: "Home",
    },
    component: () => import("@/views/Index.vue"),
    redirect: { name: "Namespaces" },
    children: [
      {
        path: "namespaces",
        name: "Namespaces",
        meta: {
          title: "Namespaces",
        },
        component: WrapperLayout,
        redirect: { name: "NamespacesIndex" },
        children: [
          {
            path: "",
            name: "NamespacesIndex",
            meta: {
              title: "Index",
            },
            component: () => import("@/views/namespaces/Index.vue"),
          },
          {
            path: "new",
            name: "NamespacesNew",
            meta: {
              title: "New Namespace",
            },
            component: () => import("@/views/namespaces/New.vue"),
          },
          {
            path: ":namespaceName",
            name: "NamespacesView",
            meta: {
              title: "Namespace XXX",
            },
            component: () => import("@/views/namespaces/View.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = "ApplicaSet Console";

  const title = to.meta?.title as string | undefined;
  if (title) {
    document.title = `${title} | ApplicaSet Console`;
  }

  next();
});

export default router;
