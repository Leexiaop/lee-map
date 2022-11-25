export default {
    namespace: 'mapstate',
    state: {
        versionId: 0,
        styleOperate: {}
    },
    reducers: {
        setState(state, action) {
            return {
                ...state,
                ...action.data
            };
        }
    },
    effects: {}
};
