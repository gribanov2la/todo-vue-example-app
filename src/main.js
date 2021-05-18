import Vue from 'vue';
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import store from './store';
import StorePersistPlugin from './plugins/StorePersistPlugin';
import './styles/global.scss';

Vue.config.productionTip = false;
Vue.use(ElementUi);
Vue.use(StorePersistPlugin, { store });

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
