import { Vue } from '../deps.mjs';

export const STATUS = {
    EMPTY: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: 3
};

export default (defaultData, fetcher) => {
    const state = {
        data: defaultData,
        status: STATUS.EMPTY,
        dataUpdatedAt: 0,
        error: null,
        errorUpdatedAt: 0,
        failureCount: 0,
    };
    Object.defineProperties(state, {
        isLoading: {
            get: () => state.status === STATUS.LOADING,
        },
        isSuccess: {
            get: () => state.status === STATUS.SUCCESS,
        },
        isError: {
            get: () => state.status === STATUS.ERROR,
        },
        isIdle: {
            get: () => state.status !== STATUS.LOADING,
        },
        isFetched: {
            get: () => typeof state.data !== defaultData,
        },
        isRefetching: {
            get: () => state.isFetched && state.isLoading,
        },
        isStale: {
            get: () => typeof state.data === defaultData,
        }
    });
    const stateRef = Vue.ref(state);
    state.reset = () => Object.assign(stateRef.value, {
        data: defaultData,
        status: STATUS.EMPTY,
        dataUpdatedAt: Date.now(),
        error: null,
        errorUpdatedAt: Date.now(),
        failureCount: 0,
    });
    state.fetch = async (...args) => {
        if (state.isLoading) return;
        stateRef.value.status = STATUS.LOADING;
        try {
            Object.assign(stateRef.value, {
                data: await fetcher(...args),
                status: STATUS.SUCCESS,
                dataUpdatedAt: Date.now(),
                error: null,
                failureCount: 0,
            });
        } catch (error) {
            Object.assign(stateRef.value, {
                status: STATUS.ERROR,
                error,
                errorUpdatedAt: Date.now(),
                failureCount: state.failureCount + 1,
            });
        }
    }
    return stateRef;
}