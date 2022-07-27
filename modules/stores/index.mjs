import * as channels from './channels.mjs';

const stores = {
    channels
};

export const useStores = (app) => app.provide('$stores', stores);

export const mapState = (moduleName, stateNames) => {
    const computedState = {};
    const names = Array.isArray(stateNames) ? stateNames : [stateNames];
    for (const name of names) {
        computedState[name] = () => {
            const stateItem = stores[moduleName][name];
            if (typeof stateItem === 'object' && stateItem !== null && stateItem.__v_isRef === true) {
                return stateItem.value;
            }
            return stateItem;
        }
    }
    return computedState;
};