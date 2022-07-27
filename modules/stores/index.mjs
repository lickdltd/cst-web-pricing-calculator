import * as channels from './channels.mjs';

const stores = {
    channels
};

export const useStores = (app) => app.provide('$stores', stores);