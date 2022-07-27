import { Vue } from './modules/deps.mjs';
import App from './modules/components/App.mjs';

document.body.innerHTML = '';
const root = document.createElement('div');
document.body.appendChild(root);
Vue.createApp(App).mount(root)''