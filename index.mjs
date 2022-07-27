import { Vue } from './modules/deps.mjs';

document.body.innerHTML = '';
const root = document.createElement('div');
document.body.appendChild(root);
Vue.createApp({ template: '<h1>Hello, World!</h1>' }).mount(root);