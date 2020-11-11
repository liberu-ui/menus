import Vue from 'vue';
import App from '@enso-ui/ui/src/core/app';
import MenuOrganizer from './components/settings/MenuOrganizer.vue';

Vue.component('setting-menu-organizer', MenuOrganizer);
App.registerSettingsItem('setting-menu-organizer', 100);
