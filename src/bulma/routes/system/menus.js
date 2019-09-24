import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';

const routes = routeImporter(require.context('./menus', false, /.*\.js$/));
const Router = () => import('@enso-ui/ui/src/bulma/pages/Router.vue');

export default {
    path: 'menus',
    component: Router,
    meta: {
        breadcrumb: 'menus',
        route: 'system.menus.index',
    },
    children: routes,
};
