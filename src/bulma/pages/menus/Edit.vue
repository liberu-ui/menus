<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <enso-form class="box has-background-light raises-on-hover"
                @ready="ready = true"
                ref="form">
                <template #actions
                    v-if="ready">
                    <div class="level-item">
                        <a class="button is-warning"
                            @click="$router.push({
                                name: 'system.roles.configure',
                                params: { role: $refs.form.routeParam('role') }
                            }).catch(routerErrorHandler)">
                            <span class="is-hidden-mobile">
                                {{ i18n('Configure') }}
                            </span>
                            <span class="icon">
                                <fa icon="sliders-h"/>
                            </span>
                            <span class="is-hidden-mobile"/>
                        </a>
                    </div>
                    <div class="level-item">
                        <a class="button is-link"
                            @click="writeConfig">
                            <span class="is-hidden-mobile">
                                {{ i18n('File') }}
                            </span>
                            <span class="icon">
                                <fa icon="save"/>
                            </span>
                            <span class="is-hidden-mobile"/>
                        </a>
                    </div>
                </template>
            </enso-form>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSave, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { EnsoForm } from '@liberu-ui/forms/bulma';

library.add(faSave, faSlidersH);

export default {
    name: 'Edit',

    components: { EnsoForm, Fa },

    inject: [
        'errorHandler', 'http', 'i18n', 'route', 'routerErrorHandler', 'toastr',
    ],

    data: () => ({
        ready: false,
    }),

    methods: {
        writeConfig() {
            this.http.post(this.route('system.roles.writeConfig', this.$refs.form.routeParam('role')))
                .then(({ data }) => this.toastr.success(data.message))
                .catch(this.errorHandler);
        },
    },
};
</script>
