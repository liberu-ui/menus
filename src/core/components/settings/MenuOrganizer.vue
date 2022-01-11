<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'MenuOrganizer',

    computed: {
        ...mapState('menu', ['editable']),
    },

    methods: {
        ...mapMutations('menu', ['edit']),
    },

    render() {
        return this.$slots.default({
            bindings: {
                modelValue: this.editable,
            },
            events: {
                'update:modelValue': this.edit,
            },
        });
    },
};

</script>
