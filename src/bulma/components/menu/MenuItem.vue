<template>
    <core-menu-item>
        <template #default="{ menu, editable, expandedSidebar, hasActiveChild, menuEvents }">
            <div class="menu-item is-flex is-align-items-center"
                v-on="menuEvents"
                @mouseenter="dropdown = true"
                @mouseleave="dropdown = false">
                <div class="icon"
                    :class="{ 'is-opaque': !menu.active && !hasActiveChild }">
                    <fa class="handle"
                        fixed-width
                        icon="grip-lines"
                        v-if="editable"/>
                    <fa fixed-width
                        :icon="menu.icon"
                        v-else/>
                </div>
                <zoom :duration="300">
                    <div class="ml-2 menu-hiding-label"
                        :class="[
                            { 'is-bold': menu.active },
                            { 'is-opaque': !menu.active && !hasActiveChild }
                        ]"
                        v-if="expandedSidebar">
                        {{ i18n(menu.name) }}
                    </div>
                </zoom>
                <dropdown-indicator class="is-small"
                    :open="menu.expanded"
                    v-if="menu.children"/>
                <transition @enter="enter"
                    @leave="leave">
                    <div class="dropdown-content"
                        ref="dropdown"
                        v-if="!expandedSidebar && dropdown">
                        <div class="dropdown-item"
                            :class="{ 'is-bold': menu.active }">
                            {{ i18n(menu.name) }}
                        </div>
                    </div>
                </transition>
            </div>
        </template>
    </core-menu-item>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { Zoom } from '@liberu-ui/transitions';
import DropdownIndicator from '@liberu-ui/dropdown-indicator';
import CoreMenuItem from '../../../core/components/menu/MenuItem.vue';

library.add(faGripLines);

export default {
    name: 'MenuItem',

    components: {
        CoreMenuItem, DropdownIndicator, Fa, Zoom,
    },

    inject: ['i18n'],

    data: () => ({
        dropdown: false,
    }),

    computed: {
        sidebar() {
            return document.querySelector('.aside.sidebar');
        },
    },

    methods: {
        adjust() {
            this.$refs.dropdown.style['margin-top'] = `-${this.sidebar.scrollTop + 2}px`;
        },
        enter() {
            this.adjust();
            this.sidebar.addEventListener('scroll', this.adjust);
        },
        leave() {
            this.sidebar.removeEventListener('scroll', this.adjust);
        },
    },
};
</script>

<style lang="scss">
    @import '@liberu-ui/themes/bulma/variables';

    .menu-list {
        .menu-item {

            .is-opaque {
                opacity: 0.8;

                &:hover {
                    font-weight: 800;
                }
            }

            display: flex;
            padding: 0.3em 0.3em;
            cursor: pointer;

            .menu-hiding-label {
                white-space: nowrap;
            }

            .dropdown-content {
                display: block;
                white-space: nowrap;
                padding-bottom: 0;
                padding-top: 0;
                position: fixed;

                .dropdown-item.is-bold {
                    font-weight: 800;
                }

                [dir='ltr'] & {
                    left: $sidebar-collapsed-width;
                }

                [dir='rtl'] & {
                    right: $sidebar-collapsed-width;
                }
            }

            .icon.angle.is-small {
                [dir='ltr'] & {
                    margin-left: auto;
                }
                [dir='rtl'] & {
                    margin-right: auto;
                }
            }
        }
    }
</style>
