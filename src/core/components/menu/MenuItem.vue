<script>
import {
    mapState, mapGetters, mapMutations, mapActions,
} from 'vuex';

export default {
    name: 'MenuItem',

    inject: ['routerErrorHandler'],

    props: {
        menu: {
            type: Object,
            required: true,
        },
    },

    computed: {
        ...mapState('menu', ['editable']),
        ...mapState('layout', ['isTouch']),
        ...mapState('layout/sidebar', ['isExpanded']),
        ...mapGetters('menu', ['hasActiveChild']),
        active() {
            return this.menu.route !== null
                && (this.matchesName || this.matchesPath);
        },
        matchesName() {
            return this.$route.matched
                .map((matchedRoute) => matchedRoute.name)
                .includes(this.menu.route);
        },
        matchesPath() {
            return this.$route.matched
                .map((matchedRoute) => matchedRoute.path)
                .includes(this.path);
        },
        path() {
            const components = this.menu.route.split('.');
            return `/${components.slice(0, components.length).join('/')}`;
        },
    },

    watch: {
        active: {
            handler(active) {
                this.activate({ menu: this.menu, active });

                if (active) {
                    this.$nextTick(this.refresh);
                }
            },
            immediate: true,
        },
    },

    methods: {
        ...mapMutations('layout/sidebar', ['hide']),
        ...mapMutations('menu', ['activate', 'toggle']),
        ...mapActions('menu', ['refresh']),
        select() {
            if (this.menu.children) {
                this.toggle(this.menu);

                return;
            }

            this.$router.push({ name: this.menu.route })
                .catch(this.routerErrorHandler);

            if (this.isTouch) {
                this.hide();
            }
        },
    },

    render() {
        return this.$scopedSlots.default({
            menu: this.menu,
            editable: this.editable,
            expandedSidebar: this.isExpanded,
            hasActiveChild: this.menu.children && this.hasActiveChild(this.menu),
            menuEvents: {
                click: this.select,
            },
        });
    },
};
</script>
