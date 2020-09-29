import Vue from "vue";
import App from "./App.vue";
import listDisplay from './components/infra/listDisplay.vue';
import ElementUI from "element-ui";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.component("listDisplay", listDisplay);
Vue.use(ElementUI);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount("#app");