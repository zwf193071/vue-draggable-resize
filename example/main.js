import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
    render: h => h(App)
}).$mount("#app");