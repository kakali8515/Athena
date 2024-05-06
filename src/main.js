import { createApp } from 'vue'
import App from './App.vue'
import "./index.css";
import 'tw-elements';
import router from './router/index.js';
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
import store from './store';
import './config/axios-config.js';
import Pagination from 'v-pagination-3';
import Datepicker from '@vuepic/vue-datepicker';
import Popper from "vue3-popper";
import VueApexCharts from "vue3-apexcharts";
import '@vuepic/vue-datepicker/dist/main.css';
import ContentEditor from './components/ContentEditor.vue';
import './Styles/styles.scss';
// Import component
import Loading from 'vue3-loading-overlay';
// Import stylesheet
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');
app.component('pagination', Pagination);
app.component('Datepicker', Datepicker);
app.component('Popper', Popper);
app.component('ContentEditor', ContentEditor);
app.component('Loading', Loading);
app.use(VueApexCharts);