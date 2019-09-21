const MenuCreate = () => import('../../../pages/menus/Create.vue');

export default {
    name: 'system.menus.create',
    path: 'create',
    component: MenuCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Menu',
    },
};
