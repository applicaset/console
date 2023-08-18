import { RouteRecordRaw } from 'vue-router';
import WrapperLayout from 'app/src/layouts/WrapperLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    name: 'Index',
    path: '/',
    component: () => import('pages/Index.vue'),
    redirect: { name: 'Clusters' },
    children: [
      {
        name: 'Clusters',
        path: 'clusters',
        component: WrapperLayout,
        redirect: { name: 'Cluster', params: { clusterName: 'nbg1' } },
        children: [
          {
            name: 'ClustersList',
            path: '',
            component: () => import('pages/clusters/List.vue'),
          },
          {
            name: 'Cluster',
            path: ':clusterName',
            component: WrapperLayout,
            redirect: { name: 'Namespaces' },
            children: [
              {
                name: 'Namespaces',
                path: 'namespaces',
                component: WrapperLayout,
                redirect: { name: 'NamespacesList' },
                children: [
                  {
                    name: 'NamespacesList',
                    path: '',
                    component: () =>
                      import('pages/clusters/namespaces/List.vue'),
                  },
                  {
                    name: 'NamespacesNew',
                    path: 'new',
                    component: () =>
                      import('pages/clusters/namespaces/New.vue'),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
