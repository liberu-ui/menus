import App from '@enso-ui/ui/src/core/app';
import MenuOrganizer from './components/settings/MenuOrganizer.vue';

App.registerSettingsItem('menu-organizer', MenuOrganizer, 400, 'system.menus.organize');
