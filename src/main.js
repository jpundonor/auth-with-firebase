import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

store.dispatch("listenToAuthChanges").then(() => {
  const app = createApp(App);

  app.use(router);
  app.use(store);

  app.mount("#app");
});
