import { Vue } from './modules/deps.mjs';
import App from './modules/components/App.mjs';
import { useStores } from './modules/stores/index.mjs';

document.body.innerHTML = '';
const root = document.createElement('div');
document.body.appendChild(root);
const app = Vue.createApp(App);
useStores(app);
app.mount(root);